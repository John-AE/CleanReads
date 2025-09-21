import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, Edit, Share } from "lucide-react";

interface BlogPostProps {
  id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  isOwner?: boolean;
  onEdit?: () => void;
  onShare?: () => void;
}

export default function BlogPost({ 
  id,
  title, 
  content, 
  image, 
  author, 
  publishDate, 
  readTime, 
  category,
  isOwner = false,
  onEdit,
  onShare
}: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Hero Image */}
      <div className="aspect-video overflow-hidden rounded-lg mb-8">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
          data-testid={`img-post-${id}`}
        />
      </div>
      
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="font-accent">
            {category}
          </Badge>
          <span className="text-sm text-muted-foreground font-accent">
            {readTime} read
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
          {title}
        </h1>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-accent">{author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="font-accent">{publishDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-accent">{readTime}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onShare}
              data-testid="button-share"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            {isOwner && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                data-testid="button-edit-post"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {/* Content */}
      <Card>
        <CardContent className="prose prose-lg max-w-none p-8">
          <div 
            className="text-lg leading-relaxed whitespace-pre-wrap"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="text-post-content"
          >
            {content}
          </div>
        </CardContent>
      </Card>
      
      {/* Footer */}
      <footer className="mt-12 pt-8 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold font-accent">{author}</p>
              <p className="text-sm text-muted-foreground">
                Published on {publishDate}
              </p>
            </div>
          </div>
          
          <Button variant="outline" data-testid="button-follow-author">
            Follow
          </Button>
        </div>
      </footer>
    </article>
  );
}