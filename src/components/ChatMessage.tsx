import { Bot, User } from 'lucide-react';
import type { Message } from '../App';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex gap-4 mb-6 ${isAssistant ? '' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isAssistant ? 'bg-blue-600' : 'bg-gray-900'
      }`}>
        {isAssistant ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>

      <div className="flex-1 space-y-2 pt-1">
        <div className="text-sm text-gray-900">
          {isAssistant ? 'AI Assistant' : 'Anda'}
        </div>
        {isLoading ? (
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        ) : (
          <div className="text-gray-800 whitespace-pre-wrap break-words">
            {message.content}
          </div>
        )}
      </div>
    </div>
  );
}
