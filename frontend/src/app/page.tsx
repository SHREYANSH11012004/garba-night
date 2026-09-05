import Link from "next/link";

const features = [
  {
    emoji: "🎓",
    color: "orange",
    title: "Verified Students Only",
    desc: "Exclusively for JSSATEN & JSSU Noida students. Your college email is your pass.",
  },
  {
    emoji: "💫",
    color: "rose",
    title: "Anonymous Until Mutual",
    desc: "Browse profiles privately. Details are revealed only when both hearts say yes.",
  },
  {
    emoji: "🥁",
    color: "amber",
    title: "Practice & Play Together",
    desc: "Coordinate garba sessions, vote on songs, and master the moves before the big night.",
  },
];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 flex flex-col">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="orb orb-orange w-[600px] h-[600px] -top-40 -left-20 opacity-60 animate-spin-slow"
          style={{ animationDuration: "30s" }}
        />
        <div
          className="orb orb-rose w-[500px] h-[500px] top-1/2 -right-32 opacity-50"
        />
        {/* Decorative rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-zinc-800 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-orange-900/25 rounded-full opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-rose-900/20 rounded-full opacity-40" />
      </div>

      {/* Minimal header */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white font-black shadow-lg shadow-orange-500/30">
            G
          </div>
          <span
            style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
            className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400"
          >
            Garba Partner
          </span>
        </div>
        <Link
          href="/auth/login"
          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-zinc-800/60"
        >
          Sign In
        </Link>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/25 bg-orange-500/10 text-orange-400 text-sm font-medium mb-8 animate-fade-in-up"
          style={{ animationDelay: "0ms" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          JSSATEN & JSSU Noida — Festival 2025
        </div>

        {/* Headline */}
        <h1
          style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: "100ms", fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
        >
          <span className="text-white">Find your</span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-rose-400 to-amber-400">
            Garba Partner
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          Match with verified college students. Dance together.
          <br className="hidden md:block" />
          <span className="text-zinc-300">Own the Garba night.</span>
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <Link
            href="/auth/verify"
            className="relative px-8 py-4 rounded-full font-semibold text-white text-base overflow-hidden group transition-all duration-300 shadow-lg hover:shadow-orange-500/40 hover:-translate-y-1"
            style={{ background: "var(--gradient-brand)" }}
          >
            <span className="relative z-10">Join the Circle →</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(135deg, #fb923c, #fb7185)" }} />
          </Link>
          <Link
            href="/auth/login"
            className="px-8 py-4 rounded-full font-semibold text-zinc-300 text-base border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800/80 hover:border-zinc-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
          >
            Sign In
          </Link>
        </div>

        {/* Stats */}
        <div
          className="flex flex-col sm:flex-row gap-8 mt-16 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          {[
            { value: "500+", label: "Students" },
            { value: "2", label: "Colleges" },
            { value: "100%", label: "Verified" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400"
              >
                {stat.value}
              </div>
              <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="relative p-6 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm hover:border-zinc-700/80 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${500 + i * 100}ms` }}
            >
              <div className="text-3xl mb-4">{f.emoji}</div>
              <h3
                style={{ fontFamily: "var(--font-heading, Outfit, sans-serif)" }}
                className={[
                  "text-lg font-semibold mb-2",
                  f.color === "orange" ? "text-orange-400" :
                  f.color === "rose" ? "text-rose-400" : "text-amber-400",
                ].join(" ")}
              >
                {f.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-zinc-600 text-xs border-t border-zinc-900">
        © 2025 Garba Partner · Exclusively for JSSATEN & JSSU Noida Students
      </footer>
    </main>
  );
}
