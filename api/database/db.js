const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { GridFSBucket } = require('mongodb');

dotenv.config();
const mongoURI = process.env.DB_URL;

let gfs;

const connection = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log('MongoDB connected');

    // Initialize GridFS
    const db = conn.connection.db;
    gfs = new GridFSBucket(db, {
      bucketName: 'uploads'
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = { connection };
