import { apiDashboardRecentBlogs, apiDashboardRecentJobs, apiDashboardStats } from '@/api/apiDashboard';
import axiosInstance from '@/middleware/axiosInterCenptor';

export const fetchRecentBlogs = async () => {
     
        try {
            const response = await axiosInstance.get(`${apiDashboardRecentBlogs}`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error)
        }
    };  

    

    export const fetchRecentJobs = async () => {
     
        try {
            const response = await axiosInstance.get(`${apiDashboardRecentJobs}`);
            console.log(response.data)

            return response.data;
        } catch (error) {
            console.log(error)
        }
    };  

    

    export const fetchStats = async (dateRange) => {
     
        try {
            const response = await axiosInstance.get(`${apiDashboardStats}?dateRange=${dateRange}`);
            console.log(response.data)

            return response.data;
        } catch (error) {
            console.log(error)
        }
    };  

    