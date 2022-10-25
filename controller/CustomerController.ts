import { Request, Response } from 'express';
import { CustomerService } from '../service/CustomerService';
import { ResponseHandler } from '../helper/ResponseHandler';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import Joi from 'joi';

export class CustomerController {
  async getCustomer (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await CustomerService.getCustomer(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      ResponseHandler.send(res, error, true);
    }
  }

  async upsertCustomer (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
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
        const result: any = await CustomerService.upsertCustomer(req, res);
        ResponseHandler.send(res, result);
      }
    } catch (error) {
      console.log('[CustomerController][upsertCustomer]', error);
      ResponseHandler.send(res, error, true);
    }
  }
}

export const customerController = new CustomerController();
