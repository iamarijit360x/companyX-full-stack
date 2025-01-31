import { apiLogin } from '@/api/apiAuth';
import { apiEnquiry } from '@/api/apiEnquiry';
import axiosInstance from '@/middleware/axiosInterCenptor';
import axios from 'axios';

export const postEnquiry = async (data) => {
     
        try {
            const response = await axios.post(apiEnquiry,data);
            return response.data
        } catch (error) {
            console.log(error)
        }
    };
    export const getEnquires = async (currentPage,status) => {
     
        try {
            const response = await axiosInstance.get(`${apiEnquiry}?page=${currentPage}&status=${status !== 'all' ? status : ''}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    };

    export const markAsResolved = async (id) => {
     
        try {
            const response = await axiosInstance.patch(`${apiEnquiry}/${id}`);
            return response.data
        } catch (error) {
            console.log(error)
        }
    };