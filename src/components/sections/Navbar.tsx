"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { Button, useDemoDialog } from "@/components/ui";

const logoImg =
  "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012242/logo_tcxn01.png";

const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Service",  href: "#service" },
  { label: "Exercise", href: "#exercise" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();
  const { open: openDemo } = useDemoDialog();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = () => setMobileOpen(false);
    window.addEventListener("scroll", handler, { passive: true, once: true });
    return () => window.removeEventListener("scroll", handler);
  }, [mobileOpen]);

  return (
    <motion.header
      initial={reduced ? false : { y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "bg-onyx/80 backdrop-blur-md border-b border-iron/40"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-screen-xl mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="#home" className="shrink-0">
          <Image
            src={logoImg}
            alt="FiTusion"
            width={160}
            height={30}
            className="h-[30px] w-auto"
            priority
          />
        </a>

        {/* Center nav links (desktop) */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={cn(
                  "relative font-sans text-sm font-medium pb-1 transition-colors",
                  "after:absolute after:bottom-0 after:left-0",
                  "after:h-[2px] after:rounded-full after:bg-volt",
                  "after:transition-[width] after:duration-300",
                  "text-ash hover:text-bone after:w-0 hover:after:w-full"
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTAs (desktop) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={openDemo}
            className="font-sans font-semibold text-sm px-5 py-2.5 rounded-full text-bone/80 hover:text-pure transition-colors duration-200 cursor-pointer"
          >
            Log In
          </button>
          <button
            onClick={openDemo}
            className="font-sans font-semibold text-sm px-6 py-2.5 rounded-full border border-bone/30 text-bone bg-transparent hover:bg-bone/5 transition-all duration-200 cursor-pointer"
          >
            Contact Us
          </button>
          <Button variant="primary" onClick={openDemo}>Get Started</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-iron/40 text-ash hover:text-pure transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatedMobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} openDemo={openDemo} />
    </motion.header>
  );
}

function AnimatedMobileMenu({
  open,
  onClose,
  openDemo,
}: {
  open: boolean;
  onClose: () => void;
  openDemo: () => void;
}) {
  if (!open) return null;

  function handleNavClick() {
    onClose();
  }

  function handleDemoClick() {
    onClose();
    openDemo();
  }

  return (
    <div
      className="md:hidden border-t border-iron/20 bg-onyx/95 backdrop-blur-md px-6 pb-6 pt-4 flex flex-col gap-4"
    >
      <ul className="flex flex-col gap-1">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              onClick={handleNavClick}
              className="block py-2.5 font-sans text-sm font-medium text-ash hover:text-pure transition-colors"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2 pt-2 border-t border-iron/20">
        <button
          onClick={handleDemoClick}
          className="w-full text-center py-2.5 font-sans text-sm font-medium text-bone/80 hover:text-pure transition-colors"
        >
          Log In
        </button>
        <button
          onClick={handleDemoClick}
          className="w-full rounded-full border border-bone/30 py-2.5 font-sans text-sm font-semibold text-bone hover:bg-bone/5 transition-all"
        >
          Contact Us
        </button>
        <Button variant="primary" onClick={handleDemoClick} className="w-full justify-center">
          Get Started
        </Button>
      </div>
    </div>
  );
}
