import React, { useState } from 'react';
import Home from './Home';
import Jobs from './Jobs';
import Chat from './Chat';
import Tracker from './Tracker';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [cvId, setCvId] = useState(null);

  const tabs = [
    { name: 'Home', icon: '🏠' },
    { name: 'Jobs', icon: '💼' },
    { name: 'Chat', icon: '🤖' },
    { name: 'Tracker', icon: '📊' },
  ];

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col justify-between shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🚀</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              CareerPilot
            </h1>
          </div>
          <p className="text-xs text-gray-500 ml-9">Agentic AI Co-pilot</p>
          <nav className="mt-8 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                  activeTab === tab.name
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-600">Codesprint 2026</p>
          <p className="text-xs text-gray-700">by Poridhi.io</p>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-gray-800 flex items-center px-8 bg-gray-900/50 backdrop-blur-sm justify-between shrink-0">
          <h2 className="text-lg font-semibold text-gray-100">{activeTab}</h2>
          {cvId && (
            <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-full font-mono">
              ✓ CV Loaded
            </span>
          )}
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'Home' && <Home onUploadSuccess={setCvId} />}
          {activeTab === 'Jobs' && <Jobs cvId={cvId} />}
          {activeTab === 'Chat' && <Chat cvId={cvId} />}
          {activeTab === 'Tracker' && <Tracker />}
        </div>
      </main>
    </div>
  );
}
