import React, { useState, ChangeEvent } from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImagePlus } from "lucide-react";
import LocationDropdown from './LocationDropdown';
import { useAuth } from '@/contexts/AuthContext';

const foodCategories = [
  "Cooked Meals",
  "Fresh Produce",
  "Packaged Food",
  "Dairy & Eggs",
  "Bakery Items",
  "Beverages",
  "Grains & Rice",
  "Snacks"
];

const DEFAULT_IMAGE = 'https://source.unsplash.com/featured/?food,indian';

export default function DonateForm({ onSuccessfulDonation }: { onSuccessfulDonation?: (data: any) => void }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    donorName: '',
    foodName: '',
    category: 'Cooked Meals',
    description: '',
    quantity: '',
    expiryDate: '',
    location: 'Chennai',
    address: '',
    image: DEFAULT_IMAGE
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLocationSelect = (location: string) => {
    setFormData(prev => ({ ...prev, location }));
  };
  
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Check file type
        if (!file.type.startsWith('image/')) {
          toast.error("Please upload an image file");
          return;
        }

        // Create an image element to load the file
        const img = new Image();
        const reader = new FileReader();

        reader.onload = () => {
          img.src = reader.result as string;
          img.onload = () => {
            // Create a canvas to resize the image
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions while maintaining aspect ratio
            const maxDimension = 800; // Max width or height
            if (width > height) {
              if (width > maxDimension) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              }
            } else {
              if (height > maxDimension) {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            canvas.width = width;
            canvas.height = height;

            // Draw and compress the image
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);

            // Convert to JPEG format with 0.8 quality
            const compressedImage = canvas.toDataURL('image/jpeg', 0.8);

            // Update form data
            setImagePreview(compressedImage);
            setFormData(prev => ({ ...prev, image: compressedImage }));
          };
        };

        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error processing image:', error);
        toast.error("Error processing image. Please try another image.");
        setFormData(prev => ({ ...prev, image: DEFAULT_IMAGE }));
        setImagePreview(null);
      }
    }
  };
  
  const resetForm = () => {
    setFormData({
      ...formData,
      foodName: '',
      description: '',
      quantity: '',
      expiryDate: '',
      image: DEFAULT_IMAGE
    });
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Validation
      if (!formData.name || !formData.phone || !formData.foodName || !formData.category || !formData.quantity || !formData.location || !formData.address) {
        toast.error("Please fill out all required fields");
        return;
      }

      // Create donation object
      const donationData = {
        name: formData.foodName,
        description: formData.description || '',
        image: formData.image === DEFAULT_IMAGE ? DEFAULT_IMAGE : formData.image,
        category: formData.category,
        location: formData.location,
        address: formData.address,
        quantity: formData.quantity,
        expiryDate: formData.expiryDate || 'Not specified',
        donatedBy: formData.donorName || formData.name,
        status: 'available',
        donorInfo: {
          name: formData.name,
          phone: formData.phone,
          organization: formData.donorName || undefined
        }
      };

      console.log('Submitting donation data:', donationData);

      // Send to backend API
      const response = await fetch('/api/food-donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || 'Failed to save donation');
      }

      toast.success("Thank you! Your food donation has been added.");
      console.log("Donation submitted successfully:", responseData);

      if (onSuccessfulDonation) {
        onSuccessfulDonation(responseData);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving donation:', error);
      toast.error(error instanceof Error ? error.message : "There was an error saving your donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="bg-foodie-orange bg-opacity-10 rounded-t-lg">
        <CardTitle className="text-foodie-dark text-2xl">Donate Food</CardTitle>
        <CardDescription>
          Share your food with those in need within Tamil Nadu
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-3">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="grid gap-3">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Your contact number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div className="grid gap-3">
              <label htmlFor="donorName" className="text-sm font-medium">
                Organization/Business Name (if applicable)
              </label>
              <Input
                id="donorName"
                name="donorName"
                placeholder="If donating on behalf of an organization"
                value={formData.donorName}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-3">
                <label htmlFor="foodName" className="text-sm font-medium">
                  Food Item Name *
                </label>
                <Input
                  id="foodName"
                  name="foodName"
                  placeholder="Name of the food item"
                  required
                  value={formData.foodName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="grid gap-3">
                <label htmlFor="category" className="text-sm font-medium">
                  Food Category *
                </label>
                <Select 
                  onValueChange={(value) => handleSelectChange('category', value)} 
                  value={formData.category}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {foodCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-3">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the food items"
                className="min-h-[80px]"
                value={formData.description}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="foodImage" className="text-sm font-medium">
                Food Image *
              </label>
              <div className="flex items-center gap-4">
                <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center w-full h-32 bg-gray-50 cursor-pointer relative overflow-hidden">
                  <input
                    type="file"
                    id="foodImage"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    disabled={isSubmitting}
                  />
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Food preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <ImagePlus className="h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">Upload food image (max 1MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-3">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity *
                </label>
                <Input
                  id="quantity"
                  name="quantity"
                  placeholder="E.g., 2 kg, 5 boxes, serves 10"
                  required
                  value={formData.quantity}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="grid gap-3">
                <label htmlFor="expiryDate" className="text-sm font-medium">
                  Best Before Date
                </label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-3">
                <label htmlFor="location" className="text-sm font-medium">
                  Location in Tamil Nadu *
                </label>
                <LocationDropdown
                  onLocationSelect={handleLocationSelect}
                  selectedLocation={formData.location}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="grid gap-3">
                <label htmlFor="address" className="text-sm font-medium">
                  Pickup Address *
                </label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Address for food pickup"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-2">* Required fields</p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t pt-6 flex justify-end">
        <Button 
          type="submit" 
          className="bg-foodie-orange hover:bg-foodie-orange/90" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Donation'}
        </Button>
      </CardFooter>
    </Card>
  );
}
