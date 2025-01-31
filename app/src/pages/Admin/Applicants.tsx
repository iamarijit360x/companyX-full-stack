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
    Download
} from 'lucide-react';
import { listApplicants, rejectAllCandidates } from '@/actions/jobApplication';
import { downloadPdf } from '@/actions/fileAction';
import { convertISOToDate } from '@/lib/utils';
import { selectCandidate } from '@/actions/jobApplication'; // Import the function
import ConfirmModal from '@/components/dialogBox';
import { useToast } from '@/hooks/use-toast';
import { fetchJobById } from '@/actions/jobActions';

const JobApplicantsList = () => {
    const { jobId } = useParams();

    const {toast}=useToast()
    const [applicants, setApplicants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0)
    const [job,setJob]=useState(null)
    const navigate=useNavigate()
    const fetchApplicants = async () => {
        try {
            const response = await listApplicants(jobId, page, limit);
            setApplicants(response.applications);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Error fetching applicants:', error);
        }
    };
    useEffect(()=>{
    if(jobId)
        fetchJobById(jobId)
        .then((data)=>setJob(data))
    },[jobId])
    useEffect(() => {
        fetchApplicants();
    }, [jobId, page, limit]);
    useEffect(() => {
        fetchApplicants();
    }, [jobId, page, limit]);

    const filteredApplicants = useMemo(() => {
        return applicants.filter(applicant =>
            (searchTerm === '' ||
                applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
            ) &&
            (statusFilter === '' || applicant.status === statusFilter)
        );
    }, [applicants, searchTerm, statusFilter]);

    const handleViewDetails = (applicant) => {
        navigate(`/admin/jobs/application/${applicant._id}`)
        console.log(`View details for applicant ${applicant}`);
    };

    const handleDownloadResume = (applicant) => {
        // Implement resume download logic
        console.dir(applicant);
        downloadPdf(applicant.cv);
    };

    const handleSelectCandidate = async (applicantId) => {
        try {
            await selectCandidate(applicantId);
            fetchApplicants();
            console.log(`Selected candidate ${applicantId}`);
            toast({
                title: 'Candidate Selected',
            });
        } catch (error) {
            console.error('Error selecting candidate:', error);
        }
    };

    const handlerejectAllCandidates = async () => {
            try {
                // Implement reject all candidates logic
                await rejectAllCandidates(jobId)
                toast({
                    title: 'Rejected Successful',
                    description: 'All inPrgress candidates rejected',
                });
                console.log('');
                // Refresh the applicants list
                fetchApplicants();
            } catch (error) {
                console.error('Error rejecting all candidates:', error);
            }
        
    };
    const MotionTableRow = motion(TableRow);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 h-screen"
        >
            <h2 className="text-2xl font-bold mb-4">Job Applicants</h2>

            <div className="flex mb-4 space-x-2">
                <div className="relative flex-grow">
                    <Input
                        placeholder="Search applicants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-80"
                    />
                    <Search className="absolute left-3 top-3 h-4  text-gray-500" />
                </div>

               
                {job?.status==='Active' && <ConfirmModal buttonText={"Reject All"} action={handlerejectAllCandidates} alertDescription='  This action will reject all candidates. This cannot be undone.'/>}

            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <AnimatePresence>
                        {filteredApplicants.map((applicant) => (
                            <MotionTableRow
                                key={applicant.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <TableCell>{applicant.name}</TableCell>
                                <TableCell>{applicant.email}</TableCell>
                                <TableCell>{applicant.phone}</TableCell>
                                <TableCell>{convertISOToDate(applicant.appliedAt)}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${applicant.status === 'In Progress' ? 'text-yellow-100' :applicant.status === 'Rejected' ? 'bg-red-100 text-yellow-800' :applicant.status==='Selected'?'bg-green-100 text-green-800':''}`}
                                    >
                                        {applicant.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="icon" onClick={() => handleViewDetails(applicant)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={() => handleDownloadResume(applicant)}>
                                            <Download className="h-4 w-4" />
                                        </Button>
                                        {applicant.status === 'In Progress' && (
                                             <ConfirmModal buttonText={'Select'} action={() => handleSelectCandidate(applicant._id)} alertDescription='  This action will Select this candidate. '/>
                                           
                                        )}
                                    </div>
                                </TableCell>
                            </MotionTableRow>
                        ))}
                    </AnimatePresence>

                </TableBody>
            </Table>

            {filteredApplicants.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-500 mt-4"
                >
                    No applicants found
                </motion.div>
            )}
        </motion.div>
    );
};

export default JobApplicantsList;