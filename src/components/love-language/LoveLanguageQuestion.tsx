
import React from 'react';
import { LoveLanguage } from './LoveLanguageQuiz';
import { Button } from '@/components/ui/button';

export interface QuestionOption {
  value: LoveLanguage;
  text: string;
}

interface QuestionProps {
  question: {
    id: number;
    text: string;
    options: QuestionOption[];
  };
  onAnswer: (language: LoveLanguage) => void;
}

const LoveLanguageQuestion = ({ question, onAnswer }: QuestionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">{question.text}</h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.value)}
            className="w-full text-left p-4 bg-white hover:bg-heart/5 border border-border rounded-md transition-colors"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LoveLanguageQuestion;
