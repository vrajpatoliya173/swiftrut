const Event = require('../models/event.model');
const User = require('../models/user.model');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

module.exports.createEvent = async (req, res) => {
    try {
        var img = ""
        if(req.file){
            const userId = req.user._id;
            img = Event.ipath + '/' + req.file.filename;
            req.body.createAt = moment().format('LLL');
            req.body.updateAt = moment().format('LLL');
            req.body.image = img;
            req.body.userId = userId;
            const validStatuses = ['Going', 'Maybe', 'Not Going'];
            if(!validStatuses.includes(req.body.attendees.status)){
                return res.status(400).json({ msg: 'Invalid status in attendees. Allowed values: Going, Maybe, Not Going', status: 0, response: 'error' });
            }
            const createEvent = await Event.create(req.body);
            if(createEvent){
                return res.status(200).json({ msg: 'Event created successfully', status: 1, response: 'success', YourEvent: createEvent });
            }
            else{
                return res.status(400).json({ msg: 'Event is not created!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'File is not found', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getallEvents = async (req, res) => {
    try {
        const allevents = await Event.find({userId: req.user._id}).sort({_id: -1});
        if(allevents){
            return res.status(200).json({ msg: 'Your all Events', status: 1, response: 'success', AllEvents: allevents });
        }
        else{
            return res.status(400).json({ msg: 'Events are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.updateEvent = async (req, res) => {
    try {
        if(req.file){
            const eventdata = await Event.findById(req.params.id);
            var imgpath = path.join(__dirname,'..',eventdata.image);
            if(fs.existsSync(imgpath)){
                fs.unlinkSync(imgpath);
            }
            req.body.image = Event.ipath + '/' + req.file.filename;
            req.body.updateAt = moment().format('LLL');
            const updateEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updateEvent){
                return res.status(200).json({ msg: 'Event updated successfully', status: 1, response: 'success', UpdatedEvent: updateEvent });
            }
            else{
                return res.status(400).json({ msg: 'Event is not updated!!', status: 0, response: 'error' });
            }
        }
        else{
            const eventdata = await Event.findById(req.params.id);
            req.body.image = eventdata.image;
            const updateEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updateEvent){
                return res.status(200).json({ msg: 'Event updated successfully', status: 1, response: 'success', UpdatedEvent: updateEvent });
            }
            else{
                return res.status(400).json({ msg: 'Event is not updated!!', status: 0, response: 'error' });
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.removeEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const findevent = await Event.findById(id);
        var imgpath = path.join(__dirname, '..', findevent.image);
        fs.unlinkSync(imgpath);
        const rmvevent = await Event.findByIdAndDelete(id);
        if(rmvevent){
            return res.status(200).json({ msg: 'Event is deleted successfully', status: 1, response: 'success' });
        }
        else{
            return res.status(400).json({ msg: 'Event is not deleted!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.addtoimportant = async (req, res) => {
    try {
        const eventdata = await Event.findById(req.params.id);
        const importantevent = eventdata.important;
        const updateEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {important: !importantevent});
        if(updateEvent){
            return res.status(200).json({ msg: 'Event is add to important', status: 1, response: 'success' });
        }
        else{
            return res.status(400).json({ msg: 'Event is not add to important!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getEvent = async (req, res) => {
    try {
        const findimpevent = await Event.find({important: true}).sort({_id: -1});
        if(findimpevent){
            return res.status(200).json({ msg: 'Your all important events', status: 1, response: 'success', importEvents: findimpevent });
        }
        else{
            return res.status(400).json({ msg: 'No important events!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.eventbylocation = async (req, res) => {
    try {
        const eventbylocation = await Event.find({
            location: { $regex: new RegExp(req.params.location, 'i') }
        }).sort({_id: -1});

        if (eventbylocation.length === 0) {
            return res.status(200).json({ msg: 'No location found for this location', status: 1, response: 'success', Event_By_location: [] });
        }

        if(eventbylocation){
            return res.status(200).json({ msg: 'Your all events by locations', status: 1, response: 'success', Event_By_location: eventbylocation });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.eventbytype = async (req, res) => {
    try {
        const eventbytype = await Event.find({
            type: { $regex: new RegExp(req.params.type, 'i') }
        }).sort({_id: -1});

        if (eventbytype.length === 0) {
            return res.status(200).json({ msg: 'No events found for this event-type', status: 1, response: 'success', Event_By_EventType: [] });
        }

        if(eventbytype){
            return res.status(200).json({ msg: 'Your all events by event-types', status: 1, response: 'success', Event_By_EventType: eventbytype });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.eventbydate = async (req, res) => {
    try {
        const eventbydate = await Event.find({
            date: { $regex: new RegExp(req.params.date, 'i') }
        }).sort({_id: -1});

        if (eventbydate.length === 0) {
            return res.status(200).json({ msg: 'No events found for this date', status: 1, response: 'success', Event_By_EventType: [] });
        }

        if(eventbydate){
            return res.status(200).json({ msg: 'Your all events for this date', status: 1, response: 'success', Event_By_Date: eventbydate });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}
