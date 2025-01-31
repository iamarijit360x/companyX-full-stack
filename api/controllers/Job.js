const Job = require('../models/Job'); // Assuming you have a Job model

// Function to create a new job
const createJob = async (req, res) => {
    try {
        const job = new Job({...req.body,requirements:JSON.stringify(req.body.requirements)});
        console.log(job)
        await job.save();
        return res.status(201).json({ data: job });
    } catch (error) {
        return res.status(400).json({ error });
    }
};


// Function to view jobs with pagination
const listJobs = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status=req.query.status||'active'

    try {
        const jobs = await Job.find({status})
            .skip((page - 1) * limit)
            .limit(limit);
        const totalJobs = await Job.countDocuments({});
        return res.status(200).json({
            data: {
                jobs,
                totalPages: Math.ceil(totalJobs / limit),
                currentPage: page
            }
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

// Function to modify a job
const modifyJob = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    const allowedUpdates = ['title', 'description', 'salary']; // Add other fields as necessary
    const isValidOperation = Object.keys(updates).every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        Object.keys(updates).forEach((update) => job[update] = updates[update]);
        await job.save();
        return res.status(200).json({ data: job });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

// Function to view a particular job by ID
const viewJobById = async (req, res) => {
    const id = req.params.id;

    try {
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        return res.status(200).json({ data: job });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

module.exports = {
    createJob,
    listJobs,
    modifyJob,
    viewJobById
};
