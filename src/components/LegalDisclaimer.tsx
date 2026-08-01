import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const LegalDisclaimer = () => {
  return (
    <div className="bg-amber-500/10 border-t border-b border-amber-500/30 text-amber-900 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        
        <div className="flex items-start sm:items-center gap-3">
          <AlertTriangle className="text-amber-600 shrink-0 mt-0.5 sm:mt-0" size={20} />
          <p className="font-semibold leading-tight text-amber-950">
            <span className="uppercase font-bold tracking-wider underline mr-1.5 text-amber-900">Mandatory Texas Legal Notice:</span>
            I AM NOT AN ATTORNEY LICENSED TO PRACTICE LAW IN TEXAS AND MAY NOT GIVE LEGAL ADVICE OR ACCEPT FEES FOR LEGAL ADVICE.
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-amber-800 font-medium text-xs bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
          <ShieldCheck size={14} className="text-amber-700" /> Commissioned Texas Notary Public
        </div>

      </div>
    </div>
  );
};
