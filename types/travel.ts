import type { LucideIcon } from 'lucide-react';

export type NavLink = {
  label: string;
  href: string;
};

export type HeroFilter = {
  label: string;
  value: string;
};

export type TrustBadge = {
  label: string;
  tone: 'blue' | 'yellow';
  icon: LucideIcon;
};

export type GalleryImage = {
  title: string;
  subtitle?: string;
  image: string;
  alt: string;
};

export type TripFeature = {
  label: string;
  value: string;
};

export type TripPackage = {
  name: string;
  location: string;
  slotsLeft: number;
  price: string;
  tripType: string;
  dateLabel: string;
  dateKind: 'calendar' | 'request';
  image: string;
  alt: string;
  badge?: string;
  features: TripFeature[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  date: string;
  readTime: string;
  views: string;
  image: string;
  alt: string;
};

export type Landmark = {
  name: string;
  rating?: string;
  reviews?: string;
  status: 'Open' | 'Closed';
  category: string;
  price?: string;
  icon: LucideIcon;
  image: string;
};

export type LandmarkStatus = 'Open' | 'Closed';

export type LandmarkRecord = {
  id: number;
  name: string;
  category: string;
  iconName: string;
  rating?: string;
  reviews?: string;
  price?: string;
  status: LandmarkStatus;
  image: string;
  updatedAt: string;
};

export type LandmarkPayload = {
  name: string;
  category: string;
  iconName: string;
  rating?: string;
  reviews?: string;
  price?: string;
  status: LandmarkStatus;
  image: string;
};
