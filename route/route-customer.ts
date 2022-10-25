import express from 'express';

import { isLoggedIn } from '../midleware/middleware';

// Controller
import { customerController } from '../controller/CustomerController';
const router = express.Router();

router.get('/customer', customerController.getCustomer);
router.post('/customer/upsert', customerController.upsertCustomer);

// ============================================================================

export default router;
