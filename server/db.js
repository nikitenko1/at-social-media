const mongoose = require('mongoose');

const URL = process.env.MONGO_URL;
// connect MongoDB Atlas
mongoose.connect(
  URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB Atlas');
  }
);
