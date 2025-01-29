import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { createJob } from '@/actions/jobActions';
const LOCATIONS = [
  'Remote', 'San Francisco, CA', 'New York, NY', 
  'Austin, TX', 'Chicago, IL', 'Seattle, WA', 'Boston, MA'
];

const AdminJobPostingPage = () => {
  const [jobPosting, setJobPosting] = useState({
    title: '',
    location: '',
    description: '',
    requirements: '',
    type: 'Full-time'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobPosting(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!jobPosting.title || !jobPosting.location) {
      alert('Please fill in all required fields.');
      return;
    }

    const newJobPosting = {
      ...jobPosting,
      requirements: jobPosting.requirements
        .split('\n')
        .filter(req => req.trim() !== '')
    };
    console.log(newJobPosting)
    await createJob(newJobPosting)
    console.log('Job Posting Created:', newJobPosting);

    setJobPosting({
      title: '',
      location: '',
      description: '',
      requirements: '',
      type: 'Full-time'
    });
  };

  return (
    <div className="container mx-auto p-4">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold mb-6 text-center"
      >
        Create Job Posting
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-4xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  name="title"
                  value={jobPosting.title}
                  onChange={handleInputChange}
                  placeholder="Job Title"
                  required
                />
              </div>

              <Select 
                name="location"
                value={jobPosting.location}
                onValueChange={(value) => setJobPosting(prev => ({
                  ...prev,
                  location: value
                }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map(loc => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                name="type"
                value={jobPosting.type}
                onValueChange={(value) => setJobPosting(prev => ({
                  ...prev,
                  type: value
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Remote">InternShip</SelectItem>
                </SelectContent>
              </Select>

             

              <div className="md:col-span-2">
                <Textarea
                  name="description"
                  value={jobPosting.description}
                  onChange={handleInputChange}
                  placeholder="Job Description"
                  required
                  rows={4}
                />
              </div>

              <div className="md:col-span-2">
                <Textarea
                  name="requirements"
                  value={jobPosting.requirements}
                  onChange={handleInputChange}
                  placeholder="Requirements (one per line)"
                  required
                  rows={4}
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <Button 
                  type="submit" 
                  size="sm" 
                  className="w-full md:w-auto"
                >
                  Create Job Posting
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminJobPostingPage;