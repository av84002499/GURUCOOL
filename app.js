const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const urlRoutes = require('./src/routes/urlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017',{
    useNewUrlParser: true,
    useUnifiedTopology : true
});
// Routes
app.use('/auth', authRoutes);
app.use('/url', urlRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
