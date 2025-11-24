import axios from 'axios';

const API_BASE_URL = 'http://localhost:8010';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface UploadResponse {
  doc_id: string;
  chunks_extracted: number;
  message: string;
}

export interface ChatResponse {
  query: string;
  response: string;
  sources: Array<{
    text: string;
    payload: {
      page: number;
    };
    score: number;
  }>;
}

export const chatAPI = {
  uploadDocument: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post<UploadResponse>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  sendMessage: async (query: string): Promise<ChatResponse> => {
    const response = await apiClient.post<ChatResponse>('/chat', { query });
    return response.data;
  },
};

export default apiClient;