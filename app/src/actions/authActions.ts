import { apiLogin } from '@/api/apiAuth';
import axios from 'axios';

export const login = async (data) => {
     
        try {
            const response = await axios.post(apiLogin, {...data});
            return response.data
        } catch (error) {
            console.log(error)
        }
    };