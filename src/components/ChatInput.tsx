import { useState, type KeyboardEvent } from "react";
import { PlusIcon, Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          
          {/* === Input File === */}
          <label
            className="relative cursor-pointer flex items-center justify-center "
          >
            <PlusIcon />
            <input
            style={{display: 'none'}}
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                console.log("file selected:", e.target.files?.[0]);
              }}
            />
          </label>

          {/* === Textarea === */}
          <div style={{ flex: 1 }}>
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
                border: `2px solid ${
                  isFocused ? "var(--primary-red)" : "var(--light-gray)"
                }`,
                borderRadius: "0.75rem",
                resize: "none",
                background: "var(--medium-gray)",
                color: "var(--text-light)",
                fontSize: "1rem",
                minHeight: "3.25rem",
                maxHeight: "8rem",
                transition: "all 0.2s ease",
                boxShadow: isFocused
                  ? "0 0 0 3px rgba(220, 38, 38, 0.15)"
                  : "none",
              }}
            />
          </div>

          {/* === Button Send === */}
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
            style={{
              padding: "0.875rem",
              background:
                !input.trim() || disabled
                  ? "var(--light-gray)"
                  : "var(--primary-red)",
              color: "white",
              borderRadius: "0.75rem",
              transition: "all 0.2s ease",
              flexShrink: 0,
              cursor: !input.trim() || disabled ? "not-allowed" : "pointer",
              boxShadow:
                !input.trim() || disabled
                  ? "none"
                  : "0 4px 12px rgba(220, 38, 38, 0.25)",
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
