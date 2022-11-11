import express from 'express';

import { isLoggedIn } from '../midleware/middleware';

// Controller
import { cashbookController } from '../controller/CashbookController';
const router = express.Router();

router.post('/cashbook', cashbookController.getCashbook);
router.post('/cashbook/upsert', cashbookController.upsertCashbook);
router.get('/cashbook/delete/:id', cashbookController.deleteCashbook);

// ============================================================================

export default router;
