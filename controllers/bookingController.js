const bookingModel = require('../model/bookingModel')
const Event = require('../model/eventModel')
const ApiResponse = require("../response")

async function bookEvent(req, res) {
    const { event, number_of_slots } = req.body;

    try {

        let events = await Event.findOne({ _id: event, isCancel: false, isDelete: false });

        if (!events) {
            return res.json(new ApiResponse(false, null, "This Event Is Not Found"))
        }

        let todayTime = Date.now()
        let bookStartTime = new Date(events.booking_start_date)

        if (todayTime < bookStartTime.getTime()) {
            return res.json(new ApiResponse(false, null, "You Can Book ticket before booking start date"))
        }

        if (todayTime > parseInt(events.date) - 1000 * 60 * 60 * 24) {
            return res.json(new ApiResponse(false, null, "Booking Closed"))
        }

        if (!(number_of_slots <= events.slots)) {
            return res.json(new ApiResponse(false, null, `Low Stock Only ${events.slots} Available`))
        }

        if (!(number_of_slots <= 5)) {
            return res.json(new ApiResponse(false, null, "You Can book Only 5 Slots"))
        }

        let booking = await bookingModel.create({
            attendee: req.data._id,
            event,
            number_of_slots,
            receiced_amount: parseInt(number_of_slots) * parseInt(events.per_slot_price)
        })

        if (!booking) {
            return res.json(new ApiResponse(false, null, "your booking is Not Confirmed"))
        }

        await Event.findByIdAndUpdate(events._id, { slots: events.slots - number_of_slots })

        let details = await bookingModel.findById(booking._id).populate("attendee").populate("event")

        return res.json(new ApiResponse(true, details, "your booking Confirmed"))
    } catch (error) {
        return res.json(new ApiResponse(false, error, "Booking failed failed"));
    }
}

async function cancelTicket(req, res) {
    const { bookingId } = req.params;
    try {
        let booking = await bookingModel.findOne({ _id: bookingId, is_cancel: false }).populate("event");

        if (!booking) {
            return res.json(new ApiResponse(false, null, "No Booking ticket found"))
        }

        let todayTime = Date.now()

        if (todayTime > parseInt(booking.event.date) - 1000 * 60 * 60 * 24) {
            return res.json(new ApiResponse(false, null, "You Can Not Cancel Ticket"))
        }

        let updated = await bookingModel.findByIdAndUpdate(bookingId, { is_cancel: true }, { new: true });

        if (!updated) {
            return res.json(new ApiResponse(false, null, "booking cancelled Failed"))
        }

        await Event.findByIdAndUpdate(booking.event._id, { slots: booking.event.slots + booking.number_of_slots })
        return res.json(new ApiResponse(true, updated, "Booking Cancel Success"))

    } catch (error) {
        return res.json(new ApiResponse(false, error, "Error"))
    }
}

// only for users
async function getAllBookings(req, res) {
    try {
        let booking = await bookingModel.find({ attendee: req.data._id }).populate("attendee").populate("event")
        if (!booking) {
            return res.json(new ApiResponse(false, null, "No Bookings Available"))
        }
        return res.json(new ApiResponse(true, booking, "success"))
    } catch (error) {
        return res.json(new ApiResponse(false, error, "server Error"))
    }
}

// only for users
async function getBookedTicketByEvent(req, res) {
    const { eventId } = req.params;
    try {
        let booking = await bookingModel.find({ event: eventId }).populate("attendee")
        if (!booking) {
            return res.json(new ApiResponse(false, null, "No Bookings Available"))
        }
        return res.json(new ApiResponse(true, booking, "success"))
    } catch (error) {
        return res.json(new ApiResponse(false, error, "server Error"))
    }
}

async function deleteEvent(req, res) {
    const { eventId } = req.params;
    try {
        let event = await Event.findByIdAndUpdate(eventId, { isDelete: true }, { new: true })

        if (!event) {
            return res.json(new ApiResponse(false, null, "Event Delete failed"))
        }
        return res.json(new ApiResponse(true, event, "Event Delete Success"))

    } catch (error) {
        return res.json(new ApiResponse(false, error, "Error"))
    }
}

async function editEvent(req, res) {
    const { eventId } = req.params;
    const { title, description, category, slots } = req.body;
    try {

        let event = await Event.findOne({ _id: eventId, isCancel: false, isDelete: false })

        if (!event) {
            return res.json(new ApiResponse(false, null, "Event Not Found"))
        }

        let update = await Event.findByIdAndUpdate(eventId, { title, description, category, slots }, { new: true }).populate("creator")

        if (!update) {
            return res.json(new ApiResponse(false, null, "Event updated failed"))
        }
        return res.json(new ApiResponse(true, update, "Event updated Success"))

    } catch (error) {
        return res.json(new ApiResponse(false, error, "Error"))
    }
}

module.exports = { bookEvent, cancelTicket, getAllBookings, deleteEvent, editEvent, getBookedTicketByEvent }