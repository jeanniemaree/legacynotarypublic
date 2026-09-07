import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = siteConfig.faqs;

  return (
    <section id="faq" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            <HelpCircle size={16} aria-hidden="true" /> Frequently Asked Questions
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
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;
            return (
              <div
                key={faq.question}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-primary/40 shadow-sm"
              >
                <button
                  type="button"
                  id={buttonId}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 bg-gray-50/50 flex justify-between items-center gap-4 focus:outline-none focus:bg-primary/5 cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <h3 className="font-bold text-lg text-gray-900 leading-snug">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`text-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    size={22}
                    aria-hidden="true"
                  />
                </button>

                {/* Keep answers in the DOM for crawlers/agents (CSS collapse, not conditional mount) */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`p-6 bg-white border-t border-gray-100 text-gray-700 leading-relaxed text-base ${isOpen ? '' : 'hidden'}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
