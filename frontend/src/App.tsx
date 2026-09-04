import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { IntroSplashScreen } from './components/layout/IntroSplashScreen';

// Pages
import { HomePage } from './pages/customer/HomePage';
import { AboutPage } from './pages/customer/AboutPage';
import { FacilitiesPage } from './pages/customer/FacilitiesPage';
import { GalleryPage } from './pages/customer/GalleryPage';
import { BookingPage } from './pages/customer/BookingPage';
import { ConfirmationPage } from './pages/customer/ConfirmationPage';
import { MyBookingsPage } from './pages/customer/MyBookingsPage';
import { LoginPage } from './pages/customer/LoginPage';
import { RegisterPage } from './pages/customer/RegisterPage';
import { ContactPage } from './pages/customer/ContactPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

export const App: React.FC = () => {
  return (
    <Router>
      {/* Landing Intro Splash Screen with Logo1 & Audio FX */}
      <IntroSplashScreen />

      {/* Moving Background Element */}
      <div className="moving-bg" />

      <div className="min-h-screen text-white flex flex-col font-['Plus_Jakarta_Sans'] relative z-10">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/confirmation/:bookingCode" element={<ConfirmationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<LoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
