import { apiBlog } from '@/api/apiBlog';
import axios from 'axios';

export const fetchBLogs = async (page,limit) => {
     
        try {
            const response = await axios.get(`${apiBlog}?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    };  

    
export const createBlog = async (data) => {
     
    try {
        const response = await axios.post(`${apiBlog}`,data);
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