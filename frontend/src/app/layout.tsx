import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "GarbaSangam | Find Your Garba Partner",
  description: "Find your Garba and Dandiya partner among verified JSS college students.",
  keywords: ["garba", "partner", "jssaten", "jssuninoida", "dance", "festival"],
  openGraph: {
    title: "GarbaSangam",
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
    <html lang="en" className={`${jakarta.variable} ${cinzel.variable} dark`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
