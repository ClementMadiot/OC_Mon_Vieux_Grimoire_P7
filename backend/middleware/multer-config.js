const multer = require('multer');
const SharpMulter  =  require("sharp-multer");

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

const newFileName = (filename, options) => {

  // console.log(options.fileFormat.MIME_TYPES.useTimestamp);
  const extension = options.fileFormat.MIME_TYPES;
  const newName = filename.split(".").slice(0, -1).join(".") +
    `${options.fileFormat.MIME_TYPES.useTimestamp ? "-" + Date.now() : ""}` +
    "." + extension;
  return newName;
};

const storage = 
  SharpMulter ({
    destination:(req, file, callback) => callback(null, "images"),
    imageOptions:{
      fileFormat: { MIME_TYPES },
      quality: 80,
      resize: { width: 500, height: 500 },
    },
    filename:newFileName,
  });


module.exports = multer({ storage }).single('image');