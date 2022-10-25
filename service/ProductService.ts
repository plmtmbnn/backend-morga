import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import {
  productQuery
} from '../sequelize/query';

import { queryPayload } from 'helper/QueryPayload';

import { sequelize } from '../sequelize/init';

export class ProductService {
  static async getProduct (req: Request, res: Response): Promise<any> {
    const queryPayload: queryPayload = {
      where: {
        status: true
      },
      order: [['id', 'ASC']]
    };
    const result: any = await productQuery.findAndCountAll(queryPayload);

    if (result.count === 0) throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    return { data: result.rows };
  }

  static async addProduct (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      await productQuery.insert({
        name: req.body.name,
        unit: req.body.unit,
        description: req.body.description
      }, {
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[ProductService][addProduct]', error);
    }
  }
}
