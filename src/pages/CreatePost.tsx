import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, MapPin, Hash, DollarSign, Clock, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mediaTypes = [
  { id: "photo", name: "Photo", icon: "📸", description: "Share a moment" },
  { id: "video", name: "Video", icon: "🎬", description: "Tell a story" },
  { id: "reel", name: "Reel", icon: "🎪", description: "Quick adventure" }
];

const categories = [
  { id: "beaches", name: "Beaches", emoji: "🏖️" },
  { id: "mountains", name: "Mountains", emoji: "⛰️" },
  { id: "cities", name: "Cities", emoji: "🏙️" },
  { id: "food", name: "Food", emoji: "🍜" },
  { id: "adventure", name: "Adventure", emoji: "🎯" }
];

const CreatePost = () => {
  const navigate = useNavigate();
  const [selectedMediaType, setSelectedMediaType] = useState("photo");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const addHashtag = () => {
    if (newHashtag.trim() && !hashtags.includes(newHashtag.trim())) {
      setHashtags([...hashtags, newHashtag.trim()]);
      setNewHashtag("");
    }
  };

  const removeHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    // For now, just navigate back to home - will need backend integration
    console.log("Creating post:", {
      mediaType: selectedMediaType,
      caption,
      location,
      hashtags,
      budget,
      duration,
      category: selectedCategory
    });
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border shadow-travel">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/app")}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Create Post</h1>
          <Button
            onClick={handleSubmit}
            disabled={!caption.trim() || !location.trim()}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            Share
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6 animate-fade-in">
        {/* Media Type Selection */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">What are you sharing?</h2>
          <div className="grid grid-cols-3 gap-3">
            {mediaTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedMediaType(type.id)}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all duration-300 text-center",
                  selectedMediaType === type.id
                    ? "border-primary bg-primary/5 shadow-travel"
                    : "border-border hover:border-primary/30"
                )}
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <h3 className="font-medium text-foreground">{type.name}</h3>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Media Upload Area */}
        <Card className="p-6">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer">
            <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Add your {selectedMediaType}
            </h3>
            <p className="text-muted-foreground">
              Tap to upload from gallery or take a new {selectedMediaType}
            </p>
          </div>
        </Card>

        {/* Caption */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Caption</h2>
          <Textarea
            placeholder="Share your adventure story..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </Card>

        {/* Location */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Location</h2>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Where was this taken?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 space-x-2"
          >
            <MapPin className="w-4 h-4" />
            <span>Use current location</span>
          </Button>
        </Card>

        {/* Category Selection */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? "" : category.id
                )}
                className="space-x-2"
              >
                <span>{category.emoji}</span>
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Hashtags */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Hashtags</h2>
          <div className="flex space-x-2 mb-3">
            <div className="relative flex-1">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Add hashtag"
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
                className="pl-10"
              />
            </div>
            <Button onClick={addHashtag} variant="outline">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <Badge key={tag} variant="secondary" className="space-x-1">
                <span>#{tag}</span>
                <button onClick={() => removeHashtag(tag)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </Card>

        {/* Optional Fields */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Trip Details (Optional)</h2>
          <div className="space-y-4">
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Budget (e.g., $50-100)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Duration (e.g., 3 days)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </Card>

        {/* Preview */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Preview</h2>
          <div className="border border-border rounded-lg p-4 bg-muted/20">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-adventure rounded-full flex items-center justify-center text-white text-sm font-bold">
                U
              </div>
              <div>
                <p className="font-medium text-foreground">Your Name</p>
                <p className="text-sm text-muted-foreground">{location || "Location"}</p>
              </div>
            </div>
            <p className="text-foreground mb-2">
              {caption || "Your caption will appear here..."}
            </p>
            {hashtags.length > 0 && (
              <p className="text-primary text-sm">
                {hashtags.map(tag => `#${tag}`).join(" ")}
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;