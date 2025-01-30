import { apiBlog } from '@/api/apiBlog';
import axiosInstance from '@/middleware/axiosInterCenptor';
import axios from 'axios';

export const fetchBLogs = async (page,limit,search='') => {
     console.log(search)
        try {
            const response = await axios.get(`${apiBlog}?page=${page}&limit=${limit}&searchTerm=${search}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    };  

    
export const createBlog = async (data) => {
     
    try {
        const response = await axiosInstance.post(`${apiBlog}`,data);
        return response.data;
    } catch (error) {
        console.log(error)
    }
};  

export const viewBlog = async (id) => {
     
    try {
        const response = await axios.get(`${apiBlog}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
};  

export const deleteBlog = async (id) => {
     
    try {
        const response = await axiosInstance.delete(`${apiBlog}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
};  

export const editBlog = async (id,formData) => {
     
    try {
        const response = await axiosInstance.put(`${apiBlog}/${id}`,formData);
        return response.data;
    } catch (error) {
        console.log(error)
    }
};  