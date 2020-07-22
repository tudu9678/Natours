const Tour = require('../../models/tourModel');
const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connect MongoDB successful !'));

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
//---Import data
const importData = async (req, res) => {
  try {
    await Tour.create(data).then(() => console.log('Import Data successfully'));
  } catch (err) {
    console.log(err);
  }
};
//---Delete old data
const deleteAll = async (req, res) => {
  try {
    await Tour.deleteMany().then(() =>
      console.log('Delete All Data successfully')
    );
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteAll();
}
console.log(process.argv);
