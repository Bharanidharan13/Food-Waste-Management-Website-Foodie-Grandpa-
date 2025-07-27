
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ContactForm from "@/components/ContactForm";
import { useNavigate } from "react-router-dom";
import BackButton from '@/components/BackButton';
import HeaderNav from '@/components/HeaderNav';

export default function ReceiveFood() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  
  return (
    <>
      <HeaderNav />
      <div className="container mx-auto py-8 px-4">
        <BackButton to="/" />
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foodie-dark mb-4">Request Food Assistance</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We connect people in need with available food donations across Tamil Nadu. Fill out your details and we'll help you get the support you need.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-xl font-semibold mb-4">Browse Available Food</h2>
          <p className="text-gray-600 mb-6">
            See what food is currently available in your area
          </p>
          <Button 
            className="bg-foodie-orange hover:bg-foodie-orange/90"
            onClick={() => navigate("/find-food")}
          >
            View Food Listings
          </Button>
        </div>
        
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Provide Your Contact Information</DialogTitle>
            </DialogHeader>
            <ContactForm />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
