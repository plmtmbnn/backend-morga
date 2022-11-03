import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import {
  transactionQuery
} from '../sequelize/query';

import { queryPayload } from 'helper/QueryPayload';

import { sequelize } from '../sequelize/init';
import moment from 'moment';

const { Op } = require('sequelize');

export class TransactionService {
  static async getTransaction (req: Request, res: Response): Promise<any> {
    const where: any = {};

    if (req.body.truck_id) {
      where.truck_id = req.body.truck_id;
    }
    if (req.body.driver_id) {
      where.driver_id = req.body.driver_id;
    }
    if (req.body.status) {
      where.status = req.body.status;
    }
    if (req.body.customer_product_mapping_id) {
      where.customer_product_mapping_id = req.body.customer_product_mapping_id;
    }
    if (req.body.date_delivery && req.body.date_delivery?.length === 2) {
      const dateRange: any[] = Array(...req.body.date_delivery);
      const startedDate = moment(dateRange[0]).format('YYYY-MM-DD 00:00:00');
      const endDate = moment(dateRange[1]).format('YYYY-MM-DD 00:00:00');
      where.date_delivery = { [Op.between]: [startedDate, endDate] };
    }

    const queryPayload: queryPayload = {
      order: [['id', 'ASC']],
      where
    };
    const result: any = await transactionQuery.detail(queryPayload);
    return { data: result.rows };
  }

  static async upsertTransaction (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      if (req.body.id) {
        await transactionQuery.update({
          customer_product_mapping_id: req.body.customer_product_mapping_id || undefined,
          truck_id: req.body.truck_id || undefined,
          driver_id: req.body.driver_id || undefined,
          total_unit: req.body.total_unit || undefined,
          origin_price: req.body.origin_price || undefined,
          date_delivery: req.body.date_delivery || undefined,
          date_paid: req.body.date_paid || undefined,
          status: req.body.status || undefined,
          amount_billing: req.body.amount_billing || undefined,
          amount_paid: req.body.amount_paid || undefined,
          description: req.body.description || undefined
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

  static async deleteTransaction (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      if (req.params.id) {
        await transactionQuery.delete({
          transaction,
          where: {
            id: req.params.id
          }
        });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[TransactionService][deleteTransaction]', error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }
}
