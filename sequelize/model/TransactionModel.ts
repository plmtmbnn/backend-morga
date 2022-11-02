import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const TransactionModel = sequelize.define('t_transaction', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: literal('uuid_generate_v1()')
  },
  customer_product_mapping_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  truck_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  driver_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  total_unit: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  origin_price: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  date_delivery: {
    type: DataTypes.DATE,
    allowNull: true
  },
  date_paid: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  amount_billing: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  amount_paid: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
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
  tableName: 't_transaction',
  createdAt: false,
  updatedAt: false
});
