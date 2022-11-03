import express from 'express';

import { isLoggedIn } from '../midleware/middleware';

// Controller
import { transactionController } from '../controller/TransactionController';
const router = express.Router();

router.post('/transaction', transactionController.getTransaction);
router.post('/transaction/upsert', transactionController.upsertTransaction);

// ============================================================================

export default router;
