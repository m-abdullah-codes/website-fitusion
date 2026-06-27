"use client";

import { useState, useEffect } from "react";
import { SectionHeading, Stagger, StaggerItem, Button, Reveal } from "@/components/ui";
import { fadeUpSm, popIn } from "@/lib/motion";
import { Smartphone, Share2, Home, Bell } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const STEPS: {
  Icon: LucideIcon;
  platform: "ios" | "android";
  step: string;
  detail: string;
}[] = [
  {
    Icon: Smartphone,
    platform: "ios",
    step: "Open in Safari",
    detail: "Visit FiTusion in Safari on your iPhone or iPad.",
  },
  {
    Icon: Share2,
    platform: "ios",
    step: 'Tap "Share"',
    detail: 'Hit the Share icon at the bottom of your screen.',
  },
  {
    Icon: Home,
    platform: "ios",
    step: "Add to Home Screen",
    detail: 'Scroll down and tap "Add to Home Screen", then tap Add.',
  },
];

const ANDROID_STEPS: typeof STEPS = [
  {
    Icon: Smartphone,
    platform: "android",
    step: "Open in Chrome",
    detail: "Visit FiTusion in Chrome on your Android device.",
  },
  {
    Icon: Share2,
    platform: "android",
    step: "Tap Menu",
    detail: "Tap the three-dot menu in the top-right corner of Chrome.",
  },
  {
    Icon: Home,
    platform: "android",
    step: "Install App",
    detail: 'Tap "Add to Home Screen" or "Install App" and confirm.',
  },
];

export function InstallApp() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [platform, setPlatform] = useState<"ios" | "android">("ios");
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setPlatform(isIOS ? "ios" : "android");

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setDeferredPrompt(null);
  }

  const steps = platform === "ios" ? STEPS : ANDROID_STEPS;

  return (
    <section className="bg-black px-6 py-20 sm:py-28" style={{
      background:
        "linear-gradient(180deg, rgb(var(--c-black)) 0%, rgb(var(--c-void)) 35%, rgb(var(--c-black)) 100%)",
    }}>
      <SectionHeading
        top="Take It"
        accent="Everywhere"
        subtitle="FiTusion lives on your home screen — no app store, no download, just tap and train."
        className="section-container"
      />

      <div className="section-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Phone mockup */}
        <Reveal variants={popIn} className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Outer glow */}
            <div
              className="absolute inset-0 -z-10 scale-110 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgb(var(--c-volt)/0.12) 0%, transparent 70%)",
              }}
              aria-hidden
            />

            {/* Phone frame */}
            <div
              className="relative flex h-[440px] w-[220px] flex-col overflow-hidden rounded-[36px] border border-iron/40 sm:h-[500px] sm:w-[250px]"
              style={{
                background:
                  "linear-gradient(160deg, rgb(var(--c-onyx)), rgb(var(--c-ink)))",
                boxShadow:
                  "0 32px 80px -20px rgb(var(--c-black)/0.9), 0 0 0 1px rgb(var(--c-pure)/0.06), inset 0 1px 0 rgb(var(--c-pure)/0.08)",
              }}
            >
              {/* Notch */}
              <div className="mx-auto mt-3 h-5 w-20 rounded-full bg-ink/80" aria-hidden />

              {/* Home screen preview */}
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
                {/* App icon */}
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-[22px] shadow-[0_8px_24px_rgb(var(--c-black)/0.5)]"
                  style={{ background: "var(--grad-btn-primary)" }}
                >
                  <Smartphone className="h-10 w-10 text-void" strokeWidth={1.5} />
                </div>
                <p className="font-sans text-sm font-bold text-pure">FiTusion</p>

                {/* Reminder chip */}
                <div
                  className="flex items-center gap-2 rounded-xl border border-volt/25 px-4 py-2.5 text-left"
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(var(--c-coal)), rgb(var(--c-onyx)))",
                  }}
                >
                  <Bell className="h-4 w-4 shrink-0 text-volt" />
                  <div>
                    <p className="font-sans text-xs font-bold text-pure">Time to train!</p>
                    <p className="font-mono text-[9px] text-ash/60">Today: Back & Biceps</p>
                  </div>
                </div>
              </div>

              {/* Home indicator */}
              <div className="mb-3 flex justify-center">
                <div className="h-1 w-20 rounded-full bg-pure/20" aria-hidden />
              </div>
            </div>

            {/* "Add to Home Screen" OS sheet */}
            <div
              className="absolute -bottom-6 left-1/2 w-[200px] -translate-x-1/2 rounded-2xl border border-iron/30 p-3 sm:w-[230px]"
              style={{
                background:
                  "linear-gradient(160deg, rgb(var(--c-graphite)/0.95), rgb(var(--c-onyx)/0.95))",
                backdropFilter: "blur(16px)",
                boxShadow: "0 16px 40px -8px rgb(var(--c-black)/0.7)",
              }}
            >
              <p className="text-center font-sans text-xs font-bold text-pure">
                Add to Home Screen
              </p>
              <p className="mt-0.5 text-center font-mono text-[9px] text-ash/50">
                fitusion.app
              </p>
              <div className="mt-2 flex justify-center gap-2">
                <button className="rounded-lg bg-iron/40 px-4 py-1 font-sans text-xs text-ash">
                  Cancel
                </button>
                <button
                  className="btn-primary-gradient rounded-lg px-4 py-1 font-sans text-xs font-bold text-void"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Steps + CTA */}
        <div>
          {/* Platform toggle */}
          <Reveal>
            <div className="mb-8 flex gap-1 rounded-full border border-iron/30 bg-coal/50 p-1 w-fit">
              {(["ios", "android"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={cn(
                    "rounded-full px-5 py-1.5 font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-200",
                    platform === p
                      ? "bg-volt text-void font-bold shadow-glow-dot"
                      : "text-ash/60 hover:text-ash"
                  )}
                >
                  {p === "ios" ? "iOS" : "Android"}
                </button>
              ))}
            </div>
          </Reveal>

          <Stagger stagger={0.1} delayChildren={0.1} className="flex flex-col gap-5">
            {steps.map(({ Icon, step, detail }, i) => (
              <StaggerItem key={step} variants={fadeUpSm}>
                <div className="flex items-start gap-4">
                  {/* Step number */}
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-volt/25 bg-coal font-mono text-sm font-bold text-volt"
                    style={{ boxShadow: "0 0 16px rgb(var(--c-volt)/0.08)" }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <h4 className="font-sans text-base font-bold text-pure">{step}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ash">{detail}</p>
                  </div>
                  <Icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-volt/40"
                    strokeWidth={1.5}
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Reminder note + CTA */}
          <Reveal delay={0.45}>
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-volt/15 bg-volt/5 px-5 py-4">
              <Bell className="mt-0.5 h-5 w-5 shrink-0 text-volt" />
              <p className="text-sm leading-relaxed text-bone/80">
                Enable notifications after install to get your daily workout reminder
                — right on your lock screen.
              </p>
            </div>

            <div className="mt-6">
              {installed ? (
                <p className="font-sans text-sm font-bold text-volt">
                  ✓ FiTusion is already on your home screen!
                </p>
              ) : deferredPrompt ? (
                <Button variant="primary" onClick={handleInstall} arrow>
                  Install FiTusion
                </Button>
              ) : (
                <Button variant="secondary" arrow>
                  Follow the steps above
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
