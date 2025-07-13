interface HeaderProps {
  onToggleSidebar: () => void
  onBackToHome?: () => void
  showSidebarToggle?: boolean
}

export default function Header({ onToggleSidebar, onBackToHome, showSidebarToggle = true }: HeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showSidebarToggle && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors mr-1"
            >
              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Note Chat Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Note Chat</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-700 font-medium">Ready to chat</span>
          </div>
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              ← Back to Home
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
