import {
  UserModel, CustomerModel, DriverModel, ProductCustomerModel, ProductModel, TruckModel,
  TransactionModel, EmployeeModel, EmployeeSalaryModel
} from '../index';

CustomerModel.hasOne(ProductCustomerModel, { foreignKey: 'customer_id' });
ProductCustomerModel.belongsTo(CustomerModel, { foreignKey: 'customer_id' });

ProductModel.hasOne(ProductCustomerModel, { foreignKey: 'product_id' });
ProductCustomerModel.belongsTo(ProductModel, { foreignKey: 'product_id' });

DriverModel.hasMany(TransactionModel, { foreignKey: 'driver_id' });
TransactionModel.belongsTo(DriverModel, { foreignKey: 'driver_id' });

TruckModel.hasMany(TransactionModel, { foreignKey: 'truck_id' });
TransactionModel.belongsTo(TruckModel, { foreignKey: 'truck_id' });

ProductCustomerModel.hasMany(TransactionModel, { foreignKey: 'customer_product_mapping_id' });
TransactionModel.belongsTo(ProductCustomerModel, { foreignKey: 'customer_product_mapping_id' });

EmployeeModel.hasOne(DriverModel, { foreignKey: 'employee_id' });
DriverModel.belongsTo(EmployeeModel, { foreignKey: 'employee_id' });

EmployeeModel.hasMany(EmployeeSalaryModel, { foreignKey: 'employee_id' });
EmployeeSalaryModel.belongsTo(EmployeeModel, { foreignKey: 'employee_id' });
