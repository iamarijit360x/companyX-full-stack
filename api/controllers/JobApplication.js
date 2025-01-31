const { Mongoose, default: mongoose } = require("mongoose");
const JobApplication  = require("../models/JobApplication");
const Job  = require("../models/Job");
const emailService = require("../services/emailService");
const utilsService = require("../services/utilsService");

const applyForJob = async (req, res) => {
    try {
        console.log(req.body)
        const jobApplication = new JobApplication(req.body);
        await jobApplication.save();
        res.status(201).send(jobApplication);
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
};

const changeApplicationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const application = await JobApplication.findById(id);
        if (!application) {
            return res.status(404).send({ error: "Job application not found" });
        }
        application.status = status;
        await application.save();
        res.send(application);
    } catch (error) {
        res.status(400).send(error);
    }
};
const selectCandidate = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await JobApplication.findById(id).populate('jobId');
        if (!application) {
            return res.status(404).send({ error: "Job application not found" });
        }
        console.log(application)
        application.status = "Selected";
        await emailService.sendSelectionEmail(application.name,application.jobId.title,application.email)
        await application.save();
        res.send(application);
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
};

const rejectAllInProgress = async (req, res) => {
    const { jobId } = req.params;
    if (!jobId) {
        return res.status(400).send({ error: "Job ID is required" });
    }
    try {
        // Fetch all "In Progress" applications for the given jobId
        const applications = await JobApplication.find({
            status: "In Progress",
            jobId: new mongoose.Types.ObjectId(jobId),
        });

        // Extract CV file paths/URLs from the applications
        const cvs = applications.map(application => application.cv);

        // Pass the CVs to the deletePdf function
        if (cvs.length > 0) {
            utilsService.deletePdf(cvs);  // Assuming deletePdf can handle an array of CV paths
        }

        // Update the status of applications and job
        const result = await JobApplication.updateMany(
            { status: "In Progress", jobId: new mongoose.Types.ObjectId(jobId) },
            { $set: { status: "Rejected" } }
        );
        console.log(result);

        // Update the status of the job
        const job = await Job.findByIdAndUpdate(jobId, { status: 'Expired' });

        res.send({ message: `${result.nModified} applications rejected` });
    } catch (error) {
        res.status(400).send(error);
    }
};

const viewAppliedApplications = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const {id}=req.params;
    try {

        // Use new keyword to create ObjectId
        const applications = await JobApplication.find({ jobId: new mongoose.Types.ObjectId(id) })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        
        const count = await JobApplication.countDocuments({ jobId: new mongoose.Types.ObjectId(id) });
        
        res.send({
            applications,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
module.exports = {
    applyForJob,
    changeApplicationStatus,
    viewAppliedApplications,
    selectCandidate,
    rejectAllInProgress
};
