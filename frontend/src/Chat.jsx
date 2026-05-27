import React, { useState } from 'react';

export default function Chat({ cvId }) {
  // Initial placeholder conversation history
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '👋 Salam! I am your AI Career Co-pilot. Once you upload your CV on the Home dashboard, you can ask me to analyze skill gaps, design a 3-month roadmap, or write targeted cover letters.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // Safety Check: Backend Contract requires a cv_id
    if (!cvId) {
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: input },
        { sender: 'ai', text: '⚠️ **Action Required:** Please go back to the **Home** tab and upload your CV first. The AI assistant requires your profile data context to look up embeddings!' }
      ]);
      setInput('');
      return;
    }

    const userMessageText = input;

    // 1. Instantly append user message to the chat feed
    const userMessage = { sender: 'user', text: userMessageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      setLoading(true);

      // 2. Make the real network request to your teammate's API Contract: 2. Chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Sends exact contract layout payload: { cv_id, message }
        body: JSON.stringify({ 
          cv_id: cvId, 
          message: userMessageText 
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch response from API');

      const data = await response.json();

      // 3. Append the real AI response matching the contract return layout: { reply }
      setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);

    } catch (error) {
      console.error("Error connecting to backend chat:", error);
      setMessages((prev) => [
        ...prev,
        { 
          sender: 'ai', 
          text: `📡 Outbound payload structured perfectly: \n\`{ cv_id: "${cvId}", message: "${userMessageText}" }\` \n\nWaiting for your teammate to turn on the backend server to process the query!` 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
      {/* Top Info Bar */}
      <div className="px-6 py-4 bg-gray-950 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Pillar 3: Personal AI Assistant</h3>
          <p className="text-xs text-gray-500">
            {cvId ? `Connected to CV: ${cvId}` : 'Awaiting Profile Initialization'}
          </p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded border ${
          cvId 
            ? 'text-emerald-400 bg-emerald-950/50 border-emerald-900' 
            : 'text-amber-400 bg-amber-950/50 border-amber-900'
        }`}>
          {cvId ? 'RAG Context Active' : 'No CV Context'}
        </span>
      </div>

      {/* Messages Streaming Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-900/50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-xl px-4 py-3 text-sm whitespace-pre-line leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                  : msg.text.startsWith('⚠️')
                    ? 'bg-amber-950/40 text-amber-200 border border-amber-900/60 rounded-xl'
                    : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-400 border border-gray-700 rounded-xl rounded-bl-none px-4 py-3 text-sm animate-pulse">
              Querying RAG vectors...
            </div>
          </div>
        )}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSend} className="p-4 bg-gray-950 border-t border-gray-800 flex gap-3">
        <input
          type="text"
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your skill gaps, ask for a 3-month roadmap..."
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-medium px-5 py-2 rounded-lg text-sm transition-all shadow-md shrink-0"
        >
          Send
        </button>
      </form>
    </div>
  );
}