import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config/siteConfig';
import {
  Calculator,
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  MapPin,
  Navigation,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface CalculationResult {
  distanceText: string;
  durationText: string;
  miles: number;
  travelFee: number | 'quote';
  formattedAddress: string;
}

export const FeeEstimator: React.FC = () => {
  // --- Google Maps & Autocomplete State ---
  const [addressInput, setAddressInput] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [calcResult, setCalcResult] = useState<CalculationResult | null>(null);
  const [mapsError, setMapsError] = useState<string | null>(null);

  const autocompleteInputRef = useRef<HTMLInputElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const googleAutocompleteRef = useRef<any>(null);
  const directionsRendererRef = useRef<any>(null);
  const directionsServiceRef = useRef<any>(null);

  // --- Step 2 Calculator State ---
  const [signatures, setSignatures] = useState<number>(1);
  const [appointmentTime, setAppointmentTime] = useState<number>(0); // 0, 15, 30
  const [printing, setPrinting] = useState<boolean>(false); // +$10
  const [scanbacks, setScanbacks] = useState<boolean>(false); // +$10
  const [witnessService, setWitnessService] = useState<boolean>(false); // +$25
  const [jailVisit, setJailVisit] = useState<boolean>(false); // +$35

  const bookingUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSeFGHvwVwHGdY4qKWPtPrZry7vl7EoU-xR6Vp96HBEdaibV_g/viewform';

  // Pre-defined city distance mapping for instant manual selection / fallback
  const cityPresets: Record<string, { label: string; miles: number; fee: number | 'quote' }> = {
    lake_jackson: { label: 'Lake Jackson (0 – 5 mi)', miles: 4, fee: 10 },
    clute: { label: 'Clute (0 – 5 mi)', miles: 4.5, fee: 10 },
    angleton: { label: 'Angleton (5 – 10 mi)', miles: 9, fee: 15 },
    freeport: { label: 'Freeport (5 – 10 mi)', miles: 8.5, fee: 15 },
    west_columbia: { label: 'West Columbia (10 – 20 mi)', miles: 16, fee: 20 },
    sweeny: { label: 'Sweeny (15 – 20 mi)', miles: 18, fee: 20 },
    pearland: { label: 'Pearland (20 – 30 mi)', miles: 28, fee: 30 },
    bay_city: { label: 'Bay City (20 – 30 mi)', miles: 27, fee: 30 },
    galveston: { label: 'Galveston (30+ mi)', miles: 38, fee: 'quote' },
    houston: { label: 'Houston (30+ mi)', miles: 45, fee: 'quote' }
  };

  // Helper to calculate travel fee based on mileage according to Jeannie's exact formula
  const getTravelFeeFromMiles = (miles: number): number | 'quote' => {
    if (miles <= 5) return 10;
    if (miles <= 10) return 15;
    if (miles <= 20) return 20;
    if (miles <= 30) return 30;
    return 'quote';
  };

  // Load Google Maps JavaScript SDK dynamically
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyA-fWs4zJOxZ5AVq56AVGB5yLmvnnFx53w';

    if ((window as any).google && (window as any).google.maps) {
      initGoogleMaps();
      return;
    }

    const scriptId = 'google-maps-js-sdk';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initGoogleMaps();
    };
    script.onerror = () => {
      setMapsError('Could not load Google Maps. You can still select your city manually below!');
    };
    document.body.appendChild(script);
  }, []);

  const initGoogleMaps = () => {
    try {
      const google = (window as any).google;
      if (!google || !google.maps || !google.maps.places) return;

      if (autocompleteInputRef.current && !googleAutocompleteRef.current) {
        googleAutocompleteRef.current = new google.maps.places.Autocomplete(
          autocompleteInputRef.current,
          {
            types: ['address'],
            componentRestrictions: { country: 'us' }
          }
        );

        googleAutocompleteRef.current.addListener('place_changed', () => {
          const place = googleAutocompleteRef.current.getPlace();
          if (place && place.formatted_address) {
            setAddressInput(place.formatted_address);
            calculateRouteForDestination(place.formatted_address);
          }
        });
      }

      directionsServiceRef.current = new google.maps.DirectionsService();
    } catch (err) {
      console.warn('Google Maps Initialization Warning:', err);
    }
  };

  // Calculate driving mileage via Google Maps Directions API
  const calculateRouteForDestination = (destAddress: string) => {
    const google = (window as any).google;
    if (!google || !directionsServiceRef.current) {
      handleManualCityFallback(destAddress);
      return;
    }

    setMapsError(null);

    directionsServiceRef.current.route(
      {
        origin: "598 TX-332, Lake Jackson, TX 77566",
        destination: destAddress,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result: any, status: string) => {
        if (status === 'OK' && result.routes && result.routes[0] && result.routes[0].legs[0]) {
          const leg = result.routes[0].legs[0];
          const miles = leg.distance.value * 0.000621371;
          const travelFee = getTravelFeeFromMiles(miles);

          setCalcResult({
            distanceText: leg.distance.text,
            durationText: leg.duration.text,
            miles,
            travelFee,
            formattedAddress: leg.end_address || destAddress
          });

          // Render Map
          if (mapContainerRef.current) {
            mapContainerRef.current.style.display = 'block';
            if (!directionsRendererRef.current) {
              const map = new google.maps.Map(mapContainerRef.current, {
                zoom: 11,
                center: { lat: 29.0439, lng: -95.4343 },
                styles: [
                  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] }
                ]
              });
              directionsRendererRef.current = new google.maps.DirectionsRenderer({ map });
            }
            directionsRendererRef.current.setDirections(result);
          }
        } else {
          setMapsError(`Could not calculate driving distance. (Status: ${status})`);
        }
      }
    );
  };

  // Fallback if user selects city dropdown
  const handleCitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedCity(val);

    if (!val) return;

    const preset = cityPresets[val];
    if (preset) {
      setCalcResult({
        distanceText: `Approx. ${preset.miles} miles`,
        durationText: '10–25 mins drive',
        miles: preset.miles,
        travelFee: preset.fee,
        formattedAddress: preset.label
      });
    }
  };

  const handleManualCityFallback = (destText: string) => {
    setCalcResult({
      distanceText: 'Estimated local travel',
      durationText: '15-20 min drive',
      miles: 8,
      travelFee: 15,
      formattedAddress: destText
    });
  };

  // --- Calculation Math ---
  const notaryBaseFee = 10;
  const notaryFee = notaryBaseFee + Math.max(0, signatures - 1) * 1;

  const currentTravelFeeNum = calcResult
    ? calcResult.travelFee === 'quote'
      ? 0
      : calcResult.travelFee
    : 10; // Default local 0-5 mi travel fee ($10) if not explicitly computed yet

  const printingFee = printing ? 10 : 0;
  const scanbacksFee = scanbacks ? 10 : 0;
  const witnessFee = witnessService ? 25 : 0;
  const jailFee = jailVisit ? 35 : 0;
  const afterHoursFee = Number(appointmentTime);

  const grandTotal =
    currentTravelFeeNum +
    notaryFee +
    afterHoursFee +
    printingFee +
    scanbacksFee +
    witnessFee +
    jailFee;

  const isCustomTravelQuote = calcResult?.travelFee === 'quote';

  // --- Pre-filled SMS Message Generator ---
  const generateSmsBody = () => {
    let text = `Hi ${siteConfig.ownerName.split(' ')[0]}! I used your website calculator for an estimate:\n`;
    if (calcResult) {
      text += `📍 Destination: ${calcResult.formattedAddress} (${calcResult.distanceText})\n`;
      text += `🚗 Travel Fee: ${isCustomTravelQuote ? 'Quote Needed' : '$' + currentTravelFeeNum}\n`;
    } else {
      text += `🚗 Travel Fee (Local): $${currentTravelFeeNum}\n`;
    }
    text += `🖊️ Signatures (${signatures}): $${notaryFee}\n`;
    if (afterHoursFee > 0) text += `🌙 After-Hours: +$${afterHoursFee}\n`;
    if (printing) text += `🖨️ Printing: +$10\n`;
    if (scanbacks) text += `📄 Scan Backs: +$10\n`;
    if (witnessService) text += `👥 Witness Service: +$25\n`;
    if (jailVisit) text += `🔒 Jail Visit: +$35\n`;
    text += `🧾 Total Estimate: ${isCustomTravelQuote ? 'Custom Quote Requested' : '$' + grandTotal}\n`;
    text += `I would like to schedule an appointment!`;
    return encodeURIComponent(text);
  };

  return (
    <section id="estimator" className="py-16 sm:py-24 bg-gradient-to-b from-gray-950 via-primary to-gray-950 text-white relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/40 text-secondary px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-md">
            <Calculator size={16} /> Instant Fee & Travel Calculator
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Transparent Pricing & Instant Quote
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Calculated straight from Buc-ee's Lake Jackson. Select your destination and services for an exact, instant estimate before booking.
          </p>
        </div>

        {/* --- SECTION 1: TRANSPARENT PRICING CARD (Matching Published Sheet) --- */}
        <div className="mb-14 bg-white/5 border border-white/15 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-2 mb-6">
            <ShieldCheck size={24} className="text-secondary" /> Official Transparent Pricing Sheet
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Notary Fees & Add-ons Column */}
            <div className="bg-black/30 p-6 rounded-2xl border border-white/10 space-y-4">
              <h4 className="font-bold text-white text-lg flex items-center gap-2 border-b border-white/10 pb-3">
                <span>📄 Texas Notary Fees & Services</span>
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-200">
                <li className="flex justify-between">
                  <span>First notarized signature</span>
                  <strong className="text-secondary font-semibold">$10</strong>
                </li>
                <li className="flex justify-between">
                  <span>Each additional signature</span>
                  <strong className="text-secondary font-semibold">$1</strong>
                </li>
                <li className="border-t border-white/10 pt-2.5 flex justify-between">
                  <span>After Hours (5:00 PM – 9:00 PM)</span>
                  <strong className="text-white">+$15</strong>
                </li>
                <li className="flex justify-between">
                  <span>After 9:00 PM / Late Night</span>
                  <strong className="text-white">+$30</strong>
                </li>
                <li className="flex justify-between">
                  <span>Printing Documents</span>
                  <strong className="text-white">+$10</strong>
                </li>
                <li className="flex justify-between">
                  <span>Scan Backs</span>
                  <strong className="text-white">+$10</strong>
                </li>
                <li className="flex justify-between">
                  <span>Witness Service</span>
                  <strong className="text-white">+$25</strong>
                </li>
                <li className="flex justify-between">
                  <span>Jail / Prison Visit</span>
                  <strong className="text-white">+$35</strong>
                </li>
                <li className="flex justify-between text-xs text-gray-400 pt-1">
                  <span>Hospital / Nursing Home Visit</span>
                  <span className="italic text-secondary">Flexible / Contact for quote</span>
                </li>
              </ul>
            </div>

            {/* Mobile Travel Fees Column */}
            <div className="bg-black/30 p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-bold text-white text-lg flex items-center gap-2 border-b border-white/10 pb-3">
                  <span>🏎️ Mobile Travel Fees</span>
                </h4>
                <p className="text-xs text-gray-400 mt-2 mb-4">
                  Based on one-way mileage from <strong>Buc-ee's</strong> (598 TX-332, Lake Jackson, TX 77566):
                </p>
                <ul className="space-y-2.5 text-sm text-gray-200">
                  <li className="flex justify-between">
                    <span>0 – 5 miles</span>
                    <strong className="text-secondary font-bold">$10</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>5 – 10 miles</span>
                    <strong className="text-secondary font-bold">$15</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>10 – 20 miles</span>
                    <strong className="text-secondary font-bold">$20</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>20 – 30 miles</span>
                    <strong className="text-secondary font-bold">$30</strong>
                  </li>
                  <li className="flex justify-between pt-1 border-t border-white/10">
                    <span>30+ miles</span>
                    <strong className="text-secondary uppercase text-xs tracking-wider">Request Quote</strong>
                  </li>
                </ul>
              </div>

              <div className="bg-secondary/10 border border-secondary/30 p-3.5 rounded-xl text-xs text-gray-300">
                <span className="font-semibold text-secondary block mb-1">🚗 Local Travel Guarantee</span>
                Travel fees are calculated transparently prior to departure. No surprise add-on travel costs.
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: INTERACTIVE CALCULATOR ENGINE --- */}
        <div id="quote-calculator" className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl grid lg:grid-cols-12 gap-10">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* STEP 1: CALCULATE MILEAGE */}
            <div className="bg-black/30 p-6 rounded-2xl border border-white/15 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-secondary text-primary font-extrabold text-sm flex items-center justify-center">1</span>
                  Step 1: Calculate Travel Distance
                </h3>
                <span className="text-xs text-secondary font-medium">Origin: Buc-ee's Lake Jackson</span>
              </div>

              {/* Google Places Autocomplete */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Enter Street Address or Destination Name
                </label>
                <div className="relative">
                  <input
                    ref={autocompleteInputRef}
                    type="text"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder="Search address (e.g. 123 Main St, Angleton, TX)..."
                    className="w-full bg-black/60 text-white placeholder-gray-400 rounded-xl p-3.5 pl-11 border border-white/20 font-medium focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                  />
                  <MapPin className="absolute left-3.5 top-3.5 text-secondary" size={20} />
                </div>
              </div>

              {/* City Dropdown Fallback */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>OR Select Nearby City / Area Preset:</span>
                </div>
                <select
                  value={selectedCity}
                  onChange={handleCitySelect}
                  className="w-full bg-black/60 text-white rounded-xl p-3.5 border border-white/20 font-medium focus:ring-2 focus:ring-secondary focus:border-transparent outline-none cursor-pointer text-sm"
                >
                  <option value="" className="bg-gray-900 text-gray-400">-- Choose City Preset --</option>
                  {Object.entries(cityPresets).map(([key, val]) => (
                    <option key={key} value={key} className="bg-gray-900 text-white">
                      {val.label} - {val.fee === 'quote' ? 'Request Quote' : `$${val.fee} Travel`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Travel Calculation Output Box */}
              {calcResult && (
                <div className="mt-4 p-4 bg-secondary/15 border border-secondary/40 rounded-xl text-sm space-y-2 animate-fadeIn">
                  <div className="flex justify-between items-center text-white font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Navigation size={16} className="text-secondary" />
                      {calcResult.formattedAddress}
                    </span>
                    <span className="text-secondary font-bold text-base">
                      {calcResult.travelFee === 'quote' ? 'Request Quote' : `$${calcResult.travelFee} Travel Fee`}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-300 pt-1 border-t border-secondary/20">
                    <span><strong>Distance:</strong> {calcResult.distanceText}</span>
                    <span><strong>Drive Time:</strong> {calcResult.durationText}</span>
                  </div>
                </div>
              )}

              {/* Route Map Display */}
              <div
                ref={mapContainerRef}
                style={{ display: 'none', height: '220px' }}
                className="w-full rounded-xl overflow-hidden border border-white/20 mt-4"
              ></div>

              {mapsError && (
                <div className="flex items-center gap-2 text-xs text-yellow-400 bg-yellow-950/40 p-3 rounded-xl border border-yellow-500/30">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{mapsError}</span>
                </div>
              )}
            </div>

            {/* STEP 2: SELECT SERVICES */}
            <div className="bg-black/30 p-6 rounded-2xl border border-white/15 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-secondary text-primary font-extrabold text-sm flex items-center justify-center">2</span>
                  Step 2: Select Your Notary Services
                </h3>
              </div>

              {/* Signatures Counter */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  🖊️ Number of Notarized Signatures
                </label>
                <div className="flex items-center gap-4 bg-black/40 p-2.5 rounded-2xl border border-white/15">
                  <button
                    type="button"
                    onClick={() => setSignatures(Math.max(1, signatures - 1))}
                    className="w-12 h-12 rounded-xl bg-white/10 text-white font-bold text-2xl hover:bg-secondary hover:text-primary transition-colors flex items-center justify-center focus:outline-none"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center">
                    <span className="font-bold text-3xl text-secondary">{signatures}</span>
                    <span className="text-xs text-gray-300 block font-medium">
                      {signatures === 1 ? 'Notarized Signature' : 'Notarized Signatures'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSignatures(signatures + 1)}
                    className="w-12 h-12 rounded-xl bg-white/10 text-white font-bold text-2xl hover:bg-secondary hover:text-primary transition-colors flex items-center justify-center focus:outline-none"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  First signature is $10. Each additional signature is $1 (Texas Statutory Rate).
                </p>
              </div>

              {/* Time Window Select */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  🕒 Preferred Appointment Time Window
                </label>
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(Number(e.target.value))}
                  className="w-full bg-black/60 text-white rounded-xl p-3.5 border border-white/20 font-medium focus:ring-2 focus:ring-secondary focus:border-transparent outline-none cursor-pointer text-sm"
                >
                  <option value={0} className="bg-gray-900 text-white">
                    8:00 AM - 5:00 PM (Standard Hours - No Additional Fee)
                  </option>
                  <option value={15} className="bg-gray-900 text-white">
                    5:00 PM - 9:00 PM (Evening Hours - +$15)
                  </option>
                  <option value={30} className="bg-gray-900 text-white">
                    After 9:00 PM (Late Night / Emergency - +$30)
                  </option>
                </select>
              </div>

              {/* Add-ons Checkboxes */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-200 mb-1">
                  ➕ Additional Services & Surcharges
                </label>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Printing */}
                  <label className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${printing ? 'bg-secondary/20 border-secondary text-white' : 'bg-black/40 border-white/10 text-gray-300 hover:border-white/30'}`}>
                    <input
                      type="checkbox"
                      checked={printing}
                      onChange={(e) => setPrinting(e.target.checked)}
                      className="w-5 h-5 accent-secondary rounded cursor-pointer"
                    />
                    <div className="text-xs">
                      <span className="font-semibold block text-sm text-white">🖨️ Printing Documents</span>
                      <span className="text-gray-400">+$10</span>
                    </div>
                  </label>

                  {/* Scan Backs */}
                  <label className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${scanbacks ? 'bg-secondary/20 border-secondary text-white' : 'bg-black/40 border-white/10 text-gray-300 hover:border-white/30'}`}>
                    <input
                      type="checkbox"
                      checked={scanbacks}
                      onChange={(e) => setScanbacks(e.target.checked)}
                      className="w-5 h-5 accent-secondary rounded cursor-pointer"
                    />
                    <div className="text-xs">
                      <span className="font-semibold block text-sm text-white">📄 Scan Backs</span>
                      <span className="text-gray-400">+$10</span>
                    </div>
                  </label>

                  {/* Witness Service */}
                  <label className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${witnessService ? 'bg-secondary/20 border-secondary text-white' : 'bg-black/40 border-white/10 text-gray-300 hover:border-white/30'}`}>
                    <input
                      type="checkbox"
                      checked={witnessService}
                      onChange={(e) => setWitnessService(e.target.checked)}
                      className="w-5 h-5 accent-secondary rounded cursor-pointer"
                    />
                    <div className="text-xs">
                      <span className="font-semibold block text-sm text-white">👥 Witness Service</span>
                      <span className="text-gray-400">+$25</span>
                    </div>
                  </label>

                  {/* Jail Visit */}
                  <label className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${jailVisit ? 'bg-secondary/20 border-secondary text-white' : 'bg-black/40 border-white/10 text-gray-300 hover:border-white/30'}`}>
                    <input
                      type="checkbox"
                      checked={jailVisit}
                      onChange={(e) => setJailVisit(e.target.checked)}
                      className="w-5 h-5 accent-secondary rounded cursor-pointer"
                    />
                    <div className="text-xs">
                      <span className="font-semibold block text-sm text-white">🔒 Jail / Prison Visit</span>
                      <span className="text-gray-400">+$35</span>
                    </div>
                  </label>
                </div>

                <p className="text-xs text-gray-400 italic pt-1">
                  *If your document requires more than one witness, your final quote may be adjusted prior to appointment.
                </p>
              </div>

            </div>

          </div>

          {/* STEP 3: ESTIMATE SUMMARY & RECEIPT */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary via-purple-950 to-gray-950 p-6 sm:p-8 rounded-3xl border border-secondary/40 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-secondary/20 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-secondary font-extrabold block">Step 3</span>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    🧾 Estimate Summary
                  </h3>
                </div>
                <Sparkles className="text-secondary" size={24} />
              </div>

              {/* Itemized Line Items */}
              <div className="mt-6 space-y-3.5 text-sm">
                
                {/* Travel Fee Line */}
                <div className="flex justify-between text-gray-300 pb-2.5 border-b border-white/10">
                  <span className="flex items-center gap-2">
                    <span>🚗</span> Travel Fee {calcResult ? `(${calcResult.distanceText})` : '(Local 0-5 mi)'}
                  </span>
                  <span className="font-bold text-white">
                    {isCustomTravelQuote ? 'Quote Needed' : `$${currentTravelFeeNum}.00`}
                  </span>
                </div>

                {/* Notary Fees Line */}
                <div className="flex justify-between text-gray-300 pb-2.5 border-b border-white/10">
                  <span className="flex items-center gap-2">
                    <span>🖊️</span> Notary Fees ({signatures} {signatures === 1 ? 'sig' : 'sigs'})
                  </span>
                  <span className="font-bold text-white">${notaryFee}.00</span>
                </div>

                {/* After Hours Fee Line */}
                {afterHoursFee > 0 && (
                  <div className="flex justify-between text-gray-300 pb-2.5 border-b border-white/10">
                    <span className="flex items-center gap-2">
                      <span>🌙</span> After-Hours Fee
                    </span>
                    <span className="font-bold text-white">+${afterHoursFee}.00</span>
                  </div>
                )}

                {/* Printing Line */}
                {printing && (
                  <div className="flex justify-between text-gray-300 pb-2.5 border-b border-white/10">
                    <span className="flex items-center gap-2">
                      <span>🖨️</span> Printing Documents
                    </span>
                    <span className="font-bold text-white">+$10.00</span>
                  </div>
                )}

                {/* Scanbacks Line */}
                {scanbacks && (
                  <div className="flex justify-between text-gray-300 pb-2.5 border-b border-white/10">
                    <span className="flex items-center gap-2">
                      <span>📄</span> Scan Backs
                    </span>
                    <span className="font-bold text-white">+$10.00</span>
                  </div>
                )}

                {/* Witness Line */}
                {witnessService && (
                  <div className="flex justify-between text-gray-300 pb-2.5 border-b border-white/10">
                    <span className="flex items-center gap-2">
                      <span>👥</span> Witness Service
                    </span>
                    <span className="font-bold text-white">+$25.00</span>
                  </div>
                )}

                {/* Jail Visit Line */}
                {jailVisit && (
                  <div className="flex justify-between text-gray-300 pb-2.5 border-b border-white/10">
                    <span className="flex items-center gap-2">
                      <span>🔒</span> Jail / Prison Visit
                    </span>
                    <span className="font-bold text-white">+$35.00</span>
                  </div>
                )}

              </div>

              {/* Total Display Box */}
              <div className="mt-8 p-5 bg-black/50 rounded-2xl border border-secondary/40 text-center shadow-inner">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">
                  TOTAL ESTIMATE
                </p>

                {isCustomTravelQuote ? (
                  <div className="text-2xl font-extrabold text-secondary py-2">
                    Custom Travel Quote Needed
                  </div>
                ) : (
                  <div className="text-5xl font-extrabold text-secondary tracking-tight">
                    ${grandTotal}.00
                  </div>
                )}

                <p className="text-[11px] text-gray-400 mt-2">
                  Texas notary fees and travel fees included.
                </p>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-secondary text-primary font-bold py-4 px-6 rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 shadow-xl group text-center text-lg"
              >
                <span>📅 Continue to Schedule Appointment</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`sms:${siteConfig.phoneE164}?body=${generateSmsBody()}`}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 border border-white/20 text-sm text-center"
              >
                <PhoneCall size={16} /> Text Quote to {siteConfig.ownerName.split(' ')[0]}
              </a>

              <p className="text-[11px] text-center text-gray-400 pt-1">
                You'll choose your appointment date and time on the next screen.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-gray-300 pt-3 border-t border-white/10">
              <ShieldCheck size={14} className="text-secondary shrink-0" />
              <span>Tap to Pay accepted (Credit/Debit, Zelle, Cash)</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
