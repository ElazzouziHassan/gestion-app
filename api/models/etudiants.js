const mongoose = require('mongoose');

const schemaEtudiant = new mongoose.Schema({
  prenom: { type: String, required: true },
  nom: { type: String, required: true },
  numeroEtudiant: { type: String, required: true, unique: true },
  semestre: { type: String, required: true },
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
});

const Etudiant = mongoose.model('Etudiant', schemaEtudiant);

module.exports = Etudiant;