const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Error = require('../utils/appErr');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new Error(message, 400);
};
const handleDuplicateErrorDB = (err) => {
  const value = err.message.match(/"(.*?[^\\])"/)[1];
  const message = `Duplicated with value : ${value} . Please choose another value.`;
  return new Error(message, 400);
};
const handleValidatorErrorDB = (err) => {
  const errs = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errs.join(',')} `;
  return new Error(message, 400);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};
module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateErrorDB(error);
    if (error.name === 'ValidationError') error = handleValidatorErrorDB(error);
    sendErrorProd(error, res);
  }
};
