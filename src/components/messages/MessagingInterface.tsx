
import React, { useState, useRef, useEffect } from 'react';
import { Heart, Image, Send, Smile, PaperclipIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

// Mock messages - in a real app these would come from a database
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

const MessagingInterface = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new ones arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would send to a backend
    const message = {
      id: messages.length + 1,
      sender: user?.id || '123',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate partner response after a delay
    if (messages.length % 3 === 0) {
      setTimeout(() => {
        const responseMessage = {
          id: messages.length + 2,
          sender: user?.partnerId || '456',
          content: "I'm thinking about you too! ❤️",
          timestamp: new Date().toISOString(),
        };
        setMessages(prevMessages => [...prevMessages, responseMessage]);
      }, 3000);
    }
  };

  const handleSendHeart = () => {
    const heartMessage = {
      id: messages.length + 1,
      sender: user?.id || '123',
      content: "❤️",
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, heartMessage]);
    
    // Simulate partner returning a heart
    setTimeout(() => {
      const responseMessage = {
        id: messages.length + 2,
        sender: user?.partnerId || '456',
        content: "❤️",
        timestamp: new Date().toISOString(),
      };
      setMessages(prevMessages => [...prevMessages, responseMessage]);
    }, 1500);
  };

  const handleImageUpload = () => {
    toast({
      title: "Coming Soon",
      description: "Image sharing will be available in the next update!",
    });
  };

  // Format timestamp to a readable time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Check if message is from current user
  const isCurrentUser = (sender: string) => sender === (user?.id || '123');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">Messages</h1>
          <p className="text-muted-foreground">
            Stay connected throughout the day with your loved one.
          </p>
        </div>
        
        {/* Messages container */}
        <div className="romance-card h-[500px] flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 bg-heart/20 rounded-full flex items-center justify-center">
              {user?.partnerName?.charAt(0) || 'P'}
            </div>
            <div>
              <h3 className="font-medium">{user?.partnerName || "Your Partner"}</h3>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          
          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser(message.sender) ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      isCurrentUser(message.sender)
                        ? 'bg-heart text-white rounded-br-none'
                        : 'bg-muted rounded-bl-none'
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className={`text-xs mt-1 block text-right ${
                      isCurrentUser(message.sender) ? 'text-white/80' : 'text-muted-foreground'
                    }`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Message input */}
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleImageUpload}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Image className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Smile className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 p-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-heart"
              />
              <button 
                onClick={handleSendHeart}
                className="p-2 text-heart hover:text-heart/80 transition-colors"
              >
                <Heart className="w-5 h-5" fill="currentColor" />
              </button>
              <button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="p-2 bg-heart text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingInterface;
