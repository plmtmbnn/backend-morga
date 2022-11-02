import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import {
  transactionQuery
} from '../sequelize/query';

import { queryPayload } from 'helper/QueryPayload';

import { sequelize } from '../sequelize/init';

export class TransactionService {
  static async getTransaction (req: Request, res: Response): Promise<any> {
    const queryPayload: queryPayload = {
      order: [['id', 'ASC']]
    };
    const result: any = await transactionQuery.detail(queryPayload);
    return { data: result.rows };
  }

  static async upsertTransaction (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      if (req.body.id) {
        await transactionQuery.update({
          customer_product_mapping_id: req.body.customer_product_mapping_id,
          truck_id: req.body.truck_id,
          driver_id: req.body.driver_id,
          total_unit: req.body.total_unit,
          origin_price: req.body.origin_price,
          date_delivery: req.body.date_delivery,
          date_paid: req.body.date_paid,
          status: req.body.status,
          amount_billing: req.body.amount_billing,
          amount_paid: req.body.amount_paid,
          description: req.body.description
        }, {
          transaction,
          where: {
            id: req.body.id
          }
        });
      } else {
        await transactionQuery.insert({
          customer_product_mapping_id: req.body.customer_product_mapping_id,
          truck_id: req.body.truck_id,
          driver_id: req.body.driver_id,
          total_unit: req.body.total_unit,
          origin_price: req.body.origin_price,
          date_delivery: req.body.date_delivery,
          date_paid: req.body.date_paid,
          status: req.body.status,
          amount_billing: req.body.amount_billing,
          amount_paid: req.body.amount_paid,
          description: req.body.description
        }, {
          transaction
        });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[TransactionService][upsertTransaction]', error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }
}
