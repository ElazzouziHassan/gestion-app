const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://ezhassaninfo:kVMkWya76jd9vBRz@cluster0.xfbdr.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Base de données connectée avec succès.");
  })
  .catch((error) => {
    console.log("Échec de la connexion à la base de données : ", error);
  });

app.listen(port, () => {
  console.log("Le serveur est opérationnel sur le port 8000.");
});
