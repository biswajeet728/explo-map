import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Chrome, Facebook, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to the app - will need Supabase integration for real auth
    navigate("/app");
  };

  const handleSocialAuth = (provider: string) => {
    // For now, just navigate to the app - will need Supabase integration for real auth
    console.log(`Auth with ${provider}`);
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/interests")}
          className="p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-sm text-muted-foreground">
          Step 2 of 2
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            {isLogin ? "Welcome back!" : "Join Explo"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? "Sign in to continue your journey" 
              : "Create your account to start exploring"
            }
          </p>
        </div>

        {/* Social Auth Options */}
        <div className="space-y-3">
          <Button
            onClick={() => handleSocialAuth("google")}
            variant="outline"
            size="lg"
            className="w-full justify-center space-x-3 hover:shadow-travel transition-all duration-300"
          >
            <Chrome className="w-5 h-5" />
            <span>Continue with Google</span>
          </Button>
          
          <Button
            onClick={() => handleSocialAuth("facebook")}
            variant="outline"
            size="lg"
            className="w-full justify-center space-x-3 hover:shadow-travel transition-all duration-300"
          >
            <Facebook className="w-5 h-5" />
            <span>Continue with Facebook</span>
          </Button>

          <Button
            onClick={() => handleSocialAuth("twitter")}
            variant="outline"
            size="lg"
            className="w-full justify-center space-x-3 hover:shadow-travel transition-all duration-300"
          >
            <Twitter className="w-5 h-5" />
            <span>Continue with Twitter</span>
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              required
            />
          </div>
          
          <div>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <Button 
            type="submit"
            size="lg"
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            <Mail className="mr-2 h-5 w-5" />
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        {/* Toggle Auth Mode */}
        <div className="text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            {isLogin 
              ? "Don't have an account? " 
              : "Already have an account? "
            }
            <span className="text-primary underline">
              {isLogin ? "Sign up" : "Sign in"}
            </span>
          </button>
        </div>

        {/* Note about real authentication */}
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground">
            This is a demo version. Click any option to continue to the app.
            Real authentication requires Supabase integration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;