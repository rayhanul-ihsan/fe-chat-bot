import { Sparkles, Code, Lightbulb, FileText } from 'lucide-react';

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  const suggestions = [
    {
      icon: Code,
      title: 'Bantuan Coding',
      description: 'Bantu saya menulis kode atau debug program',
    },
    {
      icon: Lightbulb,
      title: 'Brainstorming Ide',
      description: 'Diskusikan ide kreatif untuk proyek saya',
    },
    {
      icon: FileText,
      title: 'Tulis Konten',
      description: 'Buat artikel, email, atau konten lainnya',
    },
    {
      icon: Sparkles,
      title: 'Jelaskan Konsep',
      description: 'Bantu saya memahami topik yang kompleks',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-gray-900 mb-3">
            Selamat datang di AI Assistant
          </h2>
          <p className="text-gray-600">
            Mulai percakapan baru atau pilih salah satu saran di bawah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion.description)}
                className="group p-6 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 group-hover:bg-blue-600 rounded-lg transition-colors">
                    <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">
                      {suggestion.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {suggestion.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h3 className="text-gray-900 mb-2">
            💡 Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Jelaskan pertanyaan Anda dengan detail untuk mendapat jawaban terbaik</li>
            <li>• Gunakan Shift + Enter untuk baris baru</li>
            <li>• Semua riwayat chat tersimpan di sidebar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
