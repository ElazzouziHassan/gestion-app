const mongoose = require('mongoose');

const schemaUtilisateur = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  role: { type: String, enum: ['professeur', 'etudiant'], required: true },
  idProfil: { 
    type: mongoose.Schema.Types.ObjectId, 
    refPath: 'role'
  },
});

const Utilisateur = mongoose.model('Utilisateur', schemaUtilisateur);

module.exports = Utilisateur;