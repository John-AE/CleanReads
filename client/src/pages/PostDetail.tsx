import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import BlogPost from "@/components/BlogPost";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import workspaceImage from '@assets/generated_images/Workspace_blog_image_dc76c643.png';

export default function PostDetail() {
  const [match, params] = useRoute("/post/:id");
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Fetch real post data from API
  const { data: post, isLoading, error } = useQuery({
    queryKey: [`/api/posts/${params?.id}`],
    enabled: !!params?.id,
  });

  // TODO: remove mock functionality - fallback mock post for display
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

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleEdit = () => {
    toast({
      title: "Edit feature",
      description: "Post editing functionality will be available soon",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || mockPost.title,
        text: post?.excerpt || mockPost.content.substring(0, 200) + '...',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Post link has been copied to clipboard",
      });
    }
  };

  const handleCreatePost = () => {
    setLocation("/editor");
  };

  if (!match) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onLoginClick={handleLogin}
          isAuthenticated={isAuthenticated}
          onCreatePost={handleCreatePost}
        />
        <div className="container mx-auto px-6 py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || (!post && !isLoading)) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onLoginClick={handleLogin}
          isAuthenticated={isAuthenticated}
          onCreatePost={handleCreatePost}
        />
        <div className="container mx-auto px-6 py-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist or has been removed.</p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Use real post data if available, otherwise fallback to mock
  const displayPost = post || mockPost;
  const isOwner = isAuthenticated && user && post && post.authorId === user.id;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLoginClick={handleLogin}
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
          id={displayPost.id}
          title={displayPost.title}
          content={displayPost.content}
          image={displayPost.featuredImage || workspaceImage}
          author={post?.author 
            ? (post.author.firstName && post.author.lastName 
                ? `${post.author.firstName} ${post.author.lastName}`
                : post.author.email || 'Anonymous')
            : displayPost.author
          }
          publishDate={post?.publishedAt 
            ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : displayPost.publishDate
          }
          readTime={Math.ceil(displayPost.content.length / 1000) + ' min'}
          category={displayPost.category}
          isOwner={isOwner}
          onEdit={handleEdit}
          onShare={handleShare}
        />
      </main>
      
    </div>
  );
}