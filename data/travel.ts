import {
  Building2,
  Camera,
  Landmark as LandmarkIcon,
  MapPin,
  Mountain,
  Route,
  ShoppingBag,
  Star,
  Ticket,
  TreePine,
  Waves,
} from 'lucide-react';

import type {
  BlogPost,
  GalleryImage,
  HeroFilter,
  Landmark,
  NavLink,
  TripPackage,
  TrustBadge,
} from '@/types/travel';

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact us', href: '#footer' },
  { label: 'About us', href: '/about' },
];

export const heroFilters: HeroFilter[] = [
  { label: 'Activity/Goal', value: 'Trekking / Sightseeing' },
  { label: 'Location', value: 'Hunza Valley' },
  { label: 'Date/Duration', value: 'Anytime / 7 days' },
  { label: 'Budget', value: '$500 - $2000' },
];

export const trustBadges: TrustBadge[] = [
  { label: 'We are Locals', tone: 'blue', icon: MapPin },
  { label: '10K+ People Satisfied', tone: 'yellow', icon: Star },
];

export const galleryImages: GalleryImage[] = [
  {
    title: 'Skardu, Baltistan',
    subtitle: 'Lake reflections beneath snow peaks',
    image: '/skardu-baltistan-travel.jpg',
    alt: 'Skardu Baltistan lake and mountain reflection in Pakistan',
  },
  {
    title: 'Fairy Meadows',
    image: '/fairy-meadows-travel.jpg',
    alt: 'Fairy Meadows and Nanga Parbat reflection in Pakistan',
  },
  {
    title: 'K2 Basecamp',
    image: '/k2-base-camp-travel.jpg',
    alt: 'K2 Base Camp tents below Karakoram mountains in Pakistan',
  },
];

export const tripPackages: TripPackage[] = [
  {
    name: 'Passu Cones',
    location: 'Gojal Valley, Hunza',
    slotsLeft: 4,
    price: '$ 150.50',
    tripType: 'Open Trip',
    dateLabel: '12-14 August',
    dateKind: 'calendar',
    image: '/passu-cones-gojal-hunza.jpg',
    alt: 'Passu Cones along the road in Gojal Valley, Hunza',
    features: [
      { label: 'Accommodation', value: '3N at Hunza Villa' },
      { label: 'Transport', value: 'Private 4x4 Jeep' },
      { label: 'Meals', value: 'Full board' },
    ],
  },
  {
    name: 'Attabad Lake',
    location: 'Hunza, Gilgit-Baltistan',
    slotsLeft: 5,
    price: '$ 120.00',
    tripType: 'Private',
    dateLabel: 'Request based',
    dateKind: 'request',
    image: '/attabad-lake-hunza-travel.jpg',
    alt: 'Attabad Lake in Hunza, Gilgit-Baltistan with turquoise water and mountains',
    badge: 'Open Trip',
    features: [
      { label: 'Accommodation', value: '2N Lakeside Resort' },
      { label: 'Transport', value: 'Private driver' },
      { label: 'Meals', value: 'Half board' },
    ],
  },
  {
    name: 'Naltar Adventure',
    location: 'Gilgit Valley',
    slotsLeft: 2,
    price: '$ 90.00',
    tripType: 'Open Trip',
    dateLabel: '20-22 August',
    dateKind: 'calendar',
    image: '/naltar-adventure-gilgit.jpg',
    alt: 'Naltar Valley lake and mountains near Gilgit',
    badge: 'Open Trip',
    features: [
      { label: 'Accommodation', value: '2N at Naltar Inn' },
      { label: 'Transport', value: 'Shared Jeep' },
      { label: 'Meals', value: 'Full board' },
    ],
  },
];

export const landmarks: Landmark[] = [
  { name: 'Badshahi Mosque', rating: '4.7', reviews: '28K', status: 'Closed', category: 'Mosque', price: 'Free', icon: LandmarkIcon, image: '/badshahi.jpg' },
  { name: 'Lahore Fort', rating: '4.6', reviews: '26K', status: 'Closed', category: 'Historical landmark', icon: LandmarkIcon, image: '/lahore_fort.jpg' },
  { name: 'Faisal Masjid', rating: '4.7', reviews: '74K', status: 'Open', category: 'Mosque', price: 'Free', icon: LandmarkIcon, image: '/faisal.jpg' },
  { name: 'Wazir Khan Mosque', rating: '4.8', reviews: '12K', status: 'Closed', category: 'Mosque', price: 'Free', icon: LandmarkIcon, image: '/wazir_khan.jpg' },
  { name: 'Pakistan Monument', rating: '4.6', reviews: '21K', status: 'Closed', category: 'Monument', price: 'Free', icon: LandmarkIcon, image: '/pak_monument.jpg' },
  { name: 'Mazaar e Quaid', rating: '4.6', reviews: '15K', status: 'Closed', category: 'Historical landmark', icon: LandmarkIcon, image: '/mazar.jpg' },
  { name: 'Deosai National Park', rating: '4.8', reviews: '4.5K', status: 'Open', category: 'National park', icon: TreePine, image: '/deosai.jpg' },
  { name: 'Minar-e-Pakistan', rating: '4.6', reviews: '20K', status: 'Open', category: 'Historical landmark', price: 'Free', icon: LandmarkIcon, image: '/minar.jpg' },
  { name: 'Daman-e-Koh', rating: '4.6', reviews: '27K', status: 'Closed', category: 'Tourist attraction', price: 'Free', icon: Camera, image: '/daman.jpg' },
  { name: 'Mohenjo Daro', rating: '4.4', reviews: '5.1K', status: 'Closed', category: 'Historical landmark', icon: LandmarkIcon, image: '/mohenjo.jpg' },
  { name: 'Lok Virsa Museum', rating: '4.6', reviews: '15K', status: 'Closed', category: 'Heritage museum', price: '$5.40', icon: Building2, image: '/lokvirsa.jpg' },
  { name: 'Khewra Salt Mine', rating: '4.5', reviews: '6.7K', status: 'Closed', category: 'Tourist attraction', price: '$21.00', icon: Camera, image: '/khewra.jpg' },
  { name: 'Mohatta Palace Museum', rating: '4.5', reviews: '5.7K', status: 'Closed', category: 'Historical landmark', price: '$0.11', icon: Building2, image: '/mohatta.jpg' },
  { name: 'Port Grand - Karachi', rating: '4.4', reviews: '31K', status: 'Closed', category: 'Recreation center', icon: Ticket, image: '/port_grand.jpg' },
  { name: 'Dolmen Mall - Clifton', rating: '4.6', reviews: '48K', status: 'Closed', category: 'Shopping mall', icon: ShoppingBag, image: '/dolmen.jpg' },
  { name: 'Hunza Valley', rating: '4.7', reviews: '4.9K', status: 'Open', category: 'Ravine', icon: Mountain, image: '/hunza.jpg' },
  { name: 'K2', rating: '4.7', reviews: '6.3K', status: 'Open', category: 'Mountain peak', icon: Mountain, image: '/k2.jpg' },
  { name: 'Fairy Meadows', rating: '4.8', reviews: '1.5K', status: 'Open', category: 'Plateau', icon: Mountain, image: '/fairy_meadows.jpg' },
  { name: 'Attabad Lake', rating: '4.8', reviews: '2.5K', status: 'Open', category: 'Lake', icon: Waves, image: '/attabad.jpg' },
  { name: 'N-35', status: 'Open', category: 'Highway 3', icon: Route, image: '/n35.jpg' },
];

export const footerLinks = {
  Explore: ['Destinations', 'Retreats', 'Packages', 'Local Guides'],
  Company: ['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'],
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'ultimate-guide-to-hunza-valley',
    title: 'The Ultimate Guide to Hunza Valley',
    excerpt:
      'Everything you need to know before chasing turquoise lakes and snow-capped peaks in the north.',
    content: [
      'Hunza Valley is often called the crown jewel of Gilgit-Baltistan, and for good reason. Framed by Rakaposhi and the Karakoram range, the valley pairs dramatic scenery with a relaxed, welcoming culture that keeps travelers coming back.',
      'The best time to visit is between April and October, when the Karakoram Highway is fully open and the apricot orchards are either blooming or fruiting. Base yourself in Karimabad for easy access to Baltit Fort, Eagle\'s Nest viewpoint, and day trips to Attabad Lake and Passu Cones.',
      'Give yourself at least four days — one to acclimatize and wander Karimabad, one for Attabad Lake and the Hussaini suspension bridge, one for Passu and the glacier viewpoints, and a buffer day for weather. Roads can close briefly after rain, so build in slack.',
    ],
    category: 'Destination Guide',
    author: 'Ayesha Raza',
    date: '2026-06-12',
    readTime: '6 min read',
    views: '18.2K',
    image: '/passu-cones-gojal-hunza.jpg',
    alt: 'Hunza Valley with snow-capped peaks and green terraces',
  },
  {
    slug: 'k2-base-camp-trek-what-to-know',
    title: 'K2 Base Camp Trek: What to Know Before You Go',
    excerpt: 'A realistic breakdown of difficulty, permits, gear, and the best trekking season.',
    content: [
      'The K2 Base Camp trek is one of the most demanding — and rewarding — treks in the world, covering roughly 100km round trip through the Baltoro Glacier over 10-14 days.',
      'Permits are required and are typically arranged through a registered trekking operator, who will also handle porter logistics and the mandatory liaison officer for foreign trekkers. Book at least two to three months ahead during peak season (July-August).',
      'Altitude is the biggest risk factor, not distance. Concordia sits above 4,600m, so a slow, staged ascent with rest days matters more than raw fitness. Pack for temperature swings of 30+ degrees between midday sun and night at camp.',
    ],
    category: 'Trekking',
    author: 'Bilal Hussain',
    date: '2026-05-28',
    readTime: '8 min read',
    views: '24.6K',
    image: '/k2-base-camp-travel.jpg',
    alt: 'Trekkers on the trail toward K2 Base Camp',
  },
  {
    slug: 'skardu-baltistan-hidden-gems',
    title: "Skardu's Hidden Gems Beyond the Postcard Spots",
    excerpt: 'Skip the crowds at Shangrila and discover the valleys locals actually love.',
    content: [
      'Skardu gets attention for Shangrila Resort and Upper Kachura Lake, and both are worth the visit — but the region holds far more once you get off the main road.',
      'Basho Valley, a short drive from Skardu city, offers pine forests and river camping without the crowds of Deosai. Kharmang Valley further east is one of the least-visited parts of Baltistan, with apricot orchards and Balti stone architecture largely untouched by tourism.',
      'For a full picture of the region, pair two nights in Skardu city with a night each in Basho and along the Shigar river — the contrast between desert-like riverbanks and alpine valleys within an hour of each other is the real story of Baltistan.',
    ],
    category: 'Destination Guide',
    author: 'Sana Malik',
    date: '2026-05-10',
    readTime: '5 min read',
    views: '11.4K',
    image: '/skardu-baltistan-travel.jpg',
    alt: 'Skardu valley landscape with mountains and river',
  },
  {
    slug: 'fairy-meadows-camping-guide',
    title: 'Camping at Fairy Meadows: A Practical Guide',
    excerpt: 'What the jeep ride, the hike, and the nights actually feel like at 3,300m.',
    content: [
      'Fairy Meadows sits at the base of Nanga Parbat and is reached via a jeep track from Raikot Bridge, followed by a 3-4 hour hike (or horse ride) — there is no road all the way in, which is exactly what keeps it special.',
      'Nights get cold even in summer, dropping close to freezing, so a proper sleeping bag matters more than most people expect. Most stays are simple wooden huts or camping pods run by local families.',
      'Sunrise over Nanga Parbat from Fairy Meadows, and the further hike up to Beyal Camp, are the two moments worth planning your schedule around — both are best done at first light before clouds roll in.',
    ],
    category: 'Camping',
    author: 'Ahmed Tariq',
    date: '2026-04-22',
    readTime: '5 min read',
    views: '9.8K',
    image: '/fairy-meadows-travel.jpg',
    alt: 'Camping tents at Fairy Meadows with Nanga Parbat in the background',
  },
  {
    slug: 'attabad-lake-day-trip',
    title: 'Attabad Lake: The Perfect Half-Day Trip',
    excerpt: 'Boating, ziplining, and lakeside food — how to spend a few hours right.',
    content: [
      'Attabad Lake formed in 2010 after a landslide dammed the Hunza River, and its turquoise water has since become one of the most photographed spots on the Karakoram Highway.',
      'Boat rides across the lake are the main draw, with several operators along the shore offering short scenic rides or longer trips toward the far end near the tunnels. Ziplining and jet-ski rentals are also available near the main jetty.',
      'Plan to arrive by mid-morning to beat the tour-bus crowds, and pair the visit with lunch at one of the floating or lakeside restaurants serving fresh trout.',
    ],
    category: 'Day Trip',
    author: 'Ayesha Raza',
    date: '2026-04-02',
    readTime: '4 min read',
    views: '15.1K',
    image: '/attabad-lake-hunza-travel.jpg',
    alt: 'Turquoise waters of Attabad Lake surrounded by mountains',
  },
  {
    slug: 'lahore-food-and-heritage-walk',
    title: 'A Food and Heritage Walk Through Old Lahore',
    excerpt: 'Badshahi Mosque, Wazir Khan, and the street food in between.',
    content: [
      'Old Lahore rewards walking more than any other city in Pakistan. Start at Badshahi Mosque in the early morning light, then head into the walled city toward Wazir Khan Mosque, taking in the frescoed facades along the way.',
      'Food Street in Gawalmandi and the stalls around Fort Road come alive in the evening — this is where to try nihari, fried fish, and kulfi falooda without needing a reservation.',
      'Set aside a full day: mornings for the forts and mosques when the light and crowds are best, afternoons for the bazaars, and evenings for food street once the lanes light up.',
    ],
    category: 'City Guide',
    author: 'Bilal Hussain',
    date: '2026-03-18',
    readTime: '6 min read',
    views: '20.3K',
    image: '/minar.jpg',
    alt: 'Minar-e-Pakistan monument in Lahore at golden hour',
  },
];
