// mongoose = l'outil qui parle à MongoDB.
// À refaire dans chaque fichier qui en a besoin.
const mongoose = require("mongoose");

// Ici on ÉCRIT la fonction. Elle ne se lance pas toute seule.
// C'est app.js qui la lance.
const connexion = async () => {
  // Ouvre la connexion vers ton cluster Atlas.
  // L'adresse est lue dans env/.env, pas écrite ici.
  // await = attendre la réponse avant de passer à la ligne suivante.
  await mongoose.connect(process.env.URL_MONGO);
  // Le mot que tu as vu dans ton terminal quand ça a marché.
  console.log("reussi");
};

// On la partage, sinon app.js ne peut pas la voir.
module.exports = connexion;
