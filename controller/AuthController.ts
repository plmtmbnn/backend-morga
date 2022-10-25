import { Request, Response } from 'express';
import { AuthService } from '../service/AuthService';
import { ResponseHandler } from '../helper/ResponseHandler';
import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import Joi from 'joi';
import formidable from 'formidable';

export class AuthController {
  async login (req: Request, res: Response): Promise<void> {
    const schema: Joi.Schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
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
      await AuthService.login(req, res);
    }
  }

  async register (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        username: Joi.string().required(),
        fullname: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required()
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
        await AuthService.register(req, res);
      }
    } catch (error) {
      console.log('[AuthController][register]', error);
      ResponseHandler.send(res, error, true);
    }
  }
}

export const authController = new AuthController();
