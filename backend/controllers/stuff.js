const Book = require('../models/Book')
const fs = require('fs')

// Créer //
exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    _userId: req.auth._userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    
  });
  console.log(`${req.file.filename}`);
  // console.log(bookObject);
  book.save()
  .then(() => { res.status(201).json({ message: 'Objet enrengistré !' }) })
  .catch(error => { 
    console.log(error);
   return res.status(400).json({ error })
  })
}

// Modifier //
exports.modifyBook = (req, res, next) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete bookObject._userId;
  Book.findOne({_id: req.params.id})
    .then((book) => {
      if(book._userId != req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé' })
      } else {
        console.log({  ...bookObject.ratings }); 
        Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Objet modifié' }))
        .catch(error => res.status(400).json({ error }));
      }
    })
}
// Cibler le livre //
exports.getOneBook = (req, res, next) => {
  // console.log(Book.findOne({ _id: req.params.id }));
  Book.findOne({ _id: req.params.id })
  .then(book => res.status(200).json(book))
  .catch(error => res.status(404).json({ error }))
}

// Cibler tous les livres //
exports.getAllBook = (req, res) => {
  Book.find()
  .then(books => res.status(200).json(books))
  .catch(error => res.status(400).json({ error }))
}

// Supprimer //
exports.deleteBook = (req, res, next) => {
  Book.findOne({_id: req.params.id})
  .then(book => {
    if(book._userId != req.auth.userId) {
      // console.log(book.userId);
      // console.log(req.auth.userId);
      res.status(401).json({ message: 'Non-autorisé' });
    } else {
      const filename = book.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Book.deleteOne({_id: req.params.id})
        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
        .catch(error => res.status(401).json({ error }));
      })
    }
  })
  .catch(error => res.status(500).json({ error }))
}

// Meilleur livres //
exports.bestRatingBook = (req, res, next) => {
  Book.find()
  .sort({ averageRating: -1 })
  .limit(3)
  .then(books => res.status(200).json(books))
  .catch(error => res.status(400).json({ error }))
}

exports.ratingBook = (req, res, next) => {
  console.log(req.body);
  Book.updateOne(
    { _id: req.params.id}, 
    { $push:{ratings:{userId:'', grade:2}}}
  )
  .catch(error => { 
    console.log(error);
  return res.status(400).json({ error })
  })
}
