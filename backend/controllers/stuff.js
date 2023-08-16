const Book = require('../models/Book')
const fs = require('fs')

// Créer //
exports.createBook = (req, res, next) => {
  console.log(req.body);
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  console.log(bookObject);
  const book = new Book({
    ...bookObject,
    _userId: req.auth._userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    
  });
  console.log(book);
  book.save()
  .then(() => { res.status(201).json({ message: 'Objet enrengistré !' }) })
  .catch(error => { res.status(400).json({ error })})
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
        Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Objet modifié' }))
        .catch(error => res.status(400).json({ error }));
      }
    })
}
// Cibler le livre //
exports.getOneBook = (req, res, next) => {
  // console.log(Book.findOne(_id));
  Book.findOne({ _id: req.params.id })
  .then(book => res.status(200).json(book))
  .catch(error => res.status(404).json({ error }))
}

// Cibler tous les livres //
exports.getAllBook = (req, res) => {
  Book.find()
  .then(books => res.status(200).json(books))
  .catch(error => res.status(400).json({ erreur }))
}

// Supprimer //
exports.deleteBook = (req, res, next) => {
  Book.findOne({_id: req.params.id})
  .then(book => {
    if(book.userId != req.auth.userId) {
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
