const express = require('express');
const { upload } = require('../database/config');
const { createBlog, editBlog, listBlogs, viewBlog, deleteBlog } = require('../controllers/Blog');

const router = express.Router();

// Memory storage for multer to work with buffer


// Routes for PDF operations

router.get('/:id', viewBlog);
router.get('/',listBlogs)
// TODO Admin
router.post('/',createBlog);
router.put('/:id', editBlog);
router.delete('/:id', deleteBlog);

module.exports = router;