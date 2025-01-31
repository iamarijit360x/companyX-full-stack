const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Job = require('../models/Job');
const { Blog } = require('../models/Blogs');
const dotenv = require('dotenv');


mongoose.connect('')
 async function createUser(name, email, password, isAdmin = false) {
   
        const user = await User.create({ name, email, password, isAdmin });
        console.log(user)
}
const LOCATIONS = [
    'Remote', 'San Francisco, CA', 'New York, NY',
    'Austin, TX', 'Chicago, IL', 'Seattle, WA', 'Boston, MA'
];

const DEPARTMENTS = [
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Sales',
    'Customer Success',
    'Human Resources',
    'Finance',
    'Operations',
    'Legal',
    'Research & Development'
];

const JOB_TYPES = [
    'Full-time', 'Part-time', 'Contract', 'Internship' // Directly use the values
];

async function createJobs() {
    try {
        const jobs = [];
        for (let i = 0; i < 20; i++) { // Create 20 sample jobs
            const job = {
                title: `Job Title ${i + 1}`,
                description: `Job Description ${i + 1}.  This is a great opportunity`,
                requirements: `["Must have experience in C++","2+ Years Expereince"]`,
                location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
                department: DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)],
                type: JOB_TYPES[Math.floor(Math.random() * JOB_TYPES.length)],
                status: 'Active' // You can randomize this if needed
            };
            jobs.push(job);
        }

        const insertedJobs = await Job.insertMany(jobs);  // Use insertMany for efficiency
        console.log("Jobs created successfully:", insertedJobs);
    } catch (error) {
        console.error("Error creating jobs:", error);
    }
}


async function createBlogs() {
    try {
        const blogs = [
            {
                title: "The Art of JavaScript",
                content: "JavaScript is a powerful and versatile language...",
                author: "John Doe",
                tags: ["javascript", "web development", "programming"],
                published: true
            },
            {
                title: "Exploring React.js",
                content: "React.js is a popular JavaScript library for building user interfaces...",
                author: "Jane Smith",
                tags: ["react", "frontend", "ui"],
                published: true
            },
            {
                title: "Node.js for Beginners",
                content: "Node.js allows you to run JavaScript on the server-side...",
                author: "David Lee",
                tags: ["node.js", "backend", "javascript"],
                published: false 
            },
            {
                title: "The Future of Web Development",
                content: "Web development is constantly evolving...",
                author: "Alice Johnson",
                tags: ["web development", "future", "trends"],
                published: true
            },
            {
                title: "Mastering MongoDB",
                content: "MongoDB is a NoSQL database that uses a document-oriented data model...",
                author: "Bob Williams",
                tags: ["mongodb", "database", "nosql"],
                published: true
            },
            {
                title: "Advanced CSS Techniques",
                content: "Learn advanced CSS techniques for modern web design...",
                author: "Eva Garcia",
                tags: ["css", "web design", "frontend"],
                published: true
            },
            {
                title: "Building RESTful APIs with Express.js",
                content: "Express.js is a popular framework for building RESTful APIs...",
                author: "Michael Brown",
                tags: ["express.js", "api", "backend"],
                published: true
            },
            {
                title: "Introduction to TypeScript",
                content: "TypeScript adds static typing to JavaScript...",
                author: "Sarah Davis",
                tags: ["typescript", "javascript", "programming"],
                published: false
            },
            {
                title: "Web Security Best Practices",
                content: "Protecting your web applications from vulnerabilities...",
                author: "Chris Wilson",
                tags: ["web security", "security", "best practices"],
                published: true
            },
            {
                title: "The Power of GraphQL",
                content: "GraphQL is a query language for your API...",
                author: "Megan Rodriguez",
                tags: ["graphql", "api", "backend"],
                published: true
            },
            {
                title: "Serverless Computing with AWS Lambda",
                content: "Learn how to build serverless applications with AWS Lambda...",
                author: "Kevin Martinez",
                tags: ["serverless", "aws", "cloud computing"],
                published: true
            },
            {
                title: "Data Visualization with D3.js",
                content: "Create interactive data visualizations with D3.js...",
                author: "Ashley Anderson",
                tags: ["data visualization", "d3.js", "frontend"],
                published: false
            },
            {
                title: "Machine Learning with TensorFlow.js",
                content: "Bring machine learning to the browser with TensorFlow.js...",
                author: "Brian Thomas",
                tags: ["machine learning", "tensorflow.js", "ai"],
                published: true
            },
            {
                title: "Mobile App Development with React Native",
                content: "Build cross-platform mobile apps with React Native...",
                author: "Jessica Jackson",
                tags: ["react native", "mobile development", "javascript"],
                published: true
            },
            {
                title: "Getting Started with Vue.js",
                content: "Vue.js is a progressive JavaScript framework...",
                author: "William White",
                tags: ["vue.js", "frontend", "javascript"],
                published: true
            }
        ];

        const insertedBlogs = await Blog.insertMany(blogs);
        console.log("Blogs created successfully:", insertedBlogs);
    } catch (error) {
        console.error("Error creating blogs:", error);
    }
}

(async () => {
    try {
        await createJobs();
        // await createBlogs();
        console.log("User created successfully!");
    } catch (error) {
        console.error("Error creating user:", error);
    }
})();