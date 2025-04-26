import { Request, Response } from 'express';
import Event from '../models/Event'; // Correct import for the Event model

interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

// CREATE Event
export const createEvent = async (req: MulterRequest, res: Response) => {
  try {
    const { name, description, startDate, endDate, location, totalGuests, category } = req.body;
    const images = req.files?.map(file => file.path) || [];

    if (!name || !startDate || !endDate || !location || !totalGuests || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newEvent = new Event({
      name,
      description,
      startDate,
      endDate,
      location,
      totalGuests,
      category,
      images,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error in createEvent:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// GET All Events
export const getAllEvents = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, sortBy = 'name' } = req.query;

  try {
    // Build the sort object based on the sortBy query parameter
    const sortCriteria: any = {};
    if (sortBy === 'name') {
      sortCriteria.name = 1;  // Ascending order for name
    } 

    // Build the filter object based on the category query parameter (if provided)
    const filterCriteria: any = {};
    

    const events = await Event.find(filterCriteria)
      .sort(sortCriteria) // Sort based on the sort criteria
      .skip((Number(page) - 1) * Number(limit)) // Calculate the number of events to skip based on page
      .limit(Number(limit)) // Limit the number of events to fetch
      .exec(); // Execute the query

    const totalEvents = await Event.countDocuments(filterCriteria); // Count the total number of events based on the filter
    const totalPages = Math.ceil(totalEvents / Number(limit)); // Calculate total pages

    // Respond with paginated events and pagination info
    res.status(200).json({
      events,
      totalEvents,
      totalPages,
      currentPage: Number(page),
      perPage: Number(limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// GET Event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// UPDATE Event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { name, description, startDate, endDate, location, totalGuests, category } = req.body;
    const images = (req.files as Express.Multer.File[]).map(file => file.path); 

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        startDate,
        endDate,
        location,
        totalGuests,
        category,
        images,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent); 
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// DELETE Event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id); 

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' }); 
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
