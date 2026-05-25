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
    name: "Aether-01 Compression",
    collection: "Aether Series",
    price: 185,
    description: "Engineered for extreme heat dispersion with real-time thermo-regulating micro-grid structure. Polished metallic seams adapt dynamically to biomechanical stretching, providing secondary joint support.",
    specs: [
      "Thermo-regulating adaptive grid",
      "8-way quantum elasticity",
      "Seamless ultrasonic bonded seams",
      "Embossed glowing PCI chest logo"
    ],
    colors: [
      { name: "Stealth Black", hex: "#0b0b0d", threeHex: "#050505" },
      { name: "Titanium White", hex: "#f1f1f5", threeHex: "#ffffff" },
      { name: "Cyber Silver", hex: "#8a8d96", threeHex: "#7a7e85" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: "Hyper-compressive performance layer designed to accelerate blood flow and minimize muscle vibration during high-g kinetic training.",
    imageUrl: "/products/aether_top.png"
  },
  {
    id: "nebula-jacket",
    name: "Nebula Active Shell",
    collection: "Nebula Active",
    price: 340,
    description: "Ultra-light atmospheric shell featuring hydrophobic outer membranes and glow-in-the-dark aurora light piping. Designed to sustain core thermal equilibrium in severe environmental conditions.",
    specs: [
      "Hydrophobic 3-layer laminated shell",
      "Dynamic phosphorescent panels",
      "Fidlock® magnetic zip closures",
      "Cinematic helmet-compatible hood"
    ],
    colors: [
      { name: "Stealth Black", hex: "#0b0b0d", threeHex: "#020202" },
      { name: "Nova White", hex: "#ffffff", threeHex: "#f0f2f5" },
      { name: "Silver Aurora", hex: "#b4c3d4", threeHex: "#a0b2c6" }
    ],
    sizes: ["S", "M", "L", "XL"],
    features: "Aesthetic storm-proofing. The breathable nano-pore technology permits sweat molecules to evaporate while preventing liquid penetration.",
    imageUrl: "/products/nebula_jacket.png"
  },
  {
    id: "quantum-tights",
    name: "Quantum Comp Tights",
    collection: "Aether Series",
    price: 195,
    description: "Zonal compression tights engineered to stabilize critical muscle groups. Smart fabric mapping targets quad, hamstring, and calf bands to reduce lactic build-up.",
    specs: [
      "Zonal kinetic muscle mapping",
      "Liquid-metal compression bands",
      "Breathable honeycomb moisture vents",
      "Laser-cut biometric device holster"
    ],
    colors: [
      { name: "Stealth Black", hex: "#0b0b0d", threeHex: "#050505" },
      { name: "Silver Line", hex: "#94a3b8", threeHex: "#8894a6" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: "Reinforced elastic bands simulate natural ligament support to stabilize knee tracking under strenuous athletic strain.",
    imageUrl: "/products/quantum_tights.png"
  },
  {
    id: "chronos-joggers",
    name: "Chronos Grid Trousers",
    collection: "Chronos Street",
    price: 265,
    description: "Structured high-end streetwear pant utilizing geometric paneled construction. Articulated knee joints and heavy-weave mesh provide high mobility for both athletic and streetwear environments.",
    specs: [
      "Abrasion-resistant technical weave",
      "Kinetic joint articulation panels",
      "Polished titanium drawstring toggles",
      "Shielded magnetic cargo chambers"
    ],
    colors: [
      { name: "Stealth Black", hex: "#0b0b0d", threeHex: "#050505" },
      { name: "Titanium White", hex: "#f1f1f5", threeHex: "#ffffff" }
    ],
    sizes: ["S", "M", "L", "XL"],
    features: "Intertwines aggressive tech-wear aesthetic with highly functional running mobility. Relaxed fit tapering into clean glowing ankle bands.",
    imageUrl: "/products/chronos_joggers.png"
  },
  {
    id: "quantum-anorak",
    name: "Vented Mesh Anorak",
    collection: "Quantum Elite",
    price: 380,
    description: "Premium windbreaker designed with laser-perforated chest flaps that lift slightly in motion to guide fresh air across core zones. Superhydrophobic finish protects against the elements.",
    specs: [
      "Kinetic heat-activated venting",
      "Nano-engineered hydrophobic finish",
      "Secure double-compartment front pouch",
      "Reflective holographic branding lines"
    ],
    colors: [
      { name: "Carbon Black", hex: "#18181b", threeHex: "#0e0e10" },
      { name: "Pure Titanium", hex: "#e2e8f0", threeHex: "#cbd5e1" }
    ],
    sizes: ["S", "M", "L"],
    features: "Extremely high breathability profile. Features a futuristic aesthetic with clean geometric lines, giving standard sportswear an architectural silhouette.",
    imageUrl: "/products/quantum_anorak.png"
  },
  {
    id: "nebula-runner",
    name: "Nebula Kinetic Runner",
    collection: "Nebula Active",
    price: 420,
    description: "Next-generation running shoe equipped with a structural carbon-fiber acceleration plate. Kinetic cushion technology compresses on impact and delivers an explosive energy response.",
    specs: [
      "3D contoured carbon-fiber plate",
      "Interactive kinetic LED-reactive foam",
      "Shatterproof micro-cleat grip matrix",
      "High-tensile seamless matrix knit"
    ],
    colors: [
      { name: "Stealth Void", hex: "#050506", threeHex: "#010102" },
      { name: "Supernova White", hex: "#fdfdfd", threeHex: "#ffffff" },
      { name: "Galactic Silver", hex: "#cbd5e1", threeHex: "#94a3b8" }
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    features: "Propulsive footwear technology. Features real-time responsive cushioning that stiffens at high speeds to support aggressive cornering and landing stabilization.",
    imageUrl: "/products/nebula_runner.png"
  }
];
