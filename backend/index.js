require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Import routers
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const societyRoutes = require('./routes/societyRoutes');
const houseRoutes = require('./routes/houseRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const staffRoutes = require('./routes/staffRoutes');
const petRoutes = require('./routes/petRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const facilityRoutes = require('./routes/facilityRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const blogRoutes = require('./routes/blogRoutes');
const pollRoutes = require('./routes/pollRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const authRoutes = require('./routes/authRoutes'); // If using

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/societies', societyRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });