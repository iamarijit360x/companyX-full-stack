import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, User, Loader2, Trash2, Pencil } from "lucide-react";
import { deleteBlog, viewBlog } from "@/actions/blogActions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ConfirmModal from "@/components/dialogBox";

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

  const handleDelete = async () => {
   
      try {
        await deleteBlog(id);
        navigate("/blogs");
      } catch (err) {
        setError("Failed to delete blog post");
      }
    
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container max-w-6xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertDescription>
            {error || "Blog post not found"}
          </AlertDescription>
        </Alert>
        <Button onClick={() => navigate("/blogs")} variant="outline" className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto p-4">
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="space-y-2">
              <CardTitle className="text-4xl font-bold tracking-tight">
                {blog.title}
              </CardTitle>
              <CardDescription>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
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
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <ConfirmModal action={handleDelete} buttonText={"Delete Blog"} alertDescription="This Action cann't be undone"/>
              
   
            </div>
          </div>
        </CardHeader>

        <Separator className="my-6" />

        <CardContent>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {blog.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>

        <CardFooter className="mt-8">
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