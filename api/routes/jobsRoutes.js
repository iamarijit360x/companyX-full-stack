const express = require('express');
const { createJob, listJobs, modifyJob, viewJobById } = require('../controllers/Job');
const { verifyUser, verifyAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Memory storage for multer to work with buffer


// Routes for PDF operations

router.get('/',listJobs);
router.get('/:id',viewJobById);
router.use(verifyUser);
router.use(verifyAdmin);
router.put('/',modifyJob);
router.post('/', createJob);
module.exports = router;