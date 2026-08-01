import { useState, useEffect } from 'react';
import { Menu, X, Car, Building2, MapPin, PhoneCall, FileText, CheckCircle, Clock } from 'lucide-react';
import { SEOHead } from './components/SEOHead';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-800">
      <SEOHead />
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-dark py-3 shadow-lg' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-secondary">Legacy</span> Notary
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-white">
            <a href="#services" className="hover:text-secondary transition-colors text-sm font-medium uppercase tracking-wider">Services</a>
            <a href="#about" className="hover:text-secondary transition-colors text-sm font-medium uppercase tracking-wider">Meet Jeannie</a>
            <a href="#pricing" className="hover:text-secondary transition-colors text-sm font-medium uppercase tracking-wider">Pricing</a>
            <a href="tel:9795291312" className="bg-secondary text-primary px-5 py-2 rounded-full font-bold hover:bg-yellow-400 transition-transform transform hover:scale-105 shadow-md">Call Now</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-dark absolute w-full top-full left-0 border-t border-white/10 flex flex-col p-4 shadow-xl">
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-white py-3 border-b border-white/10 hover:text-secondary">Services</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-white py-3 border-b border-white/10 hover:text-secondary">Meet Jeannie</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-white py-3 border-b border-white/10 hover:text-secondary">Pricing</a>
            <a href="tel:9795291312" className="text-center bg-secondary text-primary font-bold py-3 mt-4 rounded-lg">Call Now: (979) 529-1312</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-900 to-black opacity-90 z-0"></div>
        
        {/* Subtle background pattern/glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[120px] z-0"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent/20 blur-[100px] z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-block border border-secondary/50 rounded-full px-4 py-1 text-secondary text-sm font-semibold tracking-wide uppercase">
              Professional Mobile Notary Services
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              Protecting Signatures.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-200">Preserving Legacies.</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-xl leading-relaxed">
              Professional mobile notary services serving Brazoria, Matagorda, Galveston, and Harris Counties. I travel to your home, office, hospital, nursing facility, or another mutually agreed location.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeFGHvwVwHGdY4qKWPtPrZry7vl7EoU-xR6Vp96HBEdaibV_g/viewform" className="bg-secondary text-primary font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-secondary/30 transition-all transform hover:-translate-y-1">
                Book Appointment
              </a>
              <a href="sms:+19795291312?body=Hi%20Jeannie!%20I%20need%20a%20mobile%20notary." className="glass text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-white/20 transition-all transform hover:-translate-y-1 flex items-center gap-2">
                <PhoneCall size={20} /> Text Now
              </a>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-accent rounded-3xl transform rotate-3 scale-105 opacity-50 blur-lg"></div>
            <img 
              src="/images/Headshot.jpeg" 
              alt="Jeannie Hernandez" 
              className="relative z-10 w-full max-w-md mx-auto rounded-3xl shadow-2xl border-4 border-white/10 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 lg:gap-12 text-sm lg:text-base font-semibold text-gray-600">
          <div className="flex items-center gap-2"><Car className="text-primary" size={20}/> Mobile Service</div>
          <div className="flex items-center gap-2"><Building2 className="text-primary" size={20}/> Hospitals</div>
          <div className="flex items-center gap-2"><Clock className="text-primary" size={20}/> Evening Appointments</div>
          <div className="flex items-center gap-2"><CheckCircle className="text-primary" size={20}/> Tap to Pay Accepted</div>
          <div className="flex items-center gap-2"><MapPin className="text-primary" size={20}/> 4 Counties Served</div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mobile Image */}
            <div className="lg:hidden mb-10">
              <img 
                src="/images/Headshot.jpeg" 
                alt="Jeannie Hernandez" 
                className="w-full max-w-sm mx-auto rounded-3xl shadow-xl"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold text-primary">Meet Jeannie</h2>
              <div className="w-20 h-1 bg-secondary rounded"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Hi, I'm Jeannie Hernandez, a commissioned Texas Notary Public dedicated to providing reliable, professional, and convenient mobile notary services throughout Brazoria, Matagorda, Galveston, and Harris Counties.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                I understand that notarizing important documents often happens during life's biggest moments. Whether you're purchasing a home, handling estate paperwork, completing healthcare documents, or finalizing business agreements, I strive to make the process smooth, accurate, and stress-free.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                I travel to homes, offices, hospitals, nursing facilities, correctional facilities, and other mutually agreed locations to provide prompt and dependable service when and where you need it.
              </p>
            </div>

            <div className="bg-primary text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-bl-full"></div>
              <h3 className="text-3xl font-bold mb-6">My Commitment to You</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <CheckCircle className="text-secondary shrink-0 mt-1" size={24}/>
                  <p>Every client deserves professionalism, patience, and respect.</p>
                </li>
                <li className="flex gap-4">
                  <CheckCircle className="text-secondary shrink-0 mt-1" size={24}/>
                  <p>Clear communication, transparent pricing, and attention to detail.</p>
                </li>
                <li className="flex gap-4">
                  <CheckCircle className="text-secondary shrink-0 mt-1" size={24}/>
                  <p>I arrive prepared and work hard to earn your trust.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-32 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-primary mb-4">Comprehensive Services</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: "Real Estate Closings", desc: "Purchase, refinance, HELOC, seller packages, and loan signings." },
              { icon: CheckCircle, title: "General Notary Work", desc: "Affidavits, powers of attorney, wills, acknowledgments, and jurats." },
              { icon: Building2, title: "Hospital & Nursing Visits", desc: "Compassionate mobile notarizations for patients and families." },
              { icon: FileText, title: "Business & Commercial", desc: "Business contracts, employment forms, and corporate documents." },
              { icon: Car, title: "Mobile Service", desc: "I travel to your home, office, coffee shop, hospital, or another agreed location." },
              { icon: Clock, title: "Evening & Weekend", desc: "Flexible scheduling when traditional office hours don't work." }
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <s.icon className="text-primary group-hover:text-secondary transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-primary mb-4">Transparent Pricing</h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded mb-12"></div>
          
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border-t-4 border-secondary text-left relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10">
               <FileText size={100} />
             </div>
             
             <div className="relative z-10 grid md:grid-cols-2 gap-12">
               <div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-6">Texas Notary Fees</h3>
                 <div className="space-y-4">
                   <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                     <span className="text-gray-600 font-medium">First notarized signature</span>
                     <span className="text-xl font-bold text-primary">$10</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                     <span className="text-gray-600 font-medium">Each additional signature</span>
                     <span className="text-xl font-bold text-primary">$1</span>
                   </div>
                 </div>
               </div>
               
               <div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-6">After Hours Fees</h3>
                 <div className="space-y-4">
                   <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                     <span className="text-gray-600 font-medium">After Hours (5PM – 9PM)</span>
                     <span className="text-xl font-bold text-primary">+$15</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                     <span className="text-gray-600 font-medium">After 9 PM</span>
                     <span className="text-xl font-bold text-primary">+$30</span>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="mt-12 bg-gray-50 rounded-xl p-6 border border-gray-100">
               <p className="text-sm text-gray-500 italic text-center">
                 * Additional travel fees may apply depending on distance. Please request a quote for exact pricing for your location.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 border-t border-purple-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6"><span className="text-secondary">Legacy</span> Notary Public</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Professional, dependable mobile notary services for life's most important moments.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="tel:9795291312" className="text-gray-300 hover:text-secondary transition-colors">
              (979) 529-1312
            </a>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Legacy Notary Public. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
