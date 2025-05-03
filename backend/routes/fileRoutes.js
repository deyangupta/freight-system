const express = require('express');
const multer = require('multer');
const { handleFileUpload } = require('../controllers/fileController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), handleFileUpload);

module.exports = router;