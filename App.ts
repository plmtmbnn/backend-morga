// route
import router from './route';

// auth
import authRoute from './route/route-auth';
import customerRoute from './route/route-customer';
import driverTruckRoute from './route/route-driver-truck';
import productRoute from './route/route-product';
import transactionRoute from './route/route-transaction';
import salaryRoute from './route/route-salary';
import cashbookRoute from './route/route-cashbook';

import cors from 'cors';
import express from 'express';

import fs from 'fs';

class App {
  app: any;

  constructor () {
    this.app = express().disable('x-powered-by');
    this.config();
  }

  async config (): Promise<void> {
    try {
      this.app.use(cors());
      this.app.use(express.json({ limit: '100mb' }));
      this.app.use(express.urlencoded({ extended: true, limit: '100mb' }));

      this.app.use('/', authRoute);
      this.app.use('/', customerRoute);
      this.app.use('/', driverTruckRoute);
      this.app.use('/', productRoute);
      this.app.use('/', transactionRoute);
      this.app.use('/', salaryRoute);
      this.app.use('/', cashbookRoute);
      this.app.use('/', router);
    } catch (error) {
      console.log('[App][config] error:', error);
    }
  }
}

export default new App().app;
