import { ProductCustomerModel } from '../model/index';
import { sequelize } from '../init';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class ProductCustomerQuery {
  async find (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await ProductCustomerModel.findAndCountAll(options);
  }

  async findAndCountAll (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await ProductCustomerModel.findAndCountAll(options);
  }

  async update (value: any, payload: any) {
    const options: any = ({ ...payload });
    return await ProductCustomerModel.update(value, options);
  }

  async insert (value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await ProductCustomerModel.create(value, options);
  }
}

export const productCustomerQuery = new ProductCustomerQuery();
