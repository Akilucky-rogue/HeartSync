
import React from 'react';
import Header from '@/components/common/Header';
import LoveLanguageQuiz from '@/components/love-language/LoveLanguageQuiz';

const LoveLanguagePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <LoveLanguageQuiz />
      </main>
    </div>
  );
};

export default LoveLanguagePage;
