const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    console.log(`Tour id : ${val}`);
    return res.status(404).json({
      status: 'Error',
      message: 'Invalid ID.',
    });
  }
  next();
};
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'not_found',
      message: 'The Tour is not found.',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};
exports.createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const newTour = { id: id, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log(err);
      res.status(201).json({
        status: 'success',
        tour: newTour,
      });
    }
  );
};
exports.updateTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
