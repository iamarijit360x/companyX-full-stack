const express = require('express');
const { createBlog, editBlog, listBlogs, viewBlog, deleteBlog } = require('../controllers/Blog');
const { verifyUser, verifyAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Memory storage for multer to work with buffer


// Routes for PDF operations

router.get('/:id', viewBlog);
router.get('/',listBlogs)
router.use(verifyUser);
router.use(verifyAdmin);
router.post('/',createBlog);
router.put('/:id', editBlog);
router.delete('/:id', deleteBlog);

module.exports = router;