"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'JammiPharma' && password.trim() === 'Jammi@007') {
      localStorage.setItem("jammi_admin_session", "true");
      onClose();
      // Use window.location.href to force a full reload so AdminPanelFloatingLink mounts cleanly
      window.location.reload();
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white text-slate-900 p-8 rounded shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close"
        >
           ✕
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Access</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input 
              type="text" 
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border border-slate-300 rounded px-4 py-3 focus:outline-none focus:border-forest transition-colors"
              required
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded px-4 py-3 focus:outline-none focus:border-forest transition-colors"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm font-medium mt-1">Invalid credentials. Please try again.</p>
          )}
          <button 
            type="submit" 
            className="w-full bg-forest text-white font-bold py-3 rounded mt-2 hover:bg-forest/90 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
