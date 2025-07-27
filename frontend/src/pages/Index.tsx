import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import HeaderNav from '@/components/HeaderNav';
import StatsSection from '@/components/StatsSection';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const testimonials = [
    {
      quote: "I was able to feed my family tonight because of this platform. Thank you!",
      author: "Lakshmi, Chennai"
    },
    {
      quote: "We had excess food from our event and easily found people who needed it.",
      author: "Raj Catering, Coimbatore"
    },
    {
      quote: "This platform makes it so easy to donate and help those in need.",
      author: "Anand, Madurai"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderNav />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-foodie-green/10 to-foodie-orange/10 py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foodie-dark mb-6">
              <span className="text-foodie-green">Share</span> Food, <br />
              <span className="text-foodie-orange">Spread</span> Happiness
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Join our community in Tamil Nadu to donate excess food and help those in need. Together, we can reduce food waste and fight hunger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-foodie-green hover:bg-foodie-green/90 text-white px-8 py-6 rounded-lg text-lg">
                <Link to="/donate">Donate Food</Link>
              </Button>
              <Button asChild variant="outline" className="border-foodie-orange text-foodie-orange hover:bg-foodie-orange hover:text-white px-8 py-6 rounded-lg text-lg">
                <Link to="/find-food">Find Food</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1000"
              alt="Food Sharing in Tamil Nadu"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="bg-foodie-orange/10 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-foodie-orange">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Donate Excess Food</h3>
              <p className="text-gray-600">
                Restaurants, caterers, and individuals can easily donate their excess food through our platform.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-foodie-green/10 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-foodie-green">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse Available Food</h3>
              <p className="text-gray-600">
                Those in need can browse and request available food donations in their area.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-foodie-orange/10 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-foodie-orange">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Coordinate Pickup/Delivery</h3>
              <p className="text-gray-600">
                We help coordinate the pickup or delivery of food to ensure it reaches those who need it most.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-foodie-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-foodie-orange text-4xl mb-4">"</div>
                <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                <p className="text-foodie-dark font-medium">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-foodie-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every food donation counts. Join our community today and help reduce food waste while feeding those in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Button asChild className="bg-white text-foodie-green hover:bg-gray-100 px-8 py-3 text-lg rounded-lg">
                  <Link to="/donate">Donate Food</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-3 text-lg rounded-lg">
                  <Link to="/find-food">Find Food</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" className="border-white text-foodie-green hover:bg-white/20 px-8 py-3 text-lg rounded-lg">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-foodie-green hover:bg-white/20 px-8 py-3 text-lg rounded-lg">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-foodie-dark text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FoodieGrandpa</h3>
              <p className="text-gray-300">
                Connecting food donors with those in need across Tamil Nadu.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/donate" className="text-gray-300 hover:text-white">Donate Food</Link></li>
                <li><Link to="/receive" className="text-gray-300 hover:text-white">Receive Food</Link></li>
                <li><Link to="/find-food" className="text-gray-300 hover:text-white">Find Food</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">
                Email: contact@foodiegrandpa.org<br />
                Phone: +91 98765 43210
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© 2025 FoodieGrandpa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
{/* developed by bharanidharan g */}

export default Index;
