import { useState } from "react";
import Header from "@/components/Header";
import RichTextEditor from "@/components/RichTextEditor";
import AuthModal from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Editor() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume authenticated to access editor

  const handleAuth = (credentials: any) => {
    console.log('Authentication:', credentials);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    // TODO: remove mock functionality - implement real authentication
  };

  const handleSave = (content: { title: string; content: string; category: string }) => {
    console.log('Saving post:', content);
    // TODO: remove mock functionality - implement real post saving
  };

  const handlePreview = () => {
    console.log('Preview post');
    // TODO: remove mock functionality - implement real preview
  };

  const handleCreatePost = () => {
    console.log('Create new post');
    // TODO: remove mock functionality - reset editor for new post
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLoginClick={() => setIsAuthModalOpen(true)}
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
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={handleAuth}
      />
    </div>
  );
}