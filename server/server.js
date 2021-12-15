require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));

// Cloud Mongodb Atlas
require('./db');

// Listen server
const PORT = process.env.PORT || 8800;
app.listen(8800, () => {
  console.log(`Server running on port: ${PORT}`);
});
