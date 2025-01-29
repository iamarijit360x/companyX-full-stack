

const apiURL = import.meta.env.VITE_APP_REACT_APP_API_URL;

const apiJobApplication = apiURL + "job-application/";
const apiRejectAllCandidate = apiURL + "job-application/reject-all";

export {
    apiJobApplication,
    apiRejectAllCandidate
   
};