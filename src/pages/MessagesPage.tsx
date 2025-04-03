
import React from 'react';
import Header from '@/components/common/Header';
import MessagingInterface from '@/components/messages/MessagingInterface';

const MessagesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <MessagingInterface />
      </main>
    </div>
  );
};

export default MessagesPage;
