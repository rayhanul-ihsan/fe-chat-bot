import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { Sidebar } from "./components/Sidebar";
import { chatAPI } from "./api";
import "./styles/globals.css";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: Array<{
    text: string;
    payload: { page: number };
    score: number;
  }>;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
  docId?: string; // Tambahkan doc_id untuk setiap chat
}

export default function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true);
      
      // Upload document
      const uploadResult = await chatAPI.uploadDocument(file);
      console.log("Upload success:", uploadResult);
      
      // Set current doc_id
      setCurrentDocId(uploadResult.doc_id);
      
      // Create new chat with doc_id
      const chatId = Date.now().toString();
      const newChat: Chat = {
        id: chatId,
        title: file.name,
        messages: [],
        timestamp: new Date(),
        docId: uploadResult.doc_id,
      };
      setChats((prev) => [newChat, ...prev]);
      setCurrentChatId(chatId);
      
      return uploadResult;
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal upload dokumen. Silakan coba lagi.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    let chatId = currentChatId;

    // Create new chat if none exists
    if (!chatId) {
      chatId = Date.now().toString();
      const newChat: Chat = {
        id: chatId,
        title: content.slice(0, 30) + (content.length > 30 ? "..." : ""),
        messages: [],
        timestamp: new Date(),
        docId: currentDocId || undefined,
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
          : chat
      )
    );

    // Call API
    setIsLoading(true);
    try {
      const response = await chatAPI.sendMessage(content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.response,
        timestamp: new Date(),
        sources: response.sources,
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, assistantMessage],
              }
            : chat
        )
      );
    } catch (error) {
      console.error("Chat error:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
        timestamp: new Date(),
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, errorMessage],
              }
            : chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    const selectedChat = chats.find((c) => c.id === chatId);
    if (selectedChat?.docId) {
      setCurrentDocId(selectedChat.docId);
    }
  };

  const handleDeleteChat = (chatId: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "var(--black)",
        color: "var(--text-light)",
      }}
    >
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <header
          style={{
            borderBottom: "1px solid var(--medium-gray)",
            padding: "1rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--dark-gray)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                style={{
                  padding: "0.5rem",
                  background: "var(--medium-gray)",
                  borderRadius: "0.5rem",
                  color: "var(--text-light)",
                }}
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
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                background: "linear-gradient(135deg, var(--primary-red), var(--light-red))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI Assistant
            </h1>
          </div>
        </header>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            background: "var(--black)",
          }}
        >
          {!currentChat || currentChat.messages.length === 0 ? (
            <WelcomeScreen onSuggestionClick={handleSendMessage} />
          ) : (
            <div
              style={{
                maxWidth: "56rem",
                margin: "0 auto",
                padding: "2rem 1.5rem",
              }}
            >
              {currentChat.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
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
          onFileUpload={handleFileUpload}
          disabled={isLoading} 
        />
      </div>
    </div>
  );
}