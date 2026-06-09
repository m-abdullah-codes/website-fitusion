import Image from "next/image";
import { SectionHeading, Stagger, StaggerItem, Reveal } from "@/components/ui";
import { popIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Trainer = { name: string; image: string; alt: string };

const trainers: Trainer[] = [
  { name: "Blake Hunter",  image: "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012245/trainer_1_nn9eye.png", alt: "Blake Hunter"  },
  { name: "Liam Crossfit", image: "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012245/trainer_2_ew6y0d.png", alt: "Liam Crossfit" },
  { name: "Logan Torque",  image: "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012245/trainer_3_fq5i9v.png", alt: "Logan Torque"  },
];

/* diagonal cut at top-right and bottom-left corners */
const CLIP = "polygon(0% 0%, 78% 0%, 100% 22%, 100% 100%, 22% 100%, 0% 78%)";

/* Mobile pyramid: center trainer elevated, flanking pair tucked below */
const MOBILE_SLOTS: { index: number; slot: "center" | "left" | "right" }[] = [
  { index: 1, slot: "center" },
  { index: 0, slot: "left" },
  { index: 2, slot: "right" },
];

const mobileSlotClass: Record<"center" | "left" | "right", string> = {
  center:
    "order-1 col-span-2 row-start-1 z-20 w-[54%] max-w-[200px] justify-self-center -translate-y-1 sm:order-2 sm:col-span-1 sm:row-start-auto sm:z-auto sm:w-full sm:max-w-none sm:translate-y-0",
  left:
    "order-2 col-start-1 row-start-2 z-10 mt-7 w-[94%] justify-self-end sm:order-1 sm:col-start-auto sm:row-start-auto sm:mt-0 sm:w-full sm:justify-self-auto",
  right:
    "order-3 col-start-2 row-start-2 z-10 mt-7 w-[94%] justify-self-start sm:order-3 sm:col-start-auto sm:row-start-auto sm:mt-0 sm:w-full sm:justify-self-auto",
};

function SlashAccent() {
  return (
    <svg
      viewBox="0 0 72 36"
      className="h-9 w-auto text-volt"
      fill="currentColor"
      aria-hidden
    >
      <polygon points="4,33 14,3 19,3 9,33" />
      <polygon points="26,33 36,3 41,3 31,33" />
      <polygon points="48,33 58,3 63,3 53,33" />
    </svg>
  );
}

function TrainerCard({
  trainer,
  featured = false,
}: {
  trainer: Trainer;
  featured?: boolean;
}) {
  return (
    <>
      <div
        className={cn(
          "relative w-full overflow-hidden transition-transform duration-500 ease-out group-hover:-translate-y-2",
          featured &&
            "shadow-[0_24px_48px_-16px_rgb(var(--c-grass)/0.55)] sm:shadow-none",
        )}
        style={{ clipPath: CLIP, aspectRatio: "3 / 4" }}
      >
        <div className="absolute inset-0 bg-ink" />

        <div
          className="absolute inset-0 z-10 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 75% 60% at 50% 45%, rgb(var(--c-grass) / 0.6) 0%, transparent 65%)",
          }}
        />

        <Image
          src={trainer.image}
          alt={trainer.alt}
          fill
          className="relative z-20 object-cover object-top grayscale transition-[filter,transform] duration-500 ease-out group-hover:grayscale-[0.35] group-hover:scale-[1.03]"
          sizes={
            featured
              ? "(min-width: 640px) 33vw, 46vw"
              : "(min-width: 640px) 33vw, 40vw"
          }
        />
      </div>

      <p
        className={cn(
          "font-display font-bold italic text-volt normal-case tracking-tight text-center transition-colors duration-300 group-hover:text-citron",
          featured
            ? "text-[1.05rem] sm:text-[1.25rem]"
            : "text-[0.9rem] sm:text-[1.25rem]",
        )}
      >
        {trainer.name}
      </p>
    </>
  );
}

export function Trainers() {
  return (
    <section className="section">
      <SectionHeading
        top="Your Fitness"
        accent="Goals, Their Expertise"
        subtitle="Our Team Of Certified Trainers Brings Unparalleled Expertise To Help You Achieve Your Fitness Goals."
        className="mx-auto max-w-[700px]"
      />

      <Stagger
        className="relative mx-auto grid max-w-[min(100%,400px)] grid-cols-2 gap-x-1 sm:max-w-[1080px] sm:grid-cols-3 sm:gap-x-8 sm:gap-y-8"
        stagger={0.12}
      >
        {/* Soft grass bloom behind the mobile pyramid */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[18%] z-0 h-48 w-56 -translate-x-1/2 rounded-full bg-grass/25 blur-3xl sm:hidden"
        />

        {MOBILE_SLOTS.map(({ index, slot }) => {
          const trainer = trainers[index];
          return (
            <StaggerItem
              key={trainer.name}
              variants={popIn}
              className={cn(
                "group flex flex-col items-center gap-3 sm:gap-5",
                mobileSlotClass[slot],
              )}
            >
              <TrainerCard trainer={trainer} featured={slot === "center"} />
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal className="mt-10 flex justify-center sm:mt-14">
        <SlashAccent />
      </Reveal>
    </section>
  );
}
