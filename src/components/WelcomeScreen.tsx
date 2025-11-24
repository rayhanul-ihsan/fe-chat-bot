import { Sparkles, Code, Lightbulb, FileText } from 'lucide-react';

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  const suggestions = [
    {
      icon: Code,
      title: 'Bantuan Dalam Ringkasan Dokumen',
      description: 'Bantu saya untuk analisis dokument itu',
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "3rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "48rem", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }} className="animate-fadeIn">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "4rem",
              height: "4rem",
              background: "linear-gradient(135deg, var(--primary-red), var(--dark-red))",
              borderRadius: "1rem",
              marginBottom: "1.5rem",
              animation: "glow 2s ease-in-out infinite",
            }}
          >
            <Sparkles style={{ width: "2rem", height: "2rem", color: "white" }} />
          </div>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "var(--text-light)",
              marginBottom: "0.75rem",
            }}
          >
            Selamat datang di Chat Bot
          </h2>
          <p style={{ color: "var(--text-gray)", fontSize: "1.125rem" }}>
            Mulai percakapan baru atau pilih salah satu saran di bawah
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion.description)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary-red)";
                  e.currentTarget.style.background = "var(--medium-gray)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(220, 38, 38, 0.3)";
                  const iconDiv = e.currentTarget.querySelector('.icon-div') as HTMLElement;
                  if (iconDiv) iconDiv.style.background = "var(--primary-red)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--light-gray)";
                  e.currentTarget.style.background = "var(--dark-gray)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  const iconDiv = e.currentTarget.querySelector('.icon-div') as HTMLElement;
                  if (iconDiv) iconDiv.style.background = "var(--light-gray)";
                }}
                style={{
                  padding: "1.5rem",
                  border: "1px solid var(--light-gray)",
                  borderRadius: "0.75rem",
                  transition: "all 0.3s ease",
                  textAlign: "left",
                  background: "var(--dark-gray)",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "start", gap: "1rem" }}>
                  <div
                    className="icon-div"
                    style={{
                      padding: "0.625rem",
                      background: "var(--light-gray)",
                      borderRadius: "0.5rem",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Icon style={{ width: "1.25rem", height: "1.25rem", color: "var(--primary-red)" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        color: "var(--text-light)",
                        marginBottom: "0.5rem",
                        fontWeight: "600",
                      }}
                    >
                      {suggestion.title}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-gray)" }}>
                      {suggestion.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div
          style={{
            padding: "1.5rem",
            background: "var(--dark-gray)",
            border: "1px solid var(--medium-gray)",
            borderRadius: "0.75rem",
          }}
        >
          <h3
            style={{
              color: "var(--text-light)",
              marginBottom: "0.75rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ fontSize: "1.25rem" }}>💡</span> Tips
          </h3>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li style={{ fontSize: "0.875rem", color: "var(--text-gray)", display: "flex", alignItems: "start" }}>
              <span style={{ color: "var(--primary-red)", marginRight: "0.5rem" }}>•</span>
              <span>Jelaskan pertanyaan Anda dengan detail untuk mendapat jawaban terbaik</span>
            </li>
            <li style={{ fontSize: "0.875rem", color: "var(--text-gray)", display: "flex", alignItems: "start" }}>
              <span style={{ color: "var(--primary-red)", marginRight: "0.5rem" }}>•</span>
              <span>Gunakan Shift + Enter untuk baris baru</span>
            </li>
            <li style={{ fontSize: "0.875rem", color: "var(--text-gray)", display: "flex", alignItems: "start" }}>
              <span style={{ color: "var(--primary-red)", marginRight: "0.5rem" }}>•</span>
              <span>Semua riwayat chat tersimpan di sidebar</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
