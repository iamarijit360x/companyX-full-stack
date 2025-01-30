import { motion } from "framer-motion";
import {
  Code,
  Smartphone,
  PaintBucket,
  Search,
  TrendingUp,
  Target,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ServiceCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="w-full"
  >
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center space-x-4 mb-2">
          <Icon className="w-10 h-10 text-blue-600" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const ServicesPage = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description:
        "Create responsive, scalable websites with cutting-edge technologies. We build robust web solutions that adapt seamlessly across devices and platforms.",
    },
    {
      icon: Smartphone,
      title: "App Development",
      description:
        "Develop high-performance mobile applications for Android and iOS. Our cross-platform solutions ensure optimal user experience and maximum reach.",
    },
    {
      icon: PaintBucket,
      title: "UI/UX Design",
      description:
        "Design intuitive, visually stunning interfaces that enhance user engagement. We blend aesthetic elegance with functional simplicity.",
    },
    {
      icon: Search,
      title: "Search Engine Optimization",
      description:
        "Boost your online visibility with strategic SEO techniques. We optimize content, improve site architecture, and enhance search rankings.",
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description:
        "Execute comprehensive digital marketing strategies that drive engagement, conversions, and sustainable business growth across multiple channels.",
    },
    {
      icon: Target,
      title: "Consulting & Strategy",
      description:
        "Provide expert technology consulting to align digital solutions with your business goals. We transform complex challenges into strategic opportunities.",
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
    <section className="w-full h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold">Our Technology Services</h1>
        <p className="text-base md:text-lg mt-4">
        Transforming digital landscapes through innovative solutions tailored
        for you.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 50 }}
        className="mt-8"
      >
       
      </motion.div>
    </section>

      {/* Services Section */}
      <section className="p-4 md:p-8">
        <Separator className="my-8" />
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default ServicesPage;
