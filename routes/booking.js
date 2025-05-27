var express = require('express');
const { adminMiddleware, userMiddleware } = require("../middleware/Middleware");
const { getAllBookings, bookEvent, getBookedTicketByEvent, cancelTicket } = require('../controllers/bookingController');

var router = express.Router();

// http://localhost:9000/api/booking/
router.get("/", userMiddleware, getAllBookings)

// http://localhost:9000/api/booking/book-ticket
router.post("/book-ticket", userMiddleware, bookEvent)

// http://localhost:9000/api/booking/cancel/
router.put("/cancel/:bookingId", userMiddleware, cancelTicket)

// http://localhost:9000/api/booking/event/:eventId
router.get("/event/:eventId", adminMiddleware, getBookedTicketByEvent)


module.exports = router;
