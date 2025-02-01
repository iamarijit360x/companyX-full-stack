import React from 'react';
import { getJobApplicationById, rejectSingleCandidate, selectCandidate } from "@/actions/jobApplication";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, X, Clock, Mail, Phone, Calendar, FileText, Briefcase, MapPin, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

import { useToast } from "@/hooks/use-toast";
import ConfirmModal from "@/components/dialogBox";
import { downloadPdf } from "@/actions/fileAction";
import { Label } from '@/components/ui/lable';

const StatusBadgeMap = {
  "In Progress": "bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full",
  Rejected: "bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full",
  Selected: "bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full",
};

export default function JobApplicationView() {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (applicationId) {
      setIsLoading(true);
      getJobApplicationById(applicationId)
        .then((data) => setApplication(data))
        .finally(() => setIsLoading(false));
    }
  }, [applicationId]);

  const handleSelectCandidate = async (applicantId) => {
    try {
      await selectCandidate(applicantId);
      toast({
        title: 'Candidate Selected',
      });
      const updatedApplication = { ...application, status: 'Selected' };
      setApplication(updatedApplication);
    } catch (error) {
      console.error('Error selecting candidate:', error);
    }
  };

  const handleRejectCandidate = async (applicantId) => {
    try {
      await rejectSingleCandidate(applicantId);
      toast({
        title: 'Candidate Rejected',
      });
      const updatedApplication = { ...application, status: 'Rejected' };
      setApplication(updatedApplication);
    } catch (error) {
      console.error('Error Rejecting candidate:', error);
    }
  };

  if (!application) {
    return (
      <Card className="w-full max-w-7xl mx-auto min-h-[800px]">
        <CardContent className="p-16">
          <div className="flex items-center justify-center">
            <Clock className="animate-spin h-12 w-12 text-gray-400" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-7xl mx-auto min-h-[800px] my-4 shadow-lg">
      <CardHeader className="space-y-6 p-8 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold">Application Details</CardTitle>
            <div className="text-gray-500">
              <p className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {application.jobId.title} • {application.jobId.type}
              </p>
            </div>
          </div>

          {application.status === "In Progress" && (
            <div className="flex gap-3 w-full sm:w-auto">
              <ConfirmModal 
                buttonText="Reject" 
                action={() => handleRejectCandidate(application._id)} 
                alertDescription="This action will reject this candidate and Delete the associated resumes. This cannot be undone." 
              />
              <ConfirmModal 
                buttonText="Select" 
                action={() => handleSelectCandidate(application._id)} 
                alertDescription="This action will Select this candidate." 
              />
              <Button variant="outline" onClick={() => downloadPdf(application.cv)}>
                Download Resume
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-8 p-8">
        <div className="space-y-8">
          {/* Job Details Section */}
          <div className="p-2 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Position Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <span>Department: {application.jobId.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Location: {application.jobId.location}</span>
              </div>
            </div>
          </div>

          {/* Applicant Details */}
          <div className="grid gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-medium text-gray-500">
                  Applicant Name
                </Label>
                <Badge className={StatusBadgeMap[application.status]}>
                  {application.status}
                </Badge>
              </div>
              <p className="text-2xl font-medium">{application.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-lg font-medium text-gray-500 flex items-center gap-2">
                  <Mail className="h-5 w-5" /> Email
                </Label>
                <p className="text-lg">{application.email}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium text-gray-500 flex items-center gap-2">
                  <Phone className="h-5 w-5" /> Phone
                </Label>
                <p className="text-lg">{application.phone}</p>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-500 flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Applied At
            </Label>
            <p className="text-lg">
              {new Date(application.appliedAt).toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-500 flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Applied At
            </Label>
            <p className="text-lg">
              {new Date(application.title).toLocaleString()}
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-lg font-medium text-gray-500 flex items-center gap-2">
              <FileText className="h-5 w-5" /> Cover Letter
            </Label>
            {application.coverLetter ? (
              <div className="p-6 rounded-lg border">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {application.coverLetter}
                </p>
              </div>
            ) : (
              <div className="p-6 font-semibold">
                No Cover Letter Provided
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}