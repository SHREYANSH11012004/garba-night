import Link from "next/link";

const features = [
  ["✦", "Verified circle", "For JSSATEN and JSSU Noida students.", "#FFD54F"],
  ["◌", "Private until mutual", "Your details stay private until a mutual match.", "#00E5FF"],
  ["↗", "Practice together", "Find your rhythm and dance together.", "#E91E63"],
];

function Mandala() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
      <g fill="none" stroke="currentColor" strokeWidth="0.5">
        <circle cx="100" cy="100" r="92" strokeDasharray="1 5" />
        <circle cx="100" cy="100" r="76" />
        <circle cx="100" cy="100" r="54" strokeDasharray="3 4" />
        {Array.from({ length: 12 }).map((_, index) => <ellipse key={index} cx="100" cy="35" rx="11" ry="34" transform={`rotate(${index * 30} 100 100)`} />)}
        {Array.from({ length: 8 }).map((_, index) => <path key={index} d="M100 57 L108 92 L100 84 L92 92 Z" transform={`rotate(${index * 45} 100 100)`} />)}
      </g>
      <circle cx="100" cy="100" r="7" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B071E] text-[#F1EFF7]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_22%,rgba(233,30,99,0.18),transparent_25%),radial-gradient(circle_at_20%_90%,rgba(0,229,255,0.08),transparent_25%)]" />
      <header className="relative z-20 border-b border-[#FFB300]/20 bg-[#0B071E]/70 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#E91E63] via-[#FFB300] to-[#00E5FF] p-[2px] shadow-[0_0_26px_rgba(255,179,0,0.3)]"><span className="flex h-full w-full items-center justify-center rounded-full bg-[#060312] text-xl text-[#FFD54F]">✦</span></span>
            <span><span className="block font-[family-name:var(--font-cinzel)] text-xl font-black tracking-wide text-[#FFD54F] md:text-2xl">GarbaSangam</span><span className="block text-[9px] font-bold uppercase tracking-[0.28em] text-[#00E5FF]">Find your festive rhythm</span></span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-[#D5D0E2] md:flex"><a href="#why" className="transition-colors hover:text-[#FFD54F]">The circle</a><Link href="/auth/login" className="transition-colors hover:text-[#FFD54F]">Sign in</Link></nav>
          <Link href="/auth/verify" className="rounded-full bg-gradient-to-r from-[#E91E63] to-[#FFB300] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-[#E91E63]/20 transition-transform hover:-translate-y-0.5 sm:px-5">Join the circle</Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFB300]/40 bg-[#170E38]/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FFD54F]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#E91E63]" />Navratri 2026 · JSS verified</div>
          <h1 className="max-w-4xl font-[family-name:var(--font-cinzel)] text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">Find your perfect <span className="bg-gradient-to-r from-[#FFD54F] via-[#FFB300] to-[#E91E63] bg-clip-text text-transparent">Garba partner.</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#D5D0E2] sm:text-lg">Find verified students who love Garba, Dandiya, and festive campus nights.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/auth/verify" className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#FFB300] via-[#FF5722] to-[#E91E63] px-7 py-4 text-sm font-extrabold uppercase tracking-wider text-white shadow-xl shadow-[#FF5722]/25 transition-all hover:-translate-y-1">Find your match <span aria-hidden="true">→</span></Link><Link href="/auth/login" className="inline-flex items-center justify-center rounded-full border border-[#00E5FF]/50 bg-[#170E38]/60 px-7 py-4 text-sm font-bold uppercase tracking-wider text-[#00E5FF] transition-all hover:bg-[#00E5FF]/10">I already have an account</Link></div>
          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-7">{[["500+", "students"], ["2", "campuses"], ["100%", "verified"]].map(([value, label]) => <div key={label}><div className="font-[family-name:var(--font-cinzel)] text-2xl font-extrabold text-[#FFD54F] sm:text-3xl">{value}</div><div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#A69CC4]">{label}</div></div>)}</div>
        </div>

        <div className="relative flex min-h-[360px] items-center justify-center lg:col-span-5 lg:min-h-[500px]">
          <div className="absolute h-[360px] w-[360px] animate-spin-slow text-[#FFB300]/30 sm:h-[470px] sm:w-[470px]"><Mandala /></div><div className="absolute h-[285px] w-[285px] rounded-full border border-dashed border-[#00E5FF]/40 sm:h-[390px] sm:w-[390px]" />
          <div className="relative flex h-64 w-64 animate-float flex-col items-center justify-center rounded-full border-2 border-[#FFD54F]/50 bg-[#170E38]/70 p-8 text-center shadow-[0_0_55px_rgba(233,30,99,0.28)] backdrop-blur-xl sm:h-80 sm:w-80"><div className="mb-4 text-6xl text-[#FFD54F] drop-shadow-[0_0_20px_rgba(255,179,0,0.65)]">✦</div><div className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-white sm:text-2xl">Raas, rhythm<br />&amp; real connection</div><div className="mt-3 text-xs uppercase tracking-[0.2em] text-[#00E5FF]">Your circle is waiting</div></div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-2xl border border-[#00E5FF]/40 bg-[#170E38]/85 px-4 py-3 shadow-xl backdrop-blur-md sm:bottom-6 sm:left-4 sm:translate-x-0"><div className="text-xs font-bold text-white">Dodhiya · 3-Clap · Dandiya</div><div className="mt-1 text-[10px] text-[#A69CC4]">Find a rhythm that feels like yours</div></div>
        </div>
      </section>

      <section id="why" className="relative z-10 mx-auto max-w-7xl px-5 pb-20 md:px-10"><div className="mb-8"><div className="font-serif text-lg font-bold italic text-[#00E5FF]">Made for your campus circle</div><h2 className="mt-1 font-[family-name:var(--font-cinzel)] text-3xl font-extrabold text-white sm:text-4xl">A better way to meet on the beat.</h2></div><div className="grid grid-cols-1 gap-5 md:grid-cols-3">{features.map(([icon, title, desc, color]) => <article key={title} className="rounded-2xl border border-[#FFB300]/20 bg-[#170E38]/55 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition-transform hover:-translate-y-1 hover:border-[#00E5FF]/50"><div className="mb-5 text-3xl" style={{ color }}>{icon}</div><h3 className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-[#A69CC4]">{desc}</p></article>)}</div></section>

      <footer className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-[#FFB300]/15 px-5 py-7 text-center text-xs text-[#74659D] sm:flex-row sm:px-10 sm:text-left"><span className="font-[family-name:var(--font-cinzel)] text-base font-bold text-[#FFD54F]">GarbaSangam</span><span>For JSSATEN &amp; JSSU Noida students</span></footer>
    </main>
  );
}
