import React from 'react'

const Blankchat = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-black/10">
      <div className="flex flex-col items-center max-w-sm text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-violet-600/20 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-violet-600/10 border border-violet-500/20">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#936EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to ChatApp</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Select a conversation from the sidebar to start messaging with your friends in real-time.
        </p>
      </div>
    </div>
  );
};

export default Blankchat;
