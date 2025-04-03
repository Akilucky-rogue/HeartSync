
import React from 'react';
import Header from '@/components/common/Header';
import Timeline from '@/components/timeline/Timeline';

const TimelinePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Timeline />
      </main>
    </div>
  );
};

export default TimelinePage;
