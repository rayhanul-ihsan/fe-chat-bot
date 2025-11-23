import { useState, type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      style={{
        borderTop: "1px solid var(--medium-gray)",
        background: "var(--dark-gray)",
      }}
    >
      <div
        style={{
          maxWidth: "48rem",
          margin: "0 auto",
          padding: "1rem 1.5rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "end" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ketik pesan Anda di sini..."
              disabled={disabled}
              rows={1}
              style={{
                width: "100%",
                padding: "0.875rem 1rem",
                border: `2px solid ${isFocused ? "var(--primary-red)" : "var(--light-gray)"}`,
                borderRadius: "0.75rem",
                resize: "none",
                background: "var(--medium-gray)",
                color: "var(--text-light)",
                fontSize: "1rem",
                minHeight: "3.25rem",
                maxHeight: "8rem",
                transition: "all 0.3s ease",
                boxShadow: isFocused ? "0 0 0 3px rgba(220, 38, 38, 0.1)" : "none",
              }}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
            onMouseEnter={(e) => {
              if (!disabled && input.trim()) {
                e.currentTarget.style.background = "var(--dark-red)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(220, 38, 38, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled && input.trim()) {
                e.currentTarget.style.background = "var(--primary-red)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.3)";
              }
            }}
            style={{
              padding: "0.875rem",
              background: !input.trim() || disabled ? "var(--light-gray)" : "var(--primary-red)",
              color: "white",
              borderRadius: "0.75rem",
              transition: "all 0.3s ease",
              flexShrink: 0,
              cursor: !input.trim() || disabled ? "not-allowed" : "pointer",
              boxShadow: !input.trim() || disabled ? "none" : "0 4px 12px rgba(220, 38, 38, 0.3)",
            }}
          >
            <Send style={{ width: "1.25rem", height: "1.25rem" }} />
          </button>
        </div>
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-gray)",
            marginTop: "0.5rem",
            textAlign: "center",
          }}
        >
          AI dapat membuat kesalahan. Mohon verifikasi informasi penting.
        </p>
      </div>
    </div>
  );
}
