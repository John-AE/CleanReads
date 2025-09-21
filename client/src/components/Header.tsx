import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PenTool, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  onLoginClick?: () => void;
  isAuthenticated?: boolean;
  onCreatePost?: () => void;
}

export default function Header({ onLoginClick, isAuthenticated = false, onCreatePost }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" data-testid="link-home">
            <h1 className="text-2xl font-serif font-bold text-foreground hover-elevate px-2 py-1 rounded-md transition-colors">
              Elegant Blog
            </h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" data-testid="link-home-nav">
              <span className="text-muted-foreground hover:text-foreground transition-colors">Home</span>
            </Link>
            <Link href="/about" data-testid="link-about">
              <span className="text-muted-foreground hover:text-foreground transition-colors">About</span>
            </Link>
            <Link href="/contact" data-testid="link-contact">
              <span className="text-muted-foreground hover:text-foreground transition-colors">Contact</span>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            {isAuthenticated ? (
              <Button 
                onClick={onCreatePost}
                className="gap-2"
                data-testid="button-create-post"
              >
                <PenTool className="w-4 h-4" />
                Write
              </Button>
            ) : (
              <Button 
                onClick={onLoginClick}
                data-testid="button-login"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}