const express = require('express');
const Enquiry = require('../models/Enquiry');
const { createEnquiry, markAsResolved, fetchAllEnquires } = require('../controllers/enquiry');
const { verifyUser, verifyAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();



router.post("/",createEnquiry);
router.use(verifyUser);
router.use(verifyAdmin);
router.patch("/:id", markAsResolved);
router.get("/",fetchAllEnquires);
  


  module.exports = router;