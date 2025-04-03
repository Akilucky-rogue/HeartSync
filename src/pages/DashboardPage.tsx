
import React from 'react';
import Header from '@/components/common/Header';
import Dashboard from '@/components/dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardPage;
