import { Sequelize } from 'sequelize';

const DB_NAME: string = process.env.DB_NAME;
const DB_USER: string = process.env.DB_USER;
const DB_PASS: string = process.env.DB_PASS;
const DB_HOST: string = process.env.DB_HOST;
const DB_PORT: string = process.env.DB_PORT;

export const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASS,
  {
    host: DB_HOST,
    port: parseInt(DB_PORT),
    logging: false,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 5000,
      idle: 60000
    },
    dialectOptions: {
      application_name: 'backend-morgan'
    }
  }
);
