import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export interface FoodItem {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  location: string;
  address: string;
  quantity: string;
  expiryDate: string;
  donatedBy: string;
  status: 'available' | 'reserved' | 'completed';
  donorInfo: {
    name: string;
    phone: string;
    organization?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface FoodCardProps {
  food: FoodItem;
  onClick?: () => void;
  actionText?: string;
}

export default function FoodCard({ food, onClick, actionText = "Request" }: FoodCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        <Badge className="absolute top-2 right-2 bg-foodie-orange text-white">
          {food.category}
        </Badge>
        {food.status !== 'available' && (
          <Badge className="absolute top-2 left-2 bg-gray-600 text-white">
            {food.status.charAt(0).toUpperCase() + food.status.slice(1)}
          </Badge>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{food.name}</CardTitle>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{food.location}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className="line-clamp-2 text-sm text-gray-500">
          {food.description}
        </CardDescription>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="font-medium">Quantity:</span> {food.quantity}
          </div>
          <div>
            <span className="font-medium">Best Before:</span> {food.expiryDate}
          </div>
        </div>
        <div className="mt-2 text-xs">
          <span className="font-medium">Donated by:</span> {food.donorInfo.organization || food.donorInfo.name}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-foodie-green hover:bg-foodie-green/90"
          onClick={onClick}
          disabled={food.status !== 'available'}
        >
          {food.status === 'available' ? actionText : food.status === 'reserved' ? 'Reserved' : 'Completed'}
        </Button>
      </CardFooter>
    </Card>
  );
}
