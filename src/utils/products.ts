export interface Product {
  id: string;
  name: string;
  collection: string;
  price: number;
  description: string;
  specs: string[];
  colors: { name: string; hex: string; threeHex: string }[];
  sizes: string[];
  features: string;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: "aether-top",
    name: "PCI Elite Compression Top",
    collection: "Aether Series",
    price: 185,
    description: "Designed for high-performance training with advanced moisture-wicking fabric that keeps you cool and dry. Seamless construction prevents chafing and moves naturally with your body.",
    specs: [
      "Moisture-wicking mesh ventilation",
      "Four-way stretch for maximum mobility",
      "Friction-free flatlock seams",
      "Reflective premium PCI chest logo"
    ],
    colors: [
      { name: "Stealth Black", hex: "#0b0b0d", threeHex: "#050505" },
      { name: "Titanium White", hex: "#f1f1f5", threeHex: "#ffffff" },
      { name: "Cyber Silver", hex: "#8a8d96", threeHex: "#7a7e85" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: "Lightweight compression fit that supports muscles, increases blood circulation, and reduces fatigue during intense workouts.",
    imageUrl: "/products/aether_top.png"
  },
  {
    id: "nebula-jacket",
    name: "PCI Premium Windbreaker",
    collection: "Nebula Active",
    price: 340,
    description: "An ultra-lightweight, water-resistant windbreaker with sleek reflective accents for nighttime safety. Made with high-durability fabrics to protect you against harsh weather.",
    specs: [
      "Water-resistant three-layer shell",
      "High-visibility reflective safety panels",
      "Magnetic zipper locks",
      "Adjustable ergonomic hood"
    ],
    colors: [
      { name: "Stealth Black", hex: "#0b0b0d", threeHex: "#020202" },
      { name: "Nova White", hex: "#ffffff", threeHex: "#f0f2f5" },
      { name: "Silver Aurora", hex: "#b4c3d4", threeHex: "#a0b2c6" }
    ],
    sizes: ["S", "M", "L", "XL"],
    features: "Breathable storm protection. Allows sweat and body heat to escape while keeping wind and light rain completely out.",
    imageUrl: "/products/nebula_jacket.png"
  },
  {
    id: "quantum-tights",
    name: "PCI Compression Tights",
    collection: "Aether Series",
    price: 195,
    description: "Zonal compression tights that support major muscle groups. Designed with moisture-wicking fabric and flat seams to keep you comfortable during long runs.",
    specs: [
      "Zonal calf and quad support",
      "Comfort elastic waistband",
      "Breathable honeycomb moisture vents",
      "Secure side pocket for phone or keys"
    ],
    colors: [
      { name: "Stealth Black", hex: "#0b0b0d", threeHex: "#050505" },
      { name: "Silver Line", hex: "#94a3b8", threeHex: "#8894a6" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: "Reinforced support panels that stabilize your knees and joints during heavy leg training.",
    imageUrl: "/products/quantum_tights.png"
  },
  {
    id: "chronos-joggers",
    name: "PCI Articulated Joggers",
    collection: "Chronos Street",
    price: 265,
    description: "Premium streetwear joggers with comfortable geometric paneling. Articulated knees provide high freedom of movement for both casual outings and intense workouts.",
    specs: [
      "Durable water-resistant woven fabric",
      "Articulated knees for natural bending",
      "Anodized metal lace tips",
      "Secure zippered cargo pockets"
    ],
    colors: [
      { name: "Stealth Black", hex: "#0b0b0d", threeHex: "#050505" },
      { name: "Titanium White", hex: "#f1f1f5", threeHex: "#ffffff" }
    ],
    sizes: ["S", "M", "L", "XL"],
    features: "Blends aggressive streetwear styling with high-performance utility. Relaxed fit tapering into clean, snug ankle cuffs.",
    imageUrl: "/products/chronos_joggers.png"
  },
  {
    id: "quantum-anorak",
    name: "PCI Vented Running Hoody",
    collection: "Quantum Elite",
    price: 380,
    description: "Premium athletic hoody featuring laser-cut ventilation ports. Designed to regulate body temperature dynamically as you build up heat during your run.",
    specs: [
      "Laser-cut underarm ventilation",
      "Water-repellent durable coating",
      "Front utility storage pouch",
      "Reflective branding stripes"
    ],
    colors: [
      { name: "Carbon Black", hex: "#18181b", threeHex: "#0e0e10" },
      { name: "Pure Titanium", hex: "#e2e8f0", threeHex: "#cbd5e1" }
    ],
    sizes: ["S", "M", "L"],
    features: "High breathability running apparel. Features clean geometric lines to offer a modern, architectural athletic look.",
    imageUrl: "/products/quantum_anorak.png"
  },
  {
    id: "nebula-runner",
    name: "PCI Carbon Flight Runner",
    collection: "Nebula Active",
    price: 420,
    description: "Next-generation running shoe equipped with a structural carbon-fiber plate. Our responsive cushion foam absorbs impact and spring-loads your next stride.",
    specs: [
      "Energy-return carbon fiber plate",
      "Ultra-responsive cushion midsole",
      "High-traction rubber grip sole",
      "Seamless and breathable knit upper"
    ],
    colors: [
      { name: "Stealth Void", hex: "#050506", threeHex: "#010102" },
      { name: "Supernova White", hex: "#fdfdfd", threeHex: "#ffffff" },
      { name: "Galactic Silver", hex: "#cbd5e1", threeHex: "#94a3b8" }
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    features: "Propulsive running footwear. Stiffens at high speeds to support stable landings and quick turns.",
    imageUrl: "/products/nebula_runner.png"
  }
];
