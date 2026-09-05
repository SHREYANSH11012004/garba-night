"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [collegeIdentity, setCollegeIdentity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!email.endsWith("@jssaten.ac.in") && !email.endsWith("@jssuninoida.edu.in")) {
      setError("Only @jssaten.ac.in or @jssuninoida.edu.in emails are allowed.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetchApi("/auth/register", {
        method: "POST",
        body: JSON.stringify({ collegeIdentity, email, password }),
      });
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId || "");
        router.push("/profile/setup");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const emailValid =
    email.endsWith("@jssaten.ac.in") || email.endsWith("@jssuninoida.edu.in");
  const emailTyped = email.length > 0;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-950 relative overflow-hidden">
      <div className="orb orb-orange w-80 h-80 top-0 right-0 opacity-30 pointer-events-none" />
      <div className="orb orb-rose w-72 h-72 -bottom-16 left-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-orange-500/30">
              G
            </div>
          </Link>
          <h1 style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }} className="text-3xl font-bold text-white mt-4 mb-1">
            Create Account
          </h1>
          <p className="text-zinc-400 text-sm">Set up your Garba Partner access</p>
        </div>

        {/* Card */}
        <div className="card-glass rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleRegister}>
            {/* College ID */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-300">College Roll Number</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>
                </div>
                <input
                  type="text"
                  value={collegeIdentity}
                  onChange={(e) => setCollegeIdentity(e.target.value)}
                  required
                  className="input-field pl-10 pr-4 py-3.5 text-sm"
                  placeholder="21BCEXXXX"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-300">College Email</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={[
                    "input-field pl-10 pr-10 py-3.5 text-sm transition-all",
                    emailTyped && !emailValid ? "border-rose-500/60" : "",
                    emailTyped && emailValid ? "border-green-500/50" : "",
                  ].join(" ")}
                  placeholder="student@jssaten.ac.in"
                />
                {emailTyped && (
                  <div className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${emailValid ? "text-green-400" : "text-rose-400"}`}>
                    {emailValid ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    )}
                  </div>
                )}
              </div>
              {emailTyped && !emailValid && (
                <p className="text-xs text-rose-400">Use @jssaten.ac.in or @jssuninoida.edu.in</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-300">Create Password</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="input-field pl-10 pr-4 py-3.5 text-sm"
                  placeholder="Min 8 characters"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-300">Confirm Password</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={[
                    "input-field pl-10 pr-4 py-3.5 text-sm",
                    confirmPassword && confirmPassword !== password ? "border-rose-500/60" : "",
                    confirmPassword && confirmPassword === password && password ? "border-green-500/50" : "",
                  ].join(" ")}
                  placeholder="Repeat password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base mt-2 rounded-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Creating Account...
                </span>
              ) : "Complete Registration"}
            </button>
          </form>

          <div className="mt-6 text-center text-zinc-500 text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
              Sign In →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
