import { useState } from "react";
import { Settings, MapPin, Calendar, Share, Grid, Bookmark, Map, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const userStats = {
  posts: 127,
  followers: 2340,
  following: 892,
  placesVisited: 45
};

const userBadges = [
  { name: "World Explorer", emoji: "🌍", description: "Visited 5+ continents" },
  { name: "Mountain Climber", emoji: "⛰️", description: "Climbed 10+ peaks" },
  { name: "Foodie", emoji: "🍜", description: "Tried 50+ cuisines" },
  { name: "Beach Lover", emoji: "🏖️", description: "Visited 20+ beaches" }
];

const userPosts = [
  { id: 1, image: "🏖️", location: "Maldives", likes: 234 },
  { id: 2, image: "🏔️", location: "Swiss Alps", likes: 187 },
  { id: 3, image: "🍜", location: "Tokyo", likes: 156 },
  { id: 4, image: "🌆", location: "NYC", likes: 298 },
  { id: 5, image: "🏝️", location: "Bali", likes: 421 },
  { id: 6, image: "🎪", location: "Carnival", likes: 189 }
];

const savedPosts = [
  { id: 1, image: "🦘", location: "Australia", user: "Sarah M." },
  { id: 2, image: "🗾", location: "Japan", user: "Alex K." },
  { id: 3, image: "🏛️", location: "Greece", user: "Maria L." }
];

const visitedPlaces = [
  { name: "Paris, France", visits: 3, lastVisit: "2024" },
  { name: "Tokyo, Japan", visits: 2, lastVisit: "2024" },
  { name: "Bali, Indonesia", visits: 1, lastVisit: "2023" },
  { name: "New York, USA", visits: 4, lastVisit: "2024" }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border shadow-travel">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold text-foreground">Profile</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 animate-fade-in">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-adventure rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-adventure">
              🧳
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">Alex Chen</h2>
              <p className="text-muted-foreground mb-2">Digital nomad & travel enthusiast</p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>Currently in: Lisbon, Portugal</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                <Calendar className="w-3 h-3" />
                <span>Joined March 2023</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{userStats.posts}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{userStats.followers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{userStats.following}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{userStats.placesVisited}</div>
              <div className="text-sm text-muted-foreground">Places</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300">
              Edit Profile
            </Button>
            <Button variant="outline" className="flex-1">
              Share Profile
            </Button>
          </div>
        </Card>

        {/* Badges */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Travel Badges</h3>
          <div className="grid grid-cols-2 gap-3">
            {userBadges.map((badge, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl">{badge.emoji}</div>
                <div>
                  <div className="font-medium text-foreground text-sm">{badge.name}</div>
                  <div className="text-xs text-muted-foreground">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts" className="space-x-2">
              <Grid className="w-4 h-4" />
              <span>Posts</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="space-x-2">
              <Bookmark className="w-4 h-4" />
              <span>Saved</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="space-x-2">
              <Map className="w-4 h-4" />
              <span>Map</span>
            </TabsTrigger>
          </TabsList>

          {/* Posts Grid */}
          <TabsContent value="posts" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {userPosts.map((post) => (
                <div key={post.id} className="aspect-square bg-gradient-sunset flex items-center justify-center text-4xl relative group cursor-pointer">
                  {post.image}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-sm font-semibold">{post.likes} likes</div>
                      <div className="text-xs">{post.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Saved Posts */}
          <TabsContent value="saved" className="mt-4">
            <div className="space-y-4">
              {savedPosts.map((post) => (
                <Card key={post.id} className="p-4 hover:shadow-travel transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-ocean rounded-lg flex items-center justify-center text-3xl">
                      {post.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{post.location}</h3>
                      <p className="text-sm text-muted-foreground">by {post.user}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Map View */}
          <TabsContent value="map" className="mt-4">
            <Card className="p-4">
              {/* Map Placeholder */}
              <div className="h-64 bg-gradient-nature rounded-lg flex items-center justify-center text-white text-center mb-4">
                <div>
                  <Map className="w-12 h-12 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold">Interactive Map</h3>
                  <p className="text-sm opacity-90">Your travel journey visualization</p>
                </div>
              </div>

              {/* Places Visited */}
              <h3 className="text-lg font-semibold text-foreground mb-4">Places Visited</h3>
              <div className="space-y-3">
                {visitedPlaces.map((place, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">{place.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {place.visits} visit{place.visits > 1 ? 's' : ''} • Last: {place.lastVisit}
                      </div>
                    </div>
                    <Badge variant="outline">{place.visits}x</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;