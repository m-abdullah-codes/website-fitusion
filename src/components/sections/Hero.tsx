"use client";

import Image from "next/image";
import { type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { StatChip, Button, Marquee, Parallax, useDemoDialog } from "@/components/ui";

const heroImg = "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012246/hero_uqu6tt.png";
const timeIcon = "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012244/time_icon_foqrpd.png";
const calorieIcon = "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012244/calorie_icon_rhful9.png";
const dumbbellIcon = "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012245/dumbbell_icon_ctawgv.png";
const runningIcon = "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012244/running_icon_evvvx8.png";

const BRANDS: { name: string; logo: string }[] = [
  { name: "Under Armour", logo: "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012672/Under-Armour_aszk31.svg" },
  { name: "Reebok",        logo: "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012671/reebok_kokhyk.png" },
  { name: "Adidas",        logo: "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012670/adidas_yoqfvo.png" },
  { name: "Puma",          logo: "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012671/puma_aarrop.png" },
  { name: "The North Face",logo: "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012672/the-north-face_qyqecx.png" },
  { name: "Nike",          logo: "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012671/nike_ndstx5.png" },
  { name: "Gymshark",      logo: "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012670/gymshark_daijqx.png" },
  { name: "Lululemon",     logo: "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012671/lululemon_wjae0e.svg" },
];

function BrandLogo({ name, logo }: { name: string; logo: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo}
      alt={name}
      className="h-10 w-auto max-w-[160px] object-contain brightness-0 invert"
    />
  );
}

const AVATARS = [
  "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012247/avatar-1_nx6h0k.png",
  "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012243/avatar-2_vclhgg.png",
  "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012243/avatar-3_mkdjic.png",
];

function SocialProof() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex -space-x-5">
        {AVATARS.map((src, i) => (
          <div
            key={i}
            className="relative w-14 h-14 rounded-full border-[2.5px] border-black overflow-hidden"
            style={{ zIndex: i === 1 ? 10 : 0 }}
          >
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-sans font-bold text-pure text-xl">12k+</span>
        <span className="font-sans text-ash text-sm">Happy Spirits</span>
      </div>
    </div>
  );
}

/**
 * Positioned, animated stat chip.
 * Layers concerns across nested elements so transforms never collide:
 *   position (left/top) → tilt (static rotate/scale) → entrance → idle float → card hover.
 */
function AnimatedChip({
  className,
  style,
  tilt,
  delay = 0,
  floatDuration = 5,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  tilt: string;
  delay?: number;
  floatDuration?: number;
  children: ReactNode;
}) {
  return (
    <div className={cn("absolute z-10", className)} style={style}>
      <div style={{ transform: tilt }}>
        <div className="chip-enter" style={{ animationDelay: `${delay}ms` }}>
          <div
            className="chip-float"
            style={{
              animationDuration: `${floatDuration}s`,
              animationDelay: `${delay + 900}ms`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { open: openDemo } = useDemoDialog();
  return (
    <>
      {/* ── Hero section ─────────────────────────────────────── */}
      <section className="relative bg-black overflow-hidden">

        {/* Radial lime glow behind athlete — slowly breathes */}
        <div
          className="absolute volt-glow hero-glow pointer-events-none"
          style={{
            width: "min(800px, 85vw)",
            height: "min(800px, 85vw)",
            top: "52%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* PREV — far left vertical label (desktop only) */}
        <div
          className="hidden md:block absolute left-5 top-1/2 z-40 font-mono text-[10px] text-smoke/60 tracking-[0.35em] uppercase select-none"
          style={{ writingMode: "vertical-lr", transform: "translateY(-50%)" }}
        >
          PREV
        </div>

        {/* NEXT — far right vertical label (desktop only) */}
        <div
          className="hidden md:block absolute right-5 top-1/2 z-40 font-mono text-[10px] text-smoke/60 tracking-[0.35em] uppercase select-none"
          style={{ writingMode: "vertical-lr", transform: "translateY(-50%)" }}
        >
          NEXT
        </div>

        {/* ════════════════ DESKTOP LAYOUT (md+) ════════════════ */}
        <div className="hidden md:block relative min-h-screen">
          {/* Headline — full viewport width, sits BEHIND the athlete image */}
          <div className="absolute inset-x-0 z-10 text-center" style={{ top: "16%" }}>
            <h1
              className="font-heading font-bold text-cream whitespace-nowrap"
              style={{ fontSize: "clamp(2.5rem, 7vw, 10rem)", lineHeight: 0.92, letterSpacing: "0" }}
            >
              <span className="hero-rise block" style={{ animationDelay: "0.1s" }}>
                Sculpt <span className="text-olive">Your</span> Body,
              </span>
              <span className="hero-rise block" style={{ animationDelay: "0.28s" }}>
                Elevate <span className="text-olive">Your</span> Spírít
              </span>
            </h1>
          </div>

          {/* Athlete image + orbiting stat chips */}
          <div
            className="absolute inset-x-0 flex justify-center pointer-events-none"
            style={{ top: "5%", bottom: 0, zIndex: 20 }}
          >
            <div className="relative" style={{ width: "min(450px, 60vw)", height: "100%" }}>
              {/* Image sits ABOVE the chips on the z-axis so chips tuck behind the body.
                  Wrapped in Parallax so it drifts with scroll + pointer for depth. */}
              <Parallax className="absolute inset-0 z-20" scroll={70} mouse={16}>
                <Image
                  src={heroImg}
                  alt="Athlete with dumbbell"
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </Parallax>

              {/* Hours — left shoulder, overlapping the image */}
              <AnimatedChip
                className="pointer-events-auto"
                style={{ left: "clamp(-58px, -4vw, -36px)", top: "35%" }}
                tilt="rotate(-30deg)"
                delay={150}
                floatDuration={5.5}
              >
                <StatChip imgSrc={timeIcon} label="Hours" value="1.5" countTo={1.5} countDecimals={1} className="chip-card" />
              </AnimatedChip>

              {/* Poses — right shoulder, overlapping the image */}
              <AnimatedChip
                className="pointer-events-auto"
                style={{ right: "clamp(-58px, -4vw, -36px)", top: "35%" }}
                tilt="rotate(30deg)"
                delay={300}
                floatDuration={4.8}
              >
                <StatChip imgSrc={runningIcon} label="Poses" value="20" countTo={20} className="chip-card" />
              </AnimatedChip>

              {/* Kcal — lower left forearm, overlapping the image */}
              <AnimatedChip
                className="pointer-events-auto"
                style={{ left: "clamp(-64px, -4.5vw, -42px)", top: "66%" }}
                tilt="rotate(-30deg)"
                delay={450}
                floatDuration={5.2}
              >
                <StatChip imgSrc={calorieIcon} label="Kcal" value="550" countTo={550} className="chip-card" />
              </AnimatedChip>

              {/* Sets — lower right forearm, overlapping the image */}
              <AnimatedChip
                className="pointer-events-auto"
                style={{ right: "clamp(-64px, -4.5vw, -42px)", top: "66%" }}
                tilt="rotate(30deg)"
                delay={600}
                floatDuration={5.8}
              >
                <StatChip imgSrc={dumbbellIcon} label="Sets" value="5" countTo={5} className="chip-card" />
              </AnimatedChip>
            </div>
          </div>

          {/* Bottom row: social proof left, CTA right */}
          <div className="absolute bottom-0 inset-x-0 z-40 flex items-end justify-between px-10 md:px-16 pb-10">
            <SocialProof />
            <Button variant="primary" arrow onClick={openDemo}>
              Let&apos;s Start
            </Button>
          </div>
        </div>

        {/* ════════════════ MOBILE LAYOUT (< md) ════════════════ */}
        <div className="md:hidden relative flex flex-col px-5 pt-28 pb-12">
          {/* Headline */}
          <h1
            className="relative z-10 text-center font-heading font-bold text-cream"
            style={{ fontSize: "clamp(2.1rem, 11vw, 3.4rem)", lineHeight: 0.95 }}
          >
            <span className="hero-rise block" style={{ animationDelay: "0.1s" }}>
              Sculpt <span className="text-olive">Your</span> Body,
            </span>
            <span className="hero-rise block" style={{ animationDelay: "0.28s" }}>
              Elevate <span className="text-olive">Your</span> Spirit
            </span>
          </h1>

          {/* Big athlete image with chips overlaid */}
          <div className="relative mx-auto mt-6 w-full max-w-[460px] aspect-[4/5]">
            <Parallax className="absolute inset-0 z-20" scroll={48} scrollRange={600}>
              <Image
                src={heroImg}
                alt="Athlete with dumbbell"
                fill
                className="object-contain object-bottom"
                priority
              />
            </Parallax>

            {/* Hours — top left */}
            <AnimatedChip
              style={{ left: "-2%", top: "16%" }}
              tilt="rotate(-18deg) scale(0.85)"
              delay={150}
              floatDuration={5.5}
            >
              <StatChip imgSrc={timeIcon} label="Hours" value="1.5" countTo={1.5} countDecimals={1} className="chip-card" />
            </AnimatedChip>

            {/* Poses — top right */}
            <AnimatedChip
              style={{ right: "-2%", top: "16%" }}
              tilt="rotate(18deg) scale(0.85)"
              delay={300}
              floatDuration={4.8}
            >
              <StatChip imgSrc={runningIcon} label="Poses" value="20" countTo={20} className="chip-card" />
            </AnimatedChip>

            {/* Kcal — lower left (in front of image on mobile) */}
            <AnimatedChip
              className="z-30"
              style={{ left: "-4%", top: "58%" }}
              tilt="rotate(-18deg) scale(0.85)"
              delay={450}
              floatDuration={5.2}
            >
              <StatChip imgSrc={calorieIcon} label="Kcal" value="550" countTo={550} className="chip-card" />
            </AnimatedChip>

            {/* Sets — lower right (in front of image on mobile) */}
            <AnimatedChip
              className="z-30"
              style={{ right: "-4%", top: "58%" }}
              tilt="rotate(18deg) scale(0.85)"
              delay={600}
              floatDuration={5.8}
            >
              <StatChip imgSrc={dumbbellIcon} label="Sets" value="5" countTo={5} className="chip-card" />
            </AnimatedChip>
          </div>

          {/* Below the image: social proof + CTA */}
          <div className="relative z-30 mt-8 flex flex-col items-center gap-6">
            <SocialProof />
            <Button variant="primary" arrow className="w-full justify-center" onClick={openDemo}>
              Let&apos;s Start
            </Button>
          </div>
        </div>
      </section>

      {/* ── Logo strip ────────────────────────────────────────── */}
      <div className="bg-black py-7">
        <Marquee
          speed={25}
          edgeFadeClass="from-black"
          items={BRANDS.map((brand) => (
            <BrandLogo key={brand.name} name={brand.name} logo={brand.logo} />
          ))}
        />
      </div>
    </>
  );
}
