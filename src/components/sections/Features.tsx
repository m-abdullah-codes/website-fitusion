import Image from "next/image";
import { IconBadge, SectionHeading, Reveal, Stagger, StaggerItem } from "@/components/ui";
import { fadeUpSm } from "@/lib/motion";
import { FEATURES } from "@/lib/features";
const inspireImg = "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012247/inspire_as0ftb.png";

export function Features() {
  return (
    <section className="section">
      <SectionHeading
        top="Inspired to"
        accent="Inspire Your Best Self"
        subtitle="We're Your Partner In Achieving A Healthier, Stronger, And More Confident You."
        className="section-container"
      />

      {/* Feature card */}
      <Reveal className="card-surface section-container rounded-xl border border-iron/40 overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* Athlete photo — mobile: top of card, desktop: right panel.
              Two separate containers with tailored masks for each layout. */}

          {/* Mobile image — shown above the grid, landscape crop, fades into card below */}
          <div className="relative w-full order-first md:hidden aspect-[4/3] shrink-0">
            <Image
              src={inspireImg}
              alt="Athletic bodybuilder"
              fill
              className="object-cover object-top contrast-110 brightness-95"
              style={{
                maskImage:
                  "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
              }}
            />
          </div>

          {/* Feature grid */}
          <Stagger
            className="flex-1 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-6 sm:gap-y-8 md:gap-x-8 md:gap-y-10 p-5 sm:p-10 md:p-14 my-auto order-last md:order-first"
            stagger={0.08}
            delayChildren={0.15}
          >
            {FEATURES.map(({ icon, label }) => (
              <StaggerItem key={label} variants={fadeUpSm} className="flex items-center gap-3 sm:gap-4">
                <IconBadge
                  icon={icon}
                  size="lg"
                  filled
                  className="rounded-full bg-coal border border-olive shrink-0"
                />
                <span className="font-sans font-semibold text-pure text-sm sm:text-base md:text-lg leading-snug">
                  {label}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Desktop image — right panel, fades from left and vertical edges */}
          <div className="relative hidden md:block md:w-[420px] shrink-0">
            <Image
              src={inspireImg}
              alt="Athletic bodybuilder"
              fill
              className="object-cover object-top contrast-110 brightness-95"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, #000 50%), " +
                  "linear-gradient(to top, transparent 0%, #000 22%, #000 80%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, #000 50%), " +
                  "linear-gradient(to top, transparent 0%, #000 22%, #000 80%, transparent 100%)",
                WebkitMaskComposite: "source-in",
              }}
            />
          </div>

        </div>
      </Reveal>
    </section>
  );
}
