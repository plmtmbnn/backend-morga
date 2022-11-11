import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';
import { ResponseHandler } from '../helper/ResponseHandler';

import RedisController from '../midleware/redis';
import { token } from '../midleware/jwt';

import { decrypt, encrypt } from '../helper/CryptoHelper';

import {
  userQuery
} from '../sequelize/query';
import { sequelize } from '../sequelize/init';
import { queryPayload } from 'helper/QueryPayload';

const redisController: RedisController = new RedisController();

export class AuthService {
  static async syncDatabase (req: Request, res: Response): Promise<any> {
    await userQuery.syncAllTable();
  }

  static async login (req: Request, res: Response): Promise<any> {
    try {
      const queryPayload: queryPayload = {
        where: {
          username: req.body.username
        }
      };

      const result: any = await userQuery.findAndCountAll(queryPayload);

      if (result.count === 0) {
        return ResponseHandler.send(res, new CustomException(EXCEPTION_MESSAGE.USER_NOT_REGISTERED_YET), true);
      }

      if (req.body.password !== decrypt(result.rows[0].password)) {
        return ResponseHandler.send(res, new CustomException(EXCEPTION_MESSAGE.INVALID_USERNAME_OR_PASSWORD), true);
      }

      const createdToken: any = token({ user_id: result.rows[0].id, username: req.body.username });

      await redisController.set(`${result.rows[0].id}-${req.body.username}`, createdToken);

      return ResponseHandler.send(res, {
        data: {
          id: result.rows[0].id,
          fullname: result.rows[0].fullname,
          username: result.rows[0].username,
          role: result.rows[0].role,
          token: createdToken
        }
      });
      ;
    } catch (error) {
      console.log('[AuthService][login]', error);
      return ResponseHandler.send(res, error, true);
    }
  }

  static async register (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();

    try {
      const queryPayload: queryPayload = {
        where: {
          username: req.body.username
        }
      };

      const result: any = await userQuery.findAndCountAll(queryPayload);
      if (result.count === 0) {
        await userQuery.insert({
          fullname: req.body.fullname,
          password: encrypt(req.body.password),
          username: req.body.username,
          role: req.body.role
        }, { transaction });
        await transaction.commit();
        return ResponseHandler.send(res, {});
      } else {
        await transaction.rollback();
        return ResponseHandler.send(res, new CustomException(EXCEPTION_MESSAGE.USERNAME_ALREADY_USED), true);
      }
    } catch (error) {
      await transaction.rollback();
      console.log('[AuthService][register]', error);
      ResponseHandler.send(res, error, true);
    }
  }

  static async changePassword (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();

    try {
      const queryPayload: queryPayload = {
        where: {
          id: req.body.id
        }
      };

      const result: any = await userQuery.findAndCountAll(queryPayload);
      if (result.count > 0) {
        await userQuery.update({
          password: encrypt(req.body.password)
        }, {
          transaction,
          where: {
            id: req.body.id
          }
        });
        await transaction.commit();
        return ResponseHandler.send(res, {});
      } else {
        await transaction.rollback();
        return ResponseHandler.send(res, new CustomException(EXCEPTION_MESSAGE.USER_NOT_REGISTERED_YET), true);
      }
    } catch (error) {
      await transaction.rollback();
      console.log('[AuthService][changePassword]', error);
      ResponseHandler.send(res, error, true);
    }
  }

  static async getUserList (req: Request, res: Response): Promise<any> {
    const queryPayload: queryPayload = {
      where: {
        status: true
      },
      order: [['id', 'ASC']],
      attributes: ['id', 'fullname', 'username', 'role', 'status']
    };
    const result: any = await userQuery.findAndCountAll(queryPayload);

    if (result.count === 0) throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    return { data: result.rows };
  }
}
