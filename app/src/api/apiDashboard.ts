
const apiURL = import.meta.env.VITE_APP_REACT_APP_API_URL;

const apiDashboardStats = apiURL + "dashboard/stats";
const apiDashboardRecentBlogs= apiURL + "dashboard/recent-blogs";
const apiDashboardRecentJobs = apiURL + "dashboard/recent-jobs";


export {
    apiDashboardStats,
    apiDashboardRecentBlogs,
    apiDashboardRecentJobs
};