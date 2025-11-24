import { useState, type KeyboardEvent } from "react";
import { PlusIcon, Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onFileUpload: any;
  disabled?: boolean;
}

export function ChatInput({ onSend, onFileUpload, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput("");
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      await onFileUpload(file);
      alert(`Dokumen "${file.name}" berhasil diupload dan diindex!`);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      // Reset input file
      event.target.value = "";
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
            style={{
              cursor: isUploading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.875rem",
              background: isUploading ? "var(--light-gray)" : "var(--medium-gray)",
              borderRadius: "0.75rem",
              color: "var(--text-light)",
              transition: "all 0.2s ease",
            }}
          >
            <PlusIcon style={{ width: "1.25rem", height: "1.25rem" }} />
            <input
              style={{ display: 'none' }}
              type="file"
              accept=".pdf,.docx,.csv,.txt"
              onChange={handleFileChange}
              disabled={isUploading || disabled}
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
              placeholder={isUploading ? "Uploading document..." : "Ketik pesan Anda di sini..."}
              disabled={disabled || isUploading}
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
            disabled={!input.trim() || disabled || isUploading}
            style={{
              padding: "0.875rem",
              background:
                !input.trim() || disabled || isUploading
                  ? "var(--light-gray)"
                  : "var(--primary-red)",
              color: "white",
              borderRadius: "0.75rem",
              transition: "all 0.2s ease",
              flexShrink: 0,
              cursor: !input.trim() || disabled || isUploading ? "not-allowed" : "pointer",
              boxShadow:
                !input.trim() || disabled || isUploading
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
          {isUploading ? "Uploading and indexing document..." : "AI dapat membuat kesalahan. Mohon verifikasi informasi penting."}
        </p>
      </div>
    </div>
  );
}