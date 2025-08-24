import { useState } from "react";
import { MapPin, Heart, MessageCircle, Share, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock data for map pins/posts
const mockPosts = [
  {
    id: 1,
    user: { name: "Sarah Chen", avatar: "🧳" },
    location: "Santorini, Greece", 
    image: "🏖️",
    caption: "Sunset views that take your breath away!",
    likes: 234,
    comments: 42,
    coordinates: { x: 60, y: 40 }
  },
  {
    id: 2,
    user: { name: "Alex Rodriguez", avatar: "⛰️" },
    location: "Swiss Alps, Switzerland",
    image: "🏔️", 
    caption: "Adventure awaits at every peak!",
    likes: 187,
    comments: 28,
    coordinates: { x: 40, y: 30 }
  },
  {
    id: 3,
    user: { name: "Maya Patel", avatar: "🍜" },
    location: "Tokyo, Japan",
    image: "🍣",
    caption: "Street food paradise in Shibuya",
    likes: 156,
    comments: 31,
    coordinates: { x: 80, y: 60 }
  }
];

const Home = () => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 bg-card border-b border-border shadow-travel">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Explo</h1>
            <p className="text-sm text-muted-foreground">Discover nearby adventures</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="p-4 bg-muted/30 border-b border-border animate-slide-up">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">Distance: 10km</Button>
            <Button variant="outline" size="sm">Budget: Any</Button>
            <Button variant="outline" size="sm">Activity: All</Button>
          </div>
        </div>
      )}

      {/* Map-First Feed */}
      <div className="relative flex-1">
        {/* Interactive Map Placeholder */}
        <div className="h-[400px] bg-gradient-nature relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
          
          {/* Map Pins */}
          {mockPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
              className={cn(
                "absolute w-10 h-10 bg-secondary rounded-full shadow-adventure",
                "flex items-center justify-center text-white font-bold",
                "hover:scale-110 transition-transform duration-200 animate-bounce-in",
                selectedPost === post.id && "scale-125 shadow-glow"
              )}
              style={{ 
                left: `${post.coordinates.x}%`, 
                top: `${post.coordinates.y}%`,
                animationDelay: `${post.id * 0.2}s`
              }}
            >
              <MapPin className="w-5 h-5" />
            </button>
          ))}
          
          {/* Map UI Elements */}
          <div className="absolute top-4 left-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-travel">
              <p className="text-sm font-medium text-foreground">3 new posts nearby</p>
            </div>
          </div>
        </div>

        {/* Selected Post Card */}
        {selectedPost && (
          <div className="p-4 animate-slide-up">
            {mockPosts
              .filter(post => post.id === selectedPost)
              .map((post) => (
                <Card key={post.id} className="p-0 overflow-hidden shadow-travel">
                  {/* Post Header */}
                  <div className="p-4 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-adventure rounded-full flex items-center justify-center text-white font-bold">
                      {post.user.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{post.user.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {post.location}
                      </p>
                    </div>
                  </div>

                  {/* Post Image */}
                  <div className="h-64 bg-gradient-sunset flex items-center justify-center text-8xl">
                    {post.image}
                  </div>

                  {/* Post Actions */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-foreground">{post.caption}</p>
                  </div>
                </Card>
              ))
            }
          </div>
        )}

        {/* Recent Posts List */}
        {!selectedPost && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Adventures</h2>
            <div className="grid gap-4">
              {mockPosts.map((post) => (
                <Card key={post.id} className="p-4 hover:shadow-travel transition-shadow cursor-pointer"
                      onClick={() => setSelectedPost(post.id)}>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-ocean rounded-xl flex items-center justify-center text-2xl">
                      {post.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{post.user.name}</h3>
                      <p className="text-sm text-muted-foreground">{post.location}</p>
                      <p className="text-xs text-muted-foreground">{post.likes} likes • {post.comments} comments</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <Button
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-adventure hover:shadow-glow shadow-adventure animate-float"
          onClick={() => window.location.href = '/app/create'}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Home;