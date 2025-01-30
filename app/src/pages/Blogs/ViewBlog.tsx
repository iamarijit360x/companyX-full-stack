import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, User, Loader2, Trash2, Pencil } from "lucide-react";
import { deleteBlog, viewBlog } from "@/actions/blogActions";
import { cn } from "@/lib/utils"; // If using utility helpers

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
        setError("Failed to fetch blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-gray-600" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <Card className="max-w-md w-full text-center shadow-lg">
          <CardContent className="py-8">
            <p className="text-red-500 font-medium">{error || "Blog post not found"}</p>
            <Button onClick={() => navigate("/blogs")} variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12  md:px-12 lg:px-24 max-w-100 mx-auto">
      <Card className=" w-100 shadow-md border rounded-xl">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold leading-tight">{blog.title}</CardTitle>
              <CardDescription className="mt-2 text-gray-500">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{blog.author}</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </CardDescription>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/admin/blog/edit/${id}`)}
                className="flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" /> Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={async () => {
                  if (window.confirm("Are you sure you want to delete this blog post?")) {
                    try {
                      await deleteBlog(id);
                      navigate("/blogs");
                    } catch (err) {
                      alert("Failed to delete blog post");
                    }
                  }
                }}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Separator className="my-4" />
          <div className="prose prose-lg max-w-full text-gray-800 leading-relaxed">
            {blog.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-start">
          <Button onClick={() => navigate("/blogs")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlogView;
