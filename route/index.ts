import express, { NextFunction, Request, Response } from 'express';

// Controller
import { syncController } from '../controller/SyncController';
const router = express.Router();

// health check endpoint
router.get(['/health', '/'], (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Backend API is live.'
  });
});

router.get('/sync-db', syncController.syncDatabase);

// Return 404 to all unidentified path URLs
router.get('*', function (req: Request, res: Response) {
  res.status(404).json();
});
router.post('*', function (req: Request, res: Response) {
  res.status(404).json();
});

export default router;
