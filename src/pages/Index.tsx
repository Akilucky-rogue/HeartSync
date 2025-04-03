
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Heart, MessageSquare, Smile } from 'lucide-react';
import Header from '@/components/common/Header';
import HeartButton from '@/components/ui/HeartButton';
import QuoteDisplay from '@/components/common/Quote';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const features = [
    {
      title: 'Shared Timeline',
      description: 'Document your love story with photos, videos, and notes in a beautiful interactive timeline.',
      icon: <Calendar className="w-6 h-6 text-heart" />
    },
    {
      title: 'Emotional Connection',
      description: 'Track your moods and share your feelings to strengthen your emotional bond.',
      icon: <Smile className="w-6 h-6 text-heart" />
    },
    {
      title: 'Private Messaging',
      description: 'Stay connected throughout the day with a private chat just for the two of you.',
      icon: <MessageSquare className="w-6 h-6 text-heart" />
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-rose-50 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-serif mb-6">
                  Deepen Your Connection with{' '}
                  <span className="text-heart font-cursive">HeartSync</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 md:max-w-md">
                  A romantic app designed for couples to celebrate, nurture, and grow their unique love story.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <HeartButton
                    size="lg"
                    onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
                  >
                    {isAuthenticated ? 'Go to Dashboard' : 'Start Your Love Story'}
                  </HeartButton>
                  <HeartButton
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/about')}
                  >
                    Learn More
                  </HeartButton>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  {/* Main image */}
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1516589091380-5d8e87df6999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cGxlJTIwaGFuZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" 
                      alt="Couple holding hands" 
                      className="w-full h-80 object-cover"
                    />
                  </div>
                  {/* Floating elements */}
                  <div className="absolute -left-8 -bottom-8 p-4 bg-white rounded-xl shadow-lg animate-float w-32 h-32 flex items-center justify-center">
                    <Heart className="w-16 h-16 text-heart" fill="#FFCCD5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decorative hearts */}
          <div className="hidden md:block absolute right-10 top-20 animate-float opacity-20">
            <Heart className="w-12 h-12 text-romance-purple" fill="#E6E6FA" />
          </div>
          <div className="hidden md:block absolute left-16 bottom-16 animate-float opacity-30" style={{ animationDelay: '2s' }}>
            <Heart className="w-8 h-8 text-heart" fill="#FFCCD5" />
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gradient-to-b from-background to-romance-lavender/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif mb-4">Celebrate Your Love Story</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                HeartSync offers unique features to help couples strengthen their bond and create lasting memories together.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="romance-card p-6 text-center">
                  <div className="bg-heart/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="py-16 bg-romance-lavender/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg">
              <QuoteDisplay className="mb-6" />
              <div className="text-center">
                <HeartButton
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Begin Your Journey'}
                </HeartButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-white py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-heart animate-heart-beat" />
            <h3 className="text-xl font-cursive text-heart">HeartSync</h3>
          </div>
          <p className="text-muted-foreground">© 2024 HeartSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
