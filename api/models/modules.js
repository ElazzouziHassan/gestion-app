const mongoose = require('mongoose');

const schemaModule = new mongoose.Schema({
  nom: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  semestre: { type: String, required: true },
});

const Module = mongoose.model('Module', schemaModule);

module.exports = Module;