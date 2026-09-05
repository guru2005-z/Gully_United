import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Phone, Mail, Lock, ShieldCheck, ArrowRight, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { supabaseAuth } from '../../services/supabaseAuth';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    role: 'Batting All-Rounder'
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (formData.phoneNumber.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    try {
      const response = await supabaseAuth.signUpUser(formData);
      if (response && response.success) {
        localStorage.setItem('gully_customer_name', response.name || formData.fullName);
        localStorage.setItem('gully_customer_phone', response.phone || formData.phoneNumber);
        localStorage.setItem('gully_customer_email', response.email || formData.email);
        if (response.token) {
          localStorage.setItem('gully_auth_token', response.token);
        }
        setSuccess(true);
        setTimeout(() => {
          navigate('/book');
        }, 1200);
      } else {
        setErrorMessage(response?.message || 'Registration failed. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || err?.message || 'Server connection error. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 max-w-lg">
      <div className="glass-panel-neon p-4 p-md-5 space-y-4">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <img src="/logo1.jpeg" alt="Gully United Logo" className="h-20 w-auto object-contain rounded-xl border border-[#8FFF00]/40 shadow-[0_0_20px_rgba(143,255,0,0.3)] bg-black p-1" />
          </div>
          <span className="text-[10px] font-extrabold text-[#8FFF00] uppercase tracking-widest">Join Kota's Turf Network</span>
          <h2 className="text-2xl font-black text-white font-['Outfit']">CREATE PLAYER ACCOUNT</h2>
          <p className="text-slate-400 text-xs">Register to book slots, view active match passes & get priority weekend alerts.</p>
        </div>

        {success ? (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-center space-y-2">
            <ShieldCheck className="w-10 h-10 mx-auto text-emerald-400" />
            <h4 className="font-bold text-lg text-white">Registration Successful!</h4>
            <p className="text-xs text-slate-300">Redirecting to Slot Reservation Grid...</p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3 text-xs">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}
            
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#8FFF00]" /> Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Reddy"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="form-control bg-black/60 border-white/15 text-white placeholder-slate-500 rounded-xl p-3 text-xs focus:border-[#8FFF00]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#8FFF00]" /> 10-Digit Mobile Number *
              </label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                placeholder="10-digit mobile number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="form-control bg-black/60 border-white/15 text-white placeholder-slate-500 rounded-xl p-3 text-xs focus:border-[#8FFF00]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#8FFF00]" /> Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="vikram@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-control bg-black/60 border-white/15 text-white placeholder-slate-500 rounded-xl p-3 text-xs focus:border-[#8FFF00]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#8FFF00]" /> Account Password *
              </label>
              <input
                type="password"
                required
                placeholder="Create password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="form-control bg-black/60 border-white/15 text-white placeholder-slate-500 rounded-xl p-3 text-xs focus:border-[#8FFF00]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#8FFF00]" /> Preferred Playing Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="form-select bg-black/60 border-white/15 text-white rounded-xl p-3 text-xs focus:border-[#8FFF00]"
              >
                <option value="Batting All-Rounder">Batting All-Rounder</option>
                <option value="Bowling All-Rounder">Bowling All-Rounder</option>
                <option value="Pure Batsman">Pure Batsman</option>
                <option value="Fast Bowler">Fast Bowler</option>
                <option value="Wicketkeeper Batsman">Wicketkeeper Batsman</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className="btn-neon w-full py-3.5 text-xs font-extrabold mt-2 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Registering...
                </>
              ) : (
                <>
                  Create Account & Book Turf <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2 text-slate-400">
              Already have an account? <Link to="/login" className="text-[#8FFF00] font-bold hover:underline">Login here</Link>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
