import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import {
  productCustomerQuery, customerQuery
} from '../sequelize/query';

import { queryPayload } from 'helper/QueryPayload';

import { sequelize } from '../sequelize/init';

export class CustomerService {
  // CUSTOMER =====================================================
  static async getCustomerDetail (req: Request, res: Response): Promise<any> {
    try {
      const queryPayload: queryPayload = {
        order: [['id', 'ASC']],
        where: { id: req.params.id }
      };
      const result: any = await customerQuery.detail(queryPayload);
      const data: any [] = [];
      Array(...result.rows).map((e, index) => {
        const obj: any = e.toJSON();
        return data.push(obj);
      });
      return { data };
    } catch (error) {
      console.log('[CustomerService][getCustomerDetail]', error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }

  static async getCustomer (req: Request, res: Response): Promise<any> {
    try {
      const queryPayload: queryPayload = {
        order: [['id', 'ASC']],
        attributes: ['id', 'name', 'address', 'description']
      };
      const result: any = await customerQuery.findAndCountAll(queryPayload);
      const data: any [] = [];
      Array(...result.rows).map((e, index) => {
        const obj: any = e.toJSON();
        return data.push(obj);
      });
      return { data };
    } catch (error) {
      console.log('[CustomerService][getCustomer]', error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }

  static async upsertCustomer (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      if (req.body.id) {
        await customerQuery.update(
          {
            name: req.body.name,
            description: req.body.description,
            address: req.body.address
          }, {
            transaction,
            where: { id: req.body.id }
          });
      } else {
        await customerQuery.insert({
          name: req.body.name,
          description: req.body.description,
          address: req.body.address
        }, {
          transaction
        });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[CustomerService][upsertCustomer]', error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }
  // ============================================================

  // CUSTOMER PRODUCT MAPPING =====================================================

  static async getCustomerProduct (req: Request, res: Response): Promise<any> {
    const queryPayload: queryPayload = {
      order: [['id', 'ASC']],
      attributes: ['id', 'customer_id', 'product_id', 'price']
    };
    const result: any = await productCustomerQuery.findAndCountAll(queryPayload);
    return { data: result.rows };
  }

  static async upsertCustomerProduct (req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      if (req.body.id) {
        await productCustomerQuery.update(
          {
            product_id: req.body.product_id,
            customer_id: req.body.customer_id,
            price: req.body.price
          }, {
            transaction,
            where: { id: req.body.id }
          });
      } else {
        await productCustomerQuery.insert({
          product_id: req.body.product_id,
          customer_id: req.body.customer_id,
          price: req.body.price
        }, {
          transaction
        });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[CustomerService][upsertCustomerProduct]', error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }
  // ============================================================
}
