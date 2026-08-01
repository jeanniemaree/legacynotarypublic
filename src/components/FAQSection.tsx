import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What documents are required for a Texas mobile notarization?",
      answer: "All signers must present a valid, unexpired government-issued photo ID (such as a Texas Driver License, State ID, US Passport, or Military ID). Documents must be complete with no blank pages or missing sections prior to notarization."
    },
    {
      question: "What are the notary fees set by Texas State Law?",
      answer: "Texas Government Code § 406.024 caps notary fees at $10 for the first signature and $1 for each additional signature on the same document. Travel and after-hours convenience fees are agreed upon in advance."
    },
    {
      question: "Do you travel to hospitals, nursing homes, and rehab centers?",
      answer: "Yes. Jeannie Hernandez provides compassionate bedside mobile notarizations directly in hospital rooms, assisted living facilities, and rehabilitation centers across Brazoria, Matagorda, Galveston, and Harris Counties."
    },
    {
      question: "Can a Texas notary public give legal advice or draft documents?",
      answer: "No. Texas Notaries Public are not licensed attorneys and are legally prohibited from giving legal advice, drafting legal documents, or advising on which document type you need."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept Cash, Credit Cards, Debit Cards, Contactless Tap to Pay (Apple Pay, Google Pay), and Zelle upon completion of service."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            <HelpCircle size={16} /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Clear Answers & Guidance
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Everything you need to know about Texas mobile notarizations and scheduling.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-primary/40 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 bg-gray-50/50 flex justify-between items-center gap-4 focus:outline-none focus:bg-primary/5 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-bold text-lg text-gray-900 leading-snug">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`text-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-secondary' : ''}`}
                    size={22}
                  />
                </button>
                
                {isOpen && (
                  <div className="p-6 bg-white border-t border-gray-100 text-gray-700 leading-relaxed text-base">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
