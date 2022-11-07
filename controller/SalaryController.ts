import { Request, Response } from 'express';
import { SalaryService } from '../service/SalaryService';
import { ResponseHandler } from '../helper/ResponseHandler';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import Joi from 'joi';

export class SalaryController {
  async getSalary (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        employee_id: Joi.number().optional(),
        status: Joi.string().optional(),
        payment_date: Joi.array().optional()
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
        const result: any = await SalaryService.getSalary(req, res);
        ResponseHandler.send(res, result);
      }
    } catch (error) {
      console.log('[SalaryController][getSalary]', error);
      ResponseHandler.send(res, error, true);
    }
  }

  async upsertSalary (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        id: Joi.string().optional(),
        employee_id: Joi.number().required(),
        status: Joi.string().optional(),
        amount: Joi.number().optional(),
        payment_name: Joi.string().optional(),
        payment_date: Joi.string().optional(),
        payment_type: Joi.string().optional(),
        fuel_type: Joi.string().optional(),
        fuel_price: Joi.number().optional(),
        fuel_amount: Joi.number().optional(),
        order: Joi.number().optional(),
        delivery_total: Joi.number().optional(),
        description: Joi.string().optional()
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
        const result: any = await SalaryService.upsertSalary(req, res);
        ResponseHandler.send(res, result);
      }
    } catch (error) {
      console.log('[SalaryController][upsertSalary]', error);
      ResponseHandler.send(res, error, true);
    }
  }

  async deleteSalary (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await SalaryService.deleteSalary(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      console.log('[SalaryController][deleteSalary]', error);
      ResponseHandler.send(res, error, true);
    }
  }
}

export const salaryController = new SalaryController();
