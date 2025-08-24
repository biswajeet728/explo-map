import { useState } from "react";
import { Search, MapPin, Heart, Bookmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "All", gradient: "bg-gradient-primary" },
  { id: "beaches", name: "Beaches", gradient: "bg-gradient-ocean" },
  { id: "mountains", name: "Mountains", gradient: "bg-gradient-nature" },
  { id: "cities", name: "Cities", gradient: "bg-gradient-sunset" },
  { id: "food", name: "Food", gradient: "bg-gradient-adventure" },
  { id: "adventure", name: "Adventure", gradient: "bg-gradient-adventure" }
];

const trendingPosts = [
  {
    id: 1,
    image: "🏖️",
    location: "Maldives",
    user: "Emma Wilson",
    likes: 1205,
    category: "beaches"
  },
  {
    id: 2,
    image: "🏔️",
    location: "Mount Fuji, Japan",
    user: "Kenji Tanaka",
    likes: 892,
    category: "mountains"
  },
  {
    id: 3,
    image: "🌆",
    location: "New York City",
    user: "Marcus Johnson",
    likes: 756,
    category: "cities"
  },
  {
    id: 4,
    image: "🍜",
    location: "Bangkok Street Food",
    user: "Lily Zhang",
    likes: 643,
    category: "food"
  },
  {
    id: 5,
    image: "🪂",
    location: "Swiss Paragliding",
    user: "Andreas Mueller",
    likes: 567,
    category: "adventure"
  },
  {
    id: 6,
    image: "🏝️",
    location: "Bora Bora",
    user: "Sophie Laurent",
    likes: 1120,
    category: "beaches"
  }
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedPosts, setSavedPosts] = useState<number[]>([]);

  const filteredPosts = trendingPosts.filter(post => {
    const matchesSearch = post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSave = (postId: number) => {
    setSavedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border shadow-travel">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Explore</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search locations, users, or hashtags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="p-4">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-xs"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Content for each category */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden group hover:shadow-travel transition-all duration-300">
                    {/* Post Image */}
                    <div className="aspect-square bg-gradient-sunset flex items-center justify-center text-6xl relative overflow-hidden">
                      {post.image}
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-3">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => toggleSave(post.id)}
                            className={cn(
                              "rounded-full w-10 h-10 p-0",
                              savedPosts.includes(post.id) && "bg-secondary text-secondary-foreground"
                            )}
                          >
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="rounded-full w-10 h-10 p-0"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Post Info */}
                    <div className="p-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <p className="text-sm font-medium text-foreground truncate">
                          {post.location}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          by {post.user}
                        </p>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {post.likes.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No posts found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or explore different categories
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Explore;