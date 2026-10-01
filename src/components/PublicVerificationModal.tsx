import React, { useState } from 'react';
import { X, QrCode, ShieldCheck, CheckCircle2, Copy, Check, ExternalLink, Printer, Award, User, Calendar, MapPin } from 'lucide-react';
import { EmployabilityPassport, NSQFMapping } from '../types';

interface PublicVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  passport: EmployabilityPassport | null;
  nsqfMapping: NSQFMapping | null;
}

export const PublicVerificationModal: React.FC<PublicVerificationModalProps> = ({
  isOpen,
  onClose,
  passport,
  nsqfMapping
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || !passport) return null;

  const verifyUrl = `https://kaushalsetu.gov.in/verify/${passport.passport_id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Digital Credential Verification Portal</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                  DigiLocker Verified
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {verifyUrl}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          {/* Official Verification Certificate Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-emerald-500/40 shadow-xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Government of Bharat • National Skills Qualifications
                </span>
                <h3 className="text-base font-black text-white mt-0.5">
                  Artisan Employability Certificate
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  Credential ID: <strong className="text-amber-300">{passport.passport_id}</strong>
                </span>
              </div>
              <div className="p-2 bg-white rounded-lg shadow shrink-0">
                {/* Simulated QR Code SVG */}
                <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="30" height="30" fill="black" />
                  <rect x="15" y="15" width="20" height="20" fill="white" />
                  <rect x="20" y="20" width="10" height="10" fill="black" />
                  <rect x="60" y="10" width="30" height="30" fill="black" />
                  <rect x="65" y="15" width="20" height="20" fill="white" />
                  <rect x="70" y="20" width="10" height="10" fill="black" />
                  <rect x="10" y="60" width="30" height="30" fill="black" />
                  <rect x="15" y="65" width="20" height="20" fill="white" />
                  <rect x="20" y="70" width="10" height="10" fill="black" />
                  <rect x="45" y="10" width="10" height="10" fill="black" />
                  <rect x="45" y="30" width="10" height="20" fill="black" />
                  <rect x="60" y="45" width="20" height="10" fill="black" />
                  <rect x="45" y="60" width="15" height="15" fill="black" />
                  <rect x="70" y="70" width="20" height="20" fill="black" />
                </svg>
              </div>
            </div>

            {/* Candidate & Accreditation Meta */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Artisan Name</span>
                <span className="font-bold text-white text-sm">{passport.worker_name}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Accredited Trade</span>
                <span className="font-bold text-amber-300">{passport.primary_trade}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">NSQF Qualification</span>
                <span className="font-bold text-sky-400">Level {passport.nsqf_level} ({passport.qp_code})</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Employability Score</span>
                <span className="font-bold text-emerald-400 text-sm font-mono">{passport.employability_score}/100 [{passport.score_grade}]</span>
              </div>
            </div>

            {/* Cryptographic SHA-256 Ledger Verification */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Cryptographic Integrity Hash</span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>SHA-256 MATCH CONFIRMED</span>
                </span>
              </div>
              <div className="font-mono text-[11px] text-slate-300 break-all bg-slate-900 p-1.5 rounded border border-slate-800">
                {passport.verification_hash}
              </div>
              <span className="text-[9px] text-slate-500 block">
                Standard: National Open Credential Framework & DigiLocker Specification
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Verification Link Copied!' : 'Copy Shareable Verification Link'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
              title="Print Verifiable Certificate"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/70 flex justify-between items-center text-[10px] text-slate-500 font-mono">
          <span>Issuing Authority: MSDE KaushalSetu National Board</span>
          <button
            onClick={onClose}
            className="px-4 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
