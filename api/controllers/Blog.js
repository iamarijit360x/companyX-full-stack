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
        // Destructure and set default values for page, limit, and searchTerm
        const { page = 1, limit = 10, searchTerm = '' } = req.query;

        // Ensure page and limit are valid integers
        const pageNumber = Math.max(1, parseInt(page));  // Ensure page is at least 1
        const pageLimit = Math.max(1, parseInt(limit)); // Ensure limit is at least 1

        // Create a query object to filter blogs based on searchTerm
        const query = {};
        if (searchTerm) {
            // Use a regex to search for the searchTerm in the blog's title (case-insensitive)
            query.title = { $regex: searchTerm, $options: 'i' };  // Case-insensitive search in title
        }

        // Fetch blogs with pagination and search filter
        console.log(query)
        const blogs = await Blog.find(query)
            .skip((pageNumber - 1) * pageLimit) // Skip records based on current page
            .limit(pageLimit)                 // Limit records per page
            .sort({ createdAt: -1 });           // Optional: Sort by creation date, you can modify this

        // Count total blogs matching the search filter
        const totalBlogs = await Blog.countDocuments(query);

        // Send response with pagination info and blogs
        res.status(200).json({
            totalPages: Math.ceil(totalBlogs / pageLimit),  // Calculate total pages
            currentPage: pageNumber,
            blogs
        });
    } catch (error) {
        console.error(error);
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

