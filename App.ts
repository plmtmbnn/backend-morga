// route
import router from './route';

// auth
import authRoute from './route/route-auth';
import customerRoute from './route/route-customer';
import driverTruckRoute from './route/route-driver-truck';
import productRoute from './route/route-product';

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

      this.app.use('/', router);

      // var avatarDir = './image/avatar';
      // var newsDir = './image/news';

      // if (!fs.existsSync(avatarDir)){
      //     fs.mkdirSync(avatarDir, { recursive: true });
      // }
      // if (!fs.existsSync(newsDir)){
      //     fs.mkdirSync(newsDir, { recursive: true });
      // }
    } catch (error) {
      console.log('[App][config] error:', error);
    }
  }
}

export default new App().app;
