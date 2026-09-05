import Link from "next/link";

export default function VerifyPage() {
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
            Garba Partner is exclusively for verified college students.
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

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-300">College Email Address</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <input
                  type="email"
                  className="input-field pl-10 pr-4 py-3.5 text-sm"
                  placeholder="student@jssaten.ac.in"
                />
              </div>
              <p className="text-xs text-zinc-600">
                @jssaten.ac.in or @jssuninoida.edu.in only
              </p>
            </div>

            <Link
              href="/auth/register"
              className="btn-primary w-full block text-center py-4 text-base rounded-xl font-semibold"
              style={{ background: "var(--gradient-brand)" }}
            >
              Continue to Registration →
            </Link>
          </div>

          <div className="mt-6 text-center text-zinc-500 text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
              Sign In
            </Link>
          </div>
        </div>

        {/* Privacy note */}
        <p className="text-center text-zinc-600 text-xs mt-6 leading-relaxed">
          🔒 Your details are kept private and only shared when there&apos;s a mutual match.
        </p>
      </div>
    </main>
  );
}
