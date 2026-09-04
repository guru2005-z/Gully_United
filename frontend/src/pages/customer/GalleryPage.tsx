import React from 'react';
import { Camera, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GalleryPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8FFF00]/10 border border-[#8FFF00]/30 text-[#8FFF00] text-xs font-bold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" /> High Definition Arena Views
        </div>
        <h1 className="text-4xl font-extrabold text-white font-['Outfit']">
          GULLY UNITED <span className="text-[#8FFF00]">TURF MEDIA & GALLERY</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Explore our Kota ground pitch markings, LED floodlight setup, player dugouts, and match video clips.
        </p>
      </div>

      {/* FEATURED MATCH VIDEO CARD */}
      <div className="glass-panel-neon p-6 sm:p-8 space-y-4 max-w-4xl mx-auto border-[#8FFF00]/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-[#8FFF00] fill-[#8FFF00]" />
            <h3 className="text-xl font-bold text-white font-['Outfit']">Featured Ground Video Clip</h3>
          </div>
          <span className="px-2.5 py-1 rounded bg-[#8FFF00] text-black font-extrabold text-[10px] uppercase">HD Turf Video</span>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/20 bg-black aspect-video">
          <video
            src="/gully_mat_video.mp4"
            controls
            controlsList="nodownload"
            poster="/background.jpeg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* PHOTO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="h-72 rounded-2xl bg-gradient-to-tr from-emerald-950 via-slate-900 to-black border border-[#8FFF00]/40 p-6 flex flex-col justify-end relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="absolute inset-0 bg-[#8FFF00]/15 group-hover:bg-[#8FFF00]/25 transition-colors"></div>
          <div className="relative z-10 space-y-1">
            <span className="px-2.5 py-0.5 rounded bg-[#8FFF00] text-black font-extrabold text-[10px] uppercase">Pitch View</span>
            <h3 className="text-white font-extrabold text-lg">90ft Turf Arena & Pitch Markings</h3>
            <p className="text-slate-300 text-xs">Official box crease lines for batting & bowling</p>
          </div>
        </div>

        <div className="h-72 rounded-2xl bg-gradient-to-tr from-slate-950 via-emerald-950 to-black border border-white/20 p-6 flex flex-col justify-end relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="absolute inset-0 bg-emerald-600/20 group-hover:bg-emerald-600/30 transition-colors"></div>
          <div className="relative z-10 space-y-1">
            <span className="px-2.5 py-0.5 rounded bg-white text-black font-extrabold text-[10px] uppercase">Night Floodlights</span>
            <h3 className="text-white font-extrabold text-lg">16 LED Stadium Floodlight Towers</h3>
            <p className="text-slate-300 text-xs">Shadowless illumination for evening tournaments</p>
          </div>
        </div>

        <div className="h-72 rounded-2xl bg-gradient-to-tr from-blue-950 via-slate-900 to-black border border-white/20 p-6 flex flex-col justify-end relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="absolute inset-0 bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors"></div>
          <div className="relative z-10 space-y-1">
            <span className="px-2.5 py-0.5 rounded bg-amber-400 text-black font-extrabold text-[10px] uppercase">Dugout Seating</span>
            <h3 className="text-white font-extrabold text-lg">Team Dugouts & Refreshment Lounge</h3>
            <p className="text-slate-300 text-xs">Shaded player seating with water stations</p>
          </div>
        </div>

        <div className="h-72 rounded-2xl bg-gradient-to-tr from-amber-950 via-slate-900 to-black border border-white/20 p-6 flex flex-col justify-end relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="absolute inset-0 bg-amber-500/20 group-hover:bg-amber-500/30 transition-colors"></div>
          <div className="relative z-10 space-y-1">
            <span className="px-2.5 py-0.5 rounded bg-[#8FFF00] text-black font-extrabold text-[10px] uppercase">Safety Nettings</span>
            <h3 className="text-white font-extrabold text-lg">20ft High Boundary Net Enclosure</h3>
            <p className="text-slate-300 text-xs">Protects surrounding perimeter while maintaining high visibility</p>
          </div>
        </div>

        <div className="h-72 rounded-2xl bg-gradient-to-tr from-purple-950 via-slate-900 to-black border border-white/20 p-6 flex flex-col justify-end relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="absolute inset-0 bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors"></div>
          <div className="relative z-10 space-y-1">
            <span className="px-2.5 py-0.5 rounded bg-white text-black font-extrabold text-[10px] uppercase">Box Bats & Balls</span>
            <h3 className="text-white font-extrabold text-lg">Official Cricket Equipment Included</h3>
            <p className="text-slate-300 text-xs">Top quality wooden bats, tennis balls & stumps</p>
          </div>
        </div>

        <div className="h-72 rounded-2xl bg-gradient-to-tr from-rose-950 via-slate-900 to-black border border-white/20 p-6 flex flex-col justify-end relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="absolute inset-0 bg-rose-500/20 group-hover:bg-rose-500/30 transition-colors"></div>
          <div className="relative z-10 space-y-1">
            <span className="px-2.5 py-0.5 rounded bg-[#8FFF00] text-black font-extrabold text-[10px] uppercase">Night Matches</span>
            <h3 className="text-white font-extrabold text-lg">High Voltage Night Matches</h3>
            <p className="text-slate-300 text-xs">Kota's most popular evening pastime</p>
          </div>
        </div>

      </div>

      <div className="text-center pt-4">
        <Link to="/book" className="btn-neon text-xs py-3.5 px-8 font-extrabold">
          Ready to Play? Book Your Match Slot Now
        </Link>
      </div>

    </div>
  );
};
