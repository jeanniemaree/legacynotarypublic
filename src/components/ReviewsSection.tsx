import { Star, Quote, CheckCircle } from 'lucide-react';

export const ReviewsSection = () => {
  const reviews = [
    {
      name: "Marcus V.",
      location: "Lake Jackson, TX",
      service: "Real Estate Closing",
      text: "Jeannie came directly to our office on short notice. She was punctual, meticulous with all signatures, and made our closing completely stress-free!",
      rating: 5
    },
    {
      name: "Elena R.",
      location: "Pearland, TX",
      service: "Hospital Bedside Notary",
      text: "We needed a healthcare power of attorney notarized at UTMB. Jeannie was incredibly compassionate, patient, and professional with my mother.",
      rating: 5
    },
    {
      name: "David K.",
      location: "Bay City, TX",
      service: "Estate & Power of Attorney",
      text: "Transparent pricing with zero hidden fees. She traveled out to Matagorda County after hours. Best mobile notary experience in Texas!",
      rating: 5
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 border border-yellow-300">
            <Star size={16} className="fill-yellow-500 text-yellow-500" /> Client Testimonials & Trust
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Trusted Across Texas
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Read what clients say about Jeannie Hernandez's prompt, professional mobile notary service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4 text-gray-100 pointer-events-none">
                <Quote size={80} />
              </div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed text-base">
                  "{r.text}"
                </p>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-gray-100 flex justify-between items-end">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-1.5">
                    {r.name} <CheckCircle size={16} className="text-emerald-500" />
                  </h3>
                  <span className="text-xs text-gray-500">{r.location}</span>
                </div>
                <span className="text-xs font-semibold text-primary bg-primary/5 px-2.5 py-1 rounded-md">
                  {r.service}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
