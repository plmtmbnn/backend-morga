import { EmployeeModel } from '../model/index';
import { sequelize } from '../init';

import { queryPayload } from '../../helper/QueryPayload';
require('../model/associations/index');

class EmployeeQuery {
  async find (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await EmployeeModel.findAndCountAll(options);
  }

  async findAndCountAll (payload: queryPayload) {
    const options: any = ({
      ...payload
    });
    return await EmployeeModel.findAndCountAll(options);
  }

  async update (value: any, payload: any) {
    const options: any = ({ ...payload });
    return await EmployeeModel.update(value, options);
  }

  async insert (value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await EmployeeModel.create(value, options);
  }

  async delete (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await EmployeeModel.destroy(options);
  }
}

export const employeeQuery = new EmployeeQuery();
