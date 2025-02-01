import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowLeft } from 'lucide-react';
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

interface JobPosting {
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string;
  type: string;
}

interface JobPostingErrors {
  title?: string;
  department?: string;
  location?: string;
  description?: string;
  requirements?: string;
}

const AdminJobPostingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<JobPostingErrors>({});
  const [jobPosting, setJobPosting] = useState<JobPosting>({
    title: '',
    department: '',
    location: '',
    description: '',
    requirements: '',
    type: 'Full-time'
  });

  const validateForm = () => {
    const newErrors: JobPostingErrors = {};
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobPosting(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof JobPostingErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields!',
      });
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
      
      navigate('/admin/jobs');
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: 'Error',
        description: 'Failed to create job posting. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/jobs')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>
      </div>

      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
      >
        Create Job Posting
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full"
      >
        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">Job Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input
                    name="title"
                    value={jobPosting.title}
                    onChange={handleInputChange}
                    placeholder="Job Title"
                    className={`h-12 text-lg ${errors.title ? 'border-red-500' : ''}`}
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
                    <SelectTrigger className={`h-12 ${errors.department ? 'border-red-500' : ''}`}>
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
                    <SelectTrigger className={`h-12 ${errors.location ? 'border-red-500' : ''}`}>
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
                    <SelectTrigger className="h-12">
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
                    rows={6}
                    className={`min-h-[150px] text-base ${errors.description ? 'border-red-500' : ''}`}
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
                    rows={6}
                    className={`min-h-[150px] text-base ${errors.requirements ? 'border-red-500' : ''}`}
                  />
                  {errors.requirements && (
                    <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>
                  )}
                </div>

                <div className="md:col-span-2 flex gap-4 justify-end">
                  <Button
                    variant="outline"
                    type="button"
                    size="lg"
                    onClick={() => navigate('/admin/jobs')}
                    className="w-full md:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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