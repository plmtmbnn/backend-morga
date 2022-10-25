import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const DriverModel = sequelize.define('t_driver', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  position: {
    type: DataTypes.STRING,
    allowNull: true
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: literal('NOW()')
  }
}, {
  underscored: true,
  tableName: 't_driver',
  createdAt: true,
  updatedAt: true
});
