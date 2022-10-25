import { Request, Response } from 'express';
import { ProductService } from '../service/ProductService';
import { ResponseHandler } from '../helper/ResponseHandler';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import Joi from 'joi';

export class ProductController {
  async getProduct (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await ProductService.getProduct(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      ResponseHandler.send(res, error, true);
    }
  }

  async addProduct (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        name: Joi.string().required(),
        unit: Joi.string().required(),
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
        const result: any = await ProductService.addProduct(req, res);
        ResponseHandler.send(res, result);
      }
    } catch (error) {
      console.log('[NewsController][addProduct]', error);
      ResponseHandler.send(res, error, true);
    }
  }
}

export const productController = new ProductController();
