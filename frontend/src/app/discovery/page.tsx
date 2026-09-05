"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import Navbar from "@/app/components/Navbar";

interface Profile {
  publicId: string;
  displayName: string;
  year: number;
  department: string;
  garbaLevel: string;
  favoriteSong?: string;
  bio?: string;
  photoUrl?: string;
  compatibility?: number;
}

const PLACEHOLDER = "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=800&auto=format&fit=crop";

// Decision icons
const RejectIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const WaitIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const AcceptIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Loading skeleton
function CardSkeleton() {
  return (
    <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden">
      <div className="skeleton absolute inset-0" />
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
        <div className="skeleton h-8 w-3/4 rounded-lg" />
        <div className="skeleton h-4 w-1/2 rounded-lg" />
        <div className="skeleton h-16 w-full rounded-lg" />
      </div>
    </div>
  );
}

// Empty state
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 animate-float">
        <span className="text-4xl">🎭</span>
      </div>
      <h2 style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }} className="text-2xl font-bold text-white mb-3">
        You&apos;ve seen everyone!
      </h2>
      <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
        No more profiles for now. Check back later — new students are joining every day.
      </p>
      <Link
        href="/matches"
        className="mt-8 px-6 py-3 rounded-full text-sm font-medium text-orange-400 border border-orange-500/30 hover:bg-orange-500/10 transition-all"
      >
        View Your Matches →
      </Link>
    </div>
  );
}

export default function DiscoveryPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeAnim, setSwipeAnim] = useState<"left" | "right" | "up" | null>(null);
  const [showConfirm, setShowConfirm] = useState<"ACCEPTED" | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetchApi("/discovery/profiles");
        if (response?.data) setProfiles(response.data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load profiles");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDecision = async (status: "ACCEPTED" | "REJECTED" | "WAIT") => {
    const profile = profiles[currentIndex];
    if (!profile) return;

    if (status === "ACCEPTED") {
      setShowConfirm("ACCEPTED");
      return;
    }

    const anim = status === "REJECTED" ? "left" : "up";
    setSwipeAnim(anim);

    try {
      await fetchApi(`/decisions/${profile.publicId}/${status.toLowerCase()}`, { method: "POST" });
    } catch {
      // silently continue
    }

    setTimeout(() => {
      setSwipeAnim(null);
      setCurrentIndex((i) => i + 1);
    }, 350);
  };

  const confirmAccept = async () => {
    const profile = profiles[currentIndex];
    if (!profile) return;
    setSwipeAnim("right");

    try {
      await fetchApi(`/decisions/${profile.publicId}/accept`, { method: "POST" });
    } catch {
      // silently continue
    }

    setTimeout(() => {
      setSwipeAnim(null);
      setShowConfirm(null);
      setCurrentIndex((i) => i + 1);
    }, 350);
  };

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  const cardTransform =
    swipeAnim === "left"
      ? "translateX(-120%) rotate(-15deg)"
      : swipeAnim === "right"
      ? "translateX(120%) rotate(15deg)"
      : swipeAnim === "up"
      ? "translateY(-120%) scale(0.9)"
      : "translateX(0) rotate(0deg)";

  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center bg-zinc-950 px-4 pb-12 relative overflow-hidden">
        {/* Ambient */}
        <div className="orb orb-orange w-72 h-72 -top-10 -left-16 opacity-25 pointer-events-none" />
        <div className="orb orb-rose w-64 h-64 top-1/3 -right-16 opacity-20 pointer-events-none" />

        {/* Header */}
        <div className="w-full max-w-sm pt-8 pb-6 text-center z-10">
          <h1 style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }} className="text-2xl font-bold text-white">
            Discover
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            {!loading && profiles.length > 0
              ? `${Math.max(0, profiles.length - currentIndex)} profiles remaining`
              : "\u00a0"}
          </p>
        </div>

        {/* Cards area */}
        <div className="relative w-full max-w-sm flex-1 flex flex-col items-center z-10">
          {loading && <CardSkeleton />}

          {!loading && error && (
            <div className="flex flex-col items-center gap-4 py-16">
              <p className="text-rose-400 text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-orange-400 text-sm border border-orange-500/30 px-4 py-2 rounded-full hover:bg-orange-500/10 transition-all"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && !currentProfile && <EmptyState />}

          {!loading && !error && currentProfile && (
            <>
              {/* Next card (peek) */}
              {nextProfile && (
                <div className="absolute inset-0 rounded-3xl overflow-hidden scale-95 opacity-60 pointer-events-none">
                  <img
                    src={nextProfile.photoUrl || PLACEHOLDER}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: "var(--gradient-card)" }} />
                </div>
              )}

              {/* Current card */}
              <div
                className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  transform: cardTransform,
                  transition: swipeAnim ? "transform 350ms cubic-bezier(0.4,0,0.2,1), opacity 350ms" : "none",
                  opacity: swipeAnim ? 0 : 1,
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Photo */}
                <img
                  src={currentProfile.photoUrl || PLACEHOLDER}
                  alt={currentProfile.displayName}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(9,9,11,0.98) 0%, rgba(9,9,11,0.5) 50%, transparent 100%)" }} />

                {/* Compatibility badge */}
                {currentProfile.compatibility && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-sm border border-zinc-700/50">
                    <span className="text-amber-400 text-xs font-bold">{currentProfile.compatibility}%</span>
                    <span className="text-zinc-500 text-xs">Match</span>
                  </div>
                )}

                {/* Profile Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {/* Name & year */}
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <h2 style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }} className="text-3xl font-bold text-white leading-tight">
                        {currentProfile.displayName}
                      </h2>
                      <p className="text-orange-400 font-medium text-sm mt-0.5">
                        {currentProfile.department} · Year {currentProfile.year}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-300 text-xs font-medium border border-zinc-700/50">
                      {currentProfile.garbaLevel}
                    </span>
                    {currentProfile.favoriteSong && (
                      <span className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 text-xs font-medium border border-orange-500/25">
                        🎵 {currentProfile.favoriteSong}
                      </span>
                    )}
                  </div>

                  {/* Bio */}
                  {currentProfile.bio && (
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                      {currentProfile.bio}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-5 mt-8 w-full">
                {/* Reject */}
                <button
                  onClick={() => handleDecision("REJECTED")}
                  className="w-14 h-14 rounded-full flex items-center justify-center bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                  aria-label="Reject"
                >
                  <RejectIcon />
                </button>

                {/* Wait */}
                <button
                  onClick={() => handleDecision("WAIT")}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-900 border border-zinc-700 text-amber-500 hover:text-amber-400 hover:border-amber-500/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-200"
                  aria-label="Wait"
                >
                  <WaitIcon />
                </button>

                {/* Accept */}
                <button
                  onClick={() => handleDecision("ACCEPTED")}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-1"
                  style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-btn)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-btn-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-btn)")}
                  aria-label="Accept"
                >
                  <AcceptIcon />
                </button>
              </div>

              {/* Hint labels */}
              <div className="flex items-center justify-center gap-10 mt-4 text-xs text-zinc-600">
                <span>Reject</span>
                <span>Wait</span>
                <span>Accept</span>
              </div>
            </>
          )}
        </div>

        {/* Confirm Accept Modal */}
        {showConfirm === "ACCEPTED" && currentProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="card-glass rounded-3xl p-8 w-full max-w-sm text-center animate-scale-in shadow-2xl">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "var(--gradient-brand)" }}>
                <span className="text-2xl">❤️</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }} className="text-2xl font-bold text-white mb-2">
                Accept {currentProfile.displayName}?
              </h2>
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                This action is <span className="text-orange-400 font-medium">permanent</span>. If they accept you too, it&apos;s a match!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(null)}
                  className="flex-1 py-3 rounded-xl text-sm font-medium border border-zinc-700 text-zinc-400 hover:bg-zinc-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAccept}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  Yes, Accept!
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
