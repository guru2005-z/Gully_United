import type { TimeSlot, Booking, RevenueStats } from '../types';

export const DEFAULT_SLOTS: Omit<TimeSlot, 'status' | 'heldUntil'>[] = [
  { id: 1, startTime: '06:00 AM', endTime: '07:00 AM', price: 299, basePrice: 299, isPeakHour: false },
  { id: 2, startTime: '07:00 AM', endTime: '08:00 AM', price: 299, basePrice: 299, isPeakHour: false },
  { id: 3, startTime: '08:00 AM', endTime: '09:00 AM', price: 299, basePrice: 299, isPeakHour: false },
  { id: 4, startTime: '09:00 AM', endTime: '10:00 AM', price: 299, basePrice: 299, isPeakHour: false },
  { id: 5, startTime: '10:00 AM', endTime: '11:00 AM', price: 299, basePrice: 299, isPeakHour: false },
  { id: 6, startTime: '11:00 AM', endTime: '12:00 PM', price: 299, basePrice: 299, isPeakHour: false },
  { id: 7, startTime: '12:00 PM', endTime: '01:00 PM', price: 299, basePrice: 299, isPeakHour: false },
  { id: 8, startTime: '01:00 PM', endTime: '02:00 PM', price: 299, basePrice: 299, isPeakHour: false },
  { id: 9, startTime: '02:00 PM', endTime: '03:00 PM', price: 299, basePrice: 299, isPeakHour: false },
  { id: 10, startTime: '03:00 PM', endTime: '04:00 PM', price: 299, basePrice: 299, isPeakHour: false },
  { id: 11, startTime: '04:00 PM', endTime: '05:00 PM', price: 299, basePrice: 299, isPeakHour: false },

  // Evening & Night Peak Floodlight Slots (05:00 PM to 11:00 PM @ ₹499/hr)
  { id: 12, startTime: '05:00 PM', endTime: '06:00 PM', price: 499, basePrice: 499, isPeakHour: true },
  { id: 13, startTime: '06:00 PM', endTime: '07:00 PM', price: 499, basePrice: 499, isPeakHour: true },
  { id: 14, startTime: '07:00 PM', endTime: '08:00 PM', price: 499, basePrice: 499, isPeakHour: true },
  { id: 15, startTime: '08:00 PM', endTime: '09:00 PM', price: 499, basePrice: 499, isPeakHour: true },
  { id: 16, startTime: '09:00 PM', endTime: '10:00 PM', price: 499, basePrice: 499, isPeakHour: true },
  { id: 17, startTime: '10:00 PM', endTime: '11:00 PM', price: 499, basePrice: 499, isPeakHour: true },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    bookingCode: 'GU-20260818-8F92',
    slot: {
      id: 3,
      startTime: '08:00 AM',
      endTime: '09:00 AM',
      price: 299,
      basePrice: 299,
      isPeakHour: false,
      status: 'BOOKED',
    },
    bookingDate: new Date().toISOString().split('T')[0],
    customerName: 'Rahul Verma',
    customerPhone: '9876543210',
    customerEmail: 'rahul@example.com',
    amountPaid: 299,
    razorpayPaymentId: 'pay_N1A2B3C4D5',
    qrCodeData: 'GU-20260818-8F92|9876543210|2026-08-18',
    qrCodeSignature: 'SIG_GU202608188F92_9876543210',
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'b2',
    bookingCode: 'GU-20260818-9K41',
    slot: {
      id: 13,
      startTime: '06:00 PM',
      endTime: '07:00 PM',
      price: 499,
      basePrice: 499,
      isPeakHour: true,
      status: 'BOOKED',
    },
    bookingDate: new Date().toISOString().split('T')[0],
    customerName: 'Suresh Kumar',
    customerPhone: '9390817811',
    customerEmail: 'suresh@example.com',
    amountPaid: 499,
    razorpayPaymentId: 'pay_N9X8Y7Z6W5',
    qrCodeData: 'GU-20260818-9K41|9390817811|2026-08-18',
    qrCodeSignature: 'SIG_GU202608189K41_9390817811',
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_ADMIN_STATS: RevenueStats = {
  todayRevenue: 798,
  weeklyRevenue: 18500,
  monthlyRevenue: 74000,
  occupancyRateToday: 45,
  peakHourOccupancy: 90,
  totalBookingsToday: 2,
};
