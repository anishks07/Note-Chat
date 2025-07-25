# Note-Chat

A comprehensive AI-powered document analysis and chat system that allows users to upload PDF documents and have intelligent conversations about their content.

## 🌟 Features

- **PDF Upload & Processing**: Upload multiple PDF documents simultaneously
- **AI-Powered Chat**: Ask questions about your documents and get intelligent responses
- **Modern UI**: Beautiful, responsive React-based frontend with Tailwind CSS
- **Real-time Processing**: Fast document processing and instant responses
- **Error Handling**: Comprehensive error handling and user feedback
- **CORS Support**: Backend configured for cross-origin requests

## 🏗️ Architecture

The system consists of two main components:

### Backend (FastAPI)
- **API Server**: FastAPI-based REST API
- **Document Processing**: PDF text extraction and chunking
- **Vector Store**: Document embedding storage for semantic search
- **Conversational AI**: LLM-powered question answering system

### Frontend (React + TypeScript)
- **Modern React App**: Built with TypeScript and Vite
- **Responsive UI**: Tailwind CSS for styling
- **File Upload**: Drag-and-drop PDF upload interface
- **Chat Interface**: Real-time chat with the AI system
- **State Management**: React hooks for application state

## 📁 Project Structure

```
Note-Chat/
├── api.py                          # FastAPI backend server
├── app.py                          # Alternative app entry point
├── main.py                         # Main application entry
├── pyproject.toml                  # Python project configuration (uv managed)
├── uv.lock                         # UV lock file (dependency resolution)
├── requirements.txt                # Python dependencies (legacy/fallback)
├── setup.py                        # Package setup
├── template.py                     # Template configurations
├── src/                            # Python source code
│   ├── __init__.py
│   └── helper.py                   # Helper functions for PDF processing
├── uploads/                        # Directory for uploaded files
├── research/                       # Research and development files
│   └── trails.ipynb               # Jupyter notebook for experiments
└── NoteChat/                       # React frontend application
    ├── src/
    │   ├── components/             # React components
    │   │   ├── Header.tsx          # Application header
    │   │   ├── Sidebar.tsx         # File management sidebar
    │   │   ├── CenterUpload.tsx    # File upload component
    │   │   ├── ChatArea.tsx        # Chat interface
    │   │   └── LandingPage.tsx     # Welcome page
    │   ├── config/
    │   │   └── api.ts              # API configuration and calls
    │   ├── App.tsx                 # Main application component
    │   └── main.tsx                # Application entry point
    ├── public/                     # Static assets
    ├── package.json                # Node.js dependencies
    ├── tailwind.config.js          # Tailwind CSS configuration
    ├── vite.config.ts              # Vite build configuration
    └── tsconfig.json               # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- uv (Python package manager)
- Node.js 16+
- npm or yarn

### Installing uv

If you don't have `uv` installed, install it first:

```bash
# On macOS and Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# On Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Or via pip (if you have Python already)
pip install uv
```

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/anishks07/Note-Chat.git
   cd Note-Chat
   ```

2. **Install Python dependencies and create virtual environment**
   ```bash
   uv sync
   ```

3. **Start the FastAPI server**
   ```bash
   uv run uvicorn api:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd NoteChat
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## 📚 API Documentation

### Upload Endpoint

**POST** `/upload/`

Upload and process PDF documents.

```typescript
const formData = new FormData();
pdfFiles.forEach(file => formData.append("files", file));

await fetch("http://localhost:8000/upload/", {
  method: "POST",
  body: formData,
});
```

**Response:**
```json
{
  "message": "PDFs processed successfully!"
}
```

### Ask Endpoint

**POST** `/ask/`

Ask questions about uploaded documents.

```typescript
const response = await fetch("http://localhost:8000/ask/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ question: "What is this document about?" }),
});

const data = await response.json();
console.log(data.answer, data.chat_history);
```

**Request Body:**
```json
{
  "question": "Your question about the documents"
}
```

**Response:**
```json
{
  "answer": "AI-generated response based on document content",
  "chat_history": [
    {
      "role": "user",
      "content": "User's question"
    },
    {
      "role": "ai", 
      "content": "AI's response"
    }
  ]
}
```

## 🔧 Technical Implementation

### Backend Components

#### PDF Processing (`src/helper.py`)
- **Text Extraction**: Extracts text content from PDF files
- **Text Chunking**: Splits documents into manageable chunks
- **Vector Store**: Creates embeddings for semantic search
- **Conversational Chain**: Sets up the LLM conversation system

#### API Server (`api.py`)
- **FastAPI Application**: RESTful API server
- **CORS Middleware**: Enables cross-origin requests
- **File Upload Handling**: Processes multiple PDF uploads
- **Question Answering**: Handles user queries with context

### Frontend Components

#### File Upload (`CenterUpload.tsx`)
- Drag-and-drop interface for PDF uploads
- File validation and preview
- Real-time upload progress
- Error handling and user feedback

#### Chat Interface (`ChatArea.tsx`)
- Real-time messaging interface
- Typing indicators and loading states
- Message history display
- Error handling for API calls

#### API Integration (`config/api.ts`)
- Centralized API configuration
- Type-safe API calls
- Error handling and response parsing

## 📖 Documentation

- **[Complete Workflow Guide](WORKFLOW.md)**: Detailed visual walkthrough with step-by-step screenshots
- **[Frontend Documentation](NoteChat/README.md)**: React frontend specific documentation
- **API Documentation**: Available at `http://localhost:8000/docs` when running the server

## 🎯 Usage Workflow

The application follows a streamlined workflow for document analysis and interaction:

1. **Landing Page**: Users are greeted with a welcome screen
2. **File Upload**: Users upload PDF documents via drag-and-drop or file selection
3. **Processing**: Backend processes documents and creates vector embeddings
4. **Chat Interface**: Users can ask questions about their documents
5. **AI Responses**: System provides intelligent answers based on document content

### 📸 Visual Workflow Guide

Below are the step-by-step screenshots showing the complete user journey through the Note-Chat application:

#### Step 1: Landing Page
![Landing Page](notechatimg/1.png)
*Welcome screen where users begin their document analysis journey*

#### Step 2: Initial Interface
![Initial Interface](notechatimg/2.png)
*Clean interface ready for document upload*

#### Step 3: File Upload Interface
![File Upload](notechatimg/3.png)
*Drag-and-drop area for PDF document upload*

#### Step 4: Document Processing
![Document Processing](notechatimg/4.png)
*System processing uploaded documents and creating embeddings*

#### Step 5: Chat Interface Ready
![Chat Ready](notechatimg/5.png)
*Interface ready for user questions about uploaded documents*

#### Step 6: User Query
![User Query](notechatimg/6.png)
*User asking questions about the document content*

#### Step 7: AI Response
![AI Response](notechatimg/7.png)
*AI-powered responses based on document analysis*

#### Step 8: Continued Conversation
![Continued Chat](notechatimg/8.png)
*Ongoing conversation with contextual understanding*

> 📚 **For a more detailed explanation of each step, see the [Complete Workflow Documentation](WORKFLOW.md)**

## 🛠️ Development

### Backend Development

The backend uses FastAPI with the following key dependencies:
- **FastAPI**: Modern web framework for building APIs
- **PyPDF2/pdfplumber**: PDF text extraction
- **LangChain**: LLM integration and document processing
- **Vector Database**: For semantic search capabilities

**Useful uv Commands for Development:**
```bash
# Install/sync dependencies from pyproject.toml
uv sync

# Add a new dependency
uv add package-name

# Add a development dependency
uv add --dev package-name

# Run Python commands in the virtual environment
uv run python script.py

# Run the server in development mode
uv run uvicorn api:app --reload

# Update dependencies
uv lock --upgrade

# Show project information
uv show
```

### Frontend Development

The frontend is built with modern React and TypeScript:
- **React 18**: Latest React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server

### Building for Production

**Backend:**
```bash
# Install dependencies and setup environment
uv sync

# Run production server
uv run uvicorn api:app --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔍 Key Features Explained

### Document Processing Pipeline
1. **Upload**: Users upload PDF files through the web interface
2. **Text Extraction**: Backend extracts text content from PDFs
3. **Chunking**: Documents are split into semantic chunks
4. **Vectorization**: Text chunks are converted to embeddings
5. **Storage**: Vectors are stored for similarity search

### Question Answering System
1. **Query Processing**: User questions are processed and vectorized
2. **Similarity Search**: Relevant document chunks are retrieved
3. **Context Building**: Retrieved chunks provide context for the LLM
4. **Response Generation**: LLM generates answers based on document content
5. **History Tracking**: Conversation history is maintained for context

## 🔄 Using OpenAI Instead of Groq (Alternative Setup)

By default, this project uses **Groq** for LLM and **HuggingFace** for embeddings. If you prefer to use **OpenAI** instead, follow these steps:

### 1. Install OpenAI Dependencies

```bash
# Add OpenAI integration
uv add langchain-openai

# Remove Groq and HuggingFace (optional)
uv remove langchain-groq langchain-huggingface
```

### 2. Update Environment Variables

Add your OpenAI API key to `.env`:
```bash
OPENAI_API_KEY="sk-your-actual-openai-api-key-here"
```

### 3. Update `src/helper.py`

Replace the imports and model configurations:

**Current (Groq + HuggingFace):**
```python
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings

def get_vector_store(chunks):
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vector_store = FAISS.from_texts(chunks, embeddings)
    return vector_store

def get_conversational_chain(vector_store):
    llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0)
    # ... rest of the function
```

**Change to (OpenAI):**
```python
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

def get_vector_store(chunks):
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    vector_store = FAISS.from_texts(chunks, embeddings)
    return vector_store

def get_conversational_chain(vector_store):
    llm = ChatOpenAI(model="gpt-4", temperature=0)  # or "gpt-3.5-turbo"
    # ... rest of the function
```

### 4. Update Environment Loading

In `src/helper.py`, change the environment variable loading:

**From:**
```python
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if GROQ_API_KEY:
    os.environ["GROQ_API_KEY"] = GROQ_API_KEY
```

**To:**
```python
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if OPENAI_API_KEY:
    os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY
```

### 5. Restart the Server

```bash
uv run uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

### Why Choose OpenAI vs Groq?

**OpenAI Advantages:**
- More mature API with extensive documentation
- Higher quality embeddings with `text-embedding-3-small`
- Access to latest GPT models (GPT-4, GPT-4-turbo)
- Better integration with some LangChain features

**Groq Advantages:**
- Faster inference speed
- Often more cost-effective
- Good open-source model support (Llama, Mixtral)
- HuggingFace embeddings are free (no API key required)

**Cost Considerations:**
- **Groq**: Pay per token, often cheaper for inference
- **OpenAI**: Pay per token for both LLM and embeddings
- **HuggingFace Embeddings**: Free (runs locally)

Choose based on your specific needs for speed, cost, and model quality.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- FastAPI for the excellent web framework
- React team for the powerful frontend library
- LangChain for LLM integration capabilities
- Groq for fast LLM inference
- HuggingFace for free embedding models
- Tailwind CSS for the beautiful styling system
