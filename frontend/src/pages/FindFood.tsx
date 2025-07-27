import React, { useState, useEffect } from 'react';
import FoodCard, { FoodItem } from "@/components/FoodCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import LocationDropdown from "@/components/LocationDropdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BackButton from '@/components/BackButton';
import HeaderNav from '@/components/HeaderNav';
import { toast } from 'sonner';

export default function FindFood() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('All of Tamil Nadu');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const categories = ['All Categories', 'Cooked Meals', 'Fresh Produce', 'Packaged Food', 'Dairy & Eggs', 'Bakery Items', 'Beverages', 'Grains & Rice', 'Snacks'];
  
  // Load data from API
  const fetchFoodItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/food-donations?status=available');
      if (!response.ok) {
        throw new Error('Failed to fetch food items');
      }
      const data = await response.json();
      setFoodItems(data);
    } catch (error) {
      console.error('Error loading food items:', error);
      toast.error('Failed to load food items. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount and when new donations are added
  useEffect(() => {
    fetchFoodItems();
  }, []);

  // Filter food items based on search, location and category
  const filteredFoodItems = foodItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = 
      selectedLocation === 'All of Tamil Nadu' || 
      item.location === selectedLocation;
    
    const matchesCategory = 
      selectedCategory === 'All Categories' || 
      item.category === selectedCategory;
    
    return matchesSearch && matchesLocation && matchesCategory;
  });
  
  const handleRequestFood = (food: FoodItem) => {
    setSelectedFood(food);
    setShowContactForm(true);
  };

  const handleRequestSuccess = () => {
    setShowContactForm(false);
    fetchFoodItems(); // Refresh the food items list
    setSelectedFood(null);
  };
  
  return (
    <>
      <HeaderNav />
      <div className="container mx-auto py-8 px-4">
        <BackButton to="/" />
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foodie-dark mb-4">Available Food in Tamil Nadu</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse food donations available in your area and request what you need.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search food items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <LocationDropdown
                selectedLocation={selectedLocation}
                onLocationSelect={setSelectedLocation}
              />
            </div>
            
            <div>
              <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg">Loading available food items...</p>
          </div>
        ) : filteredFoodItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFoodItems.map((food) => (
              <FoodCard
                key={food._id}
                food={food}
                onClick={() => handleRequestFood(food)}
                actionText="Request This"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No food items available</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || selectedLocation !== 'All of Tamil Nadu' || selectedCategory !== 'All Categories'
                ? 'Try adjusting your filters or search query.'
                : 'There are currently no food donations available. Please check back later.'}
            </p>
            <Button 
              variant="outline" 
              className="border-foodie-green text-foodie-green hover:bg-foodie-green hover:text-white"
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('All of Tamil Nadu');
                setSelectedCategory('All Categories');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
        
        <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Request {selectedFood?.name}</DialogTitle>
              <DialogDescription>
                Please provide your contact information to request this food item.
              </DialogDescription>
            </DialogHeader>
            <ContactForm 
              foodItemId={selectedFood?._id} 
              onSuccess={handleRequestSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
