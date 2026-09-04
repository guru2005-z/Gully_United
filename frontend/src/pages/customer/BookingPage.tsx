import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, ShieldCheck, AlertCircle, ArrowRight, User, Phone, Mail, Sparkles } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import { api } from '../../services/api';
import type { TimeSlot } from '../../types';

export const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'DAY' | 'NIGHT'>('ALL');
  const [loading, setLoading] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [holdId, setHoldId] = useState<string | null>(null);
  const [holdExpiresAt, setHoldExpiresAt] = useState<number | null>(null);
  const [timeLeftMs, setTimeLeftMs] = useState<number>(0);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dateOptions = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const loadSlots = async (date: Date) => {
    setLoading(true);
    const dateStr = format(date, 'yyyy-MM-dd');
    try {
      const data = await api.getSlotsForDate(dateStr);
      setSlots(data);
    } catch (err) {
      console.error('Failed to load slots:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlots(selectedDate);
    const savedName = localStorage.getItem('gully_customer_name');
    const savedPhone = localStorage.getItem('gully_customer_phone');
    if (savedName) setCustomerName(savedName);
    if (savedPhone) setCustomerPhone(savedPhone);
  }, [selectedDate]);

  useEffect(() => {
    if (!holdExpiresAt) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, holdExpiresAt - Date.now());
      setTimeLeftMs(remaining);
      if (remaining <= 0) {
        setSelectedSlot(null);
        setHoldId(null);
        setHoldExpiresAt(null);
        alert('Slot reservation hold time expired (8 mins). Please select a slot again.');
        loadSlots(selectedDate);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [holdExpiresAt]);

  const handleSelectSlot = async (slot: TimeSlot) => {
    if (slot.status !== 'AVAILABLE') return;
    setBookingError(null);

    const phoneToUse = customerPhone || '9876543210';
    const dateStr = format(selectedDate, 'yyyy-MM-dd');

    try {
      const res = await api.holdSlot(slot.id, dateStr, phoneToUse);
      if (res.success && res.holdId && res.expiresAt) {
        setSelectedSlot(slot);
        setHoldId(res.holdId);
        setHoldExpiresAt(res.expiresAt);
      } else {
        setBookingError(res.message || 'Failed to hold slot');
      }
    } catch (err: any) {
      setBookingError(err.message || 'Error locking slot');
    }
  };

  const handleConfirmAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!holdId || !selectedSlot) return;

    if (customerPhone.length !== 10) {
      setBookingError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    setBookingError(null);

    try {
      localStorage.setItem('gully_customer_name', customerName);
      localStorage.setItem('gully_customer_phone', customerPhone);

      const booking = await api.confirmBooking(holdId, {
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
      });

      navigate(`/confirmation/${booking.bookingCode}`);
    } catch (err: any) {
      setBookingError(err.message || 'Failed to process booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredSlots = slots.filter((slot) => {
    if (filter === 'DAY') return !slot.isPeakHour;
    if (filter === 'NIGHT') return slot.isPeakHour;
    return true;
  });

  const minutesLeft = Math.floor(timeLeftMs / 60000);
  const secondsLeft = Math.floor((timeLeftMs % 60000) / 1000);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8FFF00]/10 border border-[#8FFF00]/30 text-[#8FFF00] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> 7-Day Advance Reservation Grid
        </div>
        <h1 className="text-4xl font-extrabold text-white font-['Outfit']">
          SELECT YOUR <span className="text-[#8FFF00]">CRICKET TIME SLOT</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Gully United XLV Turf • SC Boys Residential School Road, Kota. Astro Turf (100x50ft), 14 LED Floodlights & Max 16 Players.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center text-xs font-semibold">
        <div className="glass-panel p-3 border-l-4 border-l-[#8FFF00]">
          <span className="text-slate-400 block text-[10px] uppercase">Turf Dimensions</span>
          <span className="text-white text-base font-extrabold">100 x 50 FT</span>
        </div>

        <div className="glass-panel p-3 border-l-4 border-l-emerald-400">
          <span className="text-slate-400 block text-[10px] uppercase">Player Capacity</span>
          <span className="text-white text-base font-extrabold">Max 16 Players</span>
        </div>

        <div className="glass-panel p-3 border-l-4 border-l-amber-400">
          <span className="text-slate-400 block text-[10px] uppercase">Day Slots (6am - 5pm)</span>
          <span className="text-[#8FFF00] text-base font-extrabold">₹299 / Hour</span>
        </div>

        <div className="glass-panel p-3 border-l-4 border-l-blue-400">
          <span className="text-slate-400 block text-[10px] uppercase">Night Floodlights (5pm - 11pm)</span>
          <span className="text-amber-400 text-base font-extrabold">₹499 / Hour</span>
        </div>
      </div>

      <div className="glass-panel p-4 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="font-bold flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-[#8FFF00]" /> Choose Reservation Date:
          </span>
          <span className="text-slate-400 text-[11px]">Advance Period: 7 Days Max</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {dateOptions.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            return (
              <button
                key={date.toISOString()}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                }}
                className={`flex-1 min-w-[100px] p-3 rounded-xl border text-center transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#8FFF00] text-black border-[#8FFF00] font-black shadow-[0_0_15px_rgba(143,255,0,0.4)]'
                    : 'bg-black/40 border-white/10 text-slate-300 hover:border-[#8FFF00]/50 hover:text-white'
                }`}
              >
                <p className="text-[10px] font-bold uppercase">{format(date, 'EEE')}</p>
                <p className="text-lg font-extrabold">{format(date, 'dd MMM')}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4">
        <div className="flex bg-black/60 p-1 rounded-xl border border-white/10 text-xs w-full sm:w-auto">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              filter === 'ALL' ? 'bg-[#8FFF00] text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Slots (6am-11pm)
          </button>
          <button
            onClick={() => setFilter('DAY')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              filter === 'DAY' ? 'bg-[#8FFF00] text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Day (₹299/hr)
          </button>
          <button
            onClick={() => setFilter('NIGHT')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              filter === 'NIGHT' ? 'bg-[#8FFF00] text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Night Floodlights (₹499/hr)
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#8FFF00]"></span> Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span> Reserved Hold
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500"></span> Booked
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">Loading available time slots...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredSlots.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                const isAvailable = slot.status === 'AVAILABLE';

                return (
                  <div
                    key={slot.id}
                    onClick={() => isAvailable && handleSelectSlot(slot)}
                    className={`p-4 rounded-2xl border transition-all relative overflow-hidden ${
                      isSelected
                        ? 'bg-[#8FFF00]/20 border-[#8FFF00] shadow-[0_0_20px_rgba(143,255,0,0.3)]'
                        : isAvailable
                        ? 'bg-black/50 border-white/15 hover:border-[#8FFF00]/60 cursor-pointer'
                        : slot.status === 'HOLDING'
                        ? 'bg-amber-500/10 border-amber-500/30 cursor-not-allowed'
                        : 'bg-red-500/10 border-red-500/20 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Clock className={`w-4 h-4 ${slot.isPeakHour ? 'text-amber-400' : 'text-[#8FFF00]'}`} />
                        <span className="font-extrabold text-white text-base">{slot.startTime}</span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        isAvailable
                          ? 'bg-[#8FFF00]/20 text-[#8FFF00] border border-[#8FFF00]/30'
                          : slot.status === 'HOLDING'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {slot.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                      <span className="text-slate-400">1 Hour Match Slot</span>
                      <span className="font-black text-lg font-['Outfit'] text-[#8FFF00]">₹{slot.price}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="glass-panel-neon p-6 space-y-6 sticky top-24">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl font-black text-white font-['Outfit'] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#8FFF00]" /> BOOKING SUMMARY
              </h3>
              <p className="text-xs text-slate-400 mt-1">Gully United XLV • Kota Grounds</p>
            </div>

            {selectedSlot ? (
              <form onSubmit={handleConfirmAndPay} className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-between">
                  <span className="font-medium">Temporary Slot Hold Active</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {minutesLeft}:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/60 border border-white/15 space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Date:</span>
                    <strong className="text-white">{format(selectedDate, 'EEEE, dd MMMM yyyy')}</strong>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Time Slot:</span>
                    <strong className="text-[#8FFF00]">{selectedSlot.startTime} – {selectedSlot.endTime}</strong>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 pt-1 border-t border-white/10 font-bold">
                    <span className="text-white">Slot Charge:</span>
                    <strong className="text-[#8FFF00] text-base">₹{selectedSlot.price}</strong>
                  </div>
                </div>

                {bookingError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{bookingError}</span>
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
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
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
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
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
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="form-control bg-black/60 border-white/15 text-white placeholder-slate-500 rounded-xl p-3 text-xs focus:border-[#8FFF00]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-neon w-full py-4 text-xs font-black flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? 'Processing Razorpay...' : `Pay ₹${selectedSlot.price} via Razorpay & Get QR Pass`}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  Instant Razorpay UPI, Cards & Netbanking Supported.
                </p>

              </form>
            ) : (
              <div className="p-8 text-center text-slate-400 space-y-3">
                <Clock className="w-10 h-10 mx-auto text-slate-500 animate-pulse" />
                <p className="font-bold text-white text-sm">No Time Slot Selected</p>
                <p className="text-xs">Click any AVAILABLE green slot card on the left grid to reserve your match time.</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
