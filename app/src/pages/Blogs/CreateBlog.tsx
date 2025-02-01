import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { createBlog } from '@/actions/blogActions';
import { useAuth } from '@/middleware/authContext';
import { ArrowLeft } from 'lucide-react';

const CreateBlog = () => {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.author) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      await createBlog(formData);
      
      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });
      
      navigate('/blogs');
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate('/blogs')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Button>

        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold text-center">Create New Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  className="w-full h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="author" className="text-sm font-medium">
                  Author
                </label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  className="w-full h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Content
                </label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your blog content here..."
                  className="min-h-[400px] w-full resize-y"
                  required
                />
              </div>

              <div className="flex gap-6 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-base"
                  onClick={() => navigate('/blogs')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Blog Post'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateBlog;