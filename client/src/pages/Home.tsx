import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import workspaceImage from '@assets/generated_images/Workspace_blog_image_dc76c643.png';
import coffeeImage from '@assets/generated_images/Coffee_lifestyle_image_16f7daa6.png';
import architectureImage from '@assets/generated_images/Architecture_blog_image_49c2d596.png';

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Fetch real blog posts from API
  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["/api/posts?published=true"],
  });

  // TODO: remove mock functionality - fallback mock posts for display
  const mockPosts = [
    {
      id: "1",
      title: "The Art of Mindful Design: Creating Spaces That Inspire",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: workspaceImage,
      author: "Sarah Chen",
      publishDate: "Mar 15, 2024",
      readTime: "5 min",
      category: "Design",
      featured: true
    },
    {
      id: "2",
      title: "Morning Rituals: The Perfect Coffee Experience",
      excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      image: coffeeImage,
      author: "Michael Torres",
      publishDate: "Mar 12, 2024",
      readTime: "3 min",
      category: "Lifestyle"
    },
    {
      id: "3",
      title: "Modern Architecture: Form Meets Function",
      excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      image: architectureImage,
      author: "Emma Rodriguez",
      publishDate: "Mar 10, 2024",
      readTime: "7 min",
      category: "Architecture"
    },
    {
      id: "4",
      title: "The Future of Remote Work Culture",
      excerpt: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
      image: workspaceImage,
      author: "David Kim",
      publishDate: "Mar 8, 2024",
      readTime: "6 min",
      category: "Technology"
    },
    {
      id: "5",
      title: "Sustainable Living in the Modern World",
      excerpt: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.",
      image: coffeeImage,
      author: "Lisa Anderson",
      publishDate: "Mar 5, 2024",
      readTime: "4 min",
      category: "Lifestyle"
    },
    {
      id: "6",
      title: "Design Principles for Digital Products",
      excerpt: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      image: architectureImage,
      author: "Alex Thompson",
      publishDate: "Mar 3, 2024",
      readTime: "8 min",
      category: "Design"
    }
  ];

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleCreatePost = () => {
    setLocation("/editor");
  };

  const scrollToContent = () => {
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLoginClick={handleLogin}
        isAuthenticated={isAuthenticated}
        onCreatePost={handleCreatePost}
      />
      
      <Hero onGetStarted={scrollToContent} />
      
      <main id="content" className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Latest Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Discover thoughtful perspectives on design, lifestyle, and the world around us. 
              Each story is crafted with care to inspire and inform.
            </p>
          </div>
          
          {isAuthenticated && (
            <Button 
              size="lg" 
              onClick={handleCreatePost}
              className="gap-2"
              data-testid="button-create-new-post"
            >
              <PlusCircle className="w-5 h-5" />
              New Post
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoadingPosts ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg h-96 animate-pulse" />
            ))
          ) : posts && Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post: any) => (
              <BlogCard 
                key={post.id} 
                id={post.id}
                title={post.title}
                excerpt={post.excerpt || post.content.substring(0, 200) + '...'}
                image={post.featuredImage || workspaceImage}
                author={post.author.firstName && post.author.lastName 
                  ? `${post.author.firstName} ${post.author.lastName}`
                  : post.author.email || 'Anonymous'
                }
                publishDate={new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
                readTime={Math.ceil(post.content.length / 1000) + ' min'}
                category={post.category}
                featured={false}
              />
            ))
          ) : (
            // Fallback to mock posts if no real posts exist
            mockPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))
          )}
        </div>
        
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" data-testid="button-load-more">
            Load More Stories
          </Button>
        </div>
      </main>
      
      <footer className="bg-muted/30 py-16 mt-24">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">Elegant Blog</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            A space for thoughtful writing and meaningful conversations.
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
      
    </div>
  );
}