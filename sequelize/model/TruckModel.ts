import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const TruckModel = sequelize.define('t_truck', {
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
  code: {
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
  }
}, {
  underscored: true,
  tableName: 't_truck',
  createdAt: true,
  updatedAt: true
});
