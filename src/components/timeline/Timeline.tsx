
import React from 'react';
import { Calendar, Camera, Heart, MapPin, Music, Star } from 'lucide-react';
import HeartButton from '@/components/ui/HeartButton';

// Mock data - in a real app this would come from a database
const memories = [
  {
    id: 1,
    date: 'April 3, 2023',
    title: 'First Date',
    description: 'We had our first date at Moonlight Café. You were wearing that blue dress that I loved.',
    image: 'https://images.unsplash.com/photo-1522264842355-70d1408472c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y291cGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    icon: <Heart className="w-5 h-5 text-white" />,
    iconBg: 'bg-heart',
  },
  {
    id: 2,
    date: 'May 15, 2023',
    title: 'Beach Trip',
    description: 'Our weekend getaway to the coast. Swimming, sunsets, and seafood dinners.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    icon: <MapPin className="w-5 h-5 text-white" />,
    iconBg: 'bg-romance-purple',
  },
  {
    id: 3,
    date: 'July 4, 2023',
    title: 'First Concert Together',
    description: 'Watching our favorite band perform under the stars.',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    icon: <Music className="w-5 h-5 text-white" />,
    iconBg: 'bg-romance-rose',
  },
  {
    id: 4,
    date: 'September 20, 2023',
    title: 'Moving In Together',
    description: 'The day we combined our lives into one home. A new chapter begins!',
    image: 'https://images.unsplash.com/photo-1560440021-33f9b867899d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    icon: <Star className="w-5 h-5 text-white" />,
    iconBg: 'bg-accent',
  },
];

const Timeline = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">Our Story</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of our most precious memories together. Each moment we share becomes a part of our unique love story.
          </p>
        </div>
        
        <div className="flex justify-end mb-8">
          <HeartButton>
            Add New Memory
          </HeartButton>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>
          
          {/* Timeline entries */}
          <div className="space-y-12">
            {memories.map((memory, index) => (
              <div 
                key={memory.id}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline bullet point */}
                <div className="absolute left-5 md:left-1/2 transform -translate-x-1/2 -translate-y-1/3 z-10">
                  <div className={`w-10 h-10 rounded-full ${memory.iconBg} flex items-center justify-center shadow-lg`}>
                    {memory.icon}
                  </div>
                </div>
                
                {/* Content */}
                <div className={`w-full md:w-1/2 md:px-8 ${
                  index % 2 === 0 ? 'md:pl-0 md:pr-8' : 'md:pr-0 md:pl-8'
                }`}>
                  <div className="ml-16 md:ml-0 romance-card overflow-hidden">
                    {memory.image && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={memory.image} 
                          alt={memory.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{memory.date}</span>
                      </div>
                      <h3 className="text-xl font-serif mb-2">{memory.title}</h3>
                      <p className="text-muted-foreground">{memory.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
