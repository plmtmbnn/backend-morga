import express from 'express';

import { isLoggedIn } from '../midleware/middleware';

// Controller
import { customerController } from '../controller/CustomerController';
const router = express.Router();

router.get('/customer/detail/:id', customerController.getCustomerDetail);
router.get('/customer', customerController.getCustomer);
router.post('/customer/upsert', customerController.upsertCustomer);

router.post('/customer-product', customerController.getCustomerProduct);
router.post('/customer-product/upsert', customerController.upsertCustomerProduct);

// ============================================================================

export default router;
