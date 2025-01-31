import { apiJobApplication, apiJobApplicationList, apiRejectAllCandidate, apiRejectSingleCandidate } from '@/api/jobApplication';
import axiosInstance from '@/middleware/axiosInterCenptor';
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
        const response = await axiosInstance.get(`${apiJobApplicationList}${jobId}`, {
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
        const response = await axiosInstance.patch(`${apiJobApplication}${applicationId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching applicants:', error);
        throw error;
    }
};
export const rejectAllCandidates = async (applicationId) => {
    try {
        const response = await axiosInstance.patch(`${apiRejectAllCandidate}/${applicationId}`);
        return response.data;
    } catch (error) {
        console.error('Error rejecting all candidates:', error);
        throw error;
    }
};
export const getJobApplicationById = async (applicationId) => {
    try {
        const response = await axiosInstance.get(`${apiJobApplication}${applicationId}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching applicants:', error);
        throw error;
    }
};

export const rejectSingleCandidate = async (applicationId) => {
    try {
        const response = await axiosInstance.patch(`${apiRejectSingleCandidate}${applicationId}`);
        return response.data;
    } catch (error) {
        console.error('Error rejecting all candidates:', error);
        throw error;
    }
};
