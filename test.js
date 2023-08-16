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
