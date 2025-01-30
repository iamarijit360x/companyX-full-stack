import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Building2, Globe2, Users2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const benefits = [
    {
      icon: <Globe2 className="h-8 w-8 mb-4 text-gray-700" />,
      title: "Remote-First Culture",
      description: "Work from anywhere in the world. We believe in flexibility and work-life balance."
    },
    {
      icon: <Zap className="h-8 w-8 mb-4 text-gray-700" />,
      title: "Growth & Development",
      description: "Continuous learning opportunities with dedicated budget for courses and conferences."
    },
    {
      icon: <Users2 className="h-8 w-8 mb-4 text-gray-700" />,
      title: "Inclusive Workplace",
      description: "Join a diverse team where every voice matters and everyone belongs."
    },
    {
      icon: <Building2 className="h-8 w-8 mb-4 text-gray-700" />,
      title: "Modern Benefits",
      description: "Comprehensive healthcare, equity packages, and generous time off."
    }
  ];

  const stats = [
    { number: "500+", label: "Team Members" },
    { number: "32", label: "Countries" },
    { number: "4.8", label: "Employee Rating" },
    { number: "92%", label: "Retention Rate" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Our Mission to Build the Future
            </h1>
            <p className="text-xl mb-8">
              We're looking for exceptional people to help us create technology that matters.
            </p>
            <Link to="/careers/jobs">
              <Button size="lg" variant="outline" className="font-semibold">
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-4">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div >{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Join Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="flex justify-center">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xlmb-8 max-w-2xl mx-auto">
            Join our team of passionate individuals working to solve meaningful problems.
          </p>
          <Link to="/career">
            <Button size="lg" variant="outline" className="font-semibold">
              Explore Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;