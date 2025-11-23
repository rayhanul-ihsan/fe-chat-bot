import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { Sidebar } from "./components/Sidebar";
import "./styles/globals.css";
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
}

export default function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentChat = chats.find(
    (chat) => chat.id === currentChatId,
  );

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    let chatId = currentChatId;

    // Create new chat if none exists
    if (!chatId) {
      chatId = Date.now().toString();
      const newChat: Chat = {
        id: chatId,
        title:
          content.slice(0, 30) +
          (content.length > 30 ? "..." : ""),
        messages: [],
        timestamp: new Date(),
      };
      setChats((prev) => [newChat, ...prev]);
      setCurrentChatId(chatId);
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
            }
          : chat,
      ),
    );

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Ini adalah contoh respons dari AI assistant. Dalam implementasi production, Anda dapat mengintegrasikan dengan API AI seperti OpenAI, Anthropic, atau model AI lainnya.",
        timestamp: new Date(),
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, assistantMessage],
              }
            : chat,
        ),
      );
      setIsLoading(false);
    }, 1000);
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleDeleteChat = (chatId: string) => {
    setChats((prev) =>
      prev.filter((chat) => chat.id !== chatId),
    );
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            )}
            <h1 className="text-gray-900">AI Assistant</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {!currentChat || currentChat.messages.length === 0 ? (
            <WelcomeScreen
              onSuggestionClick={handleSendMessage}
            />
          ) : (
            <div className="max-w-3xl mx-auto px-6 py-8">
              {currentChat.messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}
              {isLoading && (
                <ChatMessage
                  message={{
                    id: "loading",
                    role: "assistant",
                    content: "",
                    timestamp: new Date(),
                  }}
                  isLoading
                />
              )}
            </div>
          )}
        </div>

        <ChatInput
          onSend={handleSendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}