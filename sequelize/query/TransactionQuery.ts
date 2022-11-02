import { CustomerModel, DriverModel, ProductCustomerModel, ProductModel, TransactionModel, TruckModel } from '../model/index';
import { sequelize } from '../init';

import { queryPayload } from '../../helper/QueryPayload';
require('../model/associations/index');

class TransactionQuery {
  async find (payload: queryPayload) {
    const options: any = ({ ...payload });
    return await TransactionModel.findAndCountAll(options);
  }

  async findAndCountAll (payload: queryPayload) {
    const options: any = ({
      ...payload
    });
    return await TransactionModel.findAndCountAll(options);
  }

  async detail (payload: queryPayload) {
    const options: any = ({
      ...payload,
      include: [{
        model: ProductCustomerModel,
        required: false,
        include: [
          { model: ProductModel, required: true },
          { model: CustomerModel, required: true }
        ]
      },
      { model: DriverModel, required: true },
      { model: TruckModel, required: true }
      ]
    });
    return await TransactionModel.findAndCountAll(options);
  }

  async update (value: any, payload: any) {
    const options: any = ({ ...payload });
    return await TransactionModel.update(value, options);
  }

  async insert (value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await TransactionModel.create(value, options);
  }
}

export const transactionQuery = new TransactionQuery();
