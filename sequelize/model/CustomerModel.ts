import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const CustomerModel = sequelize.define('t_customer', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
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
  tableName: 't_customer',
  createdAt: false,
  updatedAt: false
});
