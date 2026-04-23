import { addDays } from "date-fns";
import { AgentSuggestion } from "./types";

export const ministryName = "Christian Women Connecting with Other Women Network";

export const navLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Events", "/events"],
  ["Upper Room", "/upper-room"],
  ["Gallery", "/gallery"],
  ["Join Us", "/join-us"],
  ["Prayer Requests", "/prayer-requests"],
  ["Donate", "/donate"],
  ["Contact", "/contact"]
] as const;

export const featuredEvents = [
  { slug: "ladies-prayer-night", title: "Ladies Prayer Night", date: addDays(new Date(), 2), time: "7:00 PM", location: "The Upper Room", priceLabel: "Free", category: "upper-room" },
  { slug: "becoming-a-woman-of-prayer", title: "Becoming a Woman of Prayer", date: addDays(new Date(), 7), time: "6:30 PM", location: "The Upper Room", priceLabel: "Free", category: "prayer" },
  { slug: "sisterhood-outreach-saturday", title: "Sisterhood Outreach Saturday", date: addDays(new Date(), 12), time: "10:00 AM", location: "Community Hub", priceLabel: "Free", category: "outreach" },
  { slug: "radiant-retreat-weekend", title: "Radiant Retreat Weekend", date: addDays(new Date(), 21), time: "9:00 AM", location: "Willow Creek Retreat", priceLabel: "Paid", category: "retreat" }
];

export const graceGuideSuggestions: AgentSuggestion[] = [
  { title: "Need healing and encouragement?", description: "Start with Tuesday prayer in The Upper Room and receive gentle follow-up.", cta: "Enter the Upper Room", href: "/upper-room" },
  { title: "Ready for deeper connection?", description: "Join mentorship and fellowship circles designed for every season.", cta: "Join the Sisterhood", href: "/join-us" },
  { title: "Want to serve with purpose?", description: "Volunteer in outreach and giveaways to love women in practical ways.", cta: "Volunteer", href: "/join-us#volunteer" }
];

export const prayerCompanionPrompts = [
  "You are not alone. God is near to the brokenhearted.",
  "Take a breath and share your heart honestly. Every request matters.",
  "Would you like follow-up prayer after Friday night gathering?"
];
