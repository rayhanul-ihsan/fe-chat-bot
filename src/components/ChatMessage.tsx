import { Bot, User, FileText } from 'lucide-react';
import type { Message } from '../App';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className="animate-fadeIn"
      style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isAssistant
            ? "linear-gradient(135deg, var(--primary-red), var(--dark-red))"
            : "linear-gradient(135deg, var(--light-gray), var(--medium-gray))",
          boxShadow: isAssistant
            ? "0 4px 12px rgba(220, 38, 38, 0.3)"
            : "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        {isAssistant ? (
          <Bot style={{ width: "1.25rem", height: "1.25rem", color: "white" }} />
        ) : (
          <User style={{ width: "1.25rem", height: "1.25rem", color: "white" }} />
        )}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem", paddingTop: "0.25rem" }}>
        <div
          style={{
            fontSize: "0.875rem",
            fontWeight: "600",
            color: isAssistant ? "var(--primary-red)" : "var(--text-light)",
          }}
        >
          {isAssistant ? 'AI Assistant' : 'Anda'}
        </div>
        {isLoading ? (
          <div style={{ display: "flex", gap: "0.375rem" }}>
            <div
              className="animate-bounce"
              style={{
                width: "0.5rem",
                height: "0.5rem",
                background: "var(--primary-red)",
                borderRadius: "50%",
                animationDelay: "0ms",
              }}
            />
            <div
              className="animate-bounce"
              style={{
                width: "0.5rem",
                height: "0.5rem",
                background: "var(--primary-red)",
                borderRadius: "50%",
                animationDelay: "150ms",
              }}
            />
            <div
              className="animate-bounce"
              style={{
                width: "0.5rem",
                height: "0.5rem",
                background: "var(--primary-red)",
                borderRadius: "50%",
                animationDelay: "300ms",
              }}
            />
          </div>
        ) : (
          <>
            <div
              style={{
                color: "var(--text-light)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                lineHeight: "1.6",
              }}
            >
              {message.content}
            </div>
            
            {/* Display Sources */}
            {message.sources && message.sources.length > 0 && (
              <div style={{ marginTop: "0.75rem" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-gray)", marginBottom: "0.5rem", fontWeight: "600" }}>
                  <FileText style={{ width: "0.875rem", height: "0.875rem", display: "inline", marginRight: "0.25rem" }} />
                  Sumber Referensi:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {message.sources.slice(0, 3).map((source, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "0.75rem",
                        background: "var(--dark-gray)",
                        borderLeft: "3px solid var(--primary-red)",
                        borderRadius: "0.5rem",
                        fontSize: "0.8rem",
                      }}
                    >
                      <div style={{ color: "var(--text-gray)", marginBottom: "0.25rem" }}>
                        Halaman {source.payload.page} • Skor: {(source.score * 100).toFixed(1)}%
                      </div>
                      <div style={{ color: "var(--text-light)", fontSize: "0.75rem", lineHeight: "1.4" }}>
                        {source.text.slice(0, 200)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}