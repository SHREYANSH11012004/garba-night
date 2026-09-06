"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import { fetchApi } from "@/lib/api";

interface Profile {
  displayName: string;
  photoUrl?: string;
  gender?: string;
  rollNumber?: string;
  year?: number;
  department?: string;
  garbaLevel?: string;
  favoriteSong?: string;
  bio?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApi("/profile/me")
      .then((response) => setProfile(response?.data ?? null))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not load your profile."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-zinc-950 px-4 py-8 sm:px-6 md:py-12">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Your Profile</h1>
              <p className="mt-2 text-sm text-zinc-500">Keep your details current for better matches.</p>
            </div>
            <Link href="/profile/setup" className="btn-primary rounded-xl px-4 py-3 text-sm">Edit profile</Link>
          </div>

          {loading && <div className="skeleton h-72 w-full rounded-3xl" />}
          {error && !loading && <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">{error}</p>}
          {!loading && !error && profile && (
            <section className="card-glass overflow-hidden rounded-3xl">
              <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:p-8">
                <img
                  src={profile.photoUrl || "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop"}
                  alt={profile.displayName}
                  className="h-28 w-28 rounded-2xl object-cover ring-2 ring-orange-500/30"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white">{profile.displayName}</h2>
                  <p className="mt-1 text-orange-400">{profile.department} · Year {profile.year}</p>
                  <p className="mt-3 text-sm text-zinc-400">{profile.bio || "Add a short bio to help people get to know you."}</p>
                </div>
              </div>
              <div className="grid gap-4 border-t border-zinc-800/70 p-5 sm:grid-cols-2 sm:p-8">
                <Detail label="Garba level" value={profile.garbaLevel} />
                <Detail label="Favorite song" value={profile.favoriteSong} />
                <Detail label="Gender" value={profile.gender} />
                <Detail label="Roll number" value={profile.rollNumber} />
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  return <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"><p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p><p className="mt-2 text-sm text-zinc-200">{value || "Not added"}</p></div>;
}