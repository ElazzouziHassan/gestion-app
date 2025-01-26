const mongoose = require('mongoose');

const schemaLog = new mongoose.Schema({
  utilisateur: { type: String, required: true },
  action: { type: String, required: true },
  horodatage: { type: Date, default: Date.now },
  details: { type: String },
});

const Log = mongoose.model('Log', schemaLog);

module.exports = Log;