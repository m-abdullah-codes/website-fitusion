"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import { EASE } from "@/lib/motion";

interface DemoDialogContextValue {
  open: () => void;
}

const DemoDialogContext = createContext<DemoDialogContextValue>({ open: () => {} });

export function useDemoDialog() {
  return useContext(DemoDialogContext);
}

export function DemoDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <DemoDialogContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm"
              onClick={close}
              aria-hidden
            />

            {/* Dialog panel */}
            <motion.div
              key="dialog"
              role="dialog"
              aria-modal
              aria-labelledby="demo-dialog-title"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="fixed inset-x-4 top-1/2 z-[101] mx-auto max-w-[460px] -translate-y-1/2 sm:inset-x-auto sm:w-full"
            >
              <div
                className="relative overflow-hidden rounded-[28px] border border-iron/50 p-8 sm:p-10"
                style={{
                  background:
                    "linear-gradient(160deg, rgb(var(--c-onyx)) 0%, rgb(var(--c-pitch)) 100%)",
                  boxShadow:
                    "0 32px 80px -12px rgb(0 0 0 / 0.95), 0 0 0 1px rgb(var(--c-pure) / 0.05), inset 0 1px 0 rgb(var(--c-pure) / 0.06)",
                }}
              >
                {/* Volt accent glow at the top */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1px]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 10%, rgb(var(--c-volt)/0.7) 50%, transparent 90%)",
                  }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-20 w-40 -translate-y-1/2 blur-3xl"
                  style={{ background: "rgb(var(--c-volt)/0.08)" }}
                  aria-hidden
                />

                {/* Close button */}
                <button
                  onClick={close}
                  className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-iron/40 bg-graphite/50 text-ash transition-colors hover:border-iron hover:text-pure"
                  aria-label="Close dialog"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Tag */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-volt/25 bg-volt/8 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.28em] text-volt uppercase">
                  DEMO PLATFORM
                </span>

                {/* Heading */}
                <h2
                  id="demo-dialog-title"
                  className="mt-4 font-display text-[1.75rem] font-bold leading-[1.08] tracking-tight text-pure sm:text-[2rem]"
                >
                  FiTusion is a{" "}
                  <span className="text-volt">demo site</span>{" "}
                  <br className="hidden sm:block" />
                  for gyms
                </h2>

                {/* Body */}
                <p className="mt-4 text-sm leading-relaxed text-bone/65">
                  This platform is a showcase demo built to demonstrate what a modern
                  gym or fitness centre website can look like. Features, memberships,
                  and content shown here are for illustration purposes only.
                </p>

                {/* Developer card */}
                <div className="mt-6 rounded-2xl border border-volt/20 bg-volt/5 px-5 py-4">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-ash/50 uppercase">
                    Developed by
                  </p>
                  <a
                    href="https://contoursystems.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1.5 font-sans text-[1.05rem] font-bold text-volt transition-colors hover:text-acid"
                  >
                    Contour Systems
                    <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                  </a>
                  <p className="mt-0.5 text-xs leading-relaxed text-ash/50">
                    We build premium digital experiences for businesses.
                  </p>
                </div>

                {/* Dismiss CTA */}
                <button
                  onClick={close}
                  className="btn-sheen btn-primary-gradient mt-6 w-full rounded-2xl py-3 font-sans text-sm font-bold text-void transition-all hover:shadow-glow hover:scale-[1.01] active:scale-[0.99]"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DemoDialogContext.Provider>
  );
}
