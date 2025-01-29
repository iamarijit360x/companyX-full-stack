import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    School2, 
    Heart, 
    Hotel, 
    Scissors, 
    ShoppingCart, 
    Dumbbell 
} from 'lucide-react';

const projects = [
    {
        industry: 'Education',
        description: 'Innovative digital solutions transforming learning landscapes.',
        icon: School2,
        expertise: ['E-Learning Platforms', 'Student Management', 'Interactive Content']
    },
    {
        industry: 'Healthcare',
        description: 'Advanced technological platforms revolutionizing patient care.',
        icon: Heart,
        expertise: ['Patient Portals', 'Telemedicine', 'Medical Records']
    },
    {
        industry: 'Hospitality',
        description: 'Smart digital ecosystems enhancing guest experiences.',
        icon: Hotel,
        expertise: ['Booking Systems', 'Guest Management', 'Service Integration']
    },
    {
        industry: 'Beauty & Grooming',
        description: 'Cutting-edge digital tools empowering service providers.',
        icon: Scissors,
        expertise: ['Appointment Scheduling', 'Client Tracking', 'Service Management']
    },
    {
        industry: 'E-commerce',
        description: 'Intelligent platforms driving online business growth.',
        icon: ShoppingCart,
        expertise: ['Store Design', 'Payment Integration', 'Customer Experience']
    },
    {
        industry: 'Fitness',
        description: 'Dynamic solutions tracking and motivating fitness journeys.',
        icon: Dumbbell,
        expertise: ['Membership Management', 'Performance Tracking', 'Class Scheduling']
    }
];

const PortfolioPage = () => {
    const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-5xl w-full space-y-12">
                <motion.h1 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-extralight text-center"
                >
                    Digital Transformation Ecosystem
                </motion.h1>
                
                <div className="grid md:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.industry}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className={`
                                border rounded-xl p-6 
                                transition-all duration-300 cursor-pointer
                                ${activeProject === project 
                                    ? 'border-neutral-500' 
                                    : ''}
                            `}
                            onClick={() => setActiveProject(project === activeProject ? null : project)}
                        >
                            <div className="flex items-center mb-4">
                                <project.icon 
                                    size={44} 
                                    strokeWidth={1.5} 
                                    className="mr-4"
                                />
                                <h2 className="text-xl font-light">
                                    {project.industry}
                                </h2>
                            </div>
                            
                            {activeProject === project && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4"
                                >
                                    <p className="mb-4">{project.description}</p>
                                    <div className="space-y-2">
                                        {project.expertise.map((skill: string) => (
                                            <div 
                                                key={skill} 
                                                className="rounded px-3 py-1 inline-block mr-2 text-sm"
                                            >
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;