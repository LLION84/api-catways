// mongoose = l'outil qui parle à MongoDB.
const mongoose = require("mongoose");

// Les règles d'un utilisateur. Brief section 2.1 : nom, email, mot de passe.
// Si une règle n'est pas respectée, mongoose refuse d'enregistrer.
const userSchema = new mongoose.Schema({
  // type = du texte     required = obligatoire
  name: { type: String, required: true },

  // Sera chiffré par bcrypt avant d'arriver ici.
  password: { type: String, required: true },

  // unique = pas deux fois le même, sinon la connexion se tromperait de compte.
  email: { type: String, required: true, unique: true },
});

// Transforme les règles du dessus en outil utilisable.
// Donne : new User(), User.findOne(), User.findByIdAndUpdate()...
// "User" crée la collection « users » dans la base.
module.exports = mongoose.model("User", userSchema);
