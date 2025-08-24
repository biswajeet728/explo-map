import { useState } from "react";
import { Heart, MessageCircle, UserPlus, MapPin, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    type: "like",
    user: "Sarah Chen",
    avatar: "🧳",
    action: "liked your post",
    content: "Amazing sunset in Santorini! 🌅",
    time: "2m ago",
    read: false
  },
  {
    id: 2,
    type: "comment",
    user: "Alex Rodriguez",
    avatar: "⛰️",
    action: "commented on your post",
    content: "This looks incredible! How was the hiking?",
    time: "5m ago",
    read: false
  },
  {
    id: 3,
    type: "follow",
    user: "Maya Patel",
    avatar: "🍜",
    action: "started following you",
    content: "",
    time: "10m ago",
    read: false
  },
  {
    id: 4,
    type: "nearby",
    user: "Travel Alert",
    avatar: "📍",
    action: "New posts near you",
    content: "3 new adventures in your area",
    time: "1h ago",
    read: true
  },
  {
    id: 5,
    type: "like",
    user: "Emma Wilson",
    avatar: "🏖️",
    action: "liked your story",
    content: "Beach day in Maldives",
    time: "2h ago",
    read: true
  },
  {
    id: 6,
    type: "comment",
    user: "Kenji Tanaka",
    avatar: "🗾",
    action: "replied to your comment",
    content: "Thanks for the recommendation!",
    time: "3h ago",
    read: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="w-4 h-4 text-red-500" />;
    case "comment":
      return <MessageCircle className="w-4 h-4 text-blue-500" />;
    case "follow":
      return <UserPlus className="w-4 h-4 text-green-500" />;
    case "nearby":
      return <MapPin className="w-4 h-4 text-orange-500" />;
    default:
      return <Heart className="w-4 h-4 text-gray-500" />;
  }
};

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [readNotifications, setReadNotifications] = useState<number[]>([]);

  const markAsRead = (id: number) => {
    setReadNotifications(prev => [...prev, id]);
  };

  const markAllAsRead = () => {
    const unreadIds = notifications.filter(n => !n.read && !readNotifications.includes(n.id)).map(n => n.id);
    setReadNotifications(prev => [...prev, ...unreadIds]);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "mentions") return notification.type === "comment";
    if (activeTab === "follows") return notification.type === "follow";
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read && !readNotifications.includes(n.id)).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border shadow-travel">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-semibold text-foreground">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 animate-fade-in">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mentions">Mentions</TabsTrigger>
            <TabsTrigger value="follows">Follows</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4 space-y-2">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No notifications yet</h3>
                <p className="text-muted-foreground">
                  When people interact with your posts, you'll see it here
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const isRead = notification.read || readNotifications.includes(notification.id);
                
                return (
                  <Card
                    key={notification.id}
                    className={cn(
                      "p-4 cursor-pointer hover:shadow-travel transition-all duration-300",
                      !isRead && "border-primary/30 bg-primary/5"
                    )}
                    onClick={() => !isRead && markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-4">
                      {/* User Avatar */}
                      <div className="w-10 h-10 bg-gradient-adventure rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {notification.avatar}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-foreground">
                              <span className="font-semibold">{notification.user}</span>
                              {" "}
                              <span className="text-muted-foreground">{notification.action}</span>
                            </p>
                            {notification.content && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.content}
                              </p>
                            )}
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                              {!isRead && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                            </div>
                          </div>

                          {/* Notification Icon */}
                          <div className="ml-3 flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons for specific notification types */}
                    {notification.type === "follow" && (
                      <div className="mt-3 flex justify-end">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            View Profile
                          </Button>
                          <Button size="sm" className="text-xs bg-gradient-primary">
                            Follow Back
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Notifications;