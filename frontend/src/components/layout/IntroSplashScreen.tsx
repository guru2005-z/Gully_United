import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, ArrowRight, Play, ShieldCheck } from 'lucide-react';

export const IntroSplashScreen: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [animatingOut, setAnimatingOut] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('gully_seen_intro');
    if (hasSeenIntro) {
      setShowSplash(false);
    }
    // Preload intro sound file from public folder
    audioRef.current = new Audio('/intro_sound.mp3');
  }, []);

  const playIntroAudio = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.log('Audio playback prevented by browser policy:', err);
      });
    }
  };

  const handleEnterArena = () => {
    playIntroAudio();
    setAnimatingOut(true);
    setTimeout(() => {
      sessionStorage.setItem('gully_seen_intro', 'true');
      setShowSplash(false);
    }, 750);
  };

  if (!showSplash) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#05070a] flex flex-col items-center justify-center p-6 overflow-hidden transition-all duration-750 ${
        animatingOut ? 'opacity-0 scale-125 blur-xl pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Floodlight Laser Beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-20 -left-20 w-[600px] h-[3px] bg-gradient-to-r from-transparent via-[#8FFF00] to-transparent animate-laser"></div>
        <div className="absolute top-1/3 -right-20 w-[700px] h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-laser [animation-delay:1.5s]"></div>
      </div>

      {/* Floodlight Glow Beams */}
      <div className="absolute top-0 left-10 w-72 h-72 bg-[#8FFF00]/15 rounded-full blur-[140px] animate-beam pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-[160px] animate-beam pointer-events-none"></div>

      {/* Floating Neon Particle Sparks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full bg-[#8FFF00] animate-particle [animation-delay:0.2s]"></div>
        <div className="absolute bottom-10 right-1/3 w-3 h-3 rounded-full bg-emerald-400 animate-particle [animation-delay:0.8s]"></div>
        <div className="absolute bottom-32 right-1/4 w-1.5 h-1.5 rounded-full bg-[#8FFF00] animate-particle [animation-delay:1.4s]"></div>
        <div className="absolute bottom-16 left-1/3 w-2 h-2 rounded-full bg-[#9EFF00] animate-particle [animation-delay:2.1s]"></div>
      </div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        
        {/* 3D ULTRA LOGO DROP WITH SHOCKWAVE */}
        <div className="relative inline-flex items-center justify-center">
          
          {/* Shockwave Ring Animation */}
          <div className="absolute rounded-full border-2 border-[#8FFF00] animate-shockwave pointer-events-none"></div>
          <div className="absolute rounded-full border border-emerald-400 animate-shockwave [animation-delay:0.5s] pointer-events-none"></div>

          {/* 3D Drop Logo Card */}
          <div className="relative bg-black/90 rounded-3xl p-5 border-2 border-[#8FFF00] shadow-[0_0_50px_rgba(143,255,0,0.5)] animate-ultra-logo overflow-hidden group">
            {/* Glossy Flare Sweep */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-laser pointer-events-none"></div>

            <img
              src="/logo1.jpeg"
              alt="Gully United XLV Logo"
              className="h-36 sm:h-44 w-auto object-contain rounded-2xl mx-auto drop-shadow-[0_0_30px_rgba(143,255,0,0.7)]"
            />
          </div>
        </div>

        {/* Dynamic Titles */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8FFF00]/10 border border-[#8FFF00]/40 text-[#8FFF00] text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 fill-[#8FFF00]" /> Kota • Nellore • AP
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            GULLY UNITED <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8FFF00] via-[#9EFF00] to-emerald-400">XLV</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-xs mx-auto leading-relaxed">
            Kota's Premier 16 LED Floodlit Turf Arena. High-Octane Box Cricket & Online Slot Booking.
          </p>
        </div>

        {/* Action Button & Sound Switch */}
        <div className="space-y-4 pt-2">
          <button
            onClick={handleEnterArena}
            className="btn-neon w-full py-4 text-base font-black flex items-center justify-center gap-3 shadow-[0_0_50px_rgba(143,255,0,0.8)] hover:scale-105 transition-transform"
          >
            <Play className="w-5 h-5 fill-black" />
            ENTER TURF ARENA
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-[#8FFF00]" /> Audio Track Enabled (intro_sound.mp3)
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-500" /> Audio Muted
              </>
            )}
          </button>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#8FFF00]" />
          <span>Management: <strong>Panabaka Pradeep</strong> (+91 93908 17811)</span>
        </div>

      </div>
    </div>
  );
};
