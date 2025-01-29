const express = require('express');
const { createJob, listJobs, modifyJob, viewJobById } = require('../controllers/Job');
const { applyForJob, changeApplicationStatus, viewAppliedApplications, selectCandidate, rejectAllInProgress } = require('../controllers/JobApplication');

const router = express.Router();




router.post('/',applyForJob);
// TODO Admin
router.patch('/:id',selectCandidate);
router.get('/:id', viewAppliedApplications);
router.patch('/reject-all/:jobId', rejectAllInProgress);


module.exports = router;