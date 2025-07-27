
import React, { useEffect, useState } from 'react';

const StatsSection = () => {
  const [orderCount, setOrderCount] = useState(0);
  
  useEffect(() => {
    // Get donations from localStorage for demo purposes
    try {
      const donations = JSON.parse(localStorage.getItem('foodDonations') || '[]');
      setOrderCount(donations.length);
    } catch (error) {
      console.error('Error getting donations count', error);
    }
  }, []);

  // These would ideally come from your backend/database
  const stats = [
    { label: "People Fed", value: `${orderCount > 0 ? orderCount * 5 : '15,000'}+`, icon: "🍲" },
    { label: "Food Donations", value: `${orderCount > 0 ? orderCount : '2,500'}+`, icon: "🥘" },
    { label: "Volunteer Hours", value: `${orderCount > 0 ? orderCount * 2 : '5,200'}+`, icon: "⏰" },
    { label: "Tamil Nadu Regions", value: "32+", icon: "📍" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Impact</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-foodie-light rounded-lg shadow-sm">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-foodie-green mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
