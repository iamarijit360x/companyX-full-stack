import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  Loader2, 
  MapPin, 
  Building2, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { fetchJobs, createJob } from '@/actions/jobActions';
import JobApplicationModal from './jobApplyForm';
import { useAuth } from '@/middleware/authContext';
import { useNavigate } from 'react-router-dom';

const CareerPage = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const { isAuthenticated } = useAuth();
  const JOBS_PER_PAGE = 10;

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        const response = await fetchJobs(page, JOBS_PER_PAGE,'Active');
        setJobs(response.data.jobs);
        setFilteredJobs(response.data.jobs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, [page]);

  useEffect(() => {
    const filtered = jobs?.filter(job => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        job?.title.toLowerCase().includes(searchTerm) ||
        job?.department?.toLowerCase().includes(searchTerm) ||
        job?.location?.toLowerCase().includes(searchTerm) ||
        job?.description?.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredJobs(filtered);
  }, [searchQuery, jobs]);

  const handleApplyJob = (id) => {
    const job = jobs.find(job => job._id === id);
    setSelectedJob(job);
  };

  return (
    <div className="min-h-screen py-16 px-6">
      <AnimatePresence>
        {selectedJob && <JobApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-extralight tracking-tight">Open Positions</h1>
            {isAuthenticated && (
              <Button 
                onClick={() => navigate('/admin/create-job')}
                variant="outline"
                className="group"
              >
                <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                Post Position
              </Button>
            )}
          </div>

          <div className="flex items-center max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
              <Input
                type="text"
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-none bg-secondary"
              />
            </div>
          </div>
        </motion.div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin h-8 w-8 opacity-50" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader className="space-y-4">
                      <div className="space-y-2">
                        <CardContent className="p-0">
                          <h2 className="text-xl font-light tracking-tight">{job.title}</h2>
                          <div className="space-y-2 mt-4 text-sm opacity-70">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm opacity-70 mb-6 line-clamp-3">{job.description}</p>
                      <Button
                        variant="ghost"
                        className="group w-full justify-between hover:bg-secondary"
                        onClick={() => handleApplyJob(job._id)}
                      >
                        View Position
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-16 opacity-70">
                No positions found matching your search
              </div>
            )}
          </motion.div>
        )}

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex justify-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setPage(prev => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="ghost"
              onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerPage;