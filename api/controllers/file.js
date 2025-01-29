const mongoose = require('mongoose');
const { Readable } = require('stream');

// GridFS File Model
const File = mongoose.model('File', new mongoose.Schema({
  filename: String,
  contentType: String,
  uploadDate: { type: Date, default: Date.now },
  metadata: mongoose.Schema.Types.Mixed
}), 'uploads.files');

const uploadPdf = async (req, res) => {
  try {
    // Validate file
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Check if it's a PDF
    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).send('Only PDF files are allowed.');
    }

    // Create GridFS upload stream
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });

    // Create upload stream
    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      metadata: {
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        uploadedBy: req.body.email
      }
    });

    // Create readable stream from the uploaded file
    const fileStream = Readable.from(req.file.buffer);

    // Pipe the file to GridFS
    fileStream.pipe(uploadStream)
      .on('error', (error) => {
        console.error('Upload error:', error);
        return res.status(500).send('File upload failed');
      })
      .on('finish', () => {
        res.status(200).send({
          message: 'PDF uploaded successfully!',
          fileId: uploadStream.id
        });
      });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).send('Server error during upload');
  }
};

const getPdfFiles = async (req, res) => {
  try {
    const files = await File.find({ 'metadata.mimetype': 'application/pdf' });
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).send('Error fetching files');
  }
};

const downloadPdf = async (req, res) => {
  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });

    const fileId = new mongoose.Types.ObjectId(req.params.fileId);

    // Find the file metadata
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).send('File not found');
    }

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);

    // Create download stream
    const downloadStream = bucket.openDownloadStream(fileId);

    // Pipe the file to response
    downloadStream.pipe(res)
      .on('error', (error) => {
        console.error('Download error:', error);
        res.status(500).send('Error downloading file');
      });

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).send('Server error during download');
  }
};

const deletePdf = async (req, res) => {
  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });

    const fileId = new mongoose.Types.ObjectId(req.params.fileId);

    // Delete the file from GridFS
    await bucket.delete(fileId);

    res.status(200).send('File deleted successfully');
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).send('Error deleting file');
  }
};

module.exports = {
  uploadPdf,
  getPdfFiles,
  downloadPdf,
  deletePdf
};