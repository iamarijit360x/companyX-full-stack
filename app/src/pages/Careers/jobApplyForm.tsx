import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Upload, Building2, MapPin } from 'lucide-react';
import { uploadPdf } from '@/actions/fileAction';
import { applyJob } from '@/actions/jobApplication';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

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
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close modal if clicked outside
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const {toast}=useToast()
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
    toast({
      title:"Job Applied Successfully"
    })
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 overflow-y-auto px-11">
      <div className="min-h-screen flex items-center justify-center p-4 ">
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-7xl my-8"
        >
          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-6 p-8">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
                  <div className="flex gap-6 text-base text-gray-600">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      {job.department}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {job.location}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={onClose}
                  className="rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <CardDescription className="text-lg leading-relaxed">
                {job.description}
              </CardDescription>
              {job.requirements && (
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold">Requirements</h4>
                  <ul className="list-disc pl-6 space-y-2 text-base text-gray-600">
                    {JSON.parse(job.requirements).map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-base font-medium">Full Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-base"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-base font-medium">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-base"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-base font-medium">Phone Number</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="h-12 text-base"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-base font-medium">Resume</label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-stone-950 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-6 pb-7">
                          <Upload className="h-10 w-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-lg text-gray-500">
                            {fileName ? fileName : 'Click to upload your resume'}
                          </p>
                          <p className="text-sm text-gray-500">PDF (max. 5MB)</p>
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

                <div className="space-y-3">
                  <label className="text-base font-medium">Cover Letter</label>
                  <Textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Why are you interested in this role?"
                    className="min-h-[200px] text-base leading-relaxed resize-y"
                  />
                  <p className="text-sm text-gray-500 text-right">
                    {formData.coverLetter.length}/{MAX_COVER_LETTER_LENGTH} characters
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive" className="mt-6">
                    <AlertDescription className="text-base">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-end gap-4 pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onClose}
                    className="w-40 h-12 text-base"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="w-40 h-12 text-base"
                  >
                    Apply Now
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default JobApplicationModal;