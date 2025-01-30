import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { fetchBLogs } from '@/actions/blogActions';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { List, Grid } from 'lucide-react';
import { useAuth } from '@/middleware/authContext';

const BlogList = () => {
    const { isAuthenticated } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const limit = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogs(currentPage);
    }, [currentPage]);

    const fetchBlogs = async (page) => {
        try {
            const response = await fetchBLogs(page, limit);
            setBlogs(response.blogs);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4"
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Blog List</h1>
                <div className="flex items-center gap-4">
                    <ToggleGroup type="single" value={viewMode} onValueChange={handleViewModeChange}>
                        <ToggleGroupItem value="list" aria-label="Toggle list view">
                            <List className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="grid" aria-label="Toggle grid view">
                            <Grid className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                    {isAuthenticated && <Button onClick={() => navigate('/admin/create-blog')}>Create Blog</Button>}
                </div>
            </div>

            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
                {blogs.map((blog) => (
                    <motion.div
                        key={blog._id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card onClick={() => navigate(`/blog/${blog._id}`)} className="cursor-pointer hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="truncate">{blog.title}</CardTitle>
                                <CardDescription className="truncate">{blog.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="line-clamp-3">{blog.content}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Pagination className="mt-6">
                <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            aria-disabled={currentPage === 1}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index + 1}>
                            <PaginationLink
                                onClick={() => handlePageChange(index + 1)}
                                isActive={currentPage === index + 1}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* Next Button */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            aria-disabled={currentPage === totalPages}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </motion.div>
    );
};

export default BlogList;