import Image from "next/image";
import { SectionHeading, Stagger, StaggerItem } from "@/components/ui";
import { popIn } from "@/lib/motion";
import { COURSES } from "@/lib/courses";

/**
 * The cut-corner silhouette is built from layers rather than a single clip-path
 * (which can't mix rounded + beveled corners):
 *   • container border-radius  → rounded top-left + bottom-right
 *   • olive notch facet (SVG)  → beveled top-right: a deep-olive gradient with a
 *                                lit edge hairline + outer shadow so it reads as
 *                                a precision-folded corner rather than a sticker
 *   • black slice triangle     → beveled bottom-left, revealing the section bg
 * The black slice assumes the section background is solid black (`bg-black`).
 */
function CourseCard({ title, image }: { title: string; image: string }) {
  return (
    <div className="group">
      <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
        <div className="relative aspect-[561/701] rounded-[22px] overflow-hidden ring-1 ring-white/5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover grayscale transition-all duration-[700ms] ease-out group-hover:grayscale-0 group-hover:scale-[1.05]"
          />

          {/* Subtle top vignette only — keeps the bottom-left cut readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-transparent" />

          {/* Soft olive bloom behind the notch on hover */}
          <div className="absolute -top-3 -right-3 w-24 h-24 rounded-full bg-sage/0 blur-2xl transition-colors duration-500 group-hover:bg-sage/30" />

          {/* Bottom-left diagonal slice — reveals the black section background.
              The light hairline along its hypotenuse keeps the cut legible even
              over dark photo regions. */}
          <span
            aria-hidden
            className="absolute bottom-0 left-0 w-[15%] aspect-square bg-black"
            style={{
              clipPath: "polygon(0 0, 0 100%, 100% 100%)",
              filter: "drop-shadow(1.5px -1.5px 0.5px rgba(255,255,255,0.18))",
            }}
          />

          {/* Top-right beveled facet — deep-olive gradient (45°) with a lit edge
              hairline along the cut and a soft outer shadow for real depth. */}
          <span
            aria-hidden
            className="absolute top-0 right-0 w-[18%] aspect-square origin-top-right transition-transform duration-500 group-hover:scale-110"
            style={{ filter: "drop-shadow(-2px 2px 2px rgba(0,0,0,0.55))" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M0 0 H100 V100 Z" fill="url(#course-notch)" />
              {/* lit fold edge */}
              <line
                x1="0"
                y1="0"
                x2="100"
                y2="100"
                stroke="rgb(var(--c-fold))"
                strokeOpacity="0.7"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              {/* specular glint at the outer corner */}
              <path d="M100 0 L100 26 L74 0 Z" fill="url(#course-glint)" />
            </svg>
          </span>
        </div>
      </div>

      <h3 className="mt-4 sm:mt-5 text-center font-sans font-bold tracking-tight text-volt text-base sm:text-xl transition-colors duration-300 group-hover:text-citron">
        {title}
      </h3>
    </div>
  );
}

export function Courses() {
  return (
    <section className="section">
      {/* Shared gradient defs for every card's corner facet */}
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          {/* 45° deep-olive: dark fold (bottom-left) → bright facet (top-right corner) */}
          <linearGradient id="course-notch" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="rgb(var(--c-bevel-dark))" />
            <stop offset="0.55" stopColor="rgb(var(--c-bevel-mid))" />
            <stop offset="1" stopColor="rgb(var(--c-bevel-edge))" />
          </linearGradient>
          <linearGradient id="course-glint" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="rgb(var(--c-glint-soft))" stopOpacity="0" />
            <stop offset="1" stopColor="rgb(var(--c-glint))" stopOpacity="0.85" />
          </linearGradient>
        </defs>
      </svg>

      <SectionHeading
        top="Train Smarter"
        accent="Unleash Your Potential"
        subtitle="Unlock Your Full Potential With Our Expertly Designed Courses, Tailored To Help You Maximize Results In Less Time."
        className="section-container"
      />

      <Stagger
        className="section-container grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-9 sm:gap-x-8 sm:gap-y-12"
        stagger={0.09}
      >
        {COURSES.map((course) => (
          <StaggerItem key={course.title} variants={popIn}>
            <CourseCard {...course} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
