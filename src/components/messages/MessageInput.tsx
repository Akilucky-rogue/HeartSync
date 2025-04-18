
import React, { useState } from 'react';
import { Image, Send, Smile, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onSendHeart: () => void;
}

const MessageInput = ({ onSendMessage, onSendHeart }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    onSendMessage(newMessage);
    setNewMessage('');
  };

  const handleImageUpload = () => {
    toast({
      title: "Coming Soon",
      description: "Image sharing will be available in the next update!",
    });
  };

  return (
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
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 p-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-heart"
        />
        <button 
          onClick={onSendHeart}
          className="p-2 text-heart hover:text-heart/80 transition-colors"
        >
          <Heart className="w-5 h-5" fill="currentColor" />
        </button>
        <button 
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className="p-2 bg-heart text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
