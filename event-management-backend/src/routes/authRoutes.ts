import express, { Request, Response } from 'express';
import { signupUser, loginUser } from '../controllers/authController';

const router = express.Router();

// User signup route
router.post('/signup', async (req: Request, res: Response) => {
  try {
    await signupUser(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User login route
router.post('/login', async (req: Request, res: Response) => {
  try {
    await loginUser(req, res); 
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
