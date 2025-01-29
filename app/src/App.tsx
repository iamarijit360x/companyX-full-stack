import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Auth from "@/pages/Auth";

import Navbar from "@/components/navbar";

import Providers from "@/components/providers";
import ProtectedRoute from "@/components/protected-route";
import ServicesPage from "./pages/Services";
import PortfolioPage from "./pages/PortFolio";
import CareerPage from "./pages/Careers/Careers";
import AdminJobPostingPage from "./pages/Admin/CreateJob";
import AdminJobsList from "./pages/Admin/JobList";
import JobApplicantsList from "./pages/Admin/Applicants";
import AdminLogin from "./pages/Admin/Login";
import BlogList from "./pages/Blogs/ListBlogs";
import CreateBlog from "./pages/Blogs/CreateBlog";
import BlogView from "./pages/Blogs/ViewBlog";
function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Navbar />
        <div style={{ paddingTop: '60px' }}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path='/admin/create-job' element={<AdminJobPostingPage/>}/>
              <Route path='/admin/jobs' element={<AdminJobsList/>}/>
              <Route path='/admin/jobs/:jobId' element={<JobApplicantsList/>}/>
              <Route path='/admin/create-blog' element={<CreateBlog/>}/>
            </Route>
            <Route path='/admin' element={<AdminLogin/>}/>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path='/service' element={<ServicesPage/>}/>
            <Route path='/portfolio' element={<PortfolioPage/>}/>
            <Route path='/career' element={<CareerPage/>}/>
            <Route path='/blogs' element={<BlogList/>}/>
            
            <Route path='/blog/:id' element={<BlogView/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
