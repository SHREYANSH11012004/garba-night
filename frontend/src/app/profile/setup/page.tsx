"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";

const GARBA_LEVELS = [
  { value: "Beginner (Two Claps)", label: "Beginner", emoji: "🌱", desc: "Just learning the basics" },
  { value: "Intermediate", label: "Intermediate", emoji: "🔥", desc: "Can hold my own on the floor" },
  { value: "Advanced (Dodhiyu Master)", label: "Advanced", emoji: "⭐", desc: "I lead the circle" },
];

export default function ProfileSetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: "",
    gender: "",
    department: "",
    year: "1",
    garbaLevel: "Beginner (Two Claps)",
    favoriteSong: "",
    bio: "",
    rollNumber: "",
    photoUrl: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGarbaLevel = (value: string) => {
    setFormData({ ...formData, garbaLevel: value });
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && (!formData.displayName || !formData.gender)) {
      setError("Please fill all required fields.");
      return;
    }
    if (step === 2 && (!formData.department || !formData.rollNumber)) {
      setError("Please fill all required fields.");
      return;
    }
    setError("");
    setStep((s) => s + 1);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await fetchApi("/profile", {
        method: "POST",
        body: JSON.stringify({
          displayName: formData.displayName,
          gender: formData.gender,
          department: formData.department,
          year: parseInt(formData.year),
          garbaLevel: formData.garbaLevel,
          favoriteSong: formData.favoriteSong,
          bio: formData.bio,
          rollNumber: formData.rollNumber,
          photoUrl:
            formData.photoUrl ||
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
        }),
      });
      router.push("/discovery");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  const TOTAL_STEPS = 3;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-950 relative overflow-hidden">
      <div className="orb orb-orange w-72 h-72 top-0 right-0 opacity-25 pointer-events-none" />
      <div className="orb orb-rose w-64 h-64 bottom-0 left-0 opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg animate-fade-in-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-orange-500/30 mb-4">
            G
          </div>
          <h1 style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }} className="text-3xl font-bold text-white mb-1">
            Build Your Profile
          </h1>
          <p className="text-zinc-400 text-sm">This is how you appear to potential partners</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={[
                "h-1 flex-1 rounded-full transition-all duration-500",
                i < step ? "bg-gradient-to-r from-orange-500 to-rose-500" : "bg-zinc-800",
              ].join(" ")}
            />
          ))}
        </div>

        {/* Card */}
        <div className="card-glass rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Identity */}
          {step === 1 && (
            <form onSubmit={nextStep} className="space-y-5">
              <div className="mb-4">
                <span className="text-xs font-semibold text-orange-400 tracking-wider uppercase">Step 1 / 3 — Identity</span>
              </div>

              {/* Avatar placeholder */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors group">
                    <span className="text-3xl mb-1">📸</span>
                    <span className="text-zinc-500 text-xs group-hover:text-orange-400 transition-colors">Add Photo</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-zinc-300">Display Name *</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  required
                  className="input-field px-4 py-3.5 text-sm"
                  placeholder="How should others see you?"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-zinc-300">Gender *</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Male", "Female", "Other"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={[
                        "py-3 rounded-xl text-sm font-medium border transition-all duration-200",
                        formData.gender === g
                          ? "bg-orange-500/15 border-orange-500/40 text-orange-400"
                          : "bg-zinc-800/60 border-zinc-700/60 text-zinc-400 hover:border-zinc-600",
                      ].join(" ")}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-4 text-base rounded-xl mt-2">
                Next: College Info →
              </button>
            </form>
          )}

          {/* Step 2: College */}
          {step === 2 && (
            <form onSubmit={nextStep} className="space-y-5">
              <div className="mb-4">
                <span className="text-xs font-semibold text-orange-400 tracking-wider uppercase">Step 2 / 3 — College Info</span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-zinc-300">Department *</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="input-field px-4 py-3.5 text-sm"
                  placeholder="e.g. Computer Science"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-zinc-300">Year</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setFormData({ ...formData, year: String(y) })}
                      className={[
                        "py-3 rounded-xl text-sm font-medium border transition-all duration-200",
                        formData.year === String(y)
                          ? "bg-orange-500/15 border-orange-500/40 text-orange-400"
                          : "bg-zinc-800/60 border-zinc-700/60 text-zinc-400 hover:border-zinc-600",
                      ].join(" ")}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-zinc-300">Roll Number <span className="text-zinc-600">(private)</span></label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                  className="input-field px-4 py-3.5 text-sm"
                  placeholder="21BCEXXXX"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3.5 rounded-xl text-sm font-medium border border-zinc-700 text-zinc-400 hover:bg-zinc-800 transition-all"
                >
                  ← Back
                </button>
                <button type="submit" className="btn-primary flex-1 py-3.5 text-sm rounded-xl">
                  Next: Dance Style →
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Dance style & bio */}
          {step === 3 && (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="mb-4">
                <span className="text-xs font-semibold text-orange-400 tracking-wider uppercase">Step 3 / 3 — Dance Style</span>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">Garba Level</label>
                <div className="space-y-2">
                  {GARBA_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => handleGarbaLevel(level.value)}
                      className={[
                        "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left",
                        formData.garbaLevel === level.value
                          ? "bg-orange-500/10 border-orange-500/40"
                          : "bg-zinc-800/40 border-zinc-700/60 hover:border-zinc-600",
                      ].join(" ")}
                    >
                      <span className="text-2xl">{level.emoji}</span>
                      <div>
                        <div className={`text-sm font-semibold ${formData.garbaLevel === level.value ? "text-orange-400" : "text-white"}`}>
                          {level.label}
                        </div>
                        <div className="text-xs text-zinc-500">{level.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-zinc-300">Favorite Garba Song <span className="text-zinc-600">(optional)</span></label>
                <input
                  type="text"
                  name="favoriteSong"
                  value={formData.favoriteSong}
                  onChange={handleChange}
                  className="input-field px-4 py-3.5 text-sm"
                  placeholder="e.g. Chogada"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-zinc-300">Short Bio <span className="text-zinc-600">(optional)</span></label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="input-field px-4 py-3.5 text-sm h-24 resize-none"
                  placeholder="Looking for a partner who knows the steps..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3.5 rounded-xl text-sm font-medium border border-zinc-700 text-zinc-400 hover:bg-zinc-800 transition-all"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 py-3.5 text-sm rounded-xl"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Saving...
                    </span>
                  ) : "Save & Start Matching 🎉"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
