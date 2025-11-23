import { Plus, MessageSquare, Trash2, X } from 'lucide-react';
import type { Chat } from '../App';

interface SidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({
  chats,
  currentChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  isOpen,
  onToggle,
}: SidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex-1"
        >
          <Plus className="w-4 h-4" />
          <span>Chat Baru</span>
        </button>
        <button
          onClick={onToggle}
          className="ml-2 p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {chats.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Belum ada riwayat chat</p>
          </div>
        ) : (
          <div className="space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center gap-2 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                  currentChatId === chat.id
                    ? 'bg-gray-200'
                    : 'hover:bg-gray-200'
                }`}
                onClick={() => onSelectChat(chat.id)}
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0 text-gray-600" />
                <span className="flex-1 text-sm text-gray-900 truncate">
                  {chat.title}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-300 rounded transition-opacity"
                >
                  <Trash2 className="w-3 h-3 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>AI Assistant v1.0</p>
          <p className="mt-1">Production Ready</p>
        </div>
      </div>
    </div>
  );
}
