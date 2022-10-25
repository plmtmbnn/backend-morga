import express from 'express';

import { isLoggedIn } from '../midleware/middleware';

// Controller
import { driverTruckController } from '../controller/DriverTruckController';
const router = express.Router();

router.get('/driver', driverTruckController.getDriver);
router.post('/driver/upsert', driverTruckController.upsertDriver);

router.get('/truck', driverTruckController.getTruck);
router.post('/truck/upsert', driverTruckController.upsertTruck);

// ============================================================================

export default router;
