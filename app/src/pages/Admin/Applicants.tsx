import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Search,
    Filter,
    Eye,
    Download,
    ChevronLeft,
    ChevronRight,
    ChevronsUpDown,
    ArrowBigLeft
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from '@/components/ui/card';
import { listApplicants, rejectAllCandidates } from '@/actions/jobApplication';
import { downloadPdf } from '@/actions/fileAction';
import { convertISOToDate } from '@/lib/utils';
import { selectCandidate } from '@/actions/jobApplication';
import ConfirmModal from '@/components/dialogBox';
import { useToast } from '@/hooks/use-toast';
import { fetchJobById } from '@/actions/jobActions';
import { Skeleton } from '@/components/skeleton';
import BackendLoadingBackdrop from '@/components/backEndLoadingDrop';

const JobApplicantsList = () => {
    const { jobId } = useParams();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [applicants, setApplicants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [job, setJob] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const navigate = useNavigate();

    const fetchApplicants = async () => {
        setIsLoading(true);
        try {
            const response = await listApplicants(jobId, page, limit);
            setApplicants(response.applications);
            setTotalPages(response.totalPages);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to fetch applicants',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (jobId) {
            fetchJobById(jobId)
                .then((data) => setJob(data))
                .catch(() => {
                    toast({
                        title: 'Error',
                        description: 'Failed to fetch job details',
                        variant: 'destructive',
                    });
                });
        }
    }, [jobId]);

    useEffect(() => {
        fetchApplicants();
    }, [jobId, page, limit]);

    const filteredAndSortedApplicants = useMemo(() => {
        let filtered = applicants.filter(applicant =>
            (searchTerm === '' ||
                applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
            ) &&
            (!statusFilter || statusFilter === 'all' || applicant.status === statusFilter) // FIX HERE
        );

        return filtered.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.status.localeCompare(b.status);
            }
            return b.status.localeCompare(a.status);
        });
    }, [applicants, searchTerm, statusFilter, sortOrder]);

    const handleViewDetails = (applicant) => {
        navigate(`/admin/jobs/application/${applicant._id}`);
    };

    const handleDownloadResume = async (applicant) => {
        try {
            await downloadPdf(applicant.cv);
            toast({
                title: 'Success',
                description: 'Resume downloaded successfully',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to download resume',
                variant: 'destructive',
            });
        }
    };

    const handleSelectCandidate = async (applicantId) => {
        try {
            await selectCandidate(applicantId);
            await fetchApplicants();
            toast({
                title: 'Success',
                description: 'Candidate selected successfully',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to select candidate',
                variant: 'destructive',
            });
        }
    };

    const handlerejectAllCandidates = async () => {
        try {
            await rejectAllCandidates(jobId);
            toast({
                title: 'Success',
                description: 'All in-progress candidates rejected',
            });
            await fetchApplicants();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to reject candidates',
                variant: 'destructive',
            });
        }
    };

    const LoadingSkeleton = () => (
        <>
            {Array.from({ length: limit }, (_, i) => i + 1).map((i) => (
                <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-[120px]" /></TableCell>
                </TableRow>
            ))}
        </>
    );

    const MotionTableRow = motion(TableRow);

    return (
        <div className="w-full max-w-[95%] mx-auto p-8 h-screen">
            <BackendLoadingBackdrop isLoading={isLoading} />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-light tracking-tight">Job Applicants</h2>
                    <Button variant='outline' onClick={() => navigate('/admin/jobs')}>
                        <ArrowBigLeft className="h-4 w-4 mr-2" />
                        Go Back to Jobs</Button>
                    {job?.status === 'Active' && (
                        <ConfirmModal
                            buttonText="Reject All"
                            action={handlerejectAllCandidates}
                            alertDescription="This action will reject all candidates and Delete the asociated resumes. This cannot be undone."
                        />
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative flex-grow">
                        <Input
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem> {/* Use "all" instead of "" */}
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Selected">Selected</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Applied Date</TableHead>
                                <TableHead>
                                    <div className="flex items-center space-x-1">
                                        <span>Status</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                        >
                                            <ChevronsUpDown className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <LoadingSkeleton />
                            ) : (
                                <AnimatePresence>
                                    {filteredAndSortedApplicants.map((applicant) => (
                                        <MotionTableRow
                                            key={applicant.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-900"
                                        >
                                            <TableCell className="font-medium">{applicant.name}</TableCell>
                                            <TableCell>{applicant.email}</TableCell>
                                            <TableCell>{applicant.phone}</TableCell>
                                            <TableCell>{convertISOToDate(applicant.appliedAt)}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${applicant.status === 'In Progress'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : applicant.status === 'Rejected'
                                                            ? 'bg-red-100 text-red-800'
                                                            : applicant.status === 'Selected'
                                                                ? 'bg-green-100 text-green-800'
                                                                : ''
                                                        }`}
                                                >
                                                    {applicant.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => handleViewDetails(applicant)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => handleDownloadResume(applicant)}
                                                    >
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                    {applicant.status === 'In Progress' && (
                                                        <ConfirmModal
                                                            buttonText="Select"
                                                            action={() => handleSelectCandidate(applicant._id)}
                                                            alertDescription="This action will select this candidate."
                                                        />
                                                    )}
                                                </div>
                                            </TableCell>
                                        </MotionTableRow>
                                    ))}
                                </AnimatePresence>
                            )}
                        </TableBody>
                    </Table>

                    {!isLoading && filteredAndSortedApplicants.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-gray-500 py-8"
                        >
                            No applicants found
                        </motion.div>
                    )}

                    <div className="flex items-center justify-between mt-4">
                        <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Per page" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                disabled={page === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-sm">
                                Page {page} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={page === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </motion.div>
        </div>
    );
};

export default JobApplicantsList;