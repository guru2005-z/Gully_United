import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Key, ArrowRight } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('gully_admin_jwt', 'JWT-ADMIN-AUTHENTICATED-BEARER-TOKEN');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials. (Demo default: admin / admin123)');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="glass-panel-neon p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-black border-2 border-[#8FFF00] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(143,255,0,0.4)]">
            <Shield className="w-7 h-7 text-[#8FFF00]" />
          </div>
          <h2 className="text-2xl font-black text-white font-['Outfit']">GULLY UNITED ADMIN</h2>
          <p className="text-slate-400 text-xs">Staff Portal • Ground Operations & Revenue Management</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#8FFF00]" /> Admin Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-slate-500 focus:border-[#8FFF00] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-[#8FFF00]" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-slate-500 focus:border-[#8FFF00] focus:outline-none"
            />
          </div>

          <button type="submit" className="btn-neon w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2">
            Authenticate & Access Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-slate-500 text-center">
          Default Admin Login: <strong className="text-slate-300">admin</strong> / <strong className="text-slate-300">admin123</strong>
        </p>

      </div>
    </div>
  );
};
