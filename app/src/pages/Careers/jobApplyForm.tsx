import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {uploadPdf} from '@/actions/fileAction';
import {applyJob} from '@/actions/jobApplication';

const JobApplicationModal = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    jobId:job._id,
    name: '',
    email: '',
    phone: '',
    cv: null,
    coverLetter: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async(e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }
    const res=await uploadPdf(file)
    setFormData(prev => ({
      ...prev,
      cv: res.fileId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res=await applyJob(formData);
    console.log(res)
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="w-full max-w-2xl bg-white rounded-lg p-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Apply for {job.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm"><strong>Department:</strong> {job.department}</p>
              <p className="text-sm"><strong>Location:</strong> {job.location}</p>
              <p className="mt-2">{job.description}</p>
              {job.requirements && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    {JSON.parse(job.requirements).map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Full Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Resume (PDF only)</label>
                <Input
                  type="file"
                  name="resume"
                  onChange={handleFileUpload}
                  accept=".pdf"
                />
              </div>
              <div>
                <label className="block mb-2">Cover Letter</label>
                <Textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Why are you interested in this role?"
                />
              </div>
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Application
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