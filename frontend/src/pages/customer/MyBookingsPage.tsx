import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Calendar, Clock, QrCode, XCircle, AlertCircle, UserCheck, LogIn } from 'lucide-react';
import { api } from '../../services/api';
import type { Booking } from '../../types';
import QRCode from 'qrcode';

export const MyBookingsPage: React.FC = () => {
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeQrBooking, setActiveQrBooking] = useState<Booking | null>(null);
  const [qrCanvasUrl, setQrCanvasUrl] = useState<string | null>(null);

  const fetchUserBookings = async () => {
    setLoading(true);
    try {
      const name = localStorage.getItem('gully_customer_name') || 'Player';
      const phone = localStorage.getItem('gully_customer_phone') || '';
      setCustomerName(name);
      setCustomerPhone(phone);

      const results = await api.getMyBookings();
      setBookings(results);
    } catch (err) {
      console.error('Error fetching private user bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const handleOpenQr = async (booking: Booking) => {
    setActiveQrBooking(booking);
    const qrPayload = JSON.stringify({
      code: booking.bookingCode,
      date: booking.bookingDate,
      phone: booking.customerPhone,
      sig: booking.qrCodeSignature
    });
    const url = await QRCode.toDataURL(qrPayload, { width: 220, margin: 1 });
    setQrCanvasUrl(url);
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking? Refunds are processed as per turf cancellation policy.')) {
      await api.cancelBooking(bookingId, 'Customer requested cancellation');
      alert('Booking cancelled successfully.');
      fetchUserBookings();
    }
  };

  const token = localStorage.getItem('gully_auth_token') || localStorage.getItem('gully_customer_phone');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      <div className="glass-panel p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase">
          <Ticket className="w-3.5 h-3.5" /> Customer Match Pass Portal
        </div>
        <h1 className="text-3xl font-extrabold text-white font-['Outfit']">
          MY <span className="text-[#8FFF00]">TURF BOOKINGS</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
          View your private active ground reservations, generate check-in QR passes, and manage match schedules.
        </p>

        {token && (
          <div className="pt-2 flex items-center gap-2 text-xs text-[#8FFF00] font-semibold">
            <UserCheck className="w-4 h-4" />
            <span>Authenticated Player Account: {customerName} {customerPhone ? `(+91 ${customerPhone})` : ''}</span>
          </div>
        )}
      </div>

      {!token ? (
        <div className="glass-panel p-12 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">Authentication Required</h3>
          <p className="text-slate-400 text-xs max-w-md mx-auto">
            Please log in to your Gully United player account to access your private ground bookings and match passes.
          </p>
          <Link to="/login" className="btn-neon inline-flex items-center gap-2 py-3 px-6 text-xs font-bold">
            <LogIn className="w-4 h-4" /> Login to Player Account
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Your Reserved Slots ({bookings.length})
            </h3>
            {loading && <span className="text-xs text-[#8FFF00]">Loading reservations...</span>}
          </div>

          {bookings.length === 0 ? (
            <div className="glass-panel p-12 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="text-slate-300 font-bold text-base">No bookings found for {customerPhone || 'your account'}</p>
              <p className="text-slate-400 text-xs">Please verify the mobile number entered during checkout.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {bookings.map((b) => (
                <div key={b.id} className="glass-panel p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-white/10 hover:border-[#8FFF00]/40 transition-all">
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-black text-white font-mono">{b.bookingCode}</span>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        b.status === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}>
                        {b.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#8FFF00]" /> {b.bookingDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#8FFF00]" /> {b.slot.startTime} – {b.slot.endTime}
                      </span>
                      <span className="text-slate-400">Customer: <strong className="text-white">{b.customerName}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    {b.status === 'CONFIRMED' && (
                      <>
                        <button
                          onClick={() => handleOpenQr(b)}
                          className="btn-neon text-xs py-2.5 px-4 flex-1 md:flex-none flex items-center justify-center gap-1.5"
                        >
                          <QrCode className="w-4 h-4 fill-black" /> View Entry QR
                        </button>
                        <button
                          onClick={() => handleCancelBooking(b.id)}
                          className="btn-outline text-xs py-2.5 px-4 text-red-400 hover:border-red-500 hover:bg-red-500/10 flex-1 md:flex-none flex items-center justify-center gap-1"
                        >
                          <XCircle className="w-4 h-4" /> Cancel
                        </button>
                      </>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeQrBooking && qrCanvasUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel-neon max-w-sm w-full p-6 text-center space-y-4">
            <h3 className="text-xl font-extrabold text-white font-['Outfit']">Ground Check-in Pass</h3>
            <p className="text-xs text-slate-400">Show this QR code to Gully United ground staff in Kota</p>

            <div className="p-4 bg-white rounded-2xl inline-block border border-white/20">
              <img src={qrCanvasUrl} alt="Booking QR" className="w-48 h-48 mx-auto" />
            </div>

            <div>
              <p className="text-xs text-[#8FFF00] font-bold font-mono">{activeQrBooking.bookingCode}</p>
              <p className="text-xs text-white font-semibold mt-1">
                {activeQrBooking.bookingDate} ({activeQrBooking.slot.startTime})
              </p>
            </div>

            <button
              onClick={() => {
                setActiveQrBooking(null);
                setQrCanvasUrl(null);
              }}
              className="btn-outline w-full text-xs py-2.5"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
