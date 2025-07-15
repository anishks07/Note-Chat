import { useState } from 'react'
import { api } from '../config/api'

interface CenterUploadProps {
  onFilesUploaded: (files: string[]) => void
}

export default function CenterUpload({ onFilesUploaded }: CenterUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    const pdfFiles = files.filter(file => file.type === 'application/pdf')
    setUploadedFiles(prev => [...prev, ...pdfFiles])
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const pdfFiles = files.filter(file => file.type === 'application/pdf')
    setUploadedFiles(prev => [...prev, ...pdfFiles])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleProcess = async () => {
    setIsProcessing(true)
    setError(null)
    
    try {
      await api.uploadFiles(uploadedFiles)
      const fileNames = uploadedFiles.map(file => file.name)
      onFilesUploaded(fileNames)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-0">
      <div className="max-w-xl w-full">
        {/* Upload Area */}
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Documents</h2>
          <p className="text-base text-gray-600 mb-4">
            Start by uploading your PDF documents to begin chatting with them
          </p>
        </div>

        <div
          className={`
            border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 mb-4
            ${isDragOver 
              ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mx-auto w-12 h-12 text-gray-400 mb-3">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Drop your PDF files here
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            Drag and drop your PDFs or click below to select files
          </p>
          <label className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer transition-all transform hover:scale-105 shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <input 
              type="file" 
              className="hidden" 
              multiple 
              accept=".pdf" 
              onChange={handleFileInput}
            />
            Choose PDF Files
          </label>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 mb-4 max-h-48 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Uploaded Files</h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">PDF Document</p>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Process Button */}
        {uploadedFiles.length > 0 && (
          <div className="text-center">
            <button 
              onClick={handleProcess}
              disabled={isProcessing}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed font-semibold text-base shadow-lg disabled:shadow-none transform hover:scale-105 disabled:transform-none"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing Documents...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Process Documents & Start Chatting
                </div>
              )}
            </button>
            <p className="text-xs text-gray-500 mt-2">
              This will analyze your documents and prepare them for intelligent conversations
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
