const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const stuffCtrl = require('../controllers/stuff')

router.get('/', stuffCtrl.getAllBook)
router.post('/', multer, stuffCtrl.createBook)
router.get('/:id',  stuffCtrl.getOneBook)
router.put('/:id', multer, stuffCtrl.modifyBook)
router.delete('/:id', stuffCtrl.deleteBook)

module.exports = router;