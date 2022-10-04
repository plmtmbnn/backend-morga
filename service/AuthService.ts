import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';
import { ResponseHandler } from '../helper/ResponseHandler';

import RedisController from '../midleware/redis';
import { token } from '../midleware/jwt';

import {decrypt, encrypt} from '../helper/CryptoHelper';

import {
  userQuery, authorQuery
} from '../sequelize/query';
import { sequelize } from '../sequelize/init';
import { Op, col, fn, where, literal } from 'sequelize';
import { queryPayload } from 'helper/QueryPayload';

import { FileHelper } from "../helper/FileHelper";

const redisController: RedisController = new RedisController();

export class AuthService {
  static async login(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();

    try {
        let queryPayload: queryPayload = {
          where: {
            email: req.body.email
          }
        };

        let result: any = await userQuery.findAndCountAll(queryPayload);

        if (result.count === 0) {
          return ResponseHandler.send(res, new CustomException(EXCEPTION_MESSAGE.USER_NOT_REGISTERED_YET), true);
        }
        
        if(req.body.password !== decrypt(result.rows[0].password)) {
          return ResponseHandler.send(res, new CustomException(EXCEPTION_MESSAGE.INVALID_EMAIL_OR_PASSWORD), true);
        }

          const author: any = await authorQuery.findAndCountAll({
            where: { user_id: result.rows[0].id }
          });
          let isAdmin: boolean = false;
          let isAuthor: boolean = false;
          if (author.count > 0) {            
            isAdmin = author.rows[0].is_admin;
            isAuthor = true;
          }

          const createdToken: any = token({ user_id: result.rows[0].id, email: req.body.email });

          await redisController.set(`${result.rows[0].id}-${req.body.email}`, createdToken);

          return ResponseHandler.send(res, {
            data: {
              id: result.rows[0].id, 
              full_name: result.rows[0].full_name,
              email: result.rows[0].email,
              avatar_url: result.rows[0].avatar_url,
              created_at: result.rows[0].created_at,
              isAdmin,
              isAuthor,
              author_id: author.count > 0 ? author.rows[0].id : null,
              token: createdToken
            }
          });
          ;
    } catch (error) {
      await transaction.rollback();
      console.log('[AuthService][login]', error);
      return ResponseHandler.send(res, error, true);
    }
  }

  static async register(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    
    try {
      let queryPayload: queryPayload = {
        where: {
          email: req.body.email
        }
      };
  
      let result: any = await userQuery.findAndCountAll(queryPayload);
      if (result.count === 0) {
        let avatar_url: string = undefined;
    if (req.body.avatar_file && req.body.avatar_file !== '') {
      const uploadStatus: any = await FileHelper.saveAndResizeFile(
        req.body.avatar_file,
        "./image/avatar/"
      );
      avatar_url = uploadStatus.status ? uploadStatus.filename : undefined;
    }
        await userQuery.insert({
          full_name: req.body.full_name,
          password: encrypt(req.body.password),
          email: req.body.email,
          avatar_url,
        }, { transaction });
        await transaction.commit();
        return ResponseHandler.send(res, {});
      } else {
        return ResponseHandler.send(res, new CustomException(EXCEPTION_MESSAGE.EMAIL_ALREADY_USED), true);
      }
    } catch (error) {
      await transaction.rollback();
      console.log('[AuthService][register]', error);
      ResponseHandler.send(res, error, true);
    }
  }

  static async listUser(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();

    try {
        let where: any = {};
        if(req.body.email){
          where.email = {
            [Op.iLike]: `%${req.body.email}%`
          };
        }
        if(req.body.full_name){
          where.full_name = {
            [Op.iLike]: `%${req.body.full_name}%`
          };
        }

        let queryPayload: queryPayload = {
          where,
          order: [
            ['full_name', 'ASC']
          ]
        };

        let result: any = await userQuery.findAndCountAllWithAuthor(queryPayload);
        
        let data: any = [];
        Array(...result.rows).map((e)=> {
          const item: any = e.toJSON();
          let isAdmin: boolean = false;
          let isAuthor: boolean = false;
          if(item.t_author){            
            isAuthor = true;
            if(item.t_author.is_admin){
              isAdmin = true;
            }
          }
          
          data.push({
              ...item,
              user_status: isAuthor ? isAdmin ? 'Admin' : 'Penulis' : 'Pembaca'
            })
        });

          return ResponseHandler.send(res, {
            data
          });
          ;
    } catch (error) {
      await transaction.rollback();
      console.log('[AuthService][listUser]', error);
      return ResponseHandler.send(res, error, true);
    }
  }

  static async updateUserStatus(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();

    try {
        let queryPayload: queryPayload = {
          where: {
            id: req.body.user_id
          },
          order: [
            ['full_name', 'ASC']
          ]
        };

        let result: any = await userQuery.findAndCountAllWithAuthorOptional(queryPayload);
                
        if(req.body.action === 'SET_TO_AUTHOR') {
          let author_id: number = null;
          let full_name: string = null;
          Array(...result.rows).map((e)=> {            
            const item: any = e.toJSON();

            full_name = item.full_name;
            author_id = item.t_author && item.t_author.id ? item.t_author.id : null;
          });
          if(author_id){
              await authorQuery.update({ status: true }, { where: { id: author_id}, transaction });
          } else {
            await authorQuery.insert({ status: true, user_id: req.body.user_id, author_name: full_name }, { transaction });            
          }
        } else {
          let author_id: number = null;

          Array(...result.rows).map((e)=> {
            const item: any = e.toJSON();

            author_id = item.t_author && item.t_author.id ? item.t_author.id : null;            
          });          
          
          if(author_id){
            await authorQuery.update({ status: false }, { where: { id: author_id}, transaction });
          }
        }
    await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[AuthService][updateUserStatus]', error);
      return ResponseHandler.send(res, error, true);
    }
  }

  static async addAsAdmin(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();

    try {
        let queryPayload: queryPayload = {
          where: {
            id: req.params.user_id
          },
          order: [
            ['full_name', 'ASC']
          ]
        };

        let result: any = await userQuery.findAndCountAllWithAuthorOptional(queryPayload);
                
        let author_id: number = null;
        let full_name: string = null;
        Array(...result.rows).map((e)=> {
          const item: any = e.toJSON();

          full_name = item.full_name;
          author_id = item.t_author && item.t_author.id ? item.t_author.id : null;
        });
        if(author_id){
            await authorQuery.update({ status: true, is_admin: true }, { where: { id: author_id}, transaction });
        } else {
          await authorQuery.insert({ status: true, user_id: req.params.user_id, author_name: full_name, is_admin: true }, { transaction });           
        }        
    await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[AuthService][addAsAdmin]', error);
      return ResponseHandler.send(res, error, true);
    }
  }
}
