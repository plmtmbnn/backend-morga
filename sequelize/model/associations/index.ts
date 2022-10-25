import {
  UserModel, CustomerModel, DriverModel, ProductCustomerModel, ProductModel, TruckModel
} from '../index';

CustomerModel.hasOne(ProductCustomerModel, { foreignKey: 'customer_id' });
ProductCustomerModel.belongsTo(CustomerModel, { foreignKey: 'customer_id' });

ProductModel.hasOne(ProductCustomerModel, { foreignKey: 'product_id' });
ProductCustomerModel.belongsTo(ProductModel, { foreignKey: 'product_id' });
