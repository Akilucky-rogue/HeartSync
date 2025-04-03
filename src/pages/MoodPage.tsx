
import React from 'react';
import Header from '@/components/common/Header';
import MoodTracker from '@/components/mood/MoodTracker';

const MoodPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <MoodTracker />
      </main>
    </div>
  );
};

export default MoodPage;
