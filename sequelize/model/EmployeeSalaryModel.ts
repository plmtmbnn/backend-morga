import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const EmployeeSalaryModel = sequelize.define('t_employee_salary', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: literal('uuid_generate_v1()')
  },
  payment_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  payment_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  delivery_total: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fuel_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fuel_price: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fuel_amount: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  order: {
    type: DataTypes.SMALLINT,
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
  tableName: 't_employee_salary',
  createdAt: false,
  updatedAt: false
});
