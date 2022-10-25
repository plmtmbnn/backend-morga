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
  }
}, {
  underscored: true,
  tableName: 't_customer',
  createdAt: true,
  updatedAt: true
});
