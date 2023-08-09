const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: { type: String, require: true },
  author: { type: String, require: true },
  imageUrl: { type: String, require: true },
  userId: { type: String, require: true },
  year: { type: Number, require: true },
  genre: { type: String, require: true },
});

module.exports = mongoose.model('Book', bookSchema)

// ratings : [ 
//   { 
//     userId : String     - identifiant MongoDB unique de l'utilisateur qui a noté le livre 
//     grade : Number     - note donnée à un livre 
//   } 
// ]
// - notes données à un livre averageRating : Number     - note moyenne du livre 
// }