const express= require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {connection} = require('./database/db.js');
const fileRoute=require('../api/routes/fileRoutes.js');
const jobsRoute=require('../api/routes/jobsRoutes.js');
const jobApplicationRoute=require('../api/routes/jobApplicationRoutes.js');
const blogRoute=require('../api/routes/blogsRoutes.js');
const authRoute=require('../api/routes/authRoutes.js');
const dashboardRoute=require('../api/routes/dashboardRoutes.js')
const enquiryRoute=require('../api/routes/enquiryRoutes.js')

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connection(); // Connect only if not in test mode

app.get('/',(req,res)=>{
    res.send("welcome to company-x-api")
})
// Use cors middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.FRONTEND_URL // Allow requests from this origin
}));
app.use('/api/auth/',authRoute);
app.use('/api/files/',fileRoute);
app.use('/api/jobs/',jobsRoute);
app.use('/api/job-application/',jobApplicationRoute);
app.use('/api/blog/',blogRoute);
app.use('/api/dashboard/',dashboardRoute)
app.use('/api/enquiry/',enquiryRoute);
app.use((error, req, res, next) => {
    res.status(500).send({message:'Server Error',error});
});
    app.listen(port, () => console.log(`Server listening on port ${port}`));


module.exports = app;
