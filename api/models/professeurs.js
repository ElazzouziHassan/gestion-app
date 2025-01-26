const mongoose = require('mongoose');

const schemaProfesseur = new mongoose.Schema({
  prenom: { type: String, required: true },
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
  matieres: { type: [String], required: true }, 
  statut: { type: String, enum: ['permanent', 'vacataire'], required: true },
  photoProfil: { type: String }, 
});

const Professeur = mongoose.model('Professeur', schemaProfesseur);

module.exports = Professeur;