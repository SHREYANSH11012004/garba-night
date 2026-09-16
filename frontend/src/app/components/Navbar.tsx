"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const DiscoverIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const navItems: NavItem[] = [
  { label: "Discover", href: "/discovery", icon: <DiscoverIcon /> },
  { label: "Matches", href: "/matches", icon: <HeartIcon /> },
  { label: "Profile", href: "/profile", icon: <UserIcon /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0B071E]/90 backdrop-blur-xl border-b border-[#FFB300]/20 shadow-lg"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/discovery" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E91E63] via-[#FFB300] to-[#00E5FF] flex items-center justify-center text-[#060312] text-sm font-black shadow-lg group-hover:shadow-[#FFB300]/40 transition-shadow">
                    ✦
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 opacity-0 group-hover:opacity-40 blur-md transition-opacity" />
              </div>
              <span
                style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
                className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD54F] to-[#E91E63] hidden sm:block"
              >
                Garba Partner
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive(item.href)
                      ? "bg-[#FFB300]/15 text-[#FFD54F] border border-[#FFB300]/30"
                      : "text-[#A69CC4] hover:text-white hover:bg-[#170E38]/70",
                  ].join(" ")}
                >
                  <span className={isActive(item.href) ? "text-[#FFD54F]" : "text-[#74659D]"}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop: logout */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#A69CC4] hover:text-white hover:bg-[#170E38]/70 transition-all duration-200"
              >
                <LogoutIcon />
                Logout
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-xl text-[#A69CC4] hover:text-white hover:bg-[#170E38]/70 transition-all"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#FFB300]/20 bg-[#0B071E]/95 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive(item.href)
                      ? "bg-[#FFB300]/15 text-[#FFD54F] border border-[#FFB300]/30"
                      : "text-[#A69CC4] hover:text-white hover:bg-[#170E38]/70",
                  ].join(" ")}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => { setMobileOpen(false); handleLogout(); }}
                className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#A69CC4] hover:text-white hover:bg-[#170E38]/70 transition-all duration-200"
              >
                <LogoutIcon />
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
