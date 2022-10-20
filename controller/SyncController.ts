import { Request, Response } from 'express';
import { AuthService } from '../service/AuthService';
import { ResponseHandler } from '../helper/ResponseHandler';

import Joi from "joi";

export class SyncController {
  async syncDatabase (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await AuthService.syncDatabase(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      ResponseHandler.send(res, error, true);
    }
  }
}

export const syncController = new SyncController();
