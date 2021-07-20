const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/bmp': 'bmp',
    'image/gif': 'gif',
};

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    },
      destination: (req, file, callback) => {
        callback(null, 'images')
    },
});

const filefilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/bmp" || file.mimetype == "image/gif") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }



module.exports = multer({ storage : storage, fileFilter : filefilter}).single('image');