import { CustomerModel, ProductCustomerModel, ProductModel } from '../model/index';
import { sequelize } from '../init';

import { queryPayload } from '../../helper/QueryPayload';
require('../model/associations/index');

class CustomerQuery {
  async find (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await CustomerModel.findAndCountAll(options);
  }

  async findAndCountAll (payload: queryPayload) {
    const options: any = ({
      ...payload
    });
    return await CustomerModel.findAndCountAll(options);
  }

  async detail (payload: queryPayload) {
    const options: any = ({
      ...payload,
      include: {
        model: ProductCustomerModel,
        required: false,
        include: { model: ProductModel, required: false }
      }
    });
    return await CustomerModel.findAndCountAll(options);
  }

  async update (value: any, payload: any) {
    const options: any = ({ ...payload });
    return await CustomerModel.update(value, options);
  }

  async insert (value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await CustomerModel.create(value, options);
  }
}

export const customerQuery = new CustomerQuery();
