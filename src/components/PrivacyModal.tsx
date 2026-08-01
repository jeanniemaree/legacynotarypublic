import { X, Shield } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-200 relative">
        
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h3 id="privacy-title" className="text-xl font-bold text-primary flex items-center gap-2">
            <Shield size={20} className="text-secondary" /> Privacy Policy
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
          <p>
            <strong>Legacy Notary Public</strong> ("we," "us," or "our") respects your privacy. This policy outlines how we handle personal information submitted through our mobile notary booking requests and communications.
          </p>
          
          <h4 className="font-bold text-gray-900 text-base">1. Information We Collect</h4>
          <p>
            We collect information provided directly by you when requesting mobile notary services, including your name, contact phone number, appointment location address, and service time preferences.
          </p>

          <h4 className="font-bold text-gray-900 text-base">2. Use of Information</h4>
          <p>
            Your information is strictly used to schedule, confirm, and complete your mobile notarization appointment, process payment receipts, and maintain legally required Texas Notary Public journal logs as mandated by Texas State Law.
          </p>

          <h4 className="font-bold text-gray-900 text-base">3. Confidentiality & Security</h4>
          <p>
            We do not sell, rent, or share client information with third parties for marketing purposes. All personal details provided during service appointments remain strictly confidential.
          </p>

          <h4 className="font-bold text-gray-900 text-base">4. Contact Us</h4>
          <p>
            For questions regarding this privacy policy, please contact Jeannie Hernandez at <strong>(979) 529-1312</strong>.
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
