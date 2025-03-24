const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { validateBusinessInfo } = require('./middlewares/validator');
const cors = require('cors');
const fs = require('fs');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  // if backend/config/config.env exists, use it
  if (fs.existsSync('backend/config/config.env')) {
    require('dotenv').config({ path: 'backend/config/config.env' });
  } else {
    require('dotenv').config();
  }
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
const messageStore = require('./routes/messageStoreRoute');

app.use('/api/user', user);
app.use('/api/product', product);
app.use('/api/order', order);
app.use('/api/payment', payment);
app.use('/api', messageStore);

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
  });
}

module.exports = app;
