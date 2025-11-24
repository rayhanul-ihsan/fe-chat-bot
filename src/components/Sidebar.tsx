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
    <div
      style={{
        width: "16rem",
        background: "var(--dark-gray)",
        borderRight: "1px solid var(--medium-gray)",
        display: "flex",
        flexDirection: "column",
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <div
        style={{
          padding: "1rem",
          borderBottom: "1px solid var(--medium-gray)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={onNewChat}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--dark-red)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--primary-red)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.625rem 1rem",
            background: "var(--primary-red)",
            color: "white",
            borderRadius: "0.5rem",
            flex: 1,
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
        >
          <Plus style={{ width: "1rem", height: "1rem" }} />
          <span>Chat Baru</span>
        </button>
        <button
          onClick={onToggle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--medium-gray)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
          style={{
            marginLeft: "0.5rem",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            color: "var(--text-light)",
            transition: "background 0.2s ease",
            backgroundColor: "transparent",
          }}
        >
          <X style={{ width: "1rem", height: "1rem" }} />
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.75rem",
        }}
      >
        {chats.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem 0",
              color: "var(--text-gray)",
            }}
          >
            <MessageSquare
              style={{
                width: "2rem",
                height: "2rem",
                margin: "0 auto 0.5rem",
                opacity: 0.5,
              }}
            />
            <p style={{ fontSize: "0.875rem" }}>Belum ada riwayat chat</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                onMouseEnter={(e) => {
                  if (currentChatId !== chat.id) {
                    e.currentTarget.style.background = "var(--medium-gray)";
                  }
                  const deleteBtn = e.currentTarget.querySelector('.delete-btn') as HTMLElement;
                  if (deleteBtn) deleteBtn.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  if (currentChatId !== chat.id) {
                    e.currentTarget.style.background = "transparent";
                  }
                  const deleteBtn = e.currentTarget.querySelector('.delete-btn') as HTMLElement;
                  if (deleteBtn) deleteBtn.style.opacity = "0";
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: currentChatId === chat.id ? "var(--light-gray)" : "transparent",
                  borderLeft: currentChatId === chat.id ? "3px solid var(--primary-red)" : "3px solid transparent",
                }}
              >
                <MessageSquare
                  style={{
                    width: "1rem",
                    height: "1rem",
                    flexShrink: 0,
                    color: currentChatId === chat.id ? "var(--primary-red)" : "var(--text-gray)",
                  }}
                />
                <span
                  style={{
                    flex: 1,
                    fontSize: "0.875rem",
                    color: "var(--text-light)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {chat.title}
                </span>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--primary-red)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--light-gray)";
                  }}
                  style={{
                    opacity: 0,
                    padding: "0.25rem",
                    background: "var(--light-gray)",
                    borderRadius: "0.25rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Trash2 style={{ width: "0.875rem", height: "0.875rem", color: "var(--text-light)" }} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          padding: "1rem",
          borderTop: "1px solid var(--medium-gray)",
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--text-gray)",
            textAlign: "center",
          }}
        >
          <p style={{ fontWeight: "600" }}>Chat Bot v1.0</p>
          <p style={{ marginTop: "0.25rem", color: "var(--primary-red)" }}>Production Ready</p>
        </div>
      </div>
    </div>
  );
}
