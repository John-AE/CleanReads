import { useState } from "react";
import { useRoute } from "wouter";
import Header from "@/components/Header";
import BlogPost from "@/components/BlogPost";
import AuthModal from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import workspaceImage from '@assets/generated_images/Workspace_blog_image_dc76c643.png';

export default function PostDetail() {
  const [match, params] = useRoute("/post/:id");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // TODO: remove mock functionality - replace with real post data fetching
  const mockPost = {
    id: params?.id || "1",
    title: "The Art of Mindful Design: Creating Spaces That Inspire",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,
    image: workspaceImage,
    author: "Sarah Chen",
    publishDate: "March 15, 2024",
    readTime: "5 min",
    category: "Design"
  };

  const handleAuth = (credentials: any) => {
    console.log('Authentication:', credentials);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    // TODO: remove mock functionality - implement real authentication
  };

  const handleEdit = () => {
    console.log('Navigate to edit post');
    // TODO: remove mock functionality - implement real navigation
  };

  const handleShare = () => {
    console.log('Share post');
    // TODO: remove mock functionality - implement real sharing
  };

  const handleCreatePost = () => {
    console.log('Navigate to create post');
    // TODO: remove mock functionality - implement real navigation
  };

  if (!match) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLoginClick={() => setIsAuthModalOpen(true)}
        isAuthenticated={isAuthenticated}
        onCreatePost={handleCreatePost}
      />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href="/" data-testid="link-back-home">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <BlogPost
          {...mockPost}
          isOwner={isAuthenticated}
          onEdit={handleEdit}
          onShare={handleShare}
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