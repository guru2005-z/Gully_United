import { supabase } from '../lib/supabaseClient';
import { api } from './api';

export const supabaseAuth = {

  async signUpUser(userData: { fullName: string; phoneNumber: string; email?: string; password: string; role?: string }) {
    // 1. Register user via Spring Boot REST backend to ensure Supabase PostgreSQL DB user row exists
    const apiResult = await api.registerUser(userData);
    if (!apiResult.success) {
      return apiResult;
    }

    // 2. Register with Supabase Auth GoTrue service if email is provided
    try {
      const emailToUse = userData.email && userData.email.includes('@')
        ? userData.email
        : `${userData.phoneNumber}@gullyunited.com`;

      const { data, error } = await supabase.auth.signUp({
        email: emailToUse,
        password: userData.password,
        options: {
          data: {
            full_name: userData.fullName,
            phone: userData.phoneNumber
          }
        }
      });

      if (error) {
        console.warn('Supabase Auth SignUp Note:', error.message);
      }

      if (data.session?.access_token) {
        localStorage.setItem('gully_auth_token', data.session.access_token);
        localStorage.setItem('gully_supabase_jwt', data.session.access_token);
      }
    } catch (supabaseError) {
      console.warn('Supabase Auth SDK SignUp Note:', supabaseError);
    }

    return apiResult;
  },

  async signInUser(phoneNumber: string, password: string) {
    // 1. Authenticate via Spring Boot backend REST API
    const apiResult = await api.loginUser(phoneNumber, password);
    if (!apiResult.success) {
      return apiResult;
    }

    // 2. Authenticate via Supabase Auth GoTrue service if available
    try {
      const emailToUse = apiResult.email && apiResult.email.includes('@')
        ? apiResult.email
        : `${phoneNumber}@gullyunited.com`;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailToUse,
        password: password
      });

      if (error) {
        console.warn('Supabase Auth SignIn Note:', error.message);
      }

      if (data.session?.access_token) {
        localStorage.setItem('gully_auth_token', data.session.access_token);
        localStorage.setItem('gully_supabase_jwt', data.session.access_token);
      }
    } catch (supabaseError) {
      console.warn('Supabase Auth SDK SignIn Note:', supabaseError);
    }

    return apiResult;
  },

  async signOutUser() {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase signout:', e);
    }
    localStorage.removeItem('gully_auth_token');
    localStorage.removeItem('gully_supabase_jwt');
    localStorage.removeItem('gully_customer_phone');
    localStorage.removeItem('gully_customer_name');
    localStorage.removeItem('gully_admin_jwt');
  },

  async getCurrentSession() {
    try {
      const { data } = await supabase.auth.getSession();
      return data.session;
    } catch (e) {
      return null;
    }
  },

  async signInWithPhoneOtp(phone: string) {
    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone
      });
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, message: 'OTP sent to ' + phone, data };
    } catch (e: any) {
      return { success: false, message: e.message || 'Failed to send phone OTP' };
    }
  },

  async verifyPhoneOtp(phone: string, token: string) {
    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: token,
        type: 'sms'
      });
      if (error || !data.session) {
        return { success: false, message: error?.message || 'Invalid phone OTP' };
      }
      localStorage.setItem('gully_auth_token', data.session.access_token);
      localStorage.setItem('gully_supabase_jwt', data.session.access_token);
      return { success: true, message: 'Phone OTP verified', session: data.session };
    } catch (e: any) {
      return { success: false, message: e.message || 'Error verifying phone OTP' };
    }
  }
};
