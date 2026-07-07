export const trustItems = [
  { label: "100% Natural Gemstones" },
  { label: "Lab Certified · IGI / GIA" },
  { label: "Insured Worldwide Shipping" },
  { label: "7-Day Easy Returns" },
  { label: "Free Expert Consultation" },
];

export type Product = {
  slot: string;
  imgHint: string;
  badge: string;
  kind: string;
  name: string;
  grade: string;
  carat: string;
  origin: string;
  price: string;
  perCt: string;
};

export const products: Product[] = [
  {
    slot: "prod-firoza",
    imgHint: "Firoza ring stone — macro",
    badge: "Certified",
    kind: "Firoza · Turquoise",
    name: "Nishapuri Firoza",
    grade: "Grade AAA",
    carat: "6.25 ct",
    origin: "Iran",
    price: "₹18,500",
    perCt: "₹2,960 / ct",
  },
  {
    slot: "prod-aqiq",
    imgHint: "Yemeni Aqiq cabochon",
    badge: "Natural",
    kind: "Aqiq · Agate",
    name: "Yemeni Aqiq",
    grade: "Grade AA+",
    carat: "8.10 ct",
    origin: "Yemen",
    price: "₹9,800",
    perCt: "₹1,210 / ct",
  },
  {
    slot: "prod-pukhraj",
    imgHint: "Pukhraj — faceted, on white",
    badge: "Unheated",
    kind: "Pukhraj · Yellow Sapphire",
    name: "Ceylon Pukhraj",
    grade: "Grade AAA",
    carat: "5.45 ct",
    origin: "Sri Lanka",
    price: "₹98,100",
    perCt: "₹18,000 / ct",
  },
  {
    slot: "prod-panna",
    imgHint: "Emerald — faceted, macro",
    badge: "Certified",
    kind: "Panna · Emerald",
    name: "Zambian Panna",
    grade: "Grade AA+",
    carat: "4.80 ct",
    origin: "Zambia",
    price: "₹67,200",
    perCt: "₹14,000 / ct",
  },
];

export type Category = {
  slot: string;
  imgHint: string;
  name: string;
  local: string;
  note: string;
};

export const categories: Category[] = [
  { slot: "cat-firoza", imgHint: "Firoza — raw & polished", name: "Turquoise", local: "Firoza", note: "Nishapur, Iran" },
  { slot: "cat-aqiq", imgHint: "Aqiq rings & cabochons", name: "Agate", local: "Aqiq", note: "Yemen · Sulemani" },
  { slot: "cat-pukhraj", imgHint: "Yellow sapphire lot", name: "Yellow Sapphire", local: "Pukhraj", note: "Ceylon, unheated" },
  { slot: "cat-panna", imgHint: "Emerald crystals", name: "Emerald", local: "Panna", note: "Colombia · Zambia" },
  { slot: "cat-manik", imgHint: "Ruby — faceted", name: "Ruby", local: "Manik", note: "Burma · Mozambique" },
  { slot: "cat-moti", imgHint: "Pearls on silk", name: "Pearl", local: "Moti", note: "South Sea · Basra" },
  { slot: "cat-moonga", imgHint: "Red coral beads", name: "Red Coral", local: "Moonga", note: "Italian, organic" },
  { slot: "cat-lehsunia", imgHint: "Cat's eye chrysoberyl", name: "Cat's Eye", local: "Lehsunia", note: "Ceylon chrysoberyl" },
];

export const purposes = [
  { title: "Faith & Tradition", copy: "Firoza and Aqiq, cherished in Islamic tradition — selected for purity of colour and origin." },
  { title: "Vedic Astrology", copy: "Jyotish-grade Pukhraj, Panna and Manik with the weight, clarity and treatment status your astrologer specifies." },
  { title: "Healing & Wellbeing", copy: "Untreated natural stones chosen for those who value the calm and balance gemstones are believed to bring." },
  { title: "Jewelry & Collecting", copy: "Investment-grade certified stones and finished pieces for connoisseurs who buy on rarity and provenance." },
];

export const certPoints = [
  { title: "Independent lab reports", copy: "IGI, GIA or GJEPC-recognised laboratories — never in-house claims." },
  { title: "Full disclosure of treatment", copy: "Heated, unheated, dyed or natural — stated plainly on every listing and report." },
  { title: "Origin traceability", copy: "We document the mine region for every stone we can, from Nishapur to Ceylon." },
  { title: "Verify online, anytime", copy: "Each report number can be checked directly on the issuing lab's website." },
];

export const testimonials = [
  { initials: "AR", name: "Arsalan R.", meta: "Hyderabad · Firoza ring", quote: "The Nishapuri Firoza arrived with its lab card and origin note. The colour is exactly as photographed — my family has ordered three more since." },
  { initials: "PS", name: "Priya S.", meta: "Mumbai · Pukhraj, 5.4 ct", quote: "My astrologer specified an unheated Pukhraj above 5 carats. Their gemologist helped me verify the report online before I paid. Flawless experience." },
  { initials: "OK", name: "Omar K.", meta: "Dubai · Collector", quote: "I collect Yemeni Aqiq and this is the only online source I trust. Insured shipping to Dubai took four days, packaging was immaculate." },
];

export const guides = [
  { slot: "guide-choose", imgHint: "Loose stones on tray", tag: "Buying Guide", title: "How to Choose Your First Gemstone", read: "6 min read" },
  { slot: "guide-quality", imgHint: "Loupe + stone macro", tag: "Quality", title: "Understanding Grades, Clarity & Cut", read: "8 min read" },
  { slot: "guide-cert", imgHint: "Lab certificate close-up", tag: "Certification", title: "How Gemstone Certification Works", read: "5 min read" },
  { slot: "guide-care", imgHint: "Cleaning a ring, soft cloth", tag: "Care", title: "Caring for Firoza, Aqiq & Sapphire", read: "4 min read" },
];

export const faqs = [
  { q: "Are your gemstones natural and untreated?", a: "Every stone is 100% natural. Treatment status (heated / unheated) is disclosed on each listing and confirmed in the independent lab report that ships with your stone." },
  { q: "Which laboratories certify your stones?", a: "We work with IGI, GIA and GJEPC-recognised Indian laboratories. The report number on your certificate can be verified directly on the lab's own website." },
  { q: "Can you help me choose a stone for astrological purposes?", a: "Yes. Our gemologists offer free consultation and will match the carat weight, clarity and treatment status your astrologer or tradition specifies — without upselling." },
  { q: "How is shipping handled?", a: "All orders ship fully insured with tamper-evident packaging. Delivery is 2–4 days across India and 4–8 days internationally, with tracking from dispatch." },
  { q: "What is your return policy?", a: "7-day no-questions returns on all stones in original condition with certificate. Refunds are processed to the original payment method within 5 business days." },
];

export const stats = [
  { label: "Years of expertise", value: 25, suffix: "+" },
  { label: "Stones certified & sold", value: 18000, suffix: "+" },
  { label: "Countries served", value: 32, suffix: "" },
];

export const navLinks = [
  { href: "#featured", label: "Shop" },
  { href: "#stones", label: "Gemstones" },
  { href: "#purpose", label: "By Purpose" },
  { href: "#certification", label: "Certification" },
  { href: "#guide", label: "Guide" },
  { href: "#faq", label: "FAQ" },
];
