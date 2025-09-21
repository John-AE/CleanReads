import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroImage from '@assets/generated_images/Hero_background_gradient_f09a9c92.png';

interface HeroProps {
  onGetStarted?: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          Stories Worth
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
            Sharing
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto">
          Discover thoughtful writing on life, design, and the spaces between. 
          A place where ideas flourish and conversations begin.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8"
            onClick={onGetStarted}
            data-testid="button-get-started"
          >
            Start Reading
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-transparent border-white/30 text-white hover:bg-white/10 backdrop-blur-md px-8"
            data-testid="button-learn-more"
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-16 animate-bounce">
          <ArrowDown className="w-6 h-6 mx-auto text-white/60" />
        </div>
      </div>
    </section>
  );
}