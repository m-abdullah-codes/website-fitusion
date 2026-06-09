import { HeartPulse, Dumbbell, Droplet, Flame, type LucideIcon } from "lucide-react";

export interface Plan {
  icon: LucideIcon;
  title: string;
  description: string;
  /** The highlighted "selected" card. */
  active?: boolean;
}

export const PLANS: Plan[] = [
  {
    icon: HeartPulse,
    title: "Cardio Training",
    description:
      "Boost endurance and heart health with high-energy cardio sessions designed to keep you moving.",
  },
  {
    icon: Dumbbell,
    title: "Strength Build",
    description:
      "Develop power and resilience through expert-guided strength training tailored to all fitness levels.",
    active: true,
  },
  {
    icon: Droplet,
    title: "Fat Loss",
    description:
      "Shed unwanted fat with dynamic workout routines and fat-burning strategies that deliver lasting results.",
  },
  {
    icon: Flame,
    title: "HIIT Workouts",
    description:
      "Maximize calorie burn and improve fitness with short, intense high-intensity interval training sessions.",
  },
];
