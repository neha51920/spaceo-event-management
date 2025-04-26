import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      res.status(401).json({ message: 'Authorization token missing' });
      return;  
    }
    
    next(); 
  } catch (error) {
    res.status(500).json({ message: 'Server error during authentication' });
  }
};

