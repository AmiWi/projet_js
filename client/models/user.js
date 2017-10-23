var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    "nom": String, 
    "prenom": String, 
});
// je crée un model et j'attache le schema ci dessus
var Users = mongoose.model('Users', userSchema);

module.exports = Users;