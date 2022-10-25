import express, { NextFunction, Request, Response } from 'express';

import { isLoggedIn } from '../midleware/middleware';

// Controller
import { authController } from '../controller/AuthController';
const router = express.Router();

router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.get('/user', authController.getListUser);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// ============================================================================

export default router;
