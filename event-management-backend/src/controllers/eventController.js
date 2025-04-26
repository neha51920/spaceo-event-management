"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getAllEvents = exports.createEvent = void 0;
const Event_1 = __importDefault(require("../models/Event")); // Correct import for the Event model
// CREATE Event
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, description, startDate, endDate, location, totalGuests, category } = req.body;
        const images = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.map(file => file.path)) || [];
        if (!name || !startDate || !endDate || !location || !totalGuests || !category) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newEvent = new Event_1.default({
            name,
            description,
            startDate,
            endDate,
            location,
            totalGuests,
            category,
            images,
        });
        yield newEvent.save();
        res.status(201).json(newEvent);
    }
    catch (error) {
        console.error('Error in createEvent:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createEvent = createEvent;
// GET All Events
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, sortBy = 'name' } = req.query;
    try {
        // Build the sort object based on the sortBy query parameter
        const sortCriteria = {};
        if (sortBy === 'name') {
            sortCriteria.name = 1; // Ascending order for name
        }
        // Build the filter object based on the category query parameter (if provided)
        const filterCriteria = {};
        const events = yield Event_1.default.find(filterCriteria)
            .sort(sortCriteria) // Sort based on the sort criteria
            .skip((Number(page) - 1) * Number(limit)) // Calculate the number of events to skip based on page
            .limit(Number(limit)) // Limit the number of events to fetch
            .exec(); // Execute the query
        const totalEvents = yield Event_1.default.countDocuments(filterCriteria); // Count the total number of events based on the filter
        const totalPages = Math.ceil(totalEvents / Number(limit)); // Calculate total pages
        // Respond with paginated events and pagination info
        res.status(200).json({
            events,
            totalEvents,
            totalPages,
            currentPage: Number(page),
            perPage: Number(limit),
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getAllEvents = getAllEvents;
// GET Event by ID
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.default.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getEventById = getEventById;
// UPDATE Event
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, startDate, endDate, location, totalGuests, category } = req.body;
        const images = req.files.map(file => file.path);
        const updatedEvent = yield Event_1.default.findByIdAndUpdate(req.params.id, {
            name,
            description,
            startDate,
            endDate,
            location,
            totalGuests,
            category,
            images,
        }, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateEvent = updateEvent;
// DELETE Event
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedEvent = yield Event_1.default.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.deleteEvent = deleteEvent;
