"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeading, Reveal } from "@/components/ui";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

const CDN = "https://cdn.muscleandstrength.com/sites/default/files";

const DAYS = [
  { day: "Mon", label: "Chest & Triceps", type: "strength" as const },
  { day: "Tue", label: "Legs & Glutes",   type: "strength" as const },
  { day: "Wed", label: "Rest",            type: "rest"     as const },
  { day: "Thu", label: "Back & Biceps",   type: "strength" as const },
  { day: "Fri", label: "Cardio + Core",   type: "cardio"   as const },
  { day: "Sat", label: "Rest",            type: "rest"     as const },
  { day: "Sun", label: "Rest",            type: "rest"     as const },
];

const SESSIONS: Record<
  number,
  {
    target: string;
    featuredImage: string;
    featuredVideoId: string;
    featuredExercise: string;
    exercises: { name: string; sets: string; reps: string; equipment: string }[];
  }
> = {
  0: {
    target: "Chest · Triceps",
    featuredImage: `${CDN}/barbell-bench-press_0.jpg`,
    featuredVideoId: "tuwHzzPdaGc",
    featuredExercise: "Barbell Bench Press",
    exercises: [
      { name: "Barbell Bench Press",    sets: "4", reps: "8–10",   equipment: "Power Rack"       },
      { name: "Incline Dumbbell Press", sets: "3", reps: "10–12",  equipment: "Adjustable Bench"  },
      { name: "Tricep Pushdown",        sets: "3", reps: "12–15",  equipment: "Cable Tower"       },
    ],
  },
  1: {
    target: "Quads · Glutes · Hamstrings",
    featuredImage: `${CDN}/barbell-back-squat.jpg`,
    featuredVideoId: "R2dMsNhN3DE",
    featuredExercise: "Barbell Back Squat",
    exercises: [
      { name: "Barbell Back Squat",      sets: "4", reps: "6–8",     equipment: "Power Rack"    },
      { name: "Leg Press",               sets: "3", reps: "10–12",   equipment: "Leg Press"     },
      { name: "Dumbbell Walking Lunge",  sets: "3", reps: "12 each", equipment: "Dumbbell Rack" },
    ],
  },
  3: {
    target: "Lats · Biceps · Upper Back",
    featuredImage: `${CDN}/bent-over-row.jpg`,
    featuredVideoId: "paCfxhgW6bI",
    featuredExercise: "Bent Over Barbell Row",
    exercises: [
      { name: "Bent Over Barbell Row",  sets: "4", reps: "8–10",  equipment: "Power Rack"    },
      { name: "Lat Pulldown",           sets: "3", reps: "10–12", equipment: "Cable Tower"   },
      { name: "Standing Barbell Curl",  sets: "3", reps: "10–12", equipment: "Dumbbell Rack" },
    ],
  },
  4: {
    target: "Core · Cardio Conditioning",
    featuredImage: `${CDN}/cable_crunch.jpg`,
    featuredVideoId: "2fbujeH3F0E",
    featuredExercise: "Cable Crunch",
    exercises: [
      { name: "Cable Crunch",       sets: "3", reps: "15",     equipment: "Cable Tower"     },
      { name: "Hanging Leg Raise",  sets: "3", reps: "12",     equipment: "Pull-up Station" },
      { name: "Plank",              sets: "3", reps: "45 sec", equipment: "Bodyweight"      },
    ],
  },
};

const TYPE_DOT: Record<"strength" | "cardio" | "rest", string> = {
  strength: "bg-volt",
  cardio:   "bg-acid",
  rest:     "bg-iron",
};

/* ── Click-to-play YouTube player ─────────────────────────────────────── */
function VideoPlayer({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-iron/30">
      {playing ? (
        /* Embed: grayscale until hovered */
        <iframe
          className="absolute inset-0 h-full w-full grayscale transition-all duration-[700ms] hover:grayscale-0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&color=white`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      ) : (
        /* Thumbnail with play overlay */
        <button
          className="group absolute inset-0 w-full h-full"
          onClick={() => setPlaying(true)}
          aria-label={`Watch ${title} exercise guide`}
        >
          {/* YouTube maxres thumbnail — grayscale until hover */}
          <Image
            src={thumbUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 35vw, 100vw"
            className="object-cover grayscale transition-all duration-[700ms] group-hover:grayscale-0 group-hover:scale-[1.03]"
          />

          {/* Dark overlay */}
          <span
            className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/20"
            aria-hidden
          />

          {/* "EXERCISE GUIDE" label */}
          <span className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.22em] text-ash/50 pointer-events-none">
            EXERCISE GUIDE
          </span>

          {/* Play button */}
          <span
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-volt/45 bg-black/55 shadow-glow-dot backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-volt/80 group-hover:bg-black/40">
              <Play
                className="ml-0.5 h-6 w-6 text-volt"
                fill="currentColor"
                strokeWidth={0}
              />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

/* ── Main section ─────────────────────────────────────────────────────── */
export function PlanPreview() {
  const [selected, setSelected] = useState(4); // Friday default
  const session = SESSIONS[selected];
  const activeDay = DAYS[selected];

  return (
    <section className="bg-pitch px-6 py-20 sm:py-28">
      <SectionHeading
        top="Your Week"
        accent="At a Glance"
        subtitle="This is what a personalised FiTusion plan looks like — built for your body, on our machines."
        className="section-container"
      />

      <div className="section-container">
        {/* Week selector */}
        <Reveal>
          <div className="mb-8 grid grid-cols-7 gap-1.5 sm:gap-2.5">
            {DAYS.map(({ day, label, type }, i) => {
              const isActive = i === selected;
              return (
                <button
                  key={day}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "group flex flex-col items-center gap-1.5 rounded-xl border py-3 transition-all duration-200 sm:py-4",
                    isActive
                      ? "border-volt/50 bg-volt/10 shadow-glow-dot"
                      : "border-iron/30 bg-coal/40 hover:border-volt/20 hover:bg-coal/60"
                  )}
                  aria-pressed={isActive}
                  aria-label={`${day} — ${label}`}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-all duration-200",
                      TYPE_DOT[type],
                      !isActive && "opacity-40 group-hover:opacity-60"
                    )}
                    aria-hidden
                  />
                  <span
                    className={cn(
                      "font-mono text-[10px] font-bold tracking-widest transition-colors duration-200 sm:text-xs",
                      isActive ? "text-volt" : "text-ash/60 group-hover:text-ash"
                    )}
                  >
                    {day}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Session detail card */}
        <Reveal key={selected}>
          <div className="card-surface overflow-hidden rounded-[28px] border border-iron/30">
            {/* Card header */}
            <div
              className="flex items-center justify-between border-b border-iron/30 px-6 py-5 sm:px-8"
              style={{
                background:
                  "linear-gradient(180deg, rgb(var(--c-onyx)) 0%, rgb(var(--c-coal)) 100%)",
              }}
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-ash/50">
                  {activeDay.day.toUpperCase()} · TODAY&apos;S SESSION
                </p>
                <h3 className="mt-0.5 font-sans text-lg font-bold text-pure sm:text-xl">
                  {session ? activeDay.label : "Rest & Recovery"}
                </h3>
              </div>
              {session && (
                <span className="rounded-full border border-volt/25 bg-volt/10 px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-volt">
                  {session.target}
                </span>
              )}
            </div>

            {session ? (
              <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:gap-8">
                {/* Left: equipment photo + video player */}
                <div className="flex flex-col gap-4">
                  {/* Equipment photo — grayscale with hover */}
                  <div className="group relative aspect-[16/9] overflow-hidden rounded-xl border border-iron/30">
                    <Image
                      src={session.featuredImage}
                      alt={session.featuredExercise}
                      fill
                      sizes="(min-width: 1024px) 35vw, 100vw"
                      className="object-cover grayscale transition-all duration-[700ms] group-hover:grayscale-0 group-hover:scale-[1.03]"
                    />
                    {/* Bottom vignette for label */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgb(0 0 0 / 0.7) 0%, transparent 55%)",
                      }}
                      aria-hidden
                    />
                    <div className="absolute bottom-3 left-3 pointer-events-none">
                      <p className="font-mono text-[9px] tracking-[0.22em] text-ash/50">
                        EQUIPMENT PHOTO
                      </p>
                      <p className="font-sans text-sm font-bold text-pure leading-tight">
                        {session.featuredExercise}
                      </p>
                    </div>
                  </div>

                  {/* Exercise guide — click-to-play YouTube */}
                  <VideoPlayer
                    videoId={session.featuredVideoId}
                    title={session.featuredExercise}
                  />
                </div>

                {/* Right: exercise list */}
                <div className="flex flex-col justify-center gap-3">
                  <p className="mb-1 font-mono text-[10px] tracking-[0.2em] text-ash/50">
                    {session.exercises.length} EXERCISES
                  </p>
                  {session.exercises.map(({ name, sets, reps, equipment }, i) => (
                    <div
                      key={name}
                      className="flex items-center gap-4 rounded-xl border border-iron/25 bg-onyx/50 p-4 transition-all duration-200 hover:border-volt/20"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-volt/10 font-mono text-[11px] font-bold text-volt">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-sans text-sm font-bold text-pure">{name}</p>
                        <p className="mt-0.5 font-mono text-[10px] tracking-[0.1em] text-ash/60">
                          {equipment}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-mono text-sm font-bold text-volt">
                          {sets}×{reps}
                        </p>
                        <p className="font-mono text-[9px] tracking-[0.15em] text-ash/40">
                          SETS×REPS
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center sm:py-20">
                <div
                  className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border border-iron/30 bg-coal"
                  style={{ boxShadow: "inset 0 1px 0 rgb(var(--c-pure)/0.04)" }}
                >
                  <span className="text-2xl">😴</span>
                </div>
                <h4 className="font-sans text-lg font-bold text-pure">Rest Day</h4>
                <p className="max-w-[320px] text-sm leading-relaxed text-ash">
                  Recovery is where growth happens. Stretch, hydrate, and come back
                  stronger tomorrow.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
