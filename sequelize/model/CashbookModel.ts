import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const CashbookModel = sequelize.define('t_cashbook', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: literal('uuid_generate_v1()')
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  receipter_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  amount: {
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
  tableName: 't_cashbook',
  createdAt: false,
  updatedAt: false
});
