import { useState, useEffect } from 'react';
import { Menu, X, Car, Building2, MapPin, PhoneCall, FileText, CheckCircle, Clock, ShieldCheck, Star } from 'lucide-react';
import { FeeEstimatorGate } from './components/FeeEstimatorGate';
import { ServiceAreaMatrix } from './components/ServiceAreaMatrix';
import { FAQSection } from './components/FAQSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LegalDisclaimer } from './components/LegalDisclaimer';
import { MobileCallBar } from './components/MobileCallBar';
import { PrivacyModal } from './components/PrivacyModal';
import { TermsModal } from './components/TermsModal';
import { siteConfig } from './config/siteConfig';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bookingUrl = siteConfig.bookingUrl;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-800 pb-16 md:pb-0">
      {/* Landmark header + nav for agentic accessibility tree */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-dark py-3 shadow-lg' : 'bg-primary py-5 border-b border-purple-900/50'}`}
      >
      <nav 
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          <a href="#" className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-secondary rounded-lg px-1">
            <span className="text-amber-200">Legacy</span> Notary
          </a>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-7 text-white">
            <a href="#services" className="hover:text-amber-200 transition-colors text-sm font-semibold uppercase tracking-wider">Services</a>
            <a href="#estimator" className="hover:text-amber-200 transition-colors text-sm font-semibold uppercase tracking-wider">Fee Calculator</a>
            <a href="#service-area" className="hover:text-amber-200 transition-colors text-sm font-semibold uppercase tracking-wider">Service Area</a>
            <a href="#about" className="hover:text-amber-200 transition-colors text-sm font-semibold uppercase tracking-wider">Meet Jeannie</a>
            <a href="#faq" className="hover:text-amber-200 transition-colors text-sm font-semibold uppercase tracking-wider">FAQ</a>
            <a 
              href={`tel:${siteConfig.phoneE164}`} 
              className="bg-secondary text-primary px-5 py-2 rounded-full font-extrabold hover:bg-yellow-400 transition-transform transform hover:scale-105 shadow-md flex items-center gap-2"
            >
              <PhoneCall size={16} /> {siteConfig.phoneDisplay}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-white p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-secondary"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-dark absolute w-full top-full left-0 border-t border-white/10 flex flex-col p-4 shadow-2xl">
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-white py-3 border-b border-white/10 hover:text-amber-200 font-medium">Services</a>
            <a href="#estimator" onClick={() => setIsMobileMenuOpen(false)} className="text-white py-3 border-b border-white/10 hover:text-amber-200 font-medium">Fee Calculator</a>
            <a href="#service-area" onClick={() => setIsMobileMenuOpen(false)} className="text-white py-3 border-b border-white/10 hover:text-amber-200 font-medium">Service Area</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-white py-3 border-b border-white/10 hover:text-amber-200 font-medium">Meet Jeannie</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-white py-3 border-b border-white/10 hover:text-amber-200 font-medium">FAQ</a>
            <a href={`tel:${siteConfig.phoneE164}`} className="text-center bg-secondary text-primary font-bold py-3 mt-4 rounded-xl flex items-center justify-center gap-2">
              <PhoneCall size={18} /> Call Now: {siteConfig.phoneDisplay}
            </a>
          </div>
        )}
      </nav>
      </header>

      {/* Main Content Area */}
      <main id="main-content">
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-primary text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-950 to-black opacity-95 z-0"></div>
          
          {/* Light gradient atmosphere (no expensive filter:blur orbs) */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(234,179,8,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(147,51,234,0.18),transparent_50%)]"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 border border-amber-200/50 bg-secondary/10 rounded-full px-4 py-1.5 text-amber-200 text-xs sm:text-sm font-semibold tracking-wide uppercase">
                <ShieldCheck size={16} aria-hidden="true" /> Commissioned Texas Mobile Notary
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                Protecting Signatures.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-yellow-300 to-yellow-100">
                  Preserving Legacies.
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed">
                Professional mobile notary services serving <strong>Brazoria, Matagorda, Galveston, and Harris Counties</strong>. I travel directly to your home, workplace, hospital room, nursing facility, or public meeting place.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href={bookingUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-primary font-bold text-base sm:text-lg px-8 py-4 rounded-full shadow-xl hover:bg-yellow-400 transition-all transform hover:-translate-y-1 flex items-center gap-2"
                >
                  Book Appointment
                </a>

                <a 
                  href={`sms:${siteConfig.phoneE164}?body=Hi%20${encodeURIComponent(siteConfig.ownerName.split(' ')[0])}!%20I%20need%20a%20mobile%20notary.`} 
                  className="glass text-white font-bold text-base sm:text-lg px-8 py-4 rounded-full shadow-lg hover:bg-white/20 transition-all transform hover:-translate-y-1 flex items-center gap-2 border border-white/30"
                >
                  <PhoneCall size={20} className="text-amber-200" aria-hidden="true" /> Text Now
                </a>
              </div>

              {/* Quick Trust Badges — no fabricated AggregateRating; point to verified GBP */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-gray-300">
                <a
                  href={siteConfig.sameAs[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-yellow-400 font-semibold hover:text-yellow-300 transition-colors"
                >
                  <Star size={16} className="fill-yellow-400" aria-hidden="true" /> See Google reviews
                </a>
                <div>• Hospital & Bedside Visits</div>
                <div>• Contactless Tap to Pay</div>
              </div>
            </div>
            
            {/* Single hero portrait (one image only — mobile + desktop share one picture) */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/50 to-purple-600/40 rounded-3xl transform rotate-3 scale-105 opacity-50" aria-hidden="true"></div>
              <picture className="relative z-10 block">
                <source type="image/webp" srcSet="/images/headshot-800.webp" />
                <img
                  src="/images/headshot-800.jpg"
                  alt="Jeannie Hernandez, commissioned Texas Notary Public for Legacy Notary Public, smiling in professional attire"
                  width="800"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-md mx-auto rounded-3xl shadow-2xl border-4 border-white/20 object-cover aspect-[4/5]"
                />
              </picture>
            </div>

          </div>
        </section>

        {/* Mandatory Legal Disclaimer Bar */}
        <LegalDisclaimer />

        {/* Trust Highlight Bar */}
        <div className="bg-white border-b border-gray-200 shadow-sm py-5">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 lg:gap-12 text-sm lg:text-base font-semibold text-gray-700">
            <div className="flex items-center gap-2"><Car className="text-primary" size={20}/> Mobile Travel Service</div>
            <div className="flex items-center gap-2"><Building2 className="text-primary" size={20}/> Hospitals & Care Homes</div>
            <div className="flex items-center gap-2"><Clock className="text-primary" size={20}/> Evening & Weekend Visits</div>
            <div className="flex items-center gap-2"><CheckCircle className="text-primary" size={20}/> Tap to Pay / Credit Accepted</div>
            <div className="flex items-center gap-2"><MapPin className="text-primary" size={20}/> 4 Texas Counties</div>
          </div>
        </div>

        {/* Meet Jeannie Section */}
        <section id="about" className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* One headshot only — shown on mobile here; desktop uses hero portrait */}
              <div className="lg:hidden">
                <picture>
                  <source type="image/webp" srcSet="/images/headshot-400.webp" />
                  <img
                    src="/images/headshot-400.jpg"
                    alt="Jeannie Hernandez, commissioned Texas Notary Public for Legacy Notary Public, smiling in professional attire"
                    width="400"
                    height="500"
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-sm mx-auto rounded-3xl shadow-xl border-2 border-gray-100 object-cover aspect-[4/5]"
                  />
                </picture>
              </div>

              <div className="space-y-6">
                <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                  About Legacy Notary Public
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">Meet Jeannie</h2>
                <div className="w-20 h-1.5 bg-secondary rounded-full"></div>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Hi, I'm <strong>Jeannie Hernandez</strong>, a commissioned Texas Notary Public dedicated to providing reliable, professional, and convenient mobile notary services throughout Brazoria, Matagorda, Galveston, and Harris Counties.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I understand that notarizing important documents often happens during life's biggest moments. Whether you're purchasing a home, handling estate paperwork, completing healthcare documents, or finalizing business agreements, I strive to make the process smooth, accurate, and stress-free.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I travel directly to homes, offices, hospitals, nursing facilities, correctional facilities, and other mutually agreed locations when and where you need service.
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary to-purple-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-purple-800">
                <div className="absolute top-0 right-0 w-36 h-36 bg-secondary/15 rounded-bl-full pointer-events-none"></div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">My Commitment to You</h3>
                
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <CheckCircle className="text-amber-200 shrink-0 mt-1" size={24} aria-hidden="true"/>
                    <p className="text-gray-200">Every client deserves professionalism, patience, and respect.</p>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle className="text-amber-200 shrink-0 mt-1" size={24} aria-hidden="true"/>
                    <p className="text-gray-200">Clear communication, transparent pricing, and careful attention to detail.</p>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle className="text-amber-200 shrink-0 mt-1" size={24} aria-hidden="true"/>
                    <p className="text-gray-200">I arrive prepared and work hard to earn your trust and future business.</p>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 lg:py-28 bg-gray-100/70 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                What We Offer
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-primary mt-3 mb-4 tracking-tight">
                Comprehensive Mobile Notary Services
              </h2>
              <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: FileText, title: "Real Estate Closings", desc: "Purchase, refinance, HELOC, seller packages, and mobile loan signings." },
                { icon: CheckCircle, title: "General Notary Work", desc: "Affidavits, powers of attorney, wills, acknowledgments, and jurats." },
                { icon: Building2, title: "Hospital & Bedside Notarizations", desc: "Compassionate mobile notarizations directly in patient rooms and care centers." },
                { icon: FileText, title: "Business & Commercial", desc: "Business contracts, employment forms, and corporate documents." },
                { icon: Car, title: "Mobile Travel Service", desc: "I travel directly to your home, office, coffee shop, hospital, or agreed site." },
                { icon: Clock, title: "Evening & Weekend Appointments", desc: "Flexible scheduling when traditional office hours don't fit your agenda." }
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-200/80 group">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                    <s.icon className="text-primary group-hover:text-white transition-colors" size={28} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Interactive Fee Estimator */}
        <FeeEstimator />

        {/* 4-County Service Area Matrix */}
        <ServiceAreaMatrix />

        {/* Reviews Section */}
        <ReviewsSection />

        {/* FAQ Section */}
        <FAQSection />

      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-14 border-t border-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
            <span className="text-amber-200">Legacy</span> Notary Public
            </h2>
            <p className="text-gray-300 mt-2 max-w-md mx-auto text-sm sm:text-base">
              Professional, dependable mobile notary services serving Brazoria, Matagorda, Galveston, and Harris Counties.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
            <a href={`tel:${siteConfig.phoneE164}`} className="text-gray-200 hover:text-amber-200 transition-colors flex items-center gap-1.5 min-h-11 py-2">
              <PhoneCall size={16} aria-hidden="true" /> {siteConfig.phoneDisplay}
            </a>
            <a href={`sms:${siteConfig.phoneE164}?body=Hi%20${encodeURIComponent(siteConfig.ownerName.split(' ')[0])}!`} className="text-gray-200 hover:text-amber-200 transition-colors min-h-11 py-2 inline-flex items-center">
              Text Message
            </a>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-amber-200 transition-colors min-h-11 py-2 inline-flex items-center">
              Book Form
            </a>
          </div>

          <div className="border-t border-purple-900/80 pt-6 max-w-3xl mx-auto text-xs text-gray-300 leading-relaxed">
            <p className="mb-3">
              <strong>Mandatory Texas Notice:</strong> {siteConfig.ownerName} is a commissioned Texas Notary Public. I am not an attorney licensed to practice law in Texas and may not give legal advice or accept fees for legal advice.
            </p>
            <div className="flex justify-center gap-2 sm:gap-4 text-gray-200 font-medium">
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(true)}
                className="min-h-11 px-4 py-2.5 rounded-lg text-gray-200 hover:text-amber-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 transition-colors"
              >
                Privacy Policy
              </button>
              <span className="self-center text-gray-400" aria-hidden="true">•</span>
              <button
                type="button"
                onClick={() => setIsTermsOpen(true)}
                className="min-h-11 px-4 py-2.5 rounded-lg text-gray-200 hover:text-amber-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 transition-colors"
              >
                Terms of Service
              </button>
            </div>
            <p className="mt-4 text-gray-300">
              &copy; 2026 Legacy Notary Public. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

      {/* Floating Mobile Sticky Speed-Dial Bar */}
      <MobileCallBar />

      {/* Legal Modals */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />

    </div>
  );
}

export default App;
