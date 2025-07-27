import React from 'react';
import { Button } from "@/components/ui/button";
import DonateForm from "@/components/DonateForm";
import { FoodItem } from "@/components/FoodCard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

export default function DonatePage() {
  const navigate = useNavigate();
  
  const handleSuccessfulDonation = (donation: FoodItem) => {
    // Navigate to find food page after a short delay
    setTimeout(() => {
      toast.info("Your donation is now available for those in need");
      navigate("/find-food");
    }, 2000);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <BackButton to="/" />
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foodie-dark mb-4">Share Your Food</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your generosity can make a difference. Donate excess food to help those in need in Tamil Nadu.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <DonateForm onSuccessfulDonation={handleSuccessfulDonation} />
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold mb-4">Thank You For Your Kindness</h2>
        <p className="text-gray-600 mb-6">
          Together, we can reduce food waste and fight hunger in our community.
        </p>
        <Button 
          variant="outline" 
          className="border-foodie-green text-foodie-green hover:bg-foodie-green hover:text-white"
          onClick={() => navigate("/find-food")}
        >
          View Available Food
        </Button>
      </div>
    </div>
  );
}
