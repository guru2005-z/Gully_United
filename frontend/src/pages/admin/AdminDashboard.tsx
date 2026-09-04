import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Calendar, Users, Ban, Lock, Unlock, Download, Search, RefreshCw, LogOut, CheckCircle } from 'lucide-react';
import { api } from '../../services/api';
import type { RevenueStats, Booking, TimeSlot } from '../../types';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<RevenueStats | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchPhone, setSearchPhone] = useState<string>('');

  const checkAuth = () => {
    const token = localStorage.getItem('gully_admin_jwt');
    if (!token) {
      navigate('/admin');
    }
  };

  const loadDashboardData = async () => {
    try {
      const s = await api.getAdminStats();
      setStats(s);

      const slotData = await api.getSlotsForDate(selectedDate);
      setSlots(slotData);

      const b = await api.getBookingsByPhone('ADMIN');
      setBookings(b);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, [selectedDate]);

  const handleToggleBlock = async (slotId: number) => {
    await api.toggleBlockSlot(slotId, selectedDate);
    const updated = await api.getSlotsForDate(selectedDate);
    setSlots(updated);
  };

  const handleCancelBooking = async (id: string) => {
    if (window.confirm('Cancel this booking and initiate automated Razorpay refund?')) {
      await api.cancelBooking(id, 'Admin refund');
      loadDashboardData();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('gully_admin_jwt');
    navigate('/admin');
  };

  const filteredBookings = bookings.filter(b => {
    if (searchPhone && !b.customerPhone.includes(searchPhone) && !b.bookingCode.toLowerCase().includes(searchPhone.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6">
        <div className="flex items-center gap-3">
          <img src="/logo1.jpeg" alt="Gully United Logo" className="h-12 w-auto object-contain rounded-xl border border-[#8FFF00]/40 shadow-[0_0_15px_rgba(143,255,0,0.4)] bg-black p-1" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white font-['Outfit']">ADMIN DASHBOARD</h1>
              <span className="px-2 py-0.5 rounded bg-[#8FFF00] text-black font-extrabold text-[10px]">LIVE</span>
            </div>
            <p className="text-slate-400 text-xs">Gully United Turf • Kota Ground Operations</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button onClick={loadDashboardData} className="btn-outline text-xs py-2 px-3 flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button onClick={handleLogout} className="btn-outline text-xs py-2 px-3 text-red-400 hover:border-red-500 flex items-center gap-1">
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="glass-panel p-5 space-y-2 border-l-4 border-l-[#8FFF00]">
            <span className="text-xs font-bold text-slate-400 uppercase">Today's Revenue</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-[#8FFF00] font-['Outfit']">₹{stats.todayRevenue.toLocaleString()}</span>
              <DollarSign className="w-7 h-7 text-[#8FFF00]" />
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Verified Razorpay Collections</p>
          </div>

          <div className="glass-panel p-5 space-y-2 border-l-4 border-l-emerald-400">
            <span className="text-xs font-bold text-slate-400 uppercase">Weekly Revenue</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-white font-['Outfit']">₹{stats.weeklyRevenue.toLocaleString()}</span>
              <Calendar className="w-7 h-7 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Last 7 Days Earnings</p>
          </div>

          <div className="glass-panel p-5 space-y-2 border-l-4 border-l-amber-400">
            <span className="text-xs font-bold text-slate-400 uppercase">Today's Occupancy</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-amber-400 font-['Outfit']">{stats.occupancyRateToday}%</span>
              <Users className="w-7 h-7 text-amber-400" />
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Peak Hour Occupancy: {stats.peakHourOccupancy}%</p>
          </div>

          <div className="glass-panel p-5 space-y-2 border-l-4 border-l-blue-400">
            <span className="text-xs font-bold text-slate-400 uppercase">Bookings Count</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-white font-['Outfit']">{stats.totalBookingsToday} Matches</span>
              <CheckCircle className="w-7 h-7 text-blue-400" />
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Active confirmed slots</p>
          </div>

        </div>
      )}

      <div className="glass-panel p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Ban className="w-5 h-5 text-amber-400" /> Slot Blocker & Pricing Matrix
            </h3>
            <p className="text-xs text-slate-400">Click any slot to manually block for private matches or maintenance</p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-slate-300 font-bold">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-white text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {slots.map((s) => (
            <div
              key={s.id}
              onClick={() => handleToggleBlock(s.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer text-xs space-y-1.5 ${
                s.status === 'BLOCKED'
                  ? 'bg-slate-800/80 border-slate-600 text-slate-400'
                  : s.status === 'BOOKED'
                  ? 'bg-red-950/40 border-red-500/40 text-red-400'
                  : 'bg-white/5 border-white/10 hover:border-[#8FFF00] text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-white">{s.startTime}</span>
                {s.status === 'BLOCKED' ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5 text-[#8FFF00]" />}
              </div>
              <p className="text-[10px] text-slate-400">to {s.endTime}</p>
              <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span>Status:</span>
                <strong className={s.status === 'BLOCKED' ? 'text-amber-400' : 'text-[#8FFF00]'}>{s.status}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-white font-['Outfit']">All Bookings & Transactions</h3>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search phone or code..."
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white text-xs focus:border-[#8FFF00]"
              />
            </div>
            <button
              onClick={() => alert('Exporting financial report CSV...')}
              className="btn-outline text-xs py-2 px-3 flex items-center gap-1 shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-[#8FFF00]" /> Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-black/60 text-slate-400 uppercase text-[10px] font-bold border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Booking Code</th>
                <th className="py-3 px-4">Date & Slot</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-white">{b.bookingCode}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-white">{b.bookingDate}</p>
                    <p className="text-[11px] text-slate-400">{b.slot.startTime} - {b.slot.endTime}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-white">{b.customerName}</p>
                    <p className="text-[11px] text-slate-400">{b.customerPhone}</p>
                  </td>
                  <td className="py-3 px-4 font-black text-[#8FFF00] font-['Outfit']">₹{b.amountPaid}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      b.status === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {b.status === 'CONFIRMED' && (
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        className="text-red-400 hover:text-red-300 font-semibold underline text-[11px]"
                      >
                        Cancel & Refund
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
