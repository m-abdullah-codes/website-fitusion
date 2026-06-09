"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { Button } from "@/components/ui";
const logoImg = "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012242/logo_tcxn01.png";

const NAV_LINKS = ["Home", "About", "Features", "Service", "Exercise"] as const;
type NavLink = (typeof NAV_LINKS)[number];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<NavLink>("Home");
  const reduced = useReducedMotion();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
        <a href="#" className="shrink-0">
          <Image
            src={logoImg}
            alt="FiTusion"
            width={160}
            height={30}
            className="h-[30px] w-auto"
            priority
          />
        </a>

        {/* Center nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => setActive(link)}
                className={cn(
                  "relative font-sans text-sm font-medium pb-1 transition-colors",
                  "after:absolute after:bottom-0 after:left-0",
                  "after:h-[2px] after:rounded-full after:bg-volt",
                  "after:transition-[width] after:duration-300",
                  active === link
                    ? "text-pure after:w-full"
                    : "text-ash hover:text-bone after:w-0 hover:after:w-full"
                )}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Button variant="primary">Contact Us</Button>
          <button className="font-sans font-semibold text-sm px-6 py-2.5 rounded-full border border-bone/30 text-bone bg-transparent hover:bg-bone/5 transition-all duration-200 cursor-pointer">
            Get Started
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
