const express = require('express');
const { createJob, listJobs, modifyJob, viewJobById } = require('../controllers/Job');
const { applyForJob, changeApplicationStatus, viewAppliedApplications, selectCandidate, rejectAllInProgress, fetchApplicationById, rejectSingleCandidate } = require('../controllers/JobApplication');
const { verifyUser, verifyAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();




router.post('/',applyForJob);
router.use(verifyUser);
router.use(verifyAdmin);
router.patch('/:id',selectCandidate);
router.get('/list-applicants/:jobId', viewAppliedApplications);
router.patch('/reject-all/:jobId', rejectAllInProgress);
router.patch('/reject/:applicationId', rejectSingleCandidate);
router.get('/:id',fetchApplicationById)

module.exports = router;