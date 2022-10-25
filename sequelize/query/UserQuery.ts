import { UserModel, DriverModel, ProductModel, TruckModel, CustomerModel, ProductCustomerModel } from '../model/index';
import { sequelize } from '../init';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class UserQuery {
  async find (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await UserModel.findAndCountAll(options);
  }

  async findAndCountAll (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await UserModel.findAndCountAll(options);
  }

  async update (value: any, payload: any) {
    const options: any = ({ ...payload });
    return await UserModel.update(value, options);
  }

  async insert (value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await UserModel.create(value, options);
  }

  async syncAllTable () {
    try {
      await Promise.all([
        // UserModel.sync({ force: true }),
        DriverModel.sync({ force: true }),
        ProductModel.sync({ force: true }),
        TruckModel.sync({ force: true }),
        CustomerModel.sync({ force: true }),
        ProductCustomerModel.sync({ force: true })
      ]);
    } catch (error) {
      console.log('[UserQuery][syncAllTable] error', error);
    }
  }
}

export const userQuery = new UserQuery();
