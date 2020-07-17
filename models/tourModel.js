const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Tour must have a name.'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'A Tour must have a durations.'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A Tour must have a maxGroupSize.'],
  },
  difficulty: {
    type: String,
    required: [true, 'A Tour must have a diffiingAverageult.'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A Tour must have a price.'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: [true, 'A tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A Tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
