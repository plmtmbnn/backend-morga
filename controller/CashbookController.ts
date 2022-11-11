import { Request, Response } from 'express';
import { CashbookService } from '../service/CashbookService';
import { ResponseHandler } from '../helper/ResponseHandler';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import Joi from 'joi';

export class CashbookController {
  async getCashbook (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        type: Joi.string().optional(),
        date: Joi.array().optional()
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
        const result: any = await CashbookService.getCashbook(req, res);
        ResponseHandler.send(res, result);
      }
    } catch (error) {
      console.log('[CashbookController][getCashbook]', error);
      ResponseHandler.send(res, error, true);
    }
  }

  async upsertCashbook (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        id: Joi.string().optional(),
        name: Joi.string().required(),
        type: Joi.string().required(),
        amount: Joi.number().required(),
        date: Joi.string().required(),
        receipter_name: Joi.string().required(),
        description: Joi.string().required()
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
        const result: any = await CashbookService.upsertCashbook(req, res);
        ResponseHandler.send(res, result);
      }
    } catch (error) {
      console.log('[CashbookController][upsertCashbook]', error);
      ResponseHandler.send(res, error, true);
    }
  }

  async deleteCashbook (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await CashbookService.deleteCashbook(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      console.log('[CashbookController][deleteCashbook]', error);
      ResponseHandler.send(res, error, true);
    }
  }
}

export const cashbookController = new CashbookController();
