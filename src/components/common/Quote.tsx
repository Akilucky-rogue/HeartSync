
import React, { useEffect, useState } from 'react';
import { Quote, getRandomQuote } from '@/data/quotes';
import { QuoteIcon } from 'lucide-react';

interface QuoteDisplayProps {
  autoChange?: boolean;
  interval?: number;
  className?: string;
}

const QuoteDisplay = ({
  autoChange = false,
  interval = 10000,
  className = '',
}: QuoteDisplayProps) => {
  const [quote, setQuote] = useState<Quote>(getRandomQuote());
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (!autoChange) return;

    const timer = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setQuote(getRandomQuote());
        setFadeIn(true);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [autoChange, interval]);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-0 left-0 text-romance-purple opacity-20">
        <QuoteIcon size={32} />
      </div>
      
      <blockquote 
        className={`pl-10 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="text-lg font-serif italic mb-2">{quote.text}</p>
        <footer className="text-right text-sm text-muted-foreground">— {quote.author}</footer>
      </blockquote>
    </div>
  );
};

export default QuoteDisplay;
