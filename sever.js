// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Để phục vụ file HTML và CSS từ thư mục 'public'

// Kết nối tới MongoDB
mongoose.connect('mongodb://localhost:27017/vsm', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Mô hình sự kiện
const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    distance: { type: Number, required: true },
});

const EventModel = mongoose.model('Event', eventSchema);

// Mô hình người đăng ký
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
});

const RegistrationModel = mongoose.model('Registration', registrationSchema);

// API đăng ký
app.post('/api/register', async (req, res) => {
    const { name, email, phone, eventId } = req.body;
    
    const registration = new RegistrationModel({ name, email, phone, eventId });
    await registration.save();
    
    res.status(201).send('Đăng ký thành công');
});

// API lấy kết quả chạy
app.get('/api/results', async (req, res) => {
    const results = await RegistrationModel.find().populate('eventId');
    res.json(results);
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
