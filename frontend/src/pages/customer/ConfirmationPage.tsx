import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import { CheckCircle2, Calendar, Clock, MapPin, Download, ArrowLeft, Navigation } from 'lucide-react';
import { api } from '../../services/api';
import type { Booking } from '../../types';

export const ConfirmationPage: React.FC = () => {
  const { bookingCode } = useParams<{ bookingCode: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8FFF00', '#10B981', '#3B82F6', '#F59E0B']
    });

    if (bookingCode) {
      api.getBookingByCode(bookingCode).then((data) => {
        setBooking(data);
        setLoading(false);
      });
    }
  }, [bookingCode]);

  useEffect(() => {
    if (booking && qrCanvasRef.current) {
      const qrPayload = JSON.stringify({
        code: booking.bookingCode,
        date: booking.bookingDate,
        slot: `${booking.slot.startTime}-${booking.slot.endTime}`,
        phone: booking.customerPhone,
        sig: booking.qrCodeSignature
      });

      QRCode.toCanvas(qrCanvasRef.current, qrPayload, {
        width: 180,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  }, [booking]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-400">
        <p className="text-lg font-medium">Loading booking receipt...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Booking Not Found</h2>
        <p className="text-slate-400 text-sm">We couldn't locate a booking with code #{bookingCode}.</p>
        <Link to="/book" className="btn-neon text-xs py-2.5 px-6 inline-block">
          Return to Booking
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#8FFF00]/20 border-2 border-[#8FFF00] flex items-center justify-center mx-auto text-[#8FFF00] shadow-[0_0_30px_rgba(143,255,0,0.5)]">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
          BOOKING <span className="text-[#8FFF00]">CONFIRMED!</span>
        </h1>
        <p className="text-slate-300 text-sm">
          Your cricket turf slot at Kota is locked and ready. Show the QR code at the ground entrance.
        </p>
      </div>

      <div className="glass-panel-neon p-6 sm:p-8 space-y-6 relative overflow-hidden border-[#8FFF00]/40">
        
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="text-[10px] font-extrabold text-[#8FFF00] uppercase tracking-widest">Official Gully United Booking Code</span>
            <p className="text-3xl font-black text-white font-mono tracking-wider">{booking.bookingCode}</p>
          </div>
          <div className="text-center sm:text-right">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-extrabold text-xs">
              PAYMENT VERIFIED • ₹{booking.amountPaid}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-white space-y-2 border border-white/20">
            <canvas ref={qrCanvasRef} className="rounded-lg" />
            <p className="text-[10px] font-bold text-slate-800 tracking-wider">ENTRY PASS QR CODE</p>
          </div>

          <div className="md:col-span-7 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-xs">
              
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 font-medium flex items-center gap-1 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#8FFF00]" /> Date
                </span>
                <p className="font-bold text-white text-sm">{booking.bookingDate}</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 font-medium flex items-center gap-1 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#8FFF00]" /> Time Slot
                </span>
                <p className="font-bold text-white text-sm">{booking.slot.startTime} – {booking.slot.endTime}</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 font-medium mb-1 block">Customer Name</span>
                <p className="font-bold text-white text-sm">{booking.customerName}</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 font-medium mb-1 block">Phone Number</span>
                <p className="font-bold text-white text-sm">{booking.customerPhone}</p>
              </div>

            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
              <p className="text-slate-400 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#8FFF00]" /> Turf Location
              </p>
              <p className="text-white font-semibold">Gully United Turf, Main Road, Kota Town, Nellore AP - 524411</p>
            </div>
          </div>

        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => window.print()}
            className="btn-outline w-full sm:w-auto text-xs py-3 px-5 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#8FFF00]" /> Download / Print Pass
          </button>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Kota+Nellore+Andhra+Pradesh"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon w-full sm:w-auto text-xs py-3 px-5 flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4 fill-black" /> Get Directions to Turf
          </a>
        </div>

      </div>

      <div className="text-center pt-2">
        <Link to="/my-bookings" className="text-slate-400 hover:text-[#8FFF00] text-xs font-semibold inline-flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> View all my bookings
        </Link>
      </div>

    </div>
  );
};
