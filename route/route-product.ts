import express from 'express';

import { isLoggedIn } from '../midleware/middleware';

// Controller
import { productController } from '../controller/ProductController';
const router = express.Router();

router.get('/product', productController.getProduct);
router.post('/product/upsert', productController.upsertProduct);

// ============================================================================

export default router;
