
import { Message } from './types';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MessageBubble = ({ message, isCurrentUser }: MessageBubbleProps) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isCurrentUser
            ? 'bg-heart text-white rounded-br-none'
            : 'bg-muted rounded-bl-none'
        }`}
      >
        <p>{message.content}</p>
        <span className={`text-xs mt-1 block text-right ${
          isCurrentUser ? 'text-white/80' : 'text-muted-foreground'
        }`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
