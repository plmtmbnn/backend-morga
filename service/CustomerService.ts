import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import {
  productCustomerQuery, customerQuery
} from '../sequelize/query';

import { queryPayload } from 'helper/QueryPayload';

import { sequelize } from '../sequelize/init';

export class CustomerService {
  // CUSTOMER =====================================================

  static async getCustomer (req: Request, res: Response): Promise<any> {
    const queryPayload: queryPayload = {
      where: {
        status: true
      },
      order: [['id', 'ASC']]
    };
    const result: any = await customerQuery.findAndCountAll(queryPayload);

    if (result.count === 0) throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    return { data: result.rows };
  }

  static async upsertCustomer (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      if (req.body.id) {
        await customerQuery.update(
          {
            name: req.body.name,
            description: req.body.description,
            address: req.body.address
          }, {
            transaction,
            where: { id: req.body.id }
          });
      } else {
        await customerQuery.insert({
          name: req.body.name,
          description: req.body.description,
          address: req.body.address
        }, {
          transaction
        });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[CustomerService][upsertCustomer]', error);
    }
  }
  // ============================================================

  // CUSTOMER PRODUCT MAPPING =====================================================

  static async getCustomerProduct (req: Request, res: Response): Promise<any> {
    const queryPayload: queryPayload = {
      where: {
        status: true
      },
      order: [['id', 'ASC']]
    };
    const result: any = await productCustomerQuery.findAndCountAll(queryPayload);

    if (result.count === 0) throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    return { data: result.rows };
  }

  static async upsertCustomerProduct (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      if (req.body.id) {
        await productCustomerQuery.update(
          {
            code: req.body.fullname,
            description: req.body.description,
            name: req.body.name
          }, {
            transaction,
            where: { id: req.body.id }
          });
      } else {
        await productCustomerQuery.insert({
          fullname: req.body.fullname,
          description: req.body.description,
          name: req.body.name
        }, {
          transaction
        });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[CustomerService][upsertCustomerProduct]', error);
    }
  }
  // ============================================================
}
