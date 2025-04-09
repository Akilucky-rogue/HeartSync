
import React from 'react';
import { LoveLanguage, LoveLanguageScore } from './LoveLanguageQuiz';
import { Progress } from '@/components/ui/progress';

interface LoveLanguageResultsProps {
  scores: LoveLanguageScore;
  primaryLanguage: LoveLanguage;
}

const languageInfo = {
  words: {
    title: "Words of Affirmation",
    description: "You value verbal expressions of love, such as compliments, words of appreciation, and hearing 'I love you'.",
    tips: "Share your feelings through written notes, compliments, and frequent verbal reassurance."
  },
  service: {
    title: "Acts of Service",
    description: "You feel loved when your partner does helpful things for you, like cooking a meal or handling a task.",
    tips: "Look for ways to lighten your partner's load and show love through helpful actions."
  },
  gifts: {
    title: "Receiving Gifts",
    description: "You appreciate thoughtful, tangible symbols of love that show your partner was thinking of you.",
    tips: "The thought behind the gift matters more than its monetary value - practice thoughtful gifting."
  },
  time: {
    title: "Quality Time",
    description: "You value focused, undivided attention and meaningful time spent together with your partner.",
    tips: "Create regular date nights and find activities you both enjoy doing together."
  },
  touch: {
    title: "Physical Touch",
    description: "You connect through physical affection like holding hands, hugs, kisses, and other physical expressions.",
    tips: "Find small ways to incorporate physical touch into your daily interactions."
  }
};

const LoveLanguageResults = ({ scores, primaryLanguage }: LoveLanguageResultsProps) => {
  // Calculate percentages for visualization
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const percentages = Object.entries(scores).reduce((obj, [key, score]) => {
    return {
      ...obj,
      [key]: total > 0 ? Math.round((score / total) * 100) : 0
    };
  }, {} as Record<string, number>);
  
  // Sort languages by score (highest first)
  const sortedLanguages = Object.keys(scores) as LoveLanguage[];
  sortedLanguages.sort((a, b) => scores[b] - scores[a]);
  
  return (
    <div className="space-y-6">
      <div className="romance-card p-6 border-heart/50">
        <h3 className="text-xl font-medium mb-3">Your Primary Love Language</h3>
        <h4 className="text-2xl font-bold text-heart mb-2">
          {languageInfo[primaryLanguage].title}
        </h4>
        <p className="text-muted-foreground mb-4">
          {languageInfo[primaryLanguage].description}
        </p>
        <div className="bg-heart/10 p-4 rounded-md">
          <h5 className="font-medium mb-2">Partner Tip:</h5>
          <p>{languageInfo[primaryLanguage].tips}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-medium">Your Love Language Profile</h3>
        {sortedLanguages.map((language) => (
          <div key={language} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-medium">{languageInfo[language].title}</span>
              <span className="text-sm">{percentages[language]}%</span>
            </div>
            <Progress value={percentages[language]} className="h-2" 
              style={{ 
                background: 'rgba(255, 107, 107, 0.1)',
                '--progress-foreground': 'rgb(255, 107, 107)'
              } as React.CSSProperties} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoveLanguageResults;
