import {
  Leaf,
  Users,
  TrendingUp,
  Crown,
  HeartHandshake,
  Dumbbell,
  type LucideIcon,
} from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  label: string;
}

export const FEATURES: Feature[] = [
  { icon: Leaf,           label: "Nutrition Guidance"        },
  { icon: Users,          label: "Expert Trainers"           },
  { icon: TrendingUp,     label: "Progress Tracking"         },
  { icon: Crown,          label: "Premium Membership"        },
  { icon: HeartHandshake, label: "Community Support"         },
  { icon: Dumbbell,       label: "Next-Level Fitness Spaces" },
];
