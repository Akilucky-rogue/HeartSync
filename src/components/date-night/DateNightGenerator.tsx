
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wine, Sun, Moon, Umbrella, Coffee, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DateIdea {
  title: string;
  description: string;
  category: 'indoor' | 'outdoor' | 'romantic' | 'casual' | 'adventure';
  budget: 'free' | 'low' | 'medium' | 'high';
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  weatherDependent: boolean;
}

const dateIdeas: DateIdea[] = [
  {
    title: "Sunset Picnic",
    description: "Pack some favorite snacks and drinks for a romantic outdoor picnic while watching the sunset.",
    category: "romantic",
    budget: "low",
    timeOfDay: "evening",
    weatherDependent: true
  },
  {
    title: "Home Cooking Adventure",
    description: "Choose a new recipe and cook a meal together at home.",
    category: "indoor",
    budget: "medium",
    timeOfDay: "evening",
    weatherDependent: false
  },
  {
    title: "Morning Coffee Walk",
    description: "Get coffee from your favorite cafe and take a peaceful morning walk together.",
    category: "casual",
    budget: "low",
    timeOfDay: "morning",
    weatherDependent: true
  },
  {
    title: "Art Gallery Tour",
    description: "Visit local art galleries and discuss the artworks together.",
    category: "indoor",
    budget: "free",
    timeOfDay: "afternoon",
    weatherDependent: false
  },
  {
    title: "Stargazing Adventure",
    description: "Find a quiet spot away from city lights for stargazing and deep conversations.",
    category: "romantic",
    budget: "free",
    timeOfDay: "evening",
    weatherDependent: true
  }
];

const DateNightGenerator = () => {
  const [currentIdea, setCurrentIdea] = useState<DateIdea | null>(null);
  const { toast } = useToast();
  
  const generateIdea = () => {
    const randomIdea = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
    setCurrentIdea(randomIdea);
    toast({
      title: "New Date Idea Generated!",
      description: "Why not try something new together?",
    });
  };

  const getBudgetIcon = (budget: DateIdea['budget']) => {
    switch (budget) {
      case 'free':
        return <DollarSign className="text-green-500" />;
      case 'low':
        return <div className="flex"><DollarSign className="text-yellow-500" /></div>;
      case 'medium':
        return <div className="flex"><DollarSign className="text-yellow-500" /><DollarSign className="text-yellow-500" /></div>;
      case 'high':
        return <div className="flex"><DollarSign className="text-yellow-500" /><DollarSign className="text-yellow-500" /><DollarSign className="text-yellow-500" /></div>;
    }
  };

  const getTimeIcon = (time: DateIdea['timeOfDay']) => {
    switch (time) {
      case 'morning':
        return <Sun className="text-yellow-500" />;
      case 'afternoon':
        return <Coffee className="text-brown-500" />;
      case 'evening':
        return <Moon className="text-blue-500" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-serif mb-4">Date Night Generator</h1>
        <p className="text-muted-foreground">
          Need inspiration for your next date? Let us help you plan something special!
        </p>
      </div>

      <Card className="romance-card">
        <CardHeader>
          <CardTitle>Generate a Date Idea</CardTitle>
          <CardDescription>
            Click the button below to get a random date idea suggestion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentIdea ? (
            <div className="space-y-4">
              <h3 className="text-2xl font-medium text-heart">{currentIdea.title}</h3>
              <p className="text-muted-foreground">{currentIdea.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {getBudgetIcon(currentIdea.budget)}
                {getTimeIcon(currentIdea.timeOfDay)}
                {currentIdea.weatherDependent && <Umbrella className="text-blue-400" />}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Wine className="w-12 h-12 mx-auto mb-4 text-heart" />
              <p>Click generate to get your first date idea!</p>
            </div>
          )}
          <Button 
            onClick={generateIdea}
            className="w-full bg-gradient-to-r from-heart to-romance-purple"
          >
            Generate New Idea
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DateNightGenerator;
