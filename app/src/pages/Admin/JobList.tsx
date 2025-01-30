import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
    ArrowUpDown,
    Edit,
    Trash2
} from 'lucide-react';
import { fetchJobs } from '@/actions/jobActions';
import { convertISOToDate } from '@/lib/utils';

const AdminJobsList = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: 'createdAt',
        direction: 'descending'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10); // Default limit
    const navigate = useNavigate();

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const response = await fetchJobs(currentPage, limit);
                const data = response.data.jobs.map(job => ({
                    id: job._id,
                    title: job.title,
                    location: job.location,
                    postDate: job.createdAt,
                    status: job.type
                }));
                setJobs(data);
                setTotalPages(response.data.totalPages); // Assuming the API returns totalPages
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        loadJobs();
    }, [currentPage, limit]);

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

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
        setCurrentPage(1); // Reset to the first page when changing the limit
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Job Listings</h1>

            <div className="mb-4 flex items-center space-x-2">
                <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md"
                />
            </div>
            <div className="mt-4 flex justify-end">
                <Button onClick={() => navigate('/admin/create-job')}>
                    Create Job
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead
                            onClick={() => handleSort('title')}
                            className="cursor-pointer hover:bg-gray-100"
                        >
                            <div className="flex items-center">
                                Job Title
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </div>
                        </TableHead>
                        <TableHead
                            onClick={() => handleSort('location')}
                            className="cursor-pointer hover:bg-gray-100"
                        >
                            <div className="flex items-center">
                                Location
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </div>
                        </TableHead>
                        <TableHead
                            onClick={() => handleSort('createdAt')}
                            className="cursor-pointer hover:bg-gray-100"
                        >
                            <div className="flex items-center">
                                Post Date
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredJobs.map((job) => (
                        <TableRow key={job.id} onClick={() => handleRowClick(job.id)} className="cursor-pointer">
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{job.location}</TableCell>
                            <TableCell>{convertISOToDate(job.postDate)}</TableCell>
                            <TableCell>{job.status}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={(e) => { e.stopPropagation(); handleEdit(job.id); }}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={(e) => { e.stopPropagation(); handleDelete(job.id); }}
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
                <div className="text-center text-gray-500 mt-4">
                    No jobs found
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2">
                    <span>Rows per page:</span>
                    <select
                        value={limit}
                        onChange={(e) => handleLimitChange(Number(e.target.value))}
                        className="border rounded p-1"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AdminJobsList;