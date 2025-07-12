import { useState } from 'react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  uploadedFiles: string[]
  setUploadedFiles: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Sidebar({ isOpen, onClose, uploadedFiles, setUploadedFiles }: SidebarProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles(prev => [...prev, ...files.map(f => f.name)])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleProcess = () => {
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
    }, 3000)
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-96 bg-white/95 backdrop-blur-sm border-r border-gray-200/50 
        transform transition-all duration-300 lg:translate-x-0 shadow-xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Documents</h2>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* File Upload Area - Compact version */}
          <div className="p-6 flex-1 overflow-y-auto">
            {/* Add More Files */}
            <div className="mb-6">
              <label className="block">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer">
                  <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-sm text-gray-600 font-medium">Add More PDFs</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  multiple 
                  accept=".pdf" 
                  onChange={handleFileInput}
                />
              </label>
            </div>

            {/* Uploaded Files List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Documents</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="space-y-3">
                {uploadedFiles.map((fileName, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {fileName}
                      </p>
                      <p className="text-xs text-gray-500">PDF Document</p>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Process Button */}
          <div className="p-6 border-t border-gray-200/50">
            <button 
              onClick={handleProcess}
              disabled={uploadedFiles.length === 0 || isProcessing}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed font-semibold text-lg shadow-lg disabled:shadow-none transform hover:scale-[1.02] disabled:transform-none"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing Documents...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Process Documents
                </div>
              )}
            </button>
            {uploadedFiles.length === 0 && (
              <p className="text-xs text-gray-500 text-center mt-2">
                Upload documents first to enable processing
              </p>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
