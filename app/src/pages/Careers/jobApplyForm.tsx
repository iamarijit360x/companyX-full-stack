import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Upload, Building2, MapPin } from 'lucide-react';
import { uploadPdf } from '@/actions/fileAction';
import { applyJob } from '@/actions/jobApplication';
import { Alert,AlertDescription } from '@/components/ui/alert';

const MAX_COVER_LETTER_LENGTH = 2000;

const JobApplicationModal = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    jobId: job._id,
    name: '',
    email: '',
    phone: '',
    cv: null,
    coverLetter: ''
  });
  
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'coverLetter' && value.length > MAX_COVER_LETTER_LENGTH) {
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async(e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }
    
    setError('');
    setFileName(file.name);
    const res = await uploadPdf(file);
    setFormData(prev => ({
      ...prev,
      cv: res.fileId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cv) {
      setError('Please upload your resume');
      return;
    }
    const res = await applyJob(formData);
    console.log(res);
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 max-h-max"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {job.department}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </div>
            </div>
            <CardDescription className="text-base leading-relaxed">
              {job.description}
            </CardDescription>
            {job.requirements && (
              <div className="space-y-2">
                <h4 className="font-semibold">Requirements</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  {JSON.parse(job.requirements).map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Resume</label>
                <div className="mt-1">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 mb-2 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          {fileName ? fileName : 'Click to upload your resume'}
                        </p>
                        <p className="text-xs text-gray-500">PDF (max. 5MB)</p>
                      </div>
                      <Input
                        type="file"
                        name="resume"
                        onChange={handleFileUpload}
                        accept=".pdf"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Letter</label>
                <Textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Why are you interested in this role?"
                  className="min-h-[150px] resize-none"
                />
                <p className="text-xs text-gray-500 text-right">
                  {formData.coverLetter.length}/{MAX_COVER_LETTER_LENGTH} characters
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="w-32"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="w-32"
                >
                  Apply Now
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default JobApplicationModal;