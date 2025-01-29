const express = require('express');
const { createJob, listJobs, modifyJob, viewJobById } = require('../controllers/Job');

const router = express.Router();

// Memory storage for multer to work with buffer


// Routes for PDF operations

router.get('/',listJobs);
router.get('/:id',viewJobById);
// TODO Admin
router.put('/',modifyJob);
router.post('/', createJob);
module.exports = router;