import { isRejectedWithValue } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiErrorHandler = () => (next) => (action) => {
  
  if (isRejectedWithValue(action)) {
    
    const  response  = action.payload || {};
    let errorMessage =response?.response?.data?.message ||response.message || 'An unknown error occurred'; // Default error message
    if (response) {
      // Check status code and set a custom message
      if (response.status>=400) {
          if(response.status===401)
         { errorMessage = 'Session Expired- Please log in again';
          setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }, 3000); }
          errorMessage =  response?.response?.data?.message ||response.message  ||'An unknown error occurred'; 
      }
    }


  S
  }
  return next(action);
};

export default apiErrorHandler;