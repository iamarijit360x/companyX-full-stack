const express = require('express');
const { getStatus, getRecentBlogs, getRecentJobs } = require('../controllers/dashboard');
const { verifyAdmin, verifyUser } = require('../middlewares/authMiddleware');

const router = express.Router();


router.use(verifyUser);
router.use(verifyAdmin);
router.get('/stats',getStatus);
router.get('/recent-blogs',getRecentBlogs);
router.get('/recent-jobs',getRecentJobs);
module.exports = router;