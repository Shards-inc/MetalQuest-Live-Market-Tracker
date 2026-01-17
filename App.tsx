
import React from 'react';
import MarketDashboard from './components/MarketDashboard';
import ChatWindow from './components/ChatWindow';

const App: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black">
      {/* Mobile Menu Spacer/Header could go here if needed */}
      
      {/* Main Dashboard Area */}
      <main className="flex-1 min-w-0 border-r border-zinc-800/50">
        <MarketDashboard />
      </main>

      {/* Fixed Sidebar for AI Analysis Chat */}
      <aside className="w-full md:w-[400px] xl:w-[450px] shrink-0">
        <ChatWindow />
      </aside>
    </div>
  );
};

export default App;
