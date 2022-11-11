import { CashbookModel } from '../model/index';
import { sequelize } from '../init';

import { queryPayload } from '../../helper/QueryPayload';
require('../model/associations/index');

class CashbookQuery {
  async find (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await CashbookModel.findAndCountAll(options);
  }

  async findAndCountAll (payload: queryPayload) {
    const options: any = ({
      ...payload
    });
    return await CashbookModel.findAndCountAll(options);
  }

  async update (value: any, payload: any) {
    const options: any = ({ ...payload });
    return await CashbookModel.update(value, options);
  }

  async insert (value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await CashbookModel.create(value, options);
  }

  async delete (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await CashbookModel.destroy(options);
  }
}

export const cashbookQuery = new CashbookQuery();
