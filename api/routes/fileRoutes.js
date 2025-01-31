const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadPdf,deletePdf,downloadPdf,getPdfFiles } = require('../controllers/file');
const { upload } = require('../database/config');

const { verifyAdmin, verifyUser } = require('../middlewares/authMiddleware');

const router = express.Router();



// Routes for PDF operations
router.post('/', upload.single('pdf'), uploadPdf);
router.use(verifyUser);
router.use(verifyAdmin);
router.get('/:fileId', downloadPdf);
router.delete('/:fileId', deletePdf);

module.exports = router;