import { MapPin, Navigation, Building2, Hospital } from 'lucide-react';

export const ServiceAreaMatrix = () => {
  const counties = [
    {
      name: "Brazoria County",
      hub: "Primary Travel Zone",
      cities: ["Lake Jackson", "Angleton", "Clute", "Freeport", "Pearland", "Alvin", "Manvel", "Sweeny", "West Columbia", "Brazoria", "Danbury"]
    },
    {
      name: "Matagorda County",
      hub: "Coastal & Rural Zone",
      cities: ["Bay City", "Palacios", "Van Vleck", "Markham", "Wadsworth", "Matagorda"]
    },
    {
      name: "Galveston County",
      hub: "Island & Bay Area",
      cities: ["Galveston", "Texas City", "League City", "Dickinson", "Friendswood", "La Marque", "Hitchcock", "Santa Fe"]
    },
    {
      name: "Harris County",
      hub: "Greater Metro South",
      cities: ["Houston", "Pasadena", "Webster", "Clear Lake", "Baytown", "Friendswood (Harris)", "Deer Park", "South Houston"]
    }
  ];

  const venueTypes = [
    { icon: Building2, title: "Private Residences & Offices", desc: "Your home, workplace, or executive suite." },
    { icon: Hospital, title: "Hospitals & Care Facilities", desc: "Bedside notarization at UTMB, CHI St. Luke's, HCA Houston, nursing homes." },
    { icon: Navigation, title: "Public & Mutually Agreed Sites", desc: "Coffee shops, libraries, banks, or county facilities." }
  ];

  return (
    <section id="service-area" className="py-20 bg-gray-50 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            <MapPin size={16} /> Extended Texas Coverage Area
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Four Texas Counties Served
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Mobile notary services traveling directly to your location throughout South & Coastal Texas.
          </p>
        </div>

        {/* Counties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {counties.map((c, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:border-secondary/50 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl text-primary">{c.name}</h3>
                <span className="text-[11px] font-semibold uppercase tracking-wider bg-secondary/20 text-yellow-800 px-2.5 py-0.5 rounded-full">
                  {c.hub}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {c.cities.map((city, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md border border-gray-200">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Venues Bar */}
        <div className="bg-primary text-white rounded-3xl p-8 lg:p-12 shadow-xl grid md:grid-cols-3 gap-8 border border-purple-800">
          {venueTypes.map((v, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 border border-secondary/40 flex items-center justify-center shrink-0 text-secondary">
                <v.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white mb-1">{v.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
