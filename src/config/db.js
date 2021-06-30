const mongoose = require('mongoose');
require('dotenv').config();

// mongodb atlas
const db = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = db;
