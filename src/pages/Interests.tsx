import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Waves, Mountain, Building, Compass, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

const interestCategories = [
  {
    id: "beaches",
    name: "Beaches",
    icon: Waves,
    gradient: "bg-gradient-ocean",
    description: "Coastal adventures & tropical vibes"
  },
  {
    id: "mountains",
    name: "Mountains",
    icon: Mountain,
    gradient: "bg-gradient-nature",
    description: "Peaks, trails & breathtaking views"
  },
  {
    id: "cities",
    name: "Cities",
    icon: Building,
    gradient: "bg-gradient-sunset",
    description: "Urban exploration & culture"
  },
  {
    id: "adventure",
    name: "Adventure",
    icon: Compass,
    gradient: "bg-gradient-adventure",
    description: "Thrills & outdoor activities"
  },
  {
    id: "food",
    name: "Food",
    icon: UtensilsCrossed,
    gradient: "bg-gradient-primary",
    description: "Culinary journeys & local tastes"
  }
];

const Interests = () => {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleContinue = () => {
    // Store interests in localStorage or state management
    localStorage.setItem('userInterests', JSON.stringify(selectedInterests));
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/")}
          className="p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-sm text-muted-foreground">
          Step 1 of 2
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            What interests you?
          </h1>
          <p className="text-muted-foreground">
            Choose your travel preferences to personalize your Explo experience
          </p>
        </div>

        {/* Interest Categories */}
        <div className="space-y-4">
          {interestCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedInterests.includes(category.id);
            
            return (
              <button
                key={category.id}
                onClick={() => toggleInterest(category.id)}
                className={cn(
                  "w-full p-6 rounded-xl border-2 transition-all duration-300 text-left",
                  "hover:shadow-travel hover:scale-[1.02]",
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-travel" 
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-adventure",
                    category.gradient
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 transition-all",
                    isSelected 
                      ? "bg-primary border-primary" 
                      : "border-muted-foreground"
                  )}>
                    {isSelected && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <Button 
            onClick={handleContinue}
            disabled={selectedInterests.length === 0}
            size="lg"
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {selectedInterests.length === 0 && (
            <p className="text-center text-sm text-muted-foreground mt-3">
              Select at least one interest to continue
            </p>
          )}
          
          {selectedInterests.length > 0 && (
            <p className="text-center text-sm text-muted-foreground mt-3">
              {selectedInterests.length} interest{selectedInterests.length > 1 ? 's' : ''} selected
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interests;