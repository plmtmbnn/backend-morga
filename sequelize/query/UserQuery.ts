import {
  UserModel, DriverModel, ProductModel, TruckModel,
  CustomerModel, ProductCustomerModel, TransactionModel,
  EmployeeModel, EmployeeSalaryModel
} from '../model/index';
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
      // await UserModel.sync({ force: true });
      // await ProductModel.sync({ force: true });
      // await TruckModel.sync({ force: true });
      // await DriverModel.sync({ force: true });
      // await EmployeeModel.sync({ force: true });
      await EmployeeSalaryModel.sync({ force: true });
      // await DriverModel.sync({ force: true });
      // await CustomerModel.sync({ force: true });
      // await ProductCustomerModel.sync({ force: true });
      // await TransactionModel.sync({ force: true });
    } catch (error) {
      console.log('[UserQuery][syncAllTable] error', error);
    }
  }
}

export const userQuery = new UserQuery();
