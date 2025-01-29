const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    cv: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'uploads.files', // Ensure this matches your GridFS bucket name
        required: true
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    coverLetter:{
        type:String,
    },
    status:{
        type:String,
        default:'In Progress',
        enum:['In Progress','Rejected','Selected']
    }
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
