const express = require('express');
const router = express.Router();
/// folder ///
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const stuffCtrl = require('../controllers/stuff')

/// Router ///
router.get('/', stuffCtrl.getAllBook)
router.post('/', auth, multer, stuffCtrl.createBook)
router.get('/bestrating', stuffCtrl.bestRatingBook)
router.get('/:id', stuffCtrl.getOneBook)
router.put('/:id', auth, multer, stuffCtrl.modifyBook)
router.delete('/:id', auth, stuffCtrl.deleteBook)

router.post('/:id/rating', auth, stuffCtrl.ratingBook )

module.exports = router;