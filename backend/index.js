const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const examRoutes = require('./routes/examRoute');
const mcqRoutes = require('./routes/mcqRoute');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/exams', examRoutes);
app.use('/api/mcqs', mcqRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
