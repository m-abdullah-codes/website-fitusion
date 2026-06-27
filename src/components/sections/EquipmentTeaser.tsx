"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading, Stagger, StaggerItem, Button, Reveal } from "@/components/ui";
import { popIn } from "@/lib/motion";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CDN = "https://cdn.muscleandstrength.com/sites/default/files";

const EQUIPMENT: {
  tag: string;
  name: string;
  detail: string;
  muscles: string;
  image: string;
  videoId: string;
  exercise: string;
}[] = [
  {
    tag: "Free Weights",
    name: "Power Rack",
    detail:
      "The cornerstone of strength training — barbell squats, bench press, and overhead press in one station.",
    muscles: "Full Body",
    image: `${CDN}/barbell-back-squat.jpg`,
    videoId: "R2dMsNhN3DE",
    exercise: "Barbell Back Squat",
  },
  {
    tag: "Cable",
    name: "Cable Tower",
    detail:
      "Constant tension through every angle. Adjustable height hits chest, back, shoulders, and arms equally.",
    muscles: "Full Body",
    image: `${CDN}/lat-pull-down.jpg`,
    videoId: "iKrKgWR9wbY",
    exercise: "Lat Pulldown",
  },
  {
    tag: "Free Weights",
    name: "Dumbbell Rack",
    detail:
      "2.5 – 50 kg pairs for isolation, compound, and unilateral work. The most versatile kit on the floor.",
    muscles: "All Muscles",
    image: `${CDN}/dumbbell-lateral-raise.jpg`,
    videoId: "3VcKaXpzqRo",
    exercise: "Dumbbell Lateral Raise",
  },
  {
    tag: "Machine",
    name: "Leg Press",
    detail:
      "Quad-dominant compound loading without spinal compression. Foot placement changes the target.",
    muscles: "Quads · Glutes",
    image: `${CDN}/leg-press.jpg`,
    videoId: "sEM_zo9w2ss",
    exercise: "Leg Press",
  },
  {
    tag: "Bench",
    name: "Adjustable Bench",
    detail:
      "Flat, incline, or decline — every angle unlocks a different muscle head for complete development.",
    muscles: "Chest · Shoulders",
    image: `${CDN}/incline-dumbbell-bench-press_0.jpg`,
    videoId: "8nNi8jbbUPE",
    exercise: "Incline Dumbbell Bench Press",
  },
  {
    tag: "Bodyweight",
    name: "Pull-up Station",
    detail:
      "Wide, close, or neutral grip — maximum lat and bicep depth with zero machines required.",
    muscles: "Back · Biceps",
    image: `${CDN}/wide-grip-pull-up-1.jpg`,
    videoId: "5oxviYmdHCY",
    exercise: "Wide Grip Pull-Up",
  },
];

function EquipmentCard({
  tag,
  name,
  detail,
  muscles,
  image,
  videoId,
  exercise,
}: (typeof EQUIPMENT)[0]) {
  const [playing, setPlaying] = useState(false);

  return (
    <article
      className={cn(
        "card-surface group overflow-hidden rounded-xl border border-iron/30 transition-all duration-300",
        !playing && "hover:border-volt/20 hover:-translate-y-1 hover:shadow-glow-preview"
      )}
    >
      {/* Image / Video area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        {playing ? (
          <>
            {/* YouTube embed — grayscale by default, hover reveals colour */}
            <iframe
              className="absolute inset-0 h-full w-full grayscale transition-all duration-[700ms] hover:grayscale-0"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&color=white`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={exercise}
            />
            {/* Close button */}
            <button
              onClick={() => setPlaying(false)}
              className="absolute right-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-void/80 text-bone backdrop-blur-sm transition-colors hover:bg-void hover:text-volt"
              aria-label="Close video"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <>
            {/* Exercise photo — grayscale until hover */}
            <Image
              src={image}
              alt={exercise}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover grayscale transition-all duration-[700ms] ease-out group-hover:grayscale-0 group-hover:scale-[1.05]"
            />

            {/* Bottom vignette so badges stay readable */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/65 pointer-events-none" />

            {/* Play button — fades in on hover */}
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Watch ${exercise} demo`}
              className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-volt/50 bg-black/55 shadow-glow-dot backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-volt/80">
                <Play className="ml-0.5 h-6 w-6 text-volt" fill="currentColor" strokeWidth={0} />
              </div>
            </button>

            {/* Muscles badge */}
            <span className="absolute bottom-3 right-3 rounded-full border border-iron/50 bg-black/60 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-ash/70 backdrop-blur-sm pointer-events-none">
              {muscles}
            </span>
          </>
        )}
      </div>

      {/* Card copy */}
      <div className="p-5 sm:p-6">
        <p className="mb-1.5 font-mono text-[10px] tracking-[0.2em] text-volt/65 uppercase">
          {tag}
        </p>
        <h3 className="font-sans text-base font-bold text-pure sm:text-lg">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ash">{detail}</p>
      </div>
    </article>
  );
}

export function EquipmentTeaser() {
  return (
    <section className="section">
      <SectionHeading
        top="Built On"
        accent="Real Equipment"
        subtitle="Every plan we build maps to a machine that's already waiting for you on our floor."
        className="section-container"
      />

      <Stagger
        stagger={0.08}
        delayChildren={0.1}
        className="section-container grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {EQUIPMENT.map((eq) => (
          <StaggerItem key={eq.name} variants={popIn}>
            <EquipmentCard {...eq} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="section-container mt-12 flex justify-center" delay={0.3}>
        <Link href="/equipment">
          <Button variant="secondary" arrow>
            View All Equipment
          </Button>
        </Link>
      </Reveal>
    </section>
  );
}
