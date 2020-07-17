const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');

dotenv.config({ path: './config.env' });
const app = express();
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tourRoute = require('./routers/tourRouter');
const userRoute = require('./routers/userRouter');
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

module.exports = app;
