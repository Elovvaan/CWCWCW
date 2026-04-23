import { graceGuideSuggestions } from "./data";

export const graceGuide = () => graceGuideSuggestions;

export const prayerCompanion = () => ({
  scripture: "Philippians 4:6-7",
  encouragement: "Present your requests to God with thanksgiving, and receive His peace.",
  suggestedCategories: ["Healing", "Family", "Provision", "Strength", "Spiritual Growth"]
});

export const provisionAgent = () => [
  "Launch a 30-day Become a Monthly Partner campaign tied to retreat scholarships.",
  "Invite local women-owned businesses to sponsor giveaway bundles.",
  "Create a prayer-night impact story post + QR giving card for Facebook funnel."
];

export const graceReminderAgent = () => ({
  automations: [
    "Upper Room tonight reminder (every Tuesday + Friday)",
    "Event tomorrow and same-day nudges",
    "Prayer request 48-hour follow-up",
    "Donor thank-you within 24 hours"
  ]
});
