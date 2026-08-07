import { PhoneCall, MessageSquare, Calendar } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const MobileCallBar = () => {
  const bookingUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeFGHvwVwHGdY4qKWPtPrZry7vl7EoU-xR6Vp96HBEdaibV_g/viewform";

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-t border-purple-800 p-3 shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        
        <a
          href={`tel:${siteConfig.phoneE164}`}
          className="flex flex-col items-center justify-center py-2 px-1 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors"
        >
          <PhoneCall size={18} className="text-secondary mb-1" />
          <span>Call Now</span>
        </a>

        <a
          href={`sms:${siteConfig.phoneE164}?body=Hi%20${encodeURIComponent(siteConfig.ownerName.split(' ')[0])}!%20I%20need%20a%20mobile%20notary.`}
          className="flex flex-col items-center justify-center py-2 px-1 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors"
        >
          <MessageSquare size={18} className="text-secondary mb-1" />
          <span>Text Now</span>
        </a>

        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 bg-secondary text-primary font-bold rounded-xl text-xs shadow-md transition-transform hover:scale-105"
        >
          <Calendar size={18} className="mb-1" />
          <span>Book Online</span>
        </a>

      </div>
    </div>
  );
};
