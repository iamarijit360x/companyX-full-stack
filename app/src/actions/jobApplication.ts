import { apiJobApplication, apiRejectAllCandidate } from '@/api/jobApplication';
import axios from 'axios';

export const applyJob = async (applicationData: any) => {
    try {
        const response = await axios.post(apiJobApplication, applicationData);
        return response.data;
    } catch (error) {
        console.error('Error submitting job application:', error);
        throw error;
    }
};

export const listApplicants = async (jobId, page, limit) => {
    try {
        const response = await axios.get(`${apiJobApplication}${jobId}`, {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching applicants:', error);
        throw error;
    }
};

export const selectCandidate = async (applicationId) => {
    try {
        const response = await axios.patch(`${apiJobApplication}${applicationId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching applicants:', error);
        throw error;
    }
};
export const rejectAllCandidates = async (jobId) => {
    try {
        const response = await axios.patch(`${apiRejectAllCandidate}/${jobId}`);
        return response.data;
    } catch (error) {
        console.error('Error rejecting all candidates:', error);
        throw error;
    }
};