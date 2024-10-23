// routes/event.js
const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Tạo sự kiện mới
router.post('/', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: 'Error creating event' });
    }
});

// Lấy danh sách sự kiện
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
    }
});

module.exports = router;
