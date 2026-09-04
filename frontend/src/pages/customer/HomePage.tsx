import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Zap, Shield, Trophy, MapPin, Sparkles, Navigation, CheckCircle2, Play } from 'lucide-react';
import { DynamicText } from '../../components/common/DynamicText';
import { api } from '../../services/api';

export const HomePage: React.FC = () => {
  const [availableTodayCount, setAvailableTodayCount] = useState<number>(12);

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    api.getSlotsForDate(todayStr).then((slots) => {
      const avail = slots.filter((s) => s.status === 'AVAILABLE').length;
      setAvailableTodayCount(avail);
    });
  }, []);

  const dynamicPhrases = [
    "PLAY LIKE LEGENDS",
    "UNLEASH YOUR PACE & POWER",
    "EXPERIENCE NIGHT FLOODLIGHTS",
    "BOOK SLOTS INSTANTLY",
    "KOTA'S #1 BOX CRICKET ARENA"
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:py-28">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8FFF00]/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8FFF00]/10 border border-[#8FFF00]/30 text-[#8FFF00] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Sports and Entertainment Hub • Kota, Nellore
              </div>

              {/* Dynamic Animated Headline */}
              <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight font-['Outfit'] min-h-[120px] sm:min-h-[140px] flex flex-col justify-center">
                <span>
                  <DynamicText phrases={dynamicPhrases} intervalMs={2600} />
                </span>
                <span className="text-white text-3xl sm:text-5xl font-extrabold mt-1">
                  AT GULLY UNITED XLV
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                SC Boys Residential School Road, Kota. Experience high-octane box cricket on our 100x50ft Astro Turf under 14 LED floodlights. Max 16 players, Mon-Sun 6am-11pm.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/book" className="btn-neon w-full sm:w-auto text-base py-3.5 px-8">
                  <Calendar className="w-5 h-5 fill-black" />
                  Book Time Slot (From ₹299/hr)
                </Link>
                <a href="#location" className="btn-outline w-full sm:w-auto text-base py-3.5 px-8">
                  <Navigation className="w-5 h-5 text-[#8FFF00]" />
                  Get Directions
                </a>
              </div>

              {/* DYNAMIC COUNTER STATS BADGES */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-[#8FFF00] font-['Outfit']">100 x 50 FT</p>
                  <p className="text-xs text-slate-400 font-medium">Astro Turf Pitch</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">14 LED</p>
                  <p className="text-xs text-slate-400 font-medium">Floodlight Towers</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-['Outfit']">₹299 / ₹499</p>
                  <p className="text-xs text-slate-400 font-medium">Day / Night Hourly Rate</p>
                </div>
              </div>

            </div>

            {/* Right Hero Video Card */}
            <div className="lg:col-span-5 relative">
              <div className="glass-panel-neon p-4 sm:p-6 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-[#8FFF00]/10 rounded-full blur-2xl"></div>

                <div className="relative rounded-2xl overflow-hidden border border-[#8FFF00]/40 shadow-[0_0_30px_rgba(143,255,0,0.25)] bg-black aspect-video group">
                  <video
                    src="/gully_mat_video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-[#8FFF00]/50 text-[#8FFF00] px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#8FFF00] animate-ping"></span> Live Turf Action
                  </div>
                </div>

                <div className="bg-black/60 rounded-xl p-4 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Live Available Today</span>
                    <span className="flex items-center gap-1 text-[#8FFF00] font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#8FFF00] animate-ping"></span> {availableTodayCount} Slots Left
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg text-sm">
                    <div>
                      <p className="font-bold text-white">08:00 PM – 09:00 PM</p>
                      <p className="text-xs text-amber-400 font-medium">Night Floodlight Slot</p>
                    </div>
                    <span className="text-[#8FFF00] font-extrabold text-base">₹499</span>
                  </div>
                  <Link to="/book" className="w-full btn-neon py-2.5 text-xs text-center block">
                    Reserve Time Slot Now
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED VIDEO SHOWCASE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="glass-panel-neon p-6 sm:p-10 space-y-6 border-[#8FFF00]/40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8FFF00]/10 text-[#8FFF00] text-xs font-bold uppercase">
                <Play className="w-3.5 h-3.5 fill-[#8FFF00]" /> Ground Video Tour
              </div>
              <h2 className="text-3xl font-black text-white font-['Outfit'] mt-2">
                SEE GULLY UNITED XLV <span className="text-[#8FFF00]">IN ACTION</span>
              </h2>
              <p className="text-slate-300 text-sm">
                Watch actual match footage of our 100x50ft Astro turf grass and 14 LED floodlight arena on SC Boys Residential School Road, Kota.
              </p>
            </div>
            <Link to="/book" className="btn-neon text-xs py-3 px-6 shrink-0">
              Book Match Slot Now
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black aspect-video max-w-4xl mx-auto">
            <video
              src="/gully_mat_video.mp4"
              controls
              controlsList="nodownload"
              poster="/background.jpeg"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* GROUND FACILITIES SECTION */}
      <section id="facilities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            WORLD-CLASS TURF <span className="text-[#8FFF00]">FACILITIES</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Designed specifically for high-tempo box cricket (max 16 players), corporate matches, and evening tournaments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 space-y-3 hover:border-[#8FFF00]/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#8FFF00]/10 border border-[#8FFF00]/30 flex items-center justify-center text-[#8FFF00] group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">14 LED Floodlights</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Shadowless high-lumen stadium 14 LED lights ensuring crystal-clear visibility for evening & night cricket matches (5pm-11pm @ ₹499/hr).
            </p>
          </div>

          <div className="glass-panel p-6 space-y-3 hover:border-[#8FFF00]/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">100 x 50 FT Astro Turf</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              High-density synthetic Astro turf grass with padded underlay to maximize ball bounce and accommodate up to 16 players.
            </p>
          </div>

          <div className="glass-panel p-6 space-y-3 hover:border-[#8FFF00]/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">Cricket Gear Included</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Top quality wooden box-cricket bats, tennis balls, stumps, and umpire equipment included free with every 1-hour slot.
            </p>
          </div>

          <div className="glass-panel p-6 space-y-3 hover:border-[#8FFF00]/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">Parking, Washrooms & Water</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Vehicle parking area, clean washrooms, changing rooms, seating area, and chilled drinking water dispenser.
            </p>
          </div>
        </div>
      </section>

      {/* LOCATION & GOOGLE MAPS SECTION */}
      <section id="location" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="glass-panel-neon p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5" /> Location & Directions
              </div>
              
              <h2 className="text-3xl font-extrabold text-white font-['Outfit']">
                FIND US AT <span className="text-[#8FFF00]">KOTA, NELLORE</span>
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Gully United XLV Turf is located on SC Boys Residential School Road, Kota Town, Nellore District. Easily accessible with dedicated vehicle parking space.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#8FFF00] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Full Ground Address</p>
                    <p className="text-slate-400">Gully United XLV Turf, SC Boys Residential School Road, Kota Town, Nellore District, Andhra Pradesh - 524411</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kota+Nellore+Andhra+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon w-full sm:w-auto text-xs py-3 px-6"
                >
                  <Navigation className="w-4 h-4 fill-black" />
                  Open in Google Maps & Get Directions
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-80 rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative bg-slate-900">
              <iframe
                title="Gully United Turf Location Kota Nellore"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15446.516104803732!2d79.9754!3d14.0321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4ce94000000001%3A0x0!2sKota%2C%20Andhra%20Pradesh%20524411!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
