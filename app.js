const dotenv = require('dotenv');
const express = require('express');
const AppErr = require('./utils/appErr');
const globalErrorHandler = require('./controllers/errorControler');
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

//Handling UnHandled Router
app.all('*', (req, res, next) => {
  next(new AppErr(`Can't find result in router ${req.originalUrl}`, 404));
});
//Implementing a Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
