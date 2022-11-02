import { Request, Response } from 'express';
import { CustomerService } from '../service/CustomerService';
import { ResponseHandler } from '../helper/ResponseHandler';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import Joi from 'joi';

export class CustomerController {
  async getCustomerDetail (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await CustomerService.getCustomerDetail(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      ResponseHandler.send(res, error, true);
    }
  }

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

  async getCustomerProduct (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        id: Joi.number().optional(),
        product_id: Joi.number().optional(),
        customer_id: Joi.number().optional()
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
        const result: any = await CustomerService.getCustomerProduct(req, res);
        ResponseHandler.send(res, result);
      }
    } catch (error) {
      console.log('[CustomerController][getCustomerProduct]', error);
      ResponseHandler.send(res, error, true);
    }
  }

  async upsertCustomerProduct (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        id: Joi.number().optional(),
        product_id: Joi.number().required(),
        customer_id: Joi.number().required(),
        price: Joi.number().required()
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
        const result: any = await CustomerService.upsertCustomerProduct(req, res);
        ResponseHandler.send(res, result);
      }
    } catch (error) {
      console.log('[CustomerController][upsertCustomerProduct]', error);
      ResponseHandler.send(res, error, true);
    }
  }
}

export const customerController = new CustomerController();
