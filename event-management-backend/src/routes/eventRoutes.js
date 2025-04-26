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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const eventController_1 = require("../controllers/eventController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post('/', authMiddleware_1.authenticateUser, upload.array('images'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const multerReq = req;
    yield (0, eventController_1.createEvent)(multerReq, res);
}));
// GET All Events
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, eventController_1.getAllEvents)(req, res);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
// GET Event by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, eventController_1.getEventById)(req, res);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
// UPDATE Event by ID
router.put('/:id', authMiddleware_1.authenticateUser, upload.array('images'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, eventController_1.updateEvent)(req, res);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
// DELETE Event by ID
router.delete('/:id', authMiddleware_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, eventController_1.deleteEvent)(req, res);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
// Export the router for use in the server file
exports.default = router;
