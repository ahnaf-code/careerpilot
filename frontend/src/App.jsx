// // import React from 'react';

// // function App()
// // {
// //   return (
// //     <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
// //       <h1>Hackathon Project Starter</h1>
// //       <p>The app is ready for our interface!</p>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState } from 'react';

// function App() {
//   // State to hold chat messages
//   const [messages, setMessages] = useState([
//     { sender: 'bot', text: 'Hello! Upload a file or send a message to get started.' }
//   ]);
//   // State for the text input field
//   const [inputValue, setInputValue] = useState('');

//   // Function to handle sending a message
//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     // Add user message to the chat
//     setMessages((prev) => [...prev, { sender: 'user', text: inputValue }]);
//     setInputValue('');

//     // Optional: Simulate a quick bot reply for testing
//     setTimeout(() => {
//       setMessages((prev) => [...prev, { sender: 'bot', text: 'Received! (Hackathon prototype reply)' }]);
//     }, 800);
//   };

//   // Function to handle file upload selection
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       alert(`File uploaded: ${file.name}`);
//       // You can also push a notification to the chat log
//       setMessages((prev) => [...prev, { sender: 'bot', text: `📎 Uploaded file: ${file.name}` }]);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Sidebar / Upload Section */}
//       <div style={styles.sidebar}>
//         <h2>Workspace</h2>
//         <p>Upload your documents or data files here.</p>
        
//         <label style={styles.uploadButton}>
//           📁 Choose File
//           <input 
//             type="file" 
//             onChange={handleFileUpload} 
//             style={{ display: 'none' }} 
//           />
//         </label>
//       </div>

//       {/* Main Chat Section */}
//       <div style={styles.chatContainer}>
//         <div style={styles.chatHeader}>
//           <h3>Hackathon Chat Assistant</h3>
//         </div>

//         {/* Message Log */}
//         <div style={styles.messageLog}>
//           {messages.map((msg, index) => (
//             <div 
//               key={index} 
//               style={{
//                 ...styles.messageBubble,
//                 alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
//                 backgroundColor: msg.sender === 'user' ? '#007bff' : '#e9ecef',
//                 color: msg.sender === 'user' ? '#fff' : '#333',
//               }}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>

//         {/* Message Input Form */}
//         <form onSubmit={handleSendMessage} style={styles.inputArea}>
//           <input
//             type="text"
//             placeholder="Type your message here..."
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             style={styles.inputField}
//           />
//           <button type="submit" style={styles.sendButton}>Send</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // Simple inline styles to make it look clean and modern
// const styles = {
//   container: {
//     display: 'flex',
//     height: '100vh',
//     fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
//     backgroundColor: '#f8f9fa',
//     margin: 0,
//   },
//   sidebar: {
//     width: '300px',
//     backgroundColor: '#ffffff',
//     borderRight: '1px solid #dee2e6',
//     padding: '20px',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px',
//   },
//   uploadButton: {
//     display: 'inline-block',
//     padding: '12px 20px',
//     backgroundColor: '#28a745',
//     color: '#fff',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     transition: 'background 0.2s',
//   },
//   chatContainer: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#f1f3f5',
//   },
//   chatHeader: {
//     padding: '15px 20px',
//     backgroundColor: '#ffffff',
//     borderBottom: '1px solid #dee2e6',
//   },
//   messageLog: {
//     flex: 1,
//     padding: '20px',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '10px',
//     overflowY: 'auto',
//   },
//   messageBubble: {
//     padding: '10px 16px',
//     borderRadius: '18px',
//     maxWidth: '70%',
//     fontSize: '15px',
//     lineHeight: '1.4',
//   },
//   inputArea: {
//     display: 'flex',
//     padding: '15px',
//     backgroundColor: '#ffffff',
//     borderTop: '1px solid #dee2e6',
//     gap: '10px',
//   },
//   inputField: {
//     flex: 1,
//     padding: '12px',
//     borderRadius: '6px',
//     border: '1px solid #ced4da',
//     fontSize: '15px',
//     outline: 'none',
//   },
//   sendButton: {
//     padding: '12px 24px',
//     backgroundColor: '#007bff',
//     color: '#white',
//     border: 'none',
//     borderRadius: '6px',
//     color: '#fff',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//   }
// };

// export default App;
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