import express from 'express';

import { isLoggedIn } from '../midleware/middleware';

// Controller
import { salaryController } from '../controller/SalaryController';
const router = express.Router();

router.post('/salary', salaryController.getSalary);
router.post('/salary/upsert', salaryController.upsertSalary);
router.get('/salary/delete/:id', salaryController.deleteSalary);

// ============================================================================

export default router;
