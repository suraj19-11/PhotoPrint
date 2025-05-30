// ... other required imports above
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('Welcome to Photo Order Printing');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
