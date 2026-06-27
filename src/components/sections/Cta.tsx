"use client";

import { useState } from "react";
import { Reveal, Stagger, StaggerItem, useDemoDialog } from "@/components/ui";
import { fadeUp, fadeUpSm, popIn } from "@/lib/motion";

export function Cta() {
  const [email, setEmail] = useState("");
  const { open: openDemo } = useDemoDialog();

  return (
    <section className="bg-black px-6 pb-16 pt-8 sm:pb-20 sm:pt-12">
      <Reveal
        variants={popIn}
        className="cta-card section-container rounded-[36px] px-8 py-14 sm:rounded-[44px] sm:px-16 sm:py-16 md:py-[72px]"
      >
        <Stagger className="mx-auto max-w-[720px] text-center" stagger={0.12} delayChildren={0.1}>
          <StaggerItem variants={fadeUp}>
            <h2 className="font-display text-[2.35rem] font-bold normal-case leading-[1.05] tracking-tight text-black sm:text-[2.85rem] md:text-[3.25rem]">
              Connect Engage Transform
            </h2>
          </StaggerItem>

          <StaggerItem variants={fadeUpSm}>
            <p className="mx-auto mt-5 max-w-[560px] text-sm leading-relaxed text-pure/95 sm:mt-6 sm:text-[15px]">
              Join A Vibrant Community For Fuel Motivation, Engagement Drives Progress, And
              Transformation
            </p>
          </StaggerItem>

          <StaggerItem variants={fadeUpSm}>
            <div className="mx-auto mt-9 flex w-full max-w-[480px] items-stretch gap-3 sm:mt-10">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                aria-label="Your email"
                className="h-[52px] min-w-0 flex-[1.75] rounded-2xl bg-pure px-6 text-sm text-void placeholder:text-smoke/55 outline-none"
              />
              <button
                type="button"
                onClick={openDemo}
                className="btn-sheen h-[52px] shrink-0 rounded-2xl bg-black px-8 text-sm font-bold text-pure transition-opacity hover:opacity-90"
              >
                Join Now
              </button>
            </div>
          </StaggerItem>
        </Stagger>
      </Reveal>
    </section>
  );
}
