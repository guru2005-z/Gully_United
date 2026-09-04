import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, User, Phone, Key, ArrowRight, UserPlus, Lock, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [portalType, setPortalType] = useState<'CUSTOMER' | 'ADMIN'>('CUSTOMER');

  // Customer state
  const [customerPhone, setCustomerPhone] = useState('9876543210');
  const [customerPassword, setCustomerPassword] = useState('player123');
  const [customerError, setCustomerError] = useState<string | null>(null);

  // Admin state
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [adminError, setAdminError] = useState<string | null>(null);

  const handleCustomerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerError(null);
    try {
      const res = await api.loginUser(customerPhone, customerPassword);
      if (res && res.success) {
        localStorage.setItem('gully_customer_phone', res.phone || customerPhone);
        localStorage.setItem('gully_customer_name', res.name || 'Player');
        if (res.token) {
          localStorage.setItem('gully_auth_token', res.token);
        }
        navigate('/my-bookings');
      } else {
        setCustomerError(res?.message || 'Invalid credentials');
      }
    } catch (err: any) {
      // Fallback for demo OTP mode if backend endpoint is unavailable
      localStorage.setItem('gully_customer_phone', customerPhone);
      localStorage.setItem('gully_customer_name', 'Rahul Verma');
      navigate('/my-bookings');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername === 'admin' && adminPassword === 'admin123') {
      localStorage.setItem('gully_admin_jwt', 'JWT-ADMIN-AUTHENTICATED-BEARER-TOKEN');
      navigate('/admin/dashboard');
    } else {
      setAdminError('Invalid admin credentials. (Default staff login: admin / admin123)');
    }
  };

  return (
    <div className="container py-5 max-w-xl">
      
      {/* Top Portal Switcher Pills */}
      <div className="flex bg-black/60 p-1.5 rounded-2xl border border-white/10 text-xs mb-6 shadow-2xl">
        <button
          onClick={() => {
            setPortalType('CUSTOMER');
            setCustomerError(null);
          }}
          className={`flex-1 py-3 font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
            portalType === 'CUSTOMER'
              ? 'bg-[#8FFF00] text-black shadow-[0_0_20px_rgba(143,255,0,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" /> Customer Login
        </button>

        <button
          onClick={() => {
            setPortalType('ADMIN');
            setAdminError(null);
          }}
          className={`flex-1 py-3 font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
            portalType === 'ADMIN'
              ? 'bg-[#8FFF00] text-black shadow-[0_0_20px_rgba(143,255,0,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Shield className="w-4 h-4" /> Admin Portal
        </button>
      </div>

      {/* CUSTOMER LOGIN CARD */}
      {portalType === 'CUSTOMER' && (
        <div className="glass-panel-neon p-4 p-md-5 space-y-6 relative overflow-hidden">
          
          <div className="text-center space-y-3">
            <img src="/logo1.jpeg" alt="Gully United Logo" className="h-20 w-auto object-contain rounded-2xl border border-[#8FFF00]/40 shadow-[0_0_25px_rgba(143,255,0,0.4)] bg-black p-1 mx-auto" />
            <div>
              <span className="text-[10px] font-extrabold text-[#8FFF00] uppercase tracking-widest">Player Portal</span>
              <h2 className="text-2xl font-black text-white font-['Outfit']">WELCOME BACK, PLAYER!</h2>
              <p className="text-slate-400 text-xs mt-1">Access your booked time slots, view QR entry passes & manage match schedules.</p>
            </div>
          </div>

          {customerError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{customerError}</span>
            </div>
          )}

          <form onSubmit={handleCustomerLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#8FFF00]" /> 10-Digit Mobile Number *
              </label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                placeholder="e.g. 9876543210"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="form-control bg-black/60 border-white/15 text-white placeholder-slate-500 rounded-xl p-3 text-xs focus:border-[#8FFF00]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#8FFF00]" /> Account Password *
              </label>
              <input
                type="password"
                required
                placeholder="Enter your account password"
                value={customerPassword}
                onChange={(e) => setCustomerPassword(e.target.value)}
                className="form-control bg-black/60 border-white/15 text-white placeholder-slate-500 rounded-xl p-3 text-xs focus:border-[#8FFF00]"
              />
            </div>

            <button type="submit" className="btn-neon w-full py-3.5 font-extrabold flex items-center justify-center gap-2">
              Authenticate & Open My Bookings <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center border-t border-white/10">
            <p className="text-slate-400 text-xs">
              Don't have a Gully United player account?{' '}
              <Link to="/register" className="text-[#8FFF00] font-extrabold hover:underline inline-flex items-center gap-1">
                <UserPlus className="w-3.5 h-3.5" /> Register Account Free
              </Link>
            </p>
          </div>

        </div>
      )}

      {/* ADMIN / STAFF LOGIN CARD */}
      {portalType === 'ADMIN' && (
        <div className="glass-panel-neon p-4 p-md-5 space-y-6 relative overflow-hidden border-[#8FFF00]/40">
          
          <div className="text-center space-y-3">
            <img src="/logo1.jpeg" alt="Gully United Logo" className="h-20 w-auto object-contain rounded-2xl border border-[#8FFF00]/40 shadow-[0_0_25px_rgba(143,255,0,0.4)] bg-black p-1 mx-auto" />
            <div>
              <span className="px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-extrabold text-[10px] uppercase">
                RESTRICTED STAFF ACCESS ONLY
              </span>
              <h2 className="text-2xl font-black text-white font-['Outfit'] mt-2">ADMIN & TURF MANAGEMENT</h2>
              <p className="text-slate-400 text-xs">Internal Ground Operations • Revenue Dashboard • Slot Blocker Controls</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5">
            <Lock className="w-5 h-5 shrink-0 text-amber-400" />
            <span>Public registration is disabled for admin accounts. Only customers can register accounts publicly. Admin credentials are provisioned internally by turf management.</span>
          </div>

          {adminError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
              {adminError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#8FFF00]" /> Staff Username
              </label>
              <input
                type="text"
                required
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="form-control bg-black/60 border-white/15 text-white rounded-xl p-3 text-xs focus:border-[#8FFF00]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-[#8FFF00]" /> Security Password
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="form-control bg-black/60 border-white/15 text-white rounded-xl p-3 text-xs focus:border-[#8FFF00]"
              />
            </div>

            <button type="submit" className="btn-neon w-full py-3.5 font-extrabold flex items-center justify-center gap-2">
              Authenticate & Open Admin Dashboard <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-400 text-center space-y-1">
              <p>Demo Staff Credentials:</p>
              <p className="font-mono text-white font-bold">Username: admin | Password: admin123</p>
            </div>
          </form>

        </div>
      )}

    </div>
  );
};
