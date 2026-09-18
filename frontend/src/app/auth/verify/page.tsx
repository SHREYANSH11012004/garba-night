"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";

export default function VerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail.endsWith("@jssaten.ac.in") && !normalizedEmail.endsWith("@jssuninoida.edu.in")) {
      setError("Use your @jssaten.ac.in or @jssuninoida.edu.in college email.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      if (step === "email") {
        await fetchApi("/auth/send-verification", {
          method: "POST",
          body: JSON.stringify({ email: normalizedEmail }),
        });
        setEmail(normalizedEmail);
        setStep("otp");
        return;
      }

      const response = await fetchApi("/auth/verify-email", {
        method: "POST",
        body: JSON.stringify({ email: normalizedEmail, otp }),
      });
      const verificationToken = response?.data?.verificationToken;
      router.push(`/auth/register?email=${encodeURIComponent(normalizedEmail)}&verificationToken=${encodeURIComponent(verificationToken)}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-950 relative overflow-hidden">
      <div className="orb orb-orange w-80 h-80 -top-20 -left-20 opacity-30 pointer-events-none" />
      <div className="orb orb-rose w-64 h-64 -bottom-16 right-0 opacity-20 pointer-events-none" />

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-zinc-800/30 rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow">
              G
            </div>
          </Link>
          <h1
            style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
            className="text-3xl font-bold text-white mt-4 mb-1"
          >
            Join the Circle
          </h1>
          <p className="text-zinc-400 text-sm text-center max-w-xs">
            Garba Partner is exclusively<br />for verified college students.
          </p>
        </div>

        {/* Card */}
        <div className="card-glass rounded-3xl p-8 shadow-2xl">
          {/* Allowed colleges */}
          <div className="flex gap-3 mb-7">
            {["JSSATEN", "JSSU Noida"].map((college) => (
              <div
                key={college}
                className="flex-1 flex items-center gap-2 p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50"
              >
                <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 text-xs font-bold">
                  🎓
                </div>
                <span className="text-zinc-300 text-xs font-medium">{college}</span>
              </div>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleContinue}>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-300">College Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  required
                  className="input-field px-4 py-3.5 text-sm"
                  placeholder="student@jssaten.ac.in"
                  disabled={step === "otp"}
                />
              </div>
              <p className="text-xs text-zinc-600">
                @jssaten.ac.in or<br />@jssuninoida.edu.in only
              </p>
              {error && <p className="text-xs text-rose-400">{error}</p>}
            </div>

            {step === "otp" && (
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-zinc-300">Verification Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                  required
                  className="input-field px-4 py-3.5 text-sm tracking-[0.35em]"
                  placeholder="000000"
                />
                <p className="text-xs text-zinc-600">Check your college inbox. The code expires in 10 minutes.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full block text-center py-4 text-base rounded-xl font-semibold"
              style={{ background: "var(--gradient-brand)" }}
            >
              {loading ? "Checking..." : step === "email" ? "Send Verification Code →" : "Verify Email →"}
            </button>
          </form>

          <div className="mt-6 text-center text-zinc-500 text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
              Sign In
            </Link>
          </div>
        </div>

        {/* Privacy note */}
        <p className="text-center text-zinc-600 text-xs mt-6 leading-relaxed">
          🔒 Your details are kept private<br />and only shared when there&apos;s a mutual match.
        </p>
      </div>
    </main>
  );
}
