const User = require('../models/User');
const { Blog } = require('../models/Blogs');


const createBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        console.log(req.body)
        const newBlog = new Blog({ title, content, author });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create blog' });
    }
};


const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        
        await Blog.findByIdAndDelete(id)
        res.status(200).json({message:"Blog Deleted"});

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to delete blog' });
    }
};

const editBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to edit blog' });
    }
};

const listBlogs = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const blogs = await Blog.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const totalBlogs = await Blog.countDocuments();
        res.status(200).json({
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: page,
            blogs
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
};

const viewBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
};

module.exports = {
    createBlog,
    editBlog,
    listBlogs,
    viewBlog,
    deleteBlog
};

