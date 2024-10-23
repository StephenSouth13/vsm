const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    distance: { type: Number, required: true },
});

const EventModel = mongoose.model('Event', eventSchema);
module.exports = EventModel;
