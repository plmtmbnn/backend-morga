import { DriverModel, EmployeeModel } from '../model/index';
import { sequelize } from '../init';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class DriverQuery {
  async find (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await DriverModel.findAndCountAll(options);
  }

  async findAndCountAll (payload: queryPayload) {
    const options: any = ({
      ...payload,
      include: [
        {
          model: EmployeeModel,
          required: true
        }
      ]
    });
    return await DriverModel.findAndCountAll(options);
  }

  async update (value: any, payload: any) {
    const options: any = ({ ...payload, returning: true });
    return await DriverModel.update(value, options);
  }

  async insert (value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await DriverModel.create(value, options);
  }
}

export const driverQuery = new DriverQuery();
