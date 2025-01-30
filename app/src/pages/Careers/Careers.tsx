import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { fetchJobs, createJob } from '@/actions/jobActions';
import JobApplicationModal from './jobApplyForm';
import { useAuth } from '@/middleware/authContext';

const CareerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const JOBS_PER_PAGE = 10;
  const {isAuthenticated}=useAuth()
  const [selectedJob, setSelectedJob] = useState(null);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);

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

  const handleApplyJob = (id) => {
    const job = jobs.find(job => job._id === id);
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const handleCreateJob = async (jobData) => {
    try {
      await createJob(jobData);
      // Refresh the job list after creating a new job
      const response = await fetchJobs(page, JOBS_PER_PAGE);
      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages);
      setIsCreateJobModalOpen(false);
    } catch (error) {
      console.error('Failed to create job:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {selectedJob && <JobApplicationModal job={selectedJob} onClose={handleCloseModal} />}
      {/* {isCreateJobModalOpen && (
        <CreateJobModal
          onClose={() => setIsCreateJobModalOpen(false)}
          onSubmit={handleCreateJob}
        />
      )} */}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Career Opportunities</h1>
        {isAuthenticated && <Button onClick={() => setIsCreateJobModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Job
        </Button>}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-gray-600" size={48} />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Card key={job._id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{job.department}</p>
                <p className="text-sm text-gray-600 mb-4">{job.location}</p>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <Button
                  variant="outline"
                  onClick={() => handleApplyJob(job._id)}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8 space-x-4">
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
      </div>
    </div>
  );
};

export default CareerPage;