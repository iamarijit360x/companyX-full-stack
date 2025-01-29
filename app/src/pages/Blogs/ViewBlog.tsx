import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { viewBlog } from '@/actions/blogActions';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const BlogView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await viewBlog(id);
        setBlog(response);
      } catch (err) {
        setError('Failed to fetch blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="py-8">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error || 'Blog post not found'}</p>
              <Button onClick={() => navigate('/blogs')} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blogs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-100 mx-auto">
          <CardHeader>
          <div className="flex justify-end gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => navigate(`/admin/blog/edit/${id}`)}
              className="px-6 py-2"
            >
              Edit Post
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (window.confirm('Are you sure you want to delete this blog post?')) {
                  try {
                    await axios.delete(`/api/blog/${id}`);
                    navigate('/blogs');
                  } catch (err) {
                    alert('Failed to delete blog post');
                  }
                }
              }}
              className="px-6 py-2"
            >
              Delete Post
            </Button>
          </div>
            <CardTitle className="text-4xl font-bold mb-4">{blog.title}</CardTitle>
            <CardDescription>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span className="font-medium">{blog.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent>
  <div className="prose prose-lg max-w-full break-words whitespace-normal">
    {blog.content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-6">
        {paragraph}
      </p>
    ))}
  </div>
</CardContent>

          <CardFooter className="flex justify-between mt-8">
            
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BlogView;