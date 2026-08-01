import { X, FileText } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="terms-title">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-200 relative">
        
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h3 id="terms-title" className="text-xl font-bold text-primary flex items-center gap-2">
            <FileText size={20} className="text-secondary" /> Terms of Service & Travel Policies
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close dialog"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mt-6 space-y-4 text-sm text-gray-700 leading-relaxed">
          <h4 className="font-bold text-gray-900 text-base">1. Identification Requirements</h4>
          <p>
            Per Texas State Notary Law, all signers must present a valid, unexpired government-issued photo ID (Driver License, State ID, Passport, US Military ID) at the time of appointment. If valid ID cannot be produced, notarization cannot proceed.
          </p>
          
          <h4 className="font-bold text-gray-900 text-base">2. Texas Notary Statutory Caps & Travel Fees</h4>
          <p>
            Notary public fees are regulated under Texas Government Code § 406.024 ($10 first signature, $1 each additional signature). Travel convenience fees are quoted separately in advance based on distance, scheduling window, and location type.
          </p>

          <h4 className="font-bold text-gray-900 text-base">3. Non-Attorney Disclaimer</h4>
          <p className="font-semibold text-amber-900 bg-amber-50 p-3 rounded-lg border border-amber-200">
            Jeannie Hernandez is a commissioned Texas Notary Public, NOT an attorney licensed to practice law in Texas. She may not give legal advice or accept fees for legal advice.
          </p>

          <h4 className="font-bold text-gray-900 text-base">4. Cancellation & Travel Terms</h4>
          <p>
            Travel fees are earned upon arrival at the agreed location. If a notarization cannot be completed due to invalid ID, missing signers, unexecuted documents, or lack of willingness/competence, travel fees remain payable.
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-primary text-white font-bold px-6 py-2.5 rounded-xl hover:bg-purple-900 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
