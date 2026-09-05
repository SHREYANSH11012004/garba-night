import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Garba Partner — Find Your Rhythm",
  description: "Find your rhythm. Find your partner. Own the Garba night. Exclusively for JSS college students.",
  keywords: ["garba", "partner", "jssaten", "jssuninoida", "dance", "festival"],
  openGraph: {
    title: "Garba Partner",
    description: "Find your Garba partner. Only for verified college students.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
