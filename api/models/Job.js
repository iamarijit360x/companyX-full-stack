const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    department:{
        type:String,
        required: true
    },
    type:{
        type:String,
        required:true,
        enum:['Full-time','Part-time','Internship','Contract']
    },
    status:{
        type:String,
        require:true,
        default:'Active',
        enum:['Active','Expired']
    }
},{timestamps:true});

module.exports = mongoose.model('Job', JobSchema);
