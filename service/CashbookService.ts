import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import {
  cashbookQuery
} from '../sequelize/query';

import { queryPayload } from 'helper/QueryPayload';

import { sequelize } from '../sequelize/init';

import moment from 'moment';
import { Op } from 'sequelize';

export class CashbookService {
  static async getCashbook (req: Request, res: Response): Promise<any> {
    const where: any = {};
    if (req.body.type) {
      where.type = req.body.type;
    }
    if (req.body.date && req.body.date?.length === 2) {
      const dateRange: any[] = Array(...req.body.date);
      const startedDate = moment(dateRange[0]).format('YYYY-MM-DD 00:00:00');
      const endDate = moment(dateRange[1]).format('YYYY-MM-DD 23:59:00');
      where.date = { [Op.between]: [startedDate, endDate] };
    }
    const queryPayload: queryPayload = {
      order: [['date', 'DESC']],
      where
    };
    const result: any = await cashbookQuery.findAndCountAll(queryPayload);
    return { data: result.rows };
  }

  static async upsertCashbook (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      if (req.body.id) {
        await cashbookQuery.update({
          name: req.body.name || undefined,
          type: req.body.type || undefined,
          employee_id: req.body.employee_id,
          amount: req.body.amount || undefined,
          date: req.body.date || undefined,
          receipter_name: req.body.receipter_name || undefined,
          description: req.body.description || undefined
        }, {
          transaction,
          where: {
            id: req.body.id
          }
        });
      } else {
        await cashbookQuery.insert({
          name: req.body.name || undefined,
          type: req.body.type || undefined,
          employee_id: req.body.employee_id,
          amount: req.body.amount || undefined,
          date: req.body.date || undefined,
          receipter_name: req.body.receipter_name || undefined,
          description: req.body.description || undefined
        }, {
          transaction
        });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[CashbookService][upsertCashbook]', error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }

  static async deleteCashbook (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      if (req.params.id) {
        await cashbookQuery.delete({
          transaction,
          where: {
            id: req.params.id
          }
        });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[CashbookService][deleteCashbook]', error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }
}
