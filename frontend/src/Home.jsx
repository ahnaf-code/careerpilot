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

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://careerpilot-backend-9by1.onrender.com/api/upload-cv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();

      if (data && data.cv_id) {
        onUploadSuccess(data.cv_id);
        setMessage(`✅ CV uploaded successfully! Assigned CV ID: ${data.cv_id}`);
      } else {
        setMessage('⚠️ File received, but the backend did not return a valid "cv_id".');
      }
    } catch (error) {
      console.error(error);
      setMessage('📡 Request sent. Open your Browser Network Tab (F12) to verify the outgoing file stream to /api/upload-cv.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-xl text-center">
      <p className="text-sm text-gray-400 mb-8">
        Upload your PDF or DOCX resume to initialize your Agentic profile layer.
      </p>

      <form onSubmit={handleUpload} className="space-y-4 max-w-md mx-auto">
        {/* Choose File Container Box */}
        <label className="block w-full py-3 px-4 rounded-lg font-medium tracking-wide bg-gray-950 text-gray-200 border border-gray-700 hover:border-gray-500 hover:bg-gray-900 cursor-pointer text-center transition-all shadow-inner">
          📂 {file ? `Selected: ${file.name}` : 'Choose File'}
          <input 
            type="file" 
            style={{ display: 'none' }} 
            accept=".pdf,.docx" 
            onChange={handleFileChange} 
          />
        </label>

        <p className="text-xs text-gray-500 !mt-2">Supported formats: PDF or DOCX (Max 5MB)</p>

        {/* Upload Action Container Box */}
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

      {/* Feedback Alert Box */}
      {message && (
        <div className={`mt-6 p-4 rounded-lg text-sm border text-left ${
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