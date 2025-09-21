import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  featured?: boolean;
}

export default function BlogCard({ 
  id, 
  title, 
  excerpt, 
  image, 
  author, 
  publishDate, 
  readTime, 
  category,
  featured = false 
}: BlogCardProps) {
  return (
    <Card className={`group hover-elevate overflow-hidden transition-all duration-300 hover:shadow-lg ${featured ? 'md:col-span-2' : ''}`}>
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          data-testid={`img-blog-${id}`}
        />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs font-accent">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground font-accent">
            {readTime} read
          </span>
        </div>
        
        <h3 className={`font-serif font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span className="font-accent">{author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className="font-accent">{publishDate}</span>
            </div>
          </div>
          
          <Link href={`/post/${id}`} data-testid={`link-post-${id}`}>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}