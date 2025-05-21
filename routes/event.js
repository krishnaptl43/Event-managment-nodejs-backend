var express = require('express');
const { adminMiddleware } = require("../middleware/Middleware");
const { getAllEvents, createEvent, cancelEvent, deleteEvent, editEvent } = require('../controllers/eventContoller');

var router = express.Router();

// http://localhost:9000/api/event
router.get("/", getAllEvents)

// http://localhost:9000/api/event/create
router.post("/create", adminMiddleware, createEvent)

// http://localhost:9000/api/event/:eventId
router.put("/cancel/:eventId", adminMiddleware, cancelEvent)

// http://localhost:9000/api/delete/:eventId
router.put("/delete/:eventId", adminMiddleware, deleteEvent)

// http://localhost:9000/api/edit/:eventId
router.put("/edit/:eventId", adminMiddleware, editEvent)


module.exports = router;
