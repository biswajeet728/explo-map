import { Link, useLocation } from "react-router-dom";
import { Map, Search, Plus, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Map, label: "Home", path: "/app" },
  { icon: Search, label: "Explore", path: "/app/explore" },
  { icon: Plus, label: "Create", path: "/app/create" },
  { icon: Bell, label: "Notifications", path: "/app/notifications" },
  { icon: User, label: "Profile", path: "/app/profile" },
];

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-travel z-50">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon 
                className={cn(
                  "h-5 w-5 mb-1",
                  isActive && "text-primary"
                )}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;