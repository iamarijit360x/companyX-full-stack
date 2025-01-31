import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { createJob } from '@/actions/jobActions';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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
  { label: 'Full-time', value: 'Full-time' },
  { label: 'Part-time', value: 'Part-time' },
  { label: 'Contract', value: 'Contract' },
  { label: 'Internship', value: 'Internship' }
];

const AdminJobPostingPage = () => {
  const navigate=useNavigate()
  const {toast}=useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [jobPosting, setJobPosting] = useState({
    title: '',
    department: '',
    location: '',
    description: '',
    requirements: '',
    type: 'Full-time'
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!jobPosting.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    
    if (!jobPosting.department) {
      newErrors.department = 'Department is required';
    }
    
    if (!jobPosting.location) {
      newErrors.location = 'Location is required';
    }
    
    if (!jobPosting.description.trim()) {
      newErrors.description = 'Job description is required';
    }
    
    if (!jobPosting.requirements.trim()) {
      newErrors.requirements = 'At least one requirement is needed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobPosting(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields!',
    });
      toast.error('');
      return;
    }

    setIsSubmitting(true);

    try {
      const newJobPosting = {
        ...jobPosting,
        requirements: jobPosting.requirements
          .split('\n')
          .filter(req => req.trim() !== '')
      };

      await createJob(newJobPosting);
      toast({
        title: 'Job Created Successfully',
        description: 'Job posting created successfully!',
    });
      
      setJobPosting({
        title: '',
        department: '',
        location: '',
        description: '',
        requirements: '',
        type: 'Full-time'
      });
      navigate('/admin/jobs')
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setIsSubmitting(false);
    }
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    name="title"
                    value={jobPosting.title}
                    onChange={handleInputChange}
                    placeholder="Job Title"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <Select 
                    name="department"
                    value={jobPosting.department}
                    onValueChange={(value) => {
                      setJobPosting(prev => ({ ...prev, department: value }));
                      setErrors(prev => ({ ...prev, department: undefined }));
                    }}
                  >
                    <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map(dept => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-1">{errors.department}</p>
                  )}
                </div>

                <div>
                  <Select 
                    name="location"
                    value={jobPosting.location}
                    onValueChange={(value) => {
                      setJobPosting(prev => ({ ...prev, location: value }));
                      setErrors(prev => ({ ...prev, location: undefined }));
                    }}
                  >
                    <SelectTrigger className={errors.location ? 'border-red-500' : ''}>
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
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                  )}
                </div>

                <div>
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
                      {JOB_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Textarea
                    name="description"
                    value={jobPosting.description}
                    onChange={handleInputChange}
                    placeholder="Job Description"
                    rows={4}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Textarea
                    name="requirements"
                    value={jobPosting.requirements}
                    onChange={handleInputChange}
                    placeholder="Requirements (one per line)"
                    rows={4}
                    className={errors.requirements ? 'border-red-500' : ''}
                  />
                  {errors.requirements && (
                    <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>
                  )}
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <Button 
                    type="submit" 
                    size="sm"
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Job Posting'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminJobPostingPage;