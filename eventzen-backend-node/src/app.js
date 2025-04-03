const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');

// routes
const bookingRoutes = require('./routes/booking.routes');
const paymentRoutes = require('./routes/payment.routes');
const attendeeRoutes = require('./routes/attendee.routes');
const feedbackRoutes = require('./routes/feedback.routes');

const app = express();

// middleware 
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// connect to Mongodb
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('err'));

//routes 

app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/attendees', attendeeRoutes);
app.use('/api/feedback', feedbackRoutes);

app.get('/', (req,res) => {
    res.send('EventZen app is running lesgoo');
});

// middleware error handling
app.use((err,req,res,next) =>{
    console.error(err.stack);
    res.status(500).send("broken!!");
});

module.exports = app;

