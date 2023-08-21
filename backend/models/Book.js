const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator')

const bookSchema = mongoose.Schema({
  userId: { type: String, require: true },
  title: { type: String, require: true },
  author: { type: String, require: true },
  imageUrl: { type: String, require: true },
  year: { type: Number, require: true },
  genre: { type: String, require: true },
  ratings: [{
    userId: { type: String, require: true, },
    grade: { type: Number, require: true },
  }],
  averageRating: { type: Number, require: true },
});


// Méthode pour calculer la note moyenne
function calculateAverageRating(ratings) {
  // const ratings = bookSchema.ratings;
  console.log(ratings);
  if(ratings.length === 0) {
    return 0;
  }

  const totalRatings = ratings.length;
  const sumOfRatings = ratings.reduce((sum, ratings) => sum + ratings.grade, 0);
  const averageRating = sumOfRatings / totalRatings;

  return averageRating;
}


// const average = calculateAverageRating(ratings)
// console.log(average);


// Méthode pour ajouter une nouvelle notation
// bookSchema.methods.addRating = function(userId, grade) {
//   this.ratings.push({ userId, grade });
//   this.calculateAverageRating();
// };

// bookSchema.plugin(uniqueValidator)

module.exports = mongoose.model('qwdq', bookSchema)
