import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarDays, UtensilsCrossed, Users, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface DonationStats {
  totalDonations: number;
  activeDonations: number;
  reservedDonations: number;
  completedDonations: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DonationStats>({
    totalDonations: 0,
    activeDonations: 0,
    reservedDonations: 0,
    completedDonations: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDonationStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/food-donations');
        if (!response.ok) {
          throw new Error('Failed to fetch donations');
        }
        const donations = await response.json();
        
        // Calculate statistics
        const totalDonations = donations.length;
        const activeDonations = donations.filter(d => d.status === 'available').length;
        const reservedDonations = donations.filter(d => d.status === 'reserved').length;
        const completedDonations = donations.filter(d => d.status === 'completed').length;
        
        setStats({
          totalDonations,
          activeDonations,
          reservedDonations,
          completedDonations
        });
      } catch (error) {
        console.error('Error fetching donation stats:', error);
        toast.error('Failed to load donation statistics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonationStats();
  }, []);

  const dashboardStats = [
    {
      title: "Total Donations",
      value: stats.totalDonations.toString(),
      description: "Food items donated",
      icon: <ShoppingBag className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Active Listings",
      value: stats.activeDonations.toString(),
      description: "Currently available",
      icon: <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Reserved Items",
      value: stats.reservedDonations.toString(),
      description: "Pending pickup",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Completed",
      value: stats.completedDonations.toString(),
      description: "Successfully donated",
      icon: <CalendarDays className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h2>
        <div className="flex items-center space-x-2">
          <Button asChild className="bg-foodie-green hover:bg-foodie-green/90">
            <Link to="/donate">Donate Food</Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donations">My Donations</TabsTrigger>
          <TabsTrigger value="received">Received</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {isLoading ? (
            <div className="text-center py-8">
              <p>Loading donation statistics...</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {dashboardStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="donations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Donations</CardTitle>
              <CardDescription>
                Track and manage your food donations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats.totalDonations > 0 ? (
                <div className="space-y-4">
                  <p>You have made {stats.totalDonations} donations in total</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Active: {stats.activeDonations}</p>
                      <p className="text-sm text-muted-foreground">Available for pickup</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Reserved: {stats.reservedDonations}</p>
                      <p className="text-sm text-muted-foreground">Pending pickup</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No donations yet</p>
                  <Button asChild className="bg-foodie-green hover:bg-foodie-green/90">
                    <Link to="/donate">Make Your First Donation</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="received" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Received Food</CardTitle>
              <CardDescription>
                Track food items you've received
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats.completedDonations > 0 ? (
                <div>
                  <p>You have received {stats.completedDonations} food items</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No food received yet</p>
                  <Button asChild className="bg-foodie-orange hover:bg-foodie-orange/90">
                    <Link to="/find-food">Find Available Food</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 