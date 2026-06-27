"use client";

import Image from "next/image";
import { Stagger, StaggerItem, useDemoDialog } from "@/components/ui";
import { fadeUpSm } from "@/lib/motion";

const logoImg =
  "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012242/logo_tcxn01.png";

const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Service",  href: "#service" },
  { label: "Exercise", href: "#exercise" },
] as const;

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M14 8.5h2.5l-.5 3H14v9h-3.5v-9H9v-3h1.5V7.2C10.5 5.4 11.6 4 14.2 4H16.5v3H15c-.8 0-1 .4-1 1v.5z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M6.5 9.5H9.5V20H6.5V9.5ZM8 4.5C9.1 4.5 10 5.4 10 6.5C10 7.6 9.1 8.5 8 8.5C6.9 8.5 6 7.6 6 6.5C6 5.4 6.9 4.5 8 4.5ZM12 9.5H15V11.1C15.5 9.9 16.7 9.2 18.3 9.2C21.4 9.2 22 11.1 22 14.1V20H19V14.6C19 12.9 18.6 11.8 17.1 11.8C15.9 11.8 15.2 12.5 14.9 13.2C14.8 13.5 14.8 14 14.8 14.5V20H12V9.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M5.5 5.5L10.8 13.1L5.4 18.5H6.8L11.5 14L15.3 18.5H18.8L13.2 10.7L18.1 5.5H16.7L12.5 9.8L9 5.5H5.5ZM7.6 6.6H8.5L16.7 17.4H15.8L7.6 6.6Z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Facebook",  icon: FacebookIcon,  boxed: true },
  { label: "LinkedIn",  icon: LinkedInIcon,  boxed: true },
  { label: "Instagram", icon: InstagramIcon, boxed: true },
  { label: "X",         icon: XIcon,         boxed: false },
] as const;

export function Footer() {
  const { open: openDemo } = useDemoDialog();

  return (
    <footer className="bg-black px-5 pb-14 pt-10 sm:px-6 sm:pb-16 md:px-6 md:pb-14 md:pt-6">
      <Stagger className="section-container grid gap-9 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-6 lg:gap-10" stagger={0.12}>
        {/* Brand */}
        <StaggerItem variants={fadeUpSm} className="text-center md:max-w-[300px] md:text-left">
          <a href="#home" className="inline-block">
            <Image
              src={logoImg}
              alt="FiTusion"
              width={160}
              height={34}
              className="h-[34px] w-auto"
            />
          </a>
          <p className="mx-auto mt-4 max-w-[300px] text-[13px] leading-[1.65] text-bone/75 md:mx-0 md:max-w-[280px]">
            Your Go-To For Personalized Workouts, Meal Plans, And Expert Fitness Advice
          </p>
        </StaggerItem>

        {/* Social + nav */}
        <StaggerItem variants={fadeUpSm} className="flex flex-col items-center text-center">
          <p className="text-[13px] font-semibold text-ctaGreen">Follow Us On</p>

          <div className="mt-4 flex items-center justify-center gap-3">
            {SOCIAL_LINKS.map(({ label, icon: Icon, boxed }) => (
              <button
                key={label}
                aria-label={label}
                onClick={openDemo}
                className={
                  boxed
                    ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 text-pure transition-colors hover:border-ctaGreen/60 hover:text-ctaGreen md:h-9 md:w-9"
                    : "flex h-10 w-10 shrink-0 items-center justify-center text-pure transition-colors hover:text-ctaGreen md:h-9 md:w-9"
                }
              >
                <Icon />
              </button>
            ))}
          </div>

          <nav aria-label="Footer navigation" className="mt-8 w-full md:mt-7">
            {/* Mobile — balanced 3 + 2 rows */}
            <div className="flex flex-col items-center gap-3 md:hidden">
              <ul className="flex items-center justify-center gap-x-6">
                {NAV_LINKS.slice(0, 3).map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="inline-block py-0.5 text-[13px] text-bone/75 transition-colors hover:text-pure"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="flex items-center justify-center gap-x-6">
                {NAV_LINKS.slice(3).map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="inline-block py-0.5 text-[13px] text-bone/75 transition-colors hover:text-pure"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop — single row */}
            <ul className="hidden items-center justify-center gap-x-6 md:flex">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-block py-0.5 text-[13px] text-bone/75 transition-colors hover:text-pure"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </StaggerItem>

        {/* Contact */}
        <StaggerItem variants={fadeUpSm} className="border-t border-white/[0.08] pt-8 text-center md:border-0 md:pt-0 md:text-right">
          <p className="text-[13px] font-semibold text-ctaGreen">Contact</p>
          <div className="mt-4 space-y-0.5 font-mono text-[13px] leading-relaxed text-bone/75">
            <p>Monday-Sunday</p>
            <p>8:00 AM - 5:00 PM</p>
            <p className="pt-2">E-mail</p>
            <button
              onClick={openDemo}
              className="text-bone/75 hover:text-pure transition-colors underline underline-offset-2 decoration-bone/30"
            >
              Fitfusion@gmail.com
            </button>
          </div>
        </StaggerItem>
      </Stagger>
    </footer>
  );
}
