import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import {
  employeeSalaryQuery
} from '../sequelize/query';

import { queryPayload } from 'helper/QueryPayload';

import { sequelize } from '../sequelize/init';

import moment from 'moment';
import { Op } from 'sequelize';

export class SalaryService {
  static async getSalary (req: Request, res: Response): Promise<any> {
    const where: any = {};
    if (req.body.employee_id) {
      where.employee_id = req.body.employee_id;
    }
    if (req.body.status) {
      where.status = req.body.status;
    }
    if (req.body.payment_date && req.body.payment_date?.length === 2) {
      const dateRange: any[] = Array(...req.body.payment_date);
      const startedDate = moment(dateRange[0]).format('YYYY-MM-DD 00:00:00');
      const endDate = moment(dateRange[1]).format('YYYY-MM-DD 00:00:00');
      where.payment_date = { [Op.between]: [startedDate, endDate] };
    }
    const queryPayload: queryPayload = {
      order: [['payment_date', 'ASC'], ['order', 'ASC']],
      where
    };
    const result: any = await employeeSalaryQuery.findAndCountAll(queryPayload);
    return { data: result.rows };
  }

  static async upsertSalary (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      if (req.body.id) {
        await employeeSalaryQuery.insert({
          payment_name: req.body.payment_name || undefined,
          status: req.body.status || undefined,
          employee_id: req.body.employee_id,
          amount: req.body.amount || undefined,
          payment_date: req.body.payment_date || undefined,
          order: req.body.order || undefined,
          description: req.body.description || undefined,
          fuel_type: req.body.fuel_type || undefined,
          fuel_price: req.body.fuel_price || undefined,
          fuel_amount: req.body.fuel_amount || undefined,
          delivery_total: req.body.delivery_total || undefined,
          payment_type: req.body.payment_type || undefined
        }, {
          transaction,
          where: {
            id: req.body.id
          }
        });
      } else {
        await employeeSalaryQuery.insert({
          payment_name: req.body.payment_name || undefined,
          status: req.body.status || undefined,
          employee_id: req.body.employee_id,
          amount: req.body.amount || undefined,
          payment_date: req.body.payment_date || undefined,
          order: req.body.order || undefined,
          description: req.body.description || undefined,
          fuel_type: req.body.fuel_type || undefined,
          fuel_price: req.body.fuel_price || undefined,
          fuel_amount: req.body.fuel_amount || undefined,
          delivery_total: req.body.delivery_total || undefined,
          payment_type: req.body.payment_type || undefined
        }, {
          transaction
        });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[SalaryService][addProduct]', error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }

  static async deleteSalary (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      if (req.params.id) {
        await employeeSalaryQuery.delete({
          transaction,
          where: {
            id: req.params.id
          }
        });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[SalaryService][deleteSalary]', error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }
}
