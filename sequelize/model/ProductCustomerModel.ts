import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const ProductCustomerModel = sequelize.define('t_customer_product_mapping', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  underscored: true,
  tableName: 't_customer_product_mapping',
  createdAt: true,
  updatedAt: true
});
