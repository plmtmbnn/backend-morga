import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import {
  driverQuery, truckQuery
} from '../sequelize/query';

import { queryPayload } from 'helper/QueryPayload';

import { sequelize } from '../sequelize/init';

export class DriverTruckService {
  // DRIVER =====================================================

  static async getDriver (req: Request, res: Response): Promise<any> {
    const queryPayload: queryPayload = {
      where: {
        status: true
      },
      order: [['id', 'ASC']]
    };
    const result: any = await driverQuery.findAndCountAll(queryPayload);

    if (result.count === 0) throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    return { data: result.rows };
  }

  static async upsertDriver (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      if (req.body.id) {
        await driverQuery.update(
          {
            fullname: req.body.fullname,
            description: req.body.description,
            position: req.body.position,
            salary: req.body.salary,
            status: req.body.status
          }, {
            transaction,
            where: { id: req.body.id }
          });
      } else {
        await driverQuery.insert({
          fullname: req.body.fullname,
          description: req.body.description,
          position: req.body.position,
          salary: req.body.salary,
          status: req.body.status
        }, {
          transaction
        });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[DriverTruckService][upsertDriver]', error);
    }
  }
  // ============================================================

  // TRUCK =====================================================

  static async getTruck (req: Request, res: Response): Promise<any> {
    const queryPayload: queryPayload = {
      where: {
        status: true
      },
      order: [['id', 'ASC']]
    };
    const result: any = await truckQuery.findAndCountAll(queryPayload);

    if (result.count === 0) throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    return { data: result.rows };
  }

  static async upsertTruck (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      if (req.body.id) {
        await truckQuery.update(
          {
            code: req.body.fullname,
            description: req.body.description,
            name: req.body.name
          }, {
            transaction,
            where: { id: req.body.id }
          });
      } else {
        await truckQuery.insert({
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
      console.log('[DriverTruckService][upsertTruck]', error);
    }
  }
  // ============================================================
}
