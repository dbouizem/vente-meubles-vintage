const path = require('path');
const multer = require('multer');

const imageDirectory = path.resolve(__dirname, '..', 'Assets', 'img_meubles');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, imageDirectory);
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const basename = path
      .basename(file.originalname, extension)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();

    callback(null, `${Date.now()}-${basename || 'image'}${extension}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (!file.mimetype.startsWith('image/')) {
    return callback(new Error('Le fichier doit etre une image'));
  }

  callback(null, true);
};

const uploadProductImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
}).single('photo');

const handleProductImageUpload = (req, res, next) => {
  uploadProductImage(req, res, (error) => {
    if (!error) {
      return next();
    }

    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send({ message: 'Image trop volumineuse' });
    }

    return res.status(400).send({ message: error.message || 'Image invalide' });
  });
};

module.exports = { handleProductImageUpload };
