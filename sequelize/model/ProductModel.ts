import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const ProductModel = sequelize.define('t_product', {
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
  unit: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: literal('M3')
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  underscored: true,
  tableName: 't_product',
  createdAt: true,
  updatedAt: true
});
