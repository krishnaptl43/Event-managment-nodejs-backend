const Event = require('../model/eventModel')
const ApiResponse = require("../response")

async function createEvent(req, res) {
    const { title, description, date, time, category, slots, price, venue, booking_start_date } = req.body

    let timeStr = new Date(date)
    let bookDate = new Date(booking_start_date)
    let today = Date.now()

    if (today >= timeStr.getTime()) {
        return res.json(new ApiResponse(false, null, "! Invalid Date , event can Create Past Date"))
    }

    if (today >= bookDate.getTime()) {
        return res.json(new ApiResponse(false, null, "booking Date must be After 15 Days Of Event Creation"))
    }

    const url = `${req.protocol}://${req.host}/${req.file.path?.replaceAll("\\", "/")}`

    try {

        let event = await Event.create({
            title,
            description,
            date: timeStr.getTime(),
            time,
            category,
            slots,
            per_slot_price: price,
            venue,
            booking_start_date,
            creator: req.data._id,
            thumbnail: url
        })

        if (!event) {
            return res.json(new ApiResponse(false, null, "event create failed"))
        }
        return res.json(new ApiResponse(true, event, "event Created"))
    } catch (error) {
        return res.json(new ApiResponse(false, error, "event created failed"));
    }
}

async function cancelEvent(req, res) {
    const { eventId } = req.params;
    const { message } = req.body;
    try {
        let event = await Event.findOneAndUpdate({ _id: eventId, creator: req.data._id }, { isCancel: true, cancel_message: message }, { new: true })

        if (!event) {
            return res.json(new ApiResponse(false, null, "Event Cancel failed"))
        }
        return res.json(new ApiResponse(true, event, "Event Cancel Success"))

    } catch (error) {
        return res.json(new ApiResponse(false, error, "Error"))
    }
}

async function getAllEvents(req, res) {
    try {
        let event = await Event.find({ isDelete: false })
        if (!event) {
            return res.json(new ApiResponse(false, null, "event Not Found"))
        }
        return res.json(new ApiResponse(true, event, "success"))
    } catch (error) {
        return res.json(new ApiResponse(false, error, "server Error"))
    }
}

async function getAllEventsByCreator(req, res) {
    try {
        let event = await Event.find({ creator: req.data._id, isDelete: false })
        if (!event) {
            return res.json(new ApiResponse(false, null, "event Not Found"))
        }
        return res.json(new ApiResponse(true, event, "success"))
    } catch (error) {
        return res.json(new ApiResponse(false, error, "server Error"))
    }
}

async function deleteEvent(req, res) {
    const { eventId } = req.params;
    try {
        let event = await Event.findOneAndUpdate({ _id: eventId, creator: req.data._id }, { isDelete: true }, { new: true })

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

        let update = await Event.findOneAndUpdate({ _id: eventId, isCancel: false, isDelete: false, creator: req.data._id }, { title, description, category, slots }, { new: true }).populate("creator")

        if (!update) {
            return res.json(new ApiResponse(false, null, "Event Not Found"))
        }

        return res.json(new ApiResponse(true, update, "Event updated Success"))

    } catch (error) {
        return res.json(new ApiResponse(false, error, "Error"))
    }
}

module.exports = { createEvent, cancelEvent, getAllEvents, deleteEvent, editEvent, getAllEventsByCreator }