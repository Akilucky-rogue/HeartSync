
import React, { useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { useMessages } from './hooks/useMessages';

const MessagingInterface = () => {
  const { user } = useAuth();
  const { messages, sendMessage, sendHeart, isCurrentUser } = useMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">Messages</h1>
          <p className="text-muted-foreground">
            Stay connected throughout the day with your loved one.
          </p>
        </div>
        
        <div className="romance-card h-[500px] flex flex-col">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 bg-heart/20 rounded-full flex items-center justify-center">
              {user?.partnerName?.charAt(0) || 'P'}
            </div>
            <div>
              <h3 className="font-medium">{user?.partnerName || "Your Partner"}</h3>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isCurrentUser={isCurrentUser(message.sender)}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <MessageInput
            onSendMessage={sendMessage}
            onSendHeart={sendHeart}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagingInterface;
