const Job = require('../models/Job')
const { Blog } = require('../models/Blogs');
const JobApplication = require('../models/JobApplication')

const getRecentJobs = async (req, res) => {
    try {
        const jobs = await Job.find().limit(10);
        res.json(jobs);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching jobs', error });
    }
};



const getRecentBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().limit(10);;
        res.json(blogs);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching blogs', error });
    }
};

const getStatus = async (req, res) => {
    try {
        const { dateRange } = req.query;
        const filter = getDateRangeFilter(dateRange);
        const [totalBlogs, totalJobs, activeJobPostings, totalApplications] = await Promise.all([
            Blog.countDocuments({ ...filter }),
            Job.countDocuments({ ...filter }),
            Job.countDocuments({ ...filter, status: 'Active' }),
            JobApplication.countDocuments({ ...filter }),
        ]);
        res.json({ totalBlogs, totalJobs, activeJobPostings, totalApplications });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching blogs', error });
    }
};
const getDateRangeFilter = (dateRange) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    switch (dateRange) {
        case 'today':
            return { createdAt: { $gte: today } };
        case 'thisWeek':
            return { createdAt: { $gte: startOfWeek } };
        case 'thisMonth':
            return { createdAt: { $gte: startOfMonth } };
        case 'thisYear':
            return { createdAt: { $gte: startOfYear } };
        default:
            return {}; // No filter applied
    }
};

module.exports = {
    getStatus,
    getRecentBlogs,
    getRecentJobs,
};

