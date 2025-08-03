const express = require('express');
const multer = require('multer');
const { uploadAndDistribute } = require('../controllers/uploadController');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ // upload using multer (for proper read and acces of the file)
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only CSV, XLS, and XLSX files are allowed'));
  }
});

router.post('/upload', upload.single('file'), uploadAndDistribute);

module.exports = router;
