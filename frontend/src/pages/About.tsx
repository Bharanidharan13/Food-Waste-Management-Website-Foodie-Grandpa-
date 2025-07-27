import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Utensils, Globe } from 'lucide-react';
import BackButton from '@/components/BackButton';

export default function About() {
  const features = [
    {
      icon: <Heart className="h-12 w-12 text-primary" />,
      title: 'Our Mission',
      description: 'To reduce food waste and build stronger communities by connecting generous home cooks with those in need of a warm, homemade meal.'
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: 'Community First',
      description: 'We believe in the power of food to bring people together and create lasting connections within neighborhoods.'
    },
    {
      icon: <Utensils className="h-12 w-12 text-primary" />,
      title: 'Quality Food',
      description: 'Every meal shared through our platform is prepared with love and care, meeting high standards of food safety and quality.'
    },
    {
      icon: <Globe className="h-12 w-12 text-primary" />,
      title: 'Global Impact',
      description: 'By reducing food waste and promoting sharing, we\'re contributing to a more sustainable and connected world.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton to="/" />
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About Foodie Grandpa</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We're on a mission to revolutionize food sharing and build stronger communities
          through the power of homemade meals.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="p-6">
            <CardContent className="p-0 space-y-4">
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-center">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Story Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
        <div className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400 space-y-4">
          <p>
            Foodie Grandpa started with a simple idea: what if we could connect people who love to cook
            with those who crave a homemade meal? Our founder noticed how many talented
            home cooks in the neighborhood had extra portions of delicious meals that often went to waste.
          </p>
          <p>
            At the same time, there were plenty of people - students, busy professionals, and elderly
            neighbors - who would love nothing more than a warm, home-cooked meal. That's when
            Foodie Grandpa was born.
          </p>
          <p>
            Since our launch in 2023, we've helped facilitate thousands of meal shares, creating
            countless connections between neighbors and reducing food waste in communities across
            the country.
          </p>
        </div>
      </div>
    </div>
  );
} 