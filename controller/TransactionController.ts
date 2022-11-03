import { Request, Response } from 'express';
import { TransactionService } from '../service/TransactionService';
import { ResponseHandler } from '../helper/ResponseHandler';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import Joi from 'joi';

export class TransactionController {
  async getTransaction (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        id: Joi.string().uuid().optional(),
        truck_id: Joi.number().optional(),
        driver_id: Joi.number().optional(),
        customer_product_mapping_id: Joi.number().optional(),
        date_delivery: Joi.array().optional(),
        date_paid: Joi.date().optional(),
        status: Joi.string().allow('LUNAS', 'BELUM LUNAS', null).optional()
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
        const result: any = await TransactionService.getTransaction(req, res);
        ResponseHandler.send(res, result);
      }
    } catch (error) {
      console.log('[TransactionController][getTransaction]', error);
      ResponseHandler.send(res, error, true);
    }
  }

  async upsertTransaction (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        id: Joi.string().uuid().optional(),
        customer_product_mapping_id: Joi.number().required(),
        truck_id: Joi.number().required(),
        driver_id: Joi.number().required(),
        total_unit: Joi.number().required(),
        origin_price: Joi.number().required(),
        date_delivery: Joi.date().required(),
        date_paid: Joi.date().optional(),
        status: Joi.string().required(),
        amount_billing: Joi.number().required(),
        amount_paid: Joi.number().optional(),
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
        const result: any = await TransactionService.upsertTransaction(req, res);
        ResponseHandler.send(res, result);
      }
    } catch (error) {
      console.log('[TransactionController][upsertTransaction]', error);
      ResponseHandler.send(res, error, true);
    }
  }
}

export const transactionController = new TransactionController();
