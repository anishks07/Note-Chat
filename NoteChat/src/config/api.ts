const API_BASE_URL = 'http://localhost:8000';

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export interface AskResponse {
  answer: string;
  chat_history: ChatMessage[];
}

export interface UploadResponse {
  message: string;
}

export const api = {
  async uploadFiles(files: File[]): Promise<UploadResponse> {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));

    const response = await fetch(`${API_BASE_URL}/upload/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  },

  async askQuestion(question: string): Promise<AskResponse> {
    const response = await fetch(`${API_BASE_URL}/ask/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`Ask failed: ${response.statusText}`);
    }

    return response.json();
  }
};