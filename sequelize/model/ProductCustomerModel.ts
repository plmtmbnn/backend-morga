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
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: literal('NOW()')
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: literal('NOW()')
  }
}, {
  underscored: false,
  tableName: 't_customer_product_mapping',
  createdAt: false,
  updatedAt: false
});
