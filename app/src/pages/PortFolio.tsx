import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    School2, 
    Heart, 
    Hotel, 
    Scissors, 
    ShoppingCart, 
    Dumbbell,
    ChevronRight 
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
    const [activeProject, setActiveProject] = useState(null);
    const [hoveredProject, setHoveredProject] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
        }
    };

    return (
        <div className="min-h-screen px-6 py-32">
            <div className="max-w-7xl mx-auto space-y-32">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    className="text-center space-y-8"
                >
                    <h1 className="text-6xl md:text-8xl font-extralight tracking-tight mb-8">
                        Portfolio
                    </h1>
                    <p className="text-lg md:text-xl font-light max-w-2xl mx-auto opacity-80">
                        A curated collection of digital transformation solutions 
                        across diverse industries
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.industry}
                            variants={itemVariants}
                            onMouseEnter={() => setHoveredProject(project)}
                            onMouseLeave={() => setHoveredProject(null)}
                            onClick={() => setActiveProject(activeProject === project ? null : project)}
                            className={`
                                group relative border rounded-lg p-8
                                transition-all duration-500 ease-out
                                hover:border-current cursor-pointer
                            `}
                        >
                            <div className="space-y-6">
                                <div className="flex items-start justify-between">
                                    <project.icon 
                                        size={32} 
                                        strokeWidth={1}
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <ChevronRight 
                                        size={20} 
                                        className={`
                                            transition-all duration-500
                                            ${hoveredProject === project ? 'opacity-100' : 'opacity-0'}
                                            ${activeProject === project ? 'rotate-90' : ''}
                                        `}
                                    />
                                </div>

                                <div>
                                    <h2 className="text-xl font-light mb-2">
                                        {project.industry}
                                    </h2>
                                    <p className="text-sm font-light opacity-60 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <AnimatePresence>
                                    {activeProject === project && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                            className="pt-6 border-t"
                                        >
                                            <div className="flex flex-wrap gap-2">
                                                {project.expertise.map((skill) => (
                                                    <span 
                                                        key={skill}
                                                        className="text-xs font-light px-3 py-1 rounded-full border opacity-80"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-center space-y-6"
                >
                    <p className="text-lg font-extralight">
                        Each project represents a unique journey in digital transformation
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default PortfolioPage;