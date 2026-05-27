import React, { useState } from 'react';
import Home from './Home';
import Jobs from './Jobs';
import Chat from './Chat';
import KanbanBoard from './components/KanbanBoard';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  // Global state to store the uploaded resume identifier returned from the backend
  const [cvId, setCvId] = useState(null); 

  const tabs = ['Home', 'Jobs', 'Chat', 'Tracker'];

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col justify-between">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-wider text-blue-400">🚀 CareerPilot</h1>
          <p className="text-xs text-gray-500 mt-1">Agentic AI Co-pilot</p>

          <nav className="mt-8 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
          Codesprint 2026
        </div>
      </aside>

      {/* Main Content Window */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-950">
        <header className="h-16 border-b border-gray-800 flex items-center px-8 bg-gray-900/50 backdrop-blur-sm justify-between">
          <h2 className="text-lg font-semibold text-gray-200">{activeTab} Dashboard</h2>
          {cvId && (
            <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-md font-mono">
              Active CV ID: {cvId}
            </span>
          )}
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'Home' && <Home onUploadSuccess={setCvId} />}
          {activeTab === 'Jobs' && <Jobs cvId={cvId} />}
          {activeTab === 'Chat' && <Chat cvId={cvId} />}
          {activeTab === 'Tracker' && <KanbanBoard />}
        </div>
      </main>
    </div>
  );
}