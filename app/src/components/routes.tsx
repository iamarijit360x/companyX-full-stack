import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Auth from "@/pages/Auth";

import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import ProtectedRoute from "@/components/protected-route";
import AdminJobPostingPage from "@/pages/Admin/CreateJob";
import AdminJobsList from "@/pages/Admin/JobList";
import JobApplicantsList from "@/pages/Admin/Applicants";
import CreateBlog from "@/pages/Blogs/CreateBlog";
import EditBlog from "@/pages/Blogs/EditBlog";

import Dashboard from "@/pages/Admin/Dashboard";
import AdminLogin from "@/pages/Admin/Login";
import ServicesPage from "@/pages/Services";
import PortfolioPage from "@/pages/PortFolio";
import CareerPage from "@/pages/Careers/Careers";
import BlogList from "@/pages/Blogs/ListBlogs";
import BlogView from "@/pages/Blogs/ViewBlog";
import NotProtectedRoute from "./not-protected-route";
import ContactUs from "@/pages/Contact";
import Footer from "./footer";

function RoutesComponent() {
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
              <Route path='/admin/' element={<Dashboard/>}/>
              <Route path='/admin/blog/edit/:id' element={<EditBlog/>}/>
            </Route>
            <Route  element={<NotProtectedRoute />} >
                <Route path="/admin/login" element={<AdminLogin />} />
               
            </Route>
            <Route path="/" element={<Home />} />
                <Route path='/contact-us' element={<ContactUs />} />

                <Route path="/auth" element={<Auth />} />
                <Route path='/services' element={<ServicesPage/>}/>
                <Route path='/portfolio' element={<PortfolioPage/>}/>
                <Route path='/career' element={<CareerPage/>}/>
                <Route path='/blogs' element={<BlogList/>}/>
                <Route path='/blog/:id' element={<BlogView/>}/>
           
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </Providers>
  );
}

export default RoutesComponent;
