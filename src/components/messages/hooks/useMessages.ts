
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Message } from '../types';

const initialMessages = [
  {
    id: 1,
    sender: '456',
    content: 'Hey there! How was your day?',
    timestamp: '2024-04-03T10:30:00Z',
  },
  {
    id: 2,
    sender: '123',
    content: 'It was great! I had that meeting I was telling you about. It went really well!',
    timestamp: '2024-04-03T10:32:00Z',
  },
  {
    id: 3,
    sender: '456',
    content: 'That\'s wonderful to hear! I knew you\'d do great. 💕',
    timestamp: '2024-04-03T10:33:00Z',
  },
  {
    id: 4,
    sender: '123',
    content: 'Thanks for always believing in me. What about your day?',
    timestamp: '2024-04-03T10:35:00Z',
  },
  {
    id: 5,
    sender: '456',
    content: 'Just the usual. Missing you though!',
    timestamp: '2024-04-03T10:36:00Z',
  }
];

export const useMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    const message = {
      id: messages.length + 1,
      sender: user?.id || '123',
      content,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, message]);
    
    // Simulate partner response after a delay
    if (messages.length % 3 === 0) {
      setTimeout(() => {
        const responseMessage = {
          id: messages.length + 2,
          sender: user?.partnerId || '456',
          content: "I'm thinking about you too! ❤️",
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 3000);
    }
  };

  const sendHeart = () => {
    const heartMessage = {
      id: messages.length + 1,
      sender: user?.id || '123',
      content: "❤️",
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, heartMessage]);
    
    setTimeout(() => {
      const responseMessage = {
        id: messages.length + 2,
        sender: user?.partnerId || '456',
        content: "❤️",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  return {
    messages,
    sendMessage,
    sendHeart,
    isCurrentUser: (sender: string) => sender === (user?.id || '123'),
  };
};
