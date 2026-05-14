"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Shield, AlertTriangle } from 'lucide-react';
;
import { useAgeVerification } from "@/hooks/useAgeVerification";
import { Button } from "@/components/ui/Button";

// ─── AgeGate ────────────────────────────────────────────────────────────────
export function AgeGate({ children }: { children: React.ReactNode }) {
  const { isVerified, verify, deny } = useAgeVerification();

  if (isVerified === null) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#e94560] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0d0d1a] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#0d0d1a] to-[#1a0a14]" />
        <div className="relative max-w-md w-full bg-[#1a1a2e] border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#e94560] to-[#c73652] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Velvet<span className="text-[#e94560]">Luxe</span>
            </span>
          </div>
          <div className="w-16 h-16 bg-[#e94560]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <Shield className="w-8 h-8 text-[#e94560]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Adults Only</h1>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            This website contains adult content intended for individuals 18 years of age or older.
            By entering, you confirm that you are at least 18 years old and agree to our{" "}
            <span className="text-[#e94560]">Terms of Service</span> and{" "}
            <span className="text-[#e94560]">Privacy Policy</span>.
          </p>
          <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-6 text-left">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-300 text-xs">
              If you are under 18 years of age or it is illegal to view adult content in your community, please exit now.
            </p>
          </div>
          <div className="space-y-3">
            <Button variant="primary" size="lg" fullWidth onClick={verify}>
              I am 18 or older — Enter
            </Button>
            <Button variant="ghost" size="md" fullWidth onClick={deny}>
              I am under 18 — Exit
            </Button>
          </div>
          <p className="text-gray-600 text-xs mt-5">
            © 2024 VelvetLuxe. All rights reserved. Discreet billing available.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// ─── Accordion ──────────────────────────────────────────────────────────────
interface AccordionItem { question: string; answer: string; }
interface AccordionProps { items: AccordionItem[]; className?: string; }

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="font-semibold text-white pr-4">{item.question}</span>
            <ChevronDown className={cn("w-5 h-5 text-[#e94560] flex-shrink-0 transition-transform duration-200", openIndex === i && "rotate-180")} />
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-white/10 pt-4">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Badge ───────────────────────────────────────────────────────────────────

interface BadgeProps {
  variant?: "new" | "sale" | "bestseller" | "featured" | "instock" | "lowstock" | "outofstock";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "new", children, className }: BadgeProps) {
  const variants = {
    new: "bg-[#e94560] text-white",
    sale: "bg-[#f5a623] text-[#1a1a2e]",
    bestseller: "bg-purple-600 text-white",
    featured: "bg-blue-600 text-white",
    instock: "bg-emerald-600 text-white",
    lowstock: "bg-amber-500 text-white",
    outofstock: "bg-gray-600 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
