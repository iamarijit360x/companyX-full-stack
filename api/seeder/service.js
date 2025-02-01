const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Job = require('../models/Job');
const { Blog } = require('../models/Blogs');
const dotenv = require('dotenv');

//PUT MONGODB URL
mongoose.connect('')
 async function createUser(name, email, password, isAdmin = true) {
   
        const user = await User.create({ name, email, password, isAdmin });
        console.log(user)
}
const LOCATIONS = [
    'Remote', 'San Francisco, CA', 'New York, NY',
    'Austin, TX', 'Chicago, IL', 'Seattle, WA', 'Boston, MA'
];

const jobRequirements = [
    "2+ years of experience in software development",
    "Proficiency in React and JavaScript",
    "Experience with RESTful APIs",
    "Strong knowledge of HTML, CSS, and JavaScript",
    "Experience with version control tools like Git",
    "Familiarity with Agile and Scrum methodologies",
    "Experience with state management libraries like Redux",
    "Ability to write clean, maintainable code",
    "Good understanding of responsive design principles",
    "Experience with testing frameworks (e.g., Jest, Mocha)",
    "Strong problem-solving and debugging skills",
    "Excellent communication and teamwork skills",
    "Experience with database management systems (e.g., MySQL, MongoDB)",
    "Familiarity with cloud services (AWS, Azure, Google Cloud)",
    "Experience in deploying applications on cloud platforms",
    "Ability to work in a fast-paced environment",
    "Understanding of security best practices in web development",
    "Experience with CI/CD pipelines",
    "Bachelor's degree in Computer Science or related field (or equivalent experience)",
    "Strong understanding of algorithms and data structures",
    "Experience with Node.js or other backend technologies",
    "Familiarity with containerization technologies (e.g., Docker, Kubernetes)",
    "Experience with microservices architecture",
    "Knowledge of performance optimization techniques",
    "Familiarity with web accessibility standards",
    "Experience in building and consuming GraphQL APIs",
    "Experience with mobile-first design and development",
    "Experience working with a code editor like VS Code or Sublime Text",
    "Ability to learn new technologies quickly",
    "Experience working in cross-functional teams",
    "Experience with data visualization libraries (e.g., D3.js, Chart.js)",
    "Knowledge of serverless computing frameworks",
    "Familiarity with UX/UI design principles",
    "Strong attention to detail in writing code and documentation",
    "Experience with authentication and authorization techniques",
    "Experience with automated testing and TDD",
    "Ability to handle code reviews and provide constructive feedback",
    "Experience with task management tools (e.g., Jira, Trello)",
    "Familiarity with server-side rendering (SSR) frameworks (e.g., Next.js)",
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
    'Full-time', 'Part-time', 'Contract', 'Internship'
];

const getRandomRequirements = (num) => {
    const selectedRequirements = [];
    const shuffled = [...jobRequirements].sort(() => 0.5 - Math.random()); // Shuffle the array

    for (let i = 0; i < num; i++) {
        selectedRequirements.push(shuffled[i]); // Select 'num' random items
    }

    return selectedRequirements;
};

async function createJobs() {
    try {
        const jobs = [];
        for (let i = 0; i < 20; i++) { // Create 20 sample jobs
            const jobTitle = [
                "Software Engineer",
                "Frontend Developer",
                "Backend Developer",
                "Full Stack Developer",
                "Product Manager",
                "UI/UX Designer",
                "DevOps Engineer",
                "Data Scientist",
                "QA Engineer",
                "Marketing Specialist"
            ];
            const jobDescriptions = [
                "Join our team to build cutting-edge software solutions and deliver scalable, high-performance products.",
                "Work with our design and product teams to create responsive, user-friendly web applications.",
                "Lead and develop backend services and systems to support large-scale web applications.",
                "As a full-stack developer, you will be responsible for both frontend and backend development.",
                "Collaborate with stakeholders to define and drive product strategy, managing feature development from start to finish.",
                "Design and prototype user interfaces, ensuring a seamless and intuitive experience for all users.",
                "Develop and maintain infrastructure and deployment pipelines to streamline DevOps workflows.",
                "Analyze and interpret complex data to provide actionable insights and help guide business decisions.",
                "Test and ensure the quality of our software products through rigorous manual and automated testing.",
                "Work with marketing teams to craft and execute campaigns aimed at expanding our customer base."
            ];

            const job = {
                title: `${jobTitle[Math.floor(Math.random() * jobTitle.length)]} ${i + 1}`,
                description: `${jobDescriptions[Math.floor(Math.random() * jobDescriptions.length)]} This is a great opportunity to join a forward-thinking team.`,
                requirements: `${getRandomRequirements(6)}`,
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
        // await createUser('Arijit','test@example.com','abcd@123');
        await createJobs();
        // await createBlogs();
    } catch (error) {
        console.error("Error creating user:", error);
    }
})();