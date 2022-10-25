import { ProductModel } from '../model/index';
import { sequelize } from '../init';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class ProductQuery {
  async find (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await ProductModel.findAndCountAll(options);
  }

  async findAndCountAll (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await ProductModel.findAndCountAll(options);
  }

  async update (value: any, payload: any) {
    const options: any = ({ ...payload });
    return await ProductModel.update(value, options);
  }

  async insert (value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await ProductModel.create(value, options);
  }
}

export const productQuery = new ProductQuery();
