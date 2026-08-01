import { useState } from 'react';
import { Calculator, ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';

export const FeeEstimator = () => {
  const [signatures, setSignatures] = useState(1);
  const [county, setCounty] = useState('brazoria');
  const [timeSlot, setTimeSlot] = useState('standard');

  const baseNotaryFee = 10 + Math.max(0, signatures - 1) * 1;
  
  const countyTravelFees: Record<string, number> = {
    brazoria: 25,
    matagorda: 35,
    galveston: 35,
    harris: 40
  };

  const timeSlotFees: Record<string, number> = {
    standard: 0,
    evening: 15,
    lateNight: 30
  };

  const travelFee = countyTravelFees[county] || 25;
  const timeFee = timeSlotFees[timeSlot] || 0;
  const totalEstimate = baseNotaryFee + travelFee + timeFee;

  const bookingUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeFGHvwVwHGdY4qKWPtPrZry7vl7EoU-xR6Vp96HBEdaibV_g/viewform";

  return (
    <section id="estimator" className="py-16 bg-gradient-to-b from-gray-900 via-primary to-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/40 text-secondary px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            <Calculator size={16} /> Instant Fee & Travel Calculator
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Transparent Pricing Calculator
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Estimate your total notarization and travel fee instantly before booking. No surprise fees.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Signature Counter */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Number of Notarized Signatures
              </label>
              <div className="flex items-center gap-4 bg-black/30 p-2 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setSignatures(Math.max(1, signatures - 1))}
                  className="w-12 h-12 rounded-xl bg-white/10 text-white font-bold text-xl hover:bg-secondary hover:text-primary transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-secondary"
                  aria-label="Decrease signatures"
                >
                  -
                </button>
                <span className="flex-1 text-center font-bold text-2xl text-secondary">
                  {signatures} {signatures === 1 ? 'Signature' : 'Signatures'}
                </span>
                <button
                  type="button"
                  onClick={() => setSignatures(signatures + 1)}
                  className="w-12 h-12 rounded-xl bg-white/10 text-white font-bold text-xl hover:bg-secondary hover:text-primary transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-secondary"
                  aria-label="Increase signatures"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1.5 pl-1">
                Texas State Statutory Cap: $10 first signature, $1 each additional signature.
              </p>
            </div>

            {/* County Travel Dropdown */}
            <div>
              <label htmlFor="county-select" className="block text-sm font-semibold text-gray-200 mb-2">
                Travel Destination (County)
              </label>
              <select
                id="county-select"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className="w-full bg-black/40 text-white rounded-xl p-3.5 border border-white/20 font-medium focus:ring-2 focus:ring-secondary focus:border-transparent outline-none cursor-pointer"
              >
                <option value="brazoria" className="bg-gray-900 text-white">Brazoria County (Lake Jackson, Angleton, Pearland, Clute)</option>
                <option value="matagorda" className="bg-gray-900 text-white">Matagorda County (Bay City, Palacios)</option>
                <option value="galveston" className="bg-gray-900 text-white">Galveston County (Galveston, League City, Texas City)</option>
                <option value="harris" className="bg-gray-900 text-white">Harris County (Houston, Pasadena, Webster)</option>
              </select>
            </div>

            {/* Time Slot Selector */}
            <div>
              <label htmlFor="time-select" className="block text-sm font-semibold text-gray-200 mb-2">
                Appointment Time Window
              </label>
              <select
                id="time-select"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-black/40 text-white rounded-xl p-3.5 border border-white/20 font-medium focus:ring-2 focus:ring-secondary focus:border-transparent outline-none cursor-pointer"
              >
                <option value="standard" className="bg-gray-900 text-white">Standard Hours (8:00 AM – 5:00 PM)</option>
                <option value="evening" className="bg-gray-900 text-white">Evening Hours (5:00 PM – 9:00 PM) (+$15)</option>
                <option value="lateNight" className="bg-gray-900 text-white">Late Night / Urgent (After 9:00 PM) (+$30)</option>
              </select>
            </div>

          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary to-purple-950 p-6 sm:p-8 rounded-2xl border border-secondary/40 shadow-xl flex flex-col justify-between space-y-6">
            
            <div>
              <span className="text-xs uppercase tracking-widest text-secondary font-bold">Estimated Cost Breakdown</span>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-gray-300 pb-2 border-b border-white/10">
                  <span>Notary State Fee ({signatures} sigs)</span>
                  <span className="font-semibold text-white">${baseNotaryFee}.00</span>
                </div>
                <div className="flex justify-between text-gray-300 pb-2 border-b border-white/10">
                  <span>Mobile Travel Fee</span>
                  <span className="font-semibold text-white">${travelFee}.00</span>
                </div>
                {timeFee > 0 && (
                  <div className="flex justify-between text-gray-300 pb-2 border-b border-white/10">
                    <span>After-Hours Convenience</span>
                    <span className="font-semibold text-white">+${timeFee}.00</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-secondary/30">
                <div className="text-xs text-gray-400 uppercase font-semibold">Total Estimated Price</div>
                <div className="text-4xl font-extrabold text-secondary mt-1">
                  ${totalEstimate}.00
                </div>
                <p className="text-[11px] text-gray-400 mt-1 italic">
                  *Exact travel quote confirmed prior to departure.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-secondary text-primary font-bold py-3.5 px-6 rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 shadow-lg group text-center"
              >
                <span>Book With This Estimate</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="sms:+19795291312?body=Hi%20Jeannie!%20I%20used%20your%20calculator%20for%20an%20estimate."
                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 border border-white/20 text-sm text-center"
              >
                <PhoneCall size={16} /> Text Quote Request
              </a>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-gray-300 pt-2 border-t border-white/10">
              <ShieldCheck size={14} className="text-secondary shrink-0" />
              <span>Tap to Pay accepted (Credit/Debit, Zelle, Cash)</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
