import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PCI | Futuristic Luxury Sportswear Universe",
  description: "Forging the intersection of biological kinetics and space-grade fabric tech. Calibration coordinates for the athletes of the future.",
  metadataBase: new URL("https://pci-clothing.labs"),
  openGraph: {
    title: "PCI | Futuristic Luxury Sportswear Universe",
    description: "Calibration grid for the athlete of the future. Ultra-smooth 3D experiences, biometrics tracking, and customized AI styling.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-[#030305] text-white overflow-x-hidden font-sans">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
