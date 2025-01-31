

const apiURL = import.meta.env.VITE_APP_REACT_APP_API_URL;

const apiJobApplication = apiURL + "job-application/";
const apiJobApplicationList = apiURL + "job-application/list-applicants/";

const apiRejectAllCandidate = apiURL + "job-application/reject-all";
const apiRejectSingleCandidate=apiURL +"job-application/reject/"

export {
    apiJobApplication,
    apiRejectAllCandidate,
    apiJobApplicationList,
    apiRejectSingleCandidate
   
};