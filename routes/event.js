var express = require('express');
const { adminMiddleware } = require("../middleware/Middleware");
const { getAllEvents, createEvent, cancelEvent, deleteEvent, editEvent, getAllEventsByCreator } = require('../controllers/eventContoller');
const { storage, profileFilter } = require("../config/multer");
const multer = require("multer");
const upload = multer({ storage, fileFilter: profileFilter, limits: 1024 * 1024 })
var router = express.Router();

// http://localhost:9000/api/event
router.get("/", getAllEvents)

// http://localhost:9000/api/event/event-by-creator
router.get("/event-by-creator", adminMiddleware, getAllEventsByCreator)

// http://localhost:9000/api/event/create
router.post("/create", adminMiddleware, upload.single("thumbnail"), createEvent)

// http://localhost:9000/api/event/:eventId
router.put("/cancel/:eventId", adminMiddleware, cancelEvent)

// http://localhost:9000/api/delete/:eventId
router.put("/delete/:eventId", adminMiddleware, deleteEvent)

// http://localhost:9000/api/edit/:eventId
router.put("/edit/:eventId", adminMiddleware, editEvent)


module.exports = router;
