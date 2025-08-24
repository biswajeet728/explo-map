import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, MapPin, Camera } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-ocean flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
          {/* Logo */}
          <div className="mb-8 animate-bounce-in">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-glow">
              <Globe className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Main Content */}
          <div className="animate-fade-in space-y-6">
            <h1 className="text-5xl font-bold tracking-tight">
              Explo
            </h1>
            <p className="text-xl text-white/90 max-w-sm leading-relaxed">
              Discover the world, one map at a time.
            </p>
            
            {/* Feature Icons */}
            <div className="flex items-center justify-center space-x-8 mt-8">
              <div className="flex flex-col items-center space-y-2 animate-float">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-white/80">Explore</span>
              </div>
              <div className="flex flex-col items-center space-y-2 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-white/80">Share</span>
              </div>
              <div className="flex flex-col items-center space-y-2 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-white/80">Connect</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 p-6 space-y-4">
        <Button 
          onClick={() => navigate("/interests")}
          size="lg"
          className="w-full bg-white text-primary hover:bg-white/90 font-semibold shadow-travel"
        >
          Start Your Journey
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <div className="text-center">
          <button 
            onClick={() => navigate("/auth")}
            className="text-white/80 text-sm hover:text-white transition-colors"
          >
            Already have an account? <span className="underline">Sign in</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;