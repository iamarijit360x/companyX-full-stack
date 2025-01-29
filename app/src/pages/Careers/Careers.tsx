import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { fetchJobs } from '@/actions/jobActions';
import JobApplicationModal from './jobApplyForm';

const CareerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const JOBS_PER_PAGE = 2;

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        const response = await fetchJobs(page, JOBS_PER_PAGE);
        setJobs(response.data.jobs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [page]);

  const [selectedJob, setSelectedJob] = useState(null);

  const handleApplyJob = (id) => {
    const job = jobs.find(job => job._id === id);
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="container mx-auto p-6">
      {selectedJob && <JobApplicationModal job={selectedJob} onClose={handleCloseModal} />}
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        Career Opportunities
      </motion.h1>

      <AnimatePresence>
        {loading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-64"
          >
            <Loader2 className="animate-spin" size={48} />
          </motion.div>
        ) : (
          <motion.div 
            key="job-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{job.department}</p>
                    <p className="text-sm text-muted-foreground mb-2">{job.location}</p>
                    <p>{job.description}</p>
                    <Button variant="outline" className="mt-4" onClick={()=>handleApplyJob(job._id)}>Apply Now</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mt-6 space-x-2"
      >
        <Button 
          onClick={() => setPage(prev => Math.max(1, prev - 1))} 
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button 
          onClick={() => setPage(prev => Math.min(totalPages, prev + 1))} 
          disabled={page === totalPages}
        >
          Next
        </Button>
      </motion.div>
    </div>
  );
};

export default CareerPage;