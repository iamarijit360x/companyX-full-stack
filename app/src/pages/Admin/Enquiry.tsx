import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEnquires, markAsResolved } from '@/actions/enquiryActions';
import ConfirmModal from '@/components/dialogBox';

const EnquiryView = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState('all');
  
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const data = await getEnquires(currentPage,status)
      setEnquiries(data.enquiries);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [currentPage, status]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Enquiries</h1>
        <p className="text-gray-600">Manage and track all your enquiries</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Enquiries Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {enquiries.map((enquiry) => (
            <Card key={enquiry._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="truncate">{enquiry.subject}</span>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    enquiry.status === 'Pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {enquiry.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">From: {enquiry.email}</p>
                  <p className="text-sm line-clamp-3">{enquiry.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
              {enquiry.status!=='Resolved' && <CardFooter><ConfirmModal action={async ()=>{await markAsResolved(enquiry._id);fetchEnquiries();}} buttonText={"Mark as Resolved"} alertDescription='This Action goinig to mark as resolved this ticket'/></CardFooter>}
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`w-8 h-8 rounded-lg ${
              currentPage === index + 1
                ? 'bg-gray-900 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {index + 1}
          </button>
        ))}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default EnquiryView;