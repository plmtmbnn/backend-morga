import { TruckModel } from '../model/index';
import { sequelize } from '../init';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class TruckQuery {
  async find (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await TruckModel.findAndCountAll(options);
  }

  async findAndCountAll (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await TruckModel.findAndCountAll(options);
  }

  async update (value: any, payload: any) {
    const options: any = ({ ...payload });
    return await TruckModel.update(value, options);
  }

  async insert (value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await TruckModel.create(value, options);
  }
}

export const truckQuery = new TruckQuery();
