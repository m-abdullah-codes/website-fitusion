import type { Config } from "tailwindcss";

/** Colours resolve through CSS channel-vars defined in globals.css :root,
 *  so `/<alpha>` opacity modifiers (e.g. text-volt/60) work everywhere and
 *  the whole palette has a single source of truth. */
const withAlpha = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        void:     withAlpha("--c-void"),
        pitch:    withAlpha("--c-pitch"),
        coal:     withAlpha("--c-coal"),
        onyx:     withAlpha("--c-onyx"),
        graphite: withAlpha("--c-graphite"),
        iron:     withAlpha("--c-iron"),
        ink:      withAlpha("--c-ink"),
        // Accent greens
        volt:     withAlpha("--c-volt"),
        acid:     withAlpha("--c-acid"),
        ctaGreen: withAlpha("--c-cta"),
        grass:    withAlpha("--c-grass"),
        // Muted greens
        sage:     withAlpha("--c-sage"),
        olive:    withAlpha("--c-olive"),
        moss:     withAlpha("--c-moss"),
        fern:     withAlpha("--c-fern"),
        // Pale highlights
        linen:    withAlpha("--c-linen"),
        cream:    withAlpha("--c-cream"),
        citron:   withAlpha("--c-citron"),
        // Neutrals / text
        pure:     withAlpha("--c-pure"),
        bone:     withAlpha("--c-bone"),
        ash:      withAlpha("--c-ash"),
        smoke:    withAlpha("--c-smoke"),
      },
      backgroundImage: {
        "volt-glow":    "var(--grad-volt-glow)",
        "btn-primary":  "var(--grad-btn-primary)",
        "card":         "var(--grad-card)",
        "card-active":  "var(--grad-card-active)",
        "exp":          "var(--grad-exp)",
        "quote":        "var(--grad-quote)",
      },
      fontFamily: {
        heading: ["var(--font-clash)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-clash)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans:    ["var(--font-clash)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        md:   "12px",
        lg:   "20px",
        xl:   "28px",
        pill: "999px",
      },
      boxShadow: {
        soft:           "0 24px 60px rgb(var(--c-black) / 0.5)",
        glow:           "0 0 40px rgb(var(--c-volt) / 0.4)",
        "glow-dot":     "0 0 12px rgb(var(--c-volt) / 0.55)",
        "glow-preview": "0 20px 50px -20px rgb(var(--c-volt) / 0.35)",
        "glow-nav":     "0 8px 32px rgb(var(--c-cta) / 0.2)",
        arrow:          "0 8px 24px rgb(var(--c-black) / 0.45)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
