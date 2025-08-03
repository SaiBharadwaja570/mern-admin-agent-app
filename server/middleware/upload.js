const multer = require('multer');
const path = require('path');

// File type validation
const fileFilter = (req, file, cb) => {
  const filetypes = /csv|xlsx|xls/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV, XLSX, and XLS files are allowed!'));
  }
};

const storage = multer.memoryStorage(); // No disk storage needed

const upload = multer({ storage, fileFilter });

module.exports = upload;
