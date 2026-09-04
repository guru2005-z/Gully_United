export type SlotStatus = 'AVAILABLE' | 'HOLDING' | 'BOOKED' | 'BLOCKED';

export interface TimeSlot {
  id: number;
  startTime: string; // e.g. "06:00 AM"
  endTime: string;   // e.g. "07:00 AM"
  price: number;     // e.g. 299 or 499
  basePrice?: number;
  isPeakHour: boolean;
  status: SlotStatus;
  heldByPhone?: string;
  holdExpiresAt?: number;
  heldUntil?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  slot: TimeSlot;
  bookingDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  amountPaid: number;
  razorpayPaymentId?: string;
  qrCodeData: string;
  qrCodeSignature?: string;
  status: 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
}

export interface CustomerUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  role?: string;
}

export interface RevenueStats {
  todayRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  occupancyRateToday: number;
  peakHourOccupancy: number;
  totalBookingsToday: number;
}
