import { useState } from 'react'
import Sidebar from './components/Sidebar.tsx'
import ChatArea from './components/ChatArea.tsx'
import Header from './components/Header.tsx'
import LandingPage from './components/LandingPage.tsx'
import CenterUpload from './components/CenterUpload.tsx'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showLanding, setShowLanding] = useState(true)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [showChat, setShowChat] = useState(false)
  const [isDocumentsProcessed, setIsDocumentsProcessed] = useState(false)

  const handleFilesUploaded = (files: string[]) => {
    setUploadedFiles(files)
    setShowChat(true)
    setIsDocumentsProcessed(true)
  }

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 flex">
      {/* Sidebar - only show when chat is active */}
      {showChat && (
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          onBackToHome={() => setShowLanding(true)}
          showSidebarToggle={showChat}
        />
        
        {/* Content Area */}
        {showChat ? (
          <ChatArea isDocumentsProcessed={isDocumentsProcessed} />
        ) : (
          <CenterUpload onFilesUploaded={handleFilesUploaded} />
        )}
      </div>
    </div>
  )
}

export default App
