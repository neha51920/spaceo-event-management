import express, { Request, Response } from 'express';
import multer from 'multer';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/eventController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

router.post('/', authenticateUser, upload.array('images'), async (req: Request, res: Response, next: NextFunction) => {
  const multerReq = req as MulterRequest;
  await createEvent(multerReq, res);
});

// GET All Events
router.get('/', async (req: Request, res: Response) => {
  try {
    await getAllEvents(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET Event by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    await getEventById(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// UPDATE Event by ID
router.put('/:id', authenticateUser, upload.array('images'), async (req: Request, res: Response) => {
  try {
    await updateEvent(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE Event by ID
router.delete('/:id', authenticateUser, async (req: Request, res: Response) => {
  try {
    await deleteEvent(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Export the router for use in the server file
export default router;
