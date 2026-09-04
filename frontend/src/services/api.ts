import axios from 'axios';
import type { TimeSlot, Booking, RevenueStats } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('gully_auth_token') || localStorage.getItem('gully_admin_jwt');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

class ApiClient {

  async registerUser(userData: { fullName: string; phoneNumber: string; email?: string; password: string; role?: string }) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'CUSTOMER'
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  }

  async loginUser(phoneNumber: string, password: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        phoneNumber,
        password
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  }

  async getSlotsForDate(dateStr: string): Promise<TimeSlot[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/slots?date=${dateStr}`);
      if (Array.isArray(response.data)) {
        return response.data.map((s: any) => ({
          id: s.id,
          startTime: s.startTime,
          endTime: s.endTime,
          price: s.price,
          isPeakHour: s.isPeakHour || false,
          status: s.status || 'AVAILABLE'
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching slots from server:', error);
      return [];
    }
  }

  async holdSlot(slotId: number, dateStr: string, customerPhone: string): Promise<{ success: boolean; holdId?: string; expiresAt?: number; message?: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/bookings/hold`, {
        slotId,
        dateStr,
        customerPhone
      });
      return {
        success: response.data.success,
        holdId: response.data.holdId,
        expiresAt: response.data.expiresAt,
        message: response.data.message
      };
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || 'Failed to lock slot';
      return { success: false, message: msg };
    }
  }

  async confirmBooking(holdId: string, customerDetails: { name: string; phone: string; email?: string }): Promise<Booking> {
    const response = await axios.post(`${API_BASE_URL}/bookings`, {
      holdId,
      customerName: customerDetails.name,
      customerPhone: customerDetails.phone,
      customerEmail: customerDetails.email || ''
    });

    const b = response.data;
    return {
      id: String(b.id || b.bookingReference),
      bookingCode: b.bookingReference || b.bookingCode,
      slot: {
        id: b.slot?.id || 1,
        startTime: b.startTime || b.slot?.startTime || '06:00 AM',
        endTime: b.endTime || b.slot?.endTime || '07:00 AM',
        price: b.amount || b.slot?.price || 299,
        isPeakHour: false,
        status: 'BOOKED'
      },
      bookingDate: b.bookingDate,
      customerName: b.user?.name || customerDetails.name,
      customerPhone: b.user?.phone || customerDetails.phone,
      customerEmail: b.user?.email || customerDetails.email || '',
      amountPaid: b.amount,
      razorpayPaymentId: b.paymentStatus || 'PAID',
      qrCodeData: b.qrCodeSignature || `${b.bookingReference}|${customerDetails.phone}|${b.bookingDate}`,
      status: b.bookingStatus || 'CONFIRMED',
      createdAt: b.createdAt || new Date().toISOString()
    };
  }

  async getMyBookings(): Promise<Booking[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/my`);
      if (Array.isArray(response.data)) {
        return response.data.map((b: any) => ({
          id: String(b.id),
          bookingCode: b.bookingReference,
          slot: {
            id: b.slot?.id || 1,
            startTime: b.startTime || b.slot?.startTime || '',
            endTime: b.endTime || b.slot?.endTime || '',
            price: b.amount,
            isPeakHour: false,
            status: b.bookingStatus
          },
          bookingDate: b.bookingDate,
          customerName: b.user?.name || 'Customer',
          customerPhone: b.user?.phone || '',
          customerEmail: b.user?.email || '',
          amountPaid: b.amount,
          razorpayPaymentId: b.paymentStatus,
          qrCodeData: b.qrCodeSignature,
          status: b.bookingStatus,
          createdAt: b.createdAt
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching user private bookings from backend:', error);
      return [];
    }
  }

  async getBookingsByPhone(phone: string): Promise<Booking[]> {
    if (phone === 'ADMIN') {
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/bookings`);
        if (Array.isArray(response.data)) {
          return response.data.map((b: any) => ({
            id: String(b.id),
            bookingCode: b.bookingReference,
            slot: {
              id: b.slot?.id || 1,
              startTime: b.startTime || b.slot?.startTime || '',
              endTime: b.endTime || b.slot?.endTime || '',
              price: b.amount,
              isPeakHour: false,
              status: b.bookingStatus
            },
            bookingDate: b.bookingDate,
            customerName: b.user?.name || 'Customer',
            customerPhone: b.user?.phone || '',
            customerEmail: b.user?.email || '',
            amountPaid: b.amount,
            razorpayPaymentId: b.paymentStatus,
            qrCodeData: b.qrCodeSignature,
            status: b.bookingStatus,
            createdAt: b.createdAt
          }));
        }
      } catch (error) {
        console.error('Error fetching admin bookings:', error);
      }
    }
    return this.getMyBookings();
  }

  async getBookingByCode(code: string): Promise<Booking | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/${code}`);
      const b = response.data;
      if (!b) return null;
      return {
        id: String(b.id),
        bookingCode: b.bookingReference,
        slot: {
          id: b.slot?.id || 1,
          startTime: b.startTime || '',
          endTime: b.endTime || '',
          price: b.amount,
          isPeakHour: false,
          status: b.bookingStatus
        },
        bookingDate: b.bookingDate,
        customerName: b.user?.name || 'Customer',
        customerPhone: b.user?.phone || '',
        customerEmail: b.user?.email || '',
        amountPaid: b.amount,
        razorpayPaymentId: b.paymentStatus,
        qrCodeData: b.qrCodeSignature,
        status: b.bookingStatus,
        createdAt: b.createdAt
      };
    } catch (error) {
      return null;
    }
  }

  async cancelBooking(bookingId: string, reason?: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.put(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
        reason: reason || 'Customer requested cancellation'
      });
      return {
        success: response.data.success,
        message: response.data.message || 'Booking cancelled successfully.'
      };
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to cancel booking';
      return { success: false, message: msg };
    }
  }

  async toggleBlockSlot(slotId: number, _dateStr: string): Promise<TimeSlot> {
    const response = await axios.put(`${API_BASE_URL}/admin/slots/${slotId}/block`);
    const s = response.data;
    return {
      id: s.id,
      startTime: s.startTime,
      endTime: s.endTime,
      price: s.price,
      isPeakHour: s.isPeakHour || false,
      status: s.status
    };
  }

  async getAdminStats(): Promise<RevenueStats> {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/stats`);
      return {
        todayRevenue: response.data.todayRevenue,
        weeklyRevenue: response.data.weeklyRevenue,
        monthlyRevenue: response.data.monthlyRevenue,
        occupancyRateToday: response.data.occupancyRateToday,
        peakHourOccupancy: response.data.peakHourOccupancy,
        totalBookingsToday: response.data.totalBookingsToday
      };
    } catch (error) {
      return {
        todayRevenue: 0,
        weeklyRevenue: 0,
        monthlyRevenue: 0,
        occupancyRateToday: 0,
        peakHourOccupancy: 0,
        totalBookingsToday: 0
      };
    }
  }

  async getGrounds() {
    try {
      const response = await axios.get(`${API_BASE_URL}/grounds`);
      return response.data;
    } catch (error) {
      return [];
    }
  }
}

export const api = new ApiClient();
