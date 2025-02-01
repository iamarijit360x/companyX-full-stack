import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    ArrowUpDown,
    Plus,
    Edit,
    Trash2,
    Search,
    ArrowBigLeft
} from 'lucide-react';
import { fetchJobs } from '@/actions/jobActions';
import { convertISOToDate } from '@/lib/utils';
import { stat } from 'fs';
import BackendLoadingBackdrop from '@/components/backEndLoadingDrop';

const AdminJobsList = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: 'createdAt',
        direction: 'descending'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const navigate = useNavigate();
    const [status, setStatus] = useState('Active')
    const [isLoading,setIsLoading]=useState(true);
    useEffect(() => {
        const loadJobs = async () => {
            try {
                const response = await fetchJobs(currentPage, limit, status);
                const data = response.data.jobs.map(job => ({
                    id: job._id,
                    title: job.title,
                    location: job.location,
                    postDate: job.createdAt,
                    status: job.type
                }));
                setJobs(data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
            finally{
                setIsLoading(false)
            }
        };

        loadJobs();
    }, [currentPage, limit, status]);

    const sortedJobs = useMemo(() => {
        let sortableJobs = [...jobs];
        if (sortConfig.key) {
            sortableJobs.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableJobs;
    }, [jobs, sortConfig]);

    const filteredJobs = useMemo(() => {
        return sortedJobs.filter(job =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sortedJobs, searchTerm]);

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'descending'
                ? 'ascending'
                : 'descending'
        }));
    };

    const handleEdit = (jobId) => {
        console.log(`Edit job ${jobId}`);
    };

    const handleDelete = (jobId) => {
        setJobs(prev => prev.filter(job => job.id !== jobId));
    };

    const handleRowClick = (jobId) => {
        navigate(`/admin/jobs/${jobId}`);
    };

    return (
        <div className="w-full max-w-[95%] mx-auto p-8 h-screen">
            <BackendLoadingBackdrop isLoading={isLoading}/>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-light tracking-tight">Job Listings</h2>
                <div>
                    <Button
                        onClick={() => navigate('/admin/create-job')}
                        className="hover:bg-accent transition-colors"
                        variant="outline"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Post A Job
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/admin/')}
                        className="hover:bg-accent transition-colors ml-1"
                        >
                        <ArrowBigLeft className="h-4 w-4 mr-2" />
                        Go Back to Dashboard
                    </Button>
                </div>

            </div>
            <div className="flex items-center space-x-2 mb-8">
                <span className="text-sm text-muted-foreground">Filter by Status:</span>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-input bg-background rounded p-1 text-sm"
                >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                </select>
            </div>

            <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by job title or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-6 border-border focus:border-ring rounded-md text-base w-full"
                />
            </div>

            <div className="border border-border rounded-lg shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-muted/50">
                            <TableHead
                                onClick={() => handleSort('title')}
                                className="cursor-pointer hover:bg-muted transition-colors font-medium"
                            >
                                <div className="flex items-center">
                                    Job Title
                                    <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
                                </div>
                            </TableHead>
                            <TableHead
                                onClick={() => handleSort('location')}
                                className="cursor-pointer hover:bg-muted transition-colors font-medium"
                            >
                                <div className="flex items-center">
                                    Location
                                    <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
                                </div>
                            </TableHead>
                            <TableHead
                                onClick={() => handleSort('createdAt')}
                                className="cursor-pointer hover:bg-muted transition-colors font-medium"
                            >
                                <div className="flex items-center">
                                    Post Date
                                    <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
                                </div>
                            </TableHead>
                            <TableHead className="font-medium">Status</TableHead>
                            <TableHead className="font-medium">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredJobs.map((job) => (
                            <TableRow
                                key={job.id}
                                onClick={() => handleRowClick(job.id)}
                                className="cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                                <TableCell className="font-medium">{job.title}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell className="text-muted-foreground">{convertISOToDate(job.postDate)}</TableCell>
                                <TableCell>
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                                        {job.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => { e.stopPropagation(); handleEdit(job.id); }}
                                            className="hover:bg-muted text-foreground"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => { e.stopPropagation(); handleDelete(job.id); }}
                                            className="hover:bg-destructive/90 hover:text-destructive-foreground text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {filteredJobs.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No jobs found
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center mt-6">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Rows per page:</span>
                    <select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="border border-input bg-background rounded p-1 text-sm"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div className="flex items-center space-x-4">
                    <Button
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        disabled={currentPage === 1}
                        variant="outline"
                        className="hover:bg-muted"
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        className="hover:bg-muted"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AdminJobsList;