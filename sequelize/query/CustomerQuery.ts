import { CustomerModel } from '../model/index';
import { sequelize } from '../init';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class CustomerQuery {
  async find (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await CustomerModel.findAndCountAll(options);
  }

  async findAndCountAll (payload: queryPayload) {
    const options: any = ({ ...payload });
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
