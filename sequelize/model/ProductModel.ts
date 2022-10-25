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
    defaultValue: 'M3'
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
  tableName: 't_product',
  createdAt: false,
  updatedAt: false
});
