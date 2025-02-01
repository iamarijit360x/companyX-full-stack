import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { fetchBLogs } from '@/actions/blogActions';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { List, Grid, Plus, Search, Loader2 } from 'lucide-react';
import { useAuth } from '@/middleware/authContext';
import { Input } from '@/components/ui/input';
import BackendLoadingBackdrop from '@/components/backEndLoadingDrop';

const BlogList = () => {
    const { isAuthenticated } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const limit = 10;
    const navigate = useNavigate();
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        fetchBlogs(currentPage, debouncedSearch);
    }, [currentPage, debouncedSearch]);

    const fetchBlogs = async (page, query = '') => {
        setIsLoading(true);
        try {
            const response = await fetchBLogs(page, limit, query);
            setBlogs(response.blogs);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
            setBlogs([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
                </div>
            );
        }

        if (blogs.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <div className="text-gray-500 dark:text-gray-400 mb-4">
                        {searchQuery ? 
                            "No articles found matching your search criteria." :
                            "No articles have been published yet."}
                    </div>
                    {isAuthenticated && (
                        <Button
                            onClick={() => navigate('/admin/create-blog')}
                            variant="outline"
                            className="rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create First Article
                        </Button>
                    )}
                </div>
            );
        }

        return (
            <><BackendLoadingBackdrop isLoading={isLoading} /><div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {blogs.map((blog) => (
                    <Card
                        key={blog._id}
                        onClick={() => navigate(`/blog/${blog._id}`)}
                        className={`
                            border-spacing-1 shadow-none transition-all
                            hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer
                            ${viewMode === 'grid' ? 'p-4' : 'p-6'}
                        `}
                    >
                        <CardHeader className="p-0 space-y-1">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </p>
                            <h2 className="text-lg font-medium dark:text-white">{blog.title}</h2>
                        </CardHeader>
                        <CardContent className="p-0 mt-2">
                            <p className="line-clamp-2 dark:text-gray-300">{blog.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div></>
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="mx-auto px-4 py-8 space-y-8 flex-1 w-full max-w-7xl">
                <div className="flex justify-between items-center border-b pb-4">
                    <h1 className="text-xl font-normal dark:text-white">Articles</h1>
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="pl-8 rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            />
                        </div>
                        <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode} className="border rounded-full">
                            <ToggleGroupItem value="list" className="rounded-full">
                                <List className="h-4 w-4 dark:text-white" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="grid" className="rounded-full">
                                <Grid className="h-4 w-4 dark:text-white" />
                            </ToggleGroupItem>
                        </ToggleGroup>
                        {isAuthenticated && (
                            <Button
                                onClick={() => navigate('/admin/create-blog')}
                                variant="outline"
                                className="rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                New Article
                            </Button>
                        )}
                    </div>
                </div>

                {renderContent()}

                {!isLoading && totalPages > 1 && (
                    <Pagination className="flex justify-center pt-8">
                        <PaginationContent>
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(page =>
                                    page === 1 ||
                                    page === totalPages ||
                                    Math.abs(currentPage - page) <= 1
                                )
                                .map((page, index, array) => (
                                    <PaginationItem key={page}>
                                        {array[index - 1] !== page - 1 ? (
                                            <span className="px-2 dark:text-white">...</span>
                                        ) : null}
                                        <PaginationLink
                                            onClick={() => setCurrentPage(page)}
                                            isActive={currentPage === page}
                                            className="rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))
                            }
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
};

export default BlogList;