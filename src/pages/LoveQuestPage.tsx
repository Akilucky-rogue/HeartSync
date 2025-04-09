
import React from 'react';
import Header from '@/components/common/Header';
import LoveQuest from '@/components/lovequest/LoveQuest';

const LoveQuestPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <LoveQuest />
      </main>
    </div>
  );
};

export default LoveQuestPage;
