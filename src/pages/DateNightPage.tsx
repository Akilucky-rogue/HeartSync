
import React from 'react';
import Header from '@/components/common/Header';
import DateNightGenerator from '@/components/date-night/DateNightGenerator';

const DateNightPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <DateNightGenerator />
      </main>
    </div>
  );
};

export default DateNightPage;
