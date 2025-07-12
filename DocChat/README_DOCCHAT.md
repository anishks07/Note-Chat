# DocChat Frontend

A modern, responsive React frontend for the DocChat document question-answering system.

## Features

- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 📱 **Mobile-First**: Responsive design that works on all devices
- 🚀 **Fast Development**: Vite-powered development server
- 📄 **File Upload**: Drag & drop PDF upload interface
- 💬 **Chat Interface**: Real-time chat UI for document conversations
- 🎯 **TypeScript**: Full TypeScript support for better development experience

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Top header with branding
│   ├── Sidebar.tsx     # File upload sidebar
│   └── ChatArea.tsx    # Main chat interface
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles (Tailwind)
```

## Components

### Header
- DocChat branding
- Mobile menu toggle
- Status indicator

### Sidebar
- PDF file upload (drag & drop)
- Uploaded files list
- Process documents button
- Mobile-responsive overlay

### ChatArea
- Welcome screen
- Message history
- Message input with send button
- Responsive chat bubbles

## Development

The app is designed to be connected to a Python backend API that handles:
- PDF text extraction
- Vector embeddings
- AI chat responses

### Next Steps
1. Connect to backend API
2. Implement file upload functionality
3. Add real chat functionality
4. Add error handling
5. Add loading states

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Styling

This project uses Tailwind CSS for styling. Key design decisions:
- **Color Scheme**: Blue primary with gray neutrals
- **Typography**: System fonts for better performance
- **Spacing**: Consistent spacing scale
- **Responsive**: Mobile-first approach

## Contributing

1. Make sure the development server runs without errors
2. Follow the existing code style
3. Add TypeScript types for new features
4. Test on mobile and desktop viewports
