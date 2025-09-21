import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/Header";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Editor() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to create posts",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
    }
  }, [isAuthenticated, isLoading, toast]);

  // Mutation for creating/saving posts
  const createPostMutation = useMutation({
    mutationFn: async (postData: { title: string; content: string; category: string }) => {
      return await apiRequest("/api/posts", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Post created successfully",
        description: "Your blog post has been saved as a draft",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      // Navigate to the created post
      setLocation(`/post/${data.id}`);
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Authentication required",
          description: "Please log in again to continue",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
        return;
      }
      toast({
        title: "Error creating post",
        description: "There was an error saving your post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSave = (content: { title: string; content: string; category: string }) => {
    if (!content.title.trim() || !content.content.trim() || !content.category.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please fill in title, content, and category",
        variant: "destructive",
      });
      return;
    }
    createPostMutation.mutate(content);
  };

  const handlePreview = () => {
    toast({
      title: "Preview feature",
      description: "Preview functionality will be available soon",
    });
  };

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleCreatePost = () => {
    setLocation("/editor");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLoginClick={handleLogin}
        isAuthenticated={isAuthenticated}
        onCreatePost={handleCreatePost}
      />
      
      <main className="py-8">
        <div className="container mx-auto px-6 mb-8">
          <Link href="/" data-testid="link-back-home-editor">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <RichTextEditor
          onSave={handleSave}
          onPreview={handlePreview}
          initialTitle=""
          initialContent=""
          initialCategory=""
        />
      </main>
      
    </div>
  );
}