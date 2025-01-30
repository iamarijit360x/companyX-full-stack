const express = require('express');
const { getStatus, getRecentBlogs, getRecentJobs } = require('../controllers/dashboard');

const router = express.Router();



router.get('/stats',getStatus);
router.get('/recent-blogs',getRecentBlogs);
router.get('/recent-jobs',getRecentJobs);
module.exports = router;