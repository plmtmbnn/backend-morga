import { Request, Response } from 'express';
import { DriverTruckService } from '../service/DriverTruckService';
import { ResponseHandler } from '../helper/ResponseHandler';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import Joi from 'joi';

export class DriverTruckController {
  async getDriverDetail (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await DriverTruckService.getDriverDetail(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      ResponseHandler.send(res, error, true);
    }
  }

  async getDriver (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await DriverTruckService.getDriver(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      ResponseHandler.send(res, error, true);
    }
  }

  async upsertDriver (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        id: Joi.number().optional(),
        fullname: Joi.string().optional(),
        description: Joi.string().optional(),
        salary: Joi.number().optional(),
        status: Joi.string().optional(),
        address: Joi.string().optional(),
        phone: Joi.string().optional(),
        home_distance: Joi.number().optional(),
        code: Joi.string().optional()
      });

      const validationResult: any = schema.validate(req.body);
      if (
        validationResult.error &&
        validationResult.error.details.length > 0
      ) {
        ResponseHandler.send(res, new CustomException({
          ...EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA,
          error: validationResult.error.details
        }), true);
      } else {
        const result: any = await DriverTruckService.upsertDriver(req, res);
        ResponseHandler.send(res, result);
      }
    } catch (error) {
      console.log('[NewsController][upsertDriver]', error);
      ResponseHandler.send(res, error, true);
    }
  }

  async getTruckDetail (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await DriverTruckService.getTruckDetail(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      ResponseHandler.send(res, error, true);
    }
  }

  async getTruck (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await DriverTruckService.getTruck(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      ResponseHandler.send(res, error, true);
    }
  }

  async upsertTruck (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        id: Joi.number().optional(),
        code: Joi.string().required(),
        description: Joi.string().required(),
        name: Joi.string().required()
      });

      const validationResult: any = schema.validate(req.body);
      if (
        validationResult.error &&
        validationResult.error.details.length > 0
      ) {
        ResponseHandler.send(res, new CustomException({
          ...EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA,
          error: validationResult.error.details
        }), true);
      } else {
        const result: any = await DriverTruckService.upsertTruck(req, res);
        ResponseHandler.send(res, result);
      }
    } catch (error) {
      console.log('[NewsController][upsertTruck]', error);
      ResponseHandler.send(res, error, true);
    }
  }
}

export const driverTruckController = new DriverTruckController();
