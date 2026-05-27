import React, { useState } from 'react';

export default function Home({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    setUploading(true);
    setMessage('');

    // Prepare form data to send the binary file
    const formData = new FormData();
    formData.append('cv', file);

    try {
      // API Contract Endpoints: 1. Upload CV
      const response = await fetch('/api/upload-cv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();

      // Contract Check: Expects a response returning { cv_id }
      if (data && data.cv_id) {
        onUploadSuccess(data.cv_id); // Save globally into App.jsx state
        setMessage(`✅ CV uploaded and processed successfully! Assigned CV ID: ${data.cv_id}`);
      } else {
        setMessage('⚠️ File received, but the backend did not return a valid "cv_id".');
      }
    } catch (error) {
      console.error("Network error during file upload:", error);
      // Fallback message confirming you attempted to stream the file payload to the endpoint
      setMessage('📡 Request sent. Open your Browser Network Tab (F12) to verify the outgoing file stream to /api/upload-cv.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-xl">
      <h3 className="text-xl font-semibold text-white mb-2">Pillar 2: Profile & Resume Intelligence</h3>
      <p className="text-sm text-gray-400 mb-6">
        Upload your PDF or DOCX resume to initialize your Agentic profile layer.
      </p>

      <form onSubmit={handleUpload} className="space-y-6">
        {/* File Dropzone UI */}
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-950 border-gray-700 hover:border-blue-500 hover:bg-gray-900/50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
              <span className="text-4xl mb-3">📄</span>
              <p className="mb-2 text-sm text-gray-300 font-medium">
                {file ? `Selected: ${file.name}` : "Click to upload your CV"}
              </p>
              <p className="text-xs text-gray-500">PDF or DOCX (Max 5MB)</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf,.docx" 
              onChange={handleFileChange} 
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-3 px-4 rounded-lg font-medium tracking-wide transition-all ${
            uploading 
              ? 'bg-blue-800 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/10'
          }`}
        >
          {uploading ? 'Processing CV Chunks...' : 'Upload & Parse CV'}
        </button>
      </form>

      {/* Feedback Message */}
      {message && (
        <div className={`mt-6 p-4 rounded-lg text-sm border ${
          message.includes('✅') 
            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800' 
            : 'bg-amber-950/40 text-amber-400 border-amber-900'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}