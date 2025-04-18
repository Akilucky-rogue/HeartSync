
import React, { useState } from 'react';
import { Book, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import HeartButton from '@/components/ui/HeartButton';
import LoveLanguageQuestion from './LoveLanguageQuestion';
import LoveLanguageResults from './LoveLanguageResults';
import { toast } from '@/hooks/use-toast';

// Define the love languages
export type LoveLanguage = 'words' | 'service' | 'gifts' | 'time' | 'touch';

export interface LoveLanguageScore {
  words: number;
  service: number;
  gifts: number;
  time: number;
  touch: number;
}

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    text: "I feel most loved when my partner...",
    options: [
      { value: 'words' as LoveLanguage, text: "Tells me they appreciate me" },
      { value: 'service' as LoveLanguage, text: "Does something helpful for me" },
      { value: 'gifts' as LoveLanguage, text: "Gives me a thoughtful gift" },
      { value: 'time' as LoveLanguage, text: "Spends quality time with me" },
      { value: 'touch' as LoveLanguage, text: "Gives me a hug or holds my hand" }
    ]
  },
  {
    id: 2,
    text: "I feel closest to my partner when we...",
    options: [
      { value: 'time' as LoveLanguage, text: "Have undivided attention for each other" },
      { value: 'touch' as LoveLanguage, text: "Share physical affection" },
      { value: 'words' as LoveLanguage, text: "Have deep, meaningful conversations" },
      { value: 'service' as LoveLanguage, text: "Complete tasks or projects together" },
      { value: 'gifts' as LoveLanguage, text: "Exchange presents or surprises" }
    ]
  },
  {
    id: 3,
    text: "After a difficult day, I would most appreciate if my partner...",
    options: [
      { value: 'service' as LoveLanguage, text: "Took care of my responsibilities" },
      { value: 'words' as LoveLanguage, text: "Listened and offered words of encouragement" },
      { value: 'touch' as LoveLanguage, text: "Offered a massage or physical comfort" },
      { value: 'gifts' as LoveLanguage, text: "Surprised me with my favorite treat" },
      { value: 'time' as LoveLanguage, text: "Set aside time just for me" }
    ]
  },
  {
    id: 4,
    text: "I know my partner cares when they...",
    options: [
      { value: 'gifts' as LoveLanguage, text: "Remember special occasions with gifts" },
      { value: 'time' as LoveLanguage, text: "Put away their phone to focus on me" },
      { value: 'service' as LoveLanguage, text: "Help me without being asked" },
      { value: 'touch' as LoveLanguage, text: "Show physical affection regularly" },
      { value: 'words' as LoveLanguage, text: "Express their feelings for me verbally" }
    ]
  },
  {
    id: 5,
    text: "I would rather my partner...",
    options: [
      { value: 'touch' as LoveLanguage, text: "Hold my hand in public" },
      { value: 'gifts' as LoveLanguage, text: "Surprise me with something I've been wanting" },
      { value: 'words' as LoveLanguage, text: "Send me sweet messages throughout the day" },
      { value: 'time' as LoveLanguage, text: "Plan a special outing just for us" },
      { value: 'service' as LoveLanguage, text: "Take care of a task I've been dreading" }
    ]
  },
  {
    id: 6,
    text: "I feel most disconnected when my partner...",
    options: [
      { value: 'time' as LoveLanguage, text: "Is consistently too busy to spend time with me" },
      { value: 'touch' as LoveLanguage, text: "Doesn't show physical affection" },
      { value: 'words' as LoveLanguage, text: "Rarely compliments or affirms me" },
      { value: 'service' as LoveLanguage, text: "Doesn't help with shared responsibilities" },
      { value: 'gifts' as LoveLanguage, text: "Forgets important occasions" }
    ]
  },
  {
    id: 7,
    text: "Which means more to you?",
    options: [
      { value: 'words' as LoveLanguage, text: "Hearing 'I love you' every day" },
      { value: 'service' as LoveLanguage, text: "Having your partner make dinner after a long day" },
      { value: 'gifts' as LoveLanguage, text: "Receiving a meaningful gift for no special reason" },
      { value: 'time' as LoveLanguage, text: "Having your partner's full attention during conversations" },
      { value: 'touch' as LoveLanguage, text: "Getting a spontaneous hug or kiss" }
    ]
  }
];

const LoveLanguageQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState<LoveLanguageScore>({
    words: 0,
    service: 0,
    gifts: 0,
    time: 0,
    touch: 0
  });
  const [saving, setSaving] = useState(false);
  
  const handleAnswer = (languageValue: LoveLanguage) => {
    // Update scores
    setScores(prevScores => ({
      ...prevScores,
      [languageValue]: prevScores[languageValue] + 1
    }));
    
    // Move to next question or show results
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowResults(false);
    setScores({
      words: 0,
      service: 0,
      gifts: 0,
      time: 0,
      touch: 0
    });
  };
  
  const saveResults = () => {
    setSaving(true);
    // In a real app, this would save to a database
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Results Saved",
        description: "Your love language profile has been saved successfully!",
      });
    }, 1000);
  };
  
  // Determine the primary love language
  const getPrimaryLoveLanguage = (): LoveLanguage => {
    return Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0] as LoveLanguage;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Book className="w-6 h-6 text-heart" />
            <h1 className="text-3xl font-serif">Love Language Quiz</h1>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover how you prefer to give and receive love. Understanding your love language can 
            strengthen your connection with your partner.
          </p>
        </div>
        
        <Card className="romance-card">
          {!showResults ? (
            <>
              <CardHeader>
                <CardTitle>Question {currentQuestion + 1} of {quizQuestions.length}</CardTitle>
                <CardDescription>Select the option that resonates most with you</CardDescription>
              </CardHeader>
              <CardContent>
                <LoveLanguageQuestion 
                  question={quizQuestions[currentQuestion]} 
                  onAnswer={handleAnswer} 
                />
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-heart" fill="#FF6B6B" />
                  Your Love Language Results
                </CardTitle>
                <CardDescription>
                  Based on your answers, here's how you prioritize the five love languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoveLanguageResults 
                  scores={scores} 
                  primaryLanguage={getPrimaryLoveLanguage()} 
                />
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
                <HeartButton
                  onClick={restartQuiz}
                  variant="outline"
                >
                  Retake Quiz
                </HeartButton>
                <HeartButton
                  onClick={saveResults}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save My Results'}
                </HeartButton>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default LoveLanguageQuiz;
