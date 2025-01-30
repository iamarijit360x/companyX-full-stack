import { apiJobPosting } from '@/api/jobAPI';
import axiosInstance from '@/middleware/axiosInterCenptor';



// Action to create a job
export const createJob =async (jobData) => {
        try {
            const response = await axiosInstance.post(
                apiJobPosting,
                {
                    title: jobData.title || null,
                    location: jobData.location || null,
                    description: jobData.description || null,
                    requirements: jobData.requirements || [],
                    type: jobData.type || null,
                    department:jobData.department || null,
                },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response)
            return response.data;
        } catch (error) {
            console.log(error)
            return error;
        
        }
    }

// Action to fetch jobs
export const fetchJobs =  async (page,limit) => {
        try {
            const response = await axiosInstance.get(`${apiJobPosting}?page=${page}&limit=${limit}`);
            
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }


// // Action to delete a job
// export const deleteJob = createAsyncThunk(
//     'jobs/deleteJob',
//     async (jobId, { rejectWithValue }) => {
//         try {
//             const response = await axiosInstance.delete(`${apiDeleteJob}/${jobId}`);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error);
//         }
//     }
// );