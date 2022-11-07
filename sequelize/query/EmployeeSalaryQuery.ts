import { EmployeeSalaryModel, DriverModel, EmployeeModel } from '../model/index';
import { sequelize } from '../init';

import { queryPayload } from '../../helper/QueryPayload';
require('../model/associations/index');

class EmployeeSalaryQuery {
  async find (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await EmployeeSalaryModel.findAndCountAll(options);
  }

  async findAndCountAll (payload: queryPayload) {
    const options: any = ({
      ...payload,
      include: [{
        model: EmployeeModel,
        required: false,
        include: [{
          model: DriverModel,
          required: false
        }]
      }]
    });
    return await EmployeeSalaryModel.findAndCountAll(options);
  }

  async update (value: any, payload: any) {
    const options: any = ({ ...payload });
    return await EmployeeSalaryModel.update(value, options);
  }

  async insert (value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await EmployeeSalaryModel.create(value, options);
  }

  async delete (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await EmployeeSalaryModel.destroy(options);
  }
}

export const employeeSalaryQuery = new EmployeeSalaryQuery();
