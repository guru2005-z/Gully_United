import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, Navigation, CheckCircle2, MessageSquare, Mail, User, ChevronDown, HelpCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      question: "How do I book a time slot at Gully United XLV?",
      answer: "Navigate to the 'Book Slot' page, select your preferred date, pick an available slot from the grid, enter your mobile number and details, and confirm your reservation."
    },
    {
      question: "Is cricket gear provided at the turf?",
      answer: "Yes! Heavy wooden box cricket bats, high-quality tennis balls, wooden stumps, and umpire equipment are included free of charge with every slot booking."
    },
    {
      question: "What are the turf operating hours?",
      answer: "Gully United XLV is open 7 days a week from 06:00 AM in the morning to 12:00 AM Midnight."
    },
    {
      question: "Can I host corporate or private cricket tournaments?",
      answer: "Absolutely! Contact Panabaka Pradeep (+91 93908 17811) for bulk slot reservations, tournament prize arrangements, and custom timing."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8FFF00]/10 border border-[#8FFF00]/30 text-[#8FFF00] text-xs font-bold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" /> Support & Management Inquiries
        </div>
        <h1 className="text-4xl font-extrabold text-white font-['Outfit']">
          GET IN TOUCH WITH <span className="text-[#8FFF00]">GULLY UNITED XLV</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Have questions about bulk tournament slot bookings, corporate leagues, or turf availability in Kota, Nellore? Contact Panabaka Pradeep & ground management.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Contact Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-xl font-bold text-white font-['Outfit']">Management Details</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8FFF00]/10 border border-[#8FFF00]/30 flex items-center justify-center text-[#8FFF00] shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Turf Owner / Manager</p>
                  <p className="text-[#8FFF00] font-black text-base">Panabaka Pradeep</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Phone Number</p>
                  <a href="tel:+919390817811" className="text-white font-extrabold text-base hover:text-[#8FFF00] transition-colors">+91 93908 17811</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Official Email</p>
                  <a href="mailto:Gullyunitedxlv@gmail.com" className="text-slate-300 hover:text-[#8FFF00] font-semibold transition-colors">Gullyunitedxlv@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Turf Location</p>
                  <p className="text-slate-400">Gully United XLV Turf, Main Road, Kota Town, Nellore District, Andhra Pradesh - 524411</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Operating Hours</p>
                  <p className="text-slate-400">Open 7 Days a Week: 06:00 AM – 12:00 AM</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Kota+Nellore+Andhra+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon w-full text-xs py-3 font-bold"
              >
                <Navigation className="w-4 h-4 fill-black" /> Get Google Maps Directions
              </a>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel-neon p-8 space-y-6">
            <h3 className="text-2xl font-bold text-white font-['Outfit']">Send Us a Direct Message</h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
                <h4 className="text-lg font-bold text-white">Message Received!</h4>
                <p className="text-xs text-slate-300">Panabaka Pradeep or turf management will contact you on your mobile number shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Reddy"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-slate-500 text-sm focus:border-[#8FFF00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-slate-500 text-sm focus:border-[#8FFF00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Inquiry / Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Ask about tournament slot bookings, pricing rules, or turf amenities..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-slate-500 text-sm focus:border-[#8FFF00] focus:outline-none"
                  ></textarea>
                </div>

                <button type="submit" className="btn-neon w-full py-3.5 font-bold text-xs flex items-center justify-center gap-2">
                  <Send className="w-4 h-4 fill-black" /> Send Inquiry to Panabaka Pradeep
                </button>
              </form>
            )}

          </div>

          {/* DYNAMIC INTERACTIVE FAQ ACCORDION */}
          <div className="glass-panel p-6 space-y-4">
            <h4 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#8FFF00]" /> Frequently Asked Questions
            </h4>

            <div className="space-y-3 text-xs">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="rounded-xl border border-white/10 overflow-hidden bg-black/40">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left font-bold text-white flex items-center justify-between gap-2 hover:text-[#8FFF00] transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-[#8FFF00] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 pt-0 text-slate-300 text-xs border-t border-white/5 leading-relaxed bg-white/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
