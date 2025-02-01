import React, { useState, useEffect } from 'react';
import { Calendar, Users, Briefcase, FileText, TrendingUp, Plus, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchRecentBlogs, fetchRecentJobs, fetchStats } from '@/actions/dashboardAction';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/skeleton';
import { Backdrop } from '@/components/backdrop';
import BackendLoadingBackdrop from '@/components/backEndLoadingDrop';

// Types remain the same
interface Stats {
  totalBlogs: number;
  totalJobs: number;
  activeJobPostings: number;
  totalApplications: number;
  enquiries: number;
}

interface Job {
  _id: string;
  title: string;
  date: string;
  applications: number;
}

interface Blog {
  _id: string;
  title: string;
  date: string;
  views: number;
}

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<string>('thisWeek');
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [statsData, jobsData, blogsData] = await Promise.all([
          fetchStats(dateRange),
          fetchRecentJobs(),
          fetchRecentBlogs()
        ]);
        setStats(statsData);
        setRecentJobs(jobsData);
        setRecentBlogs(blogsData);

      } catch (error) {
        setStats(null);
        setRecentJobs([]);
        setRecentBlogs([]);

      } finally {
         setIsLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  const StatCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );

  const StatCardSkeleton = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-20" />
      </CardContent>
    </Card>
  );

  const ActivityItemSkeleton = () => (
    <div className="flex items-center justify-between border-b pb-2">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
      <Skeleton className="h-4 w-[50px]" />
    </div>
  );



  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <BackendLoadingBackdrop isLoading={isLoading}/>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="thisWeek">This Week</SelectItem>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer" onClick={() => navigate('/admin/create-job')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Create Job</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">Post a new job opportunity</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer" onClick={() => navigate('/admin/create-blog')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Create Blog</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">Publish a new blog post</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer" onClick={() => navigate('/admin/enquiry')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enquiry</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">View enquiries</div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Total Blogs"
              value={stats?.totalBlogs ?? 0}
              icon={<FileText className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Active Job Posts"
              value={stats?.activeJobPostings ?? 0}
              icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Enquiries"
              value={stats?.enquiries ?? 0}
              icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Total Applications"
              value={stats?.totalApplications ?? 0}
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
          </>
        )}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
            <CardDescription>Latest job opportunities posted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <ActivityItemSkeleton />
                  <ActivityItemSkeleton />
                  <ActivityItemSkeleton />
                </>
              ) : recentJobs.length > 0 ? (
                recentJobs.map((job) => (
                  <div
                    key={job._id}
                    className="flex items-center justify-between border-b pb-2 cursor-pointer"
                    onClick={() => navigate(`/admin/jobs/${job._id}`)}
                  >
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{job.applications}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No recent jobs available</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="cursor-pointer font-semibold" onClick={() => navigate(`/admin/jobs`)}>
            See All Jobs
          </CardFooter>
        </Card>

        {/* Recent Blogs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
            <CardDescription>Latest published articles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <ActivityItemSkeleton />
                  <ActivityItemSkeleton />
                  <ActivityItemSkeleton />
                </>
              ) : recentBlogs.length > 0 ? (
                recentBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="flex items-center justify-between border-b pb-2 cursor-pointer"
                    onClick={() => navigate(`/blog/${blog._id}`)}
                  >
                    <div>
                      <p className="font-medium">{blog.title}</p>
                      <p className="text-sm text-muted-foreground">{blog.date}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{blog.views} views</div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No recent blogs available</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="cursor-pointer font-semibold" onClick={() => navigate(`/blogs`)}>
            See All Blogs
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;