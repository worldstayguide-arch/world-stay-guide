import {
  Building2,
  Camera,
  Landmark as LandmarkIcon,
  Mountain,
  Route,
  ShoppingBag,
  Ticket,
  TreePine,
  Waves,
  type LucideIcon,
} from 'lucide-react';

export const LANDMARK_ICON_MAP: Record<string, LucideIcon> = {
  Landmark: LandmarkIcon,
  TreePine,
  Camera,
  Building2,
  Ticket,
  ShoppingBag,
  Mountain,
  Waves,
  Route,
};

export const LANDMARK_ICON_NAMES = Object.keys(LANDMARK_ICON_MAP);

export function resolveLandmarkIcon(iconName: string): LucideIcon {
  return LANDMARK_ICON_MAP[iconName] ?? LandmarkIcon;
}
