import { useEffect, useRef, useState } from 'react';
import HomepageV2HeroAmbient from '../components/HomepageV2HeroAmbient';
import { openDemoBookingModal } from '../utils/demoBookingModal';



// ── Why This Matters ─────────────────────────────────────────────────────────

const performerNeeds = [
  {
    label: 'Autonomy',
    body: 'Performers own their digital identity. Where it appears, how it is used, and when it is available — those decisions belong to them.',
    icon: 'control',
  },
  {
    label: 'Consent',
    body: 'Every usage requires explicit approval. No ambiguous blanket permissions, no retroactive agreements, and no grey areas.',
    icon: 'consent',
  },
  {
    label: 'Fair payment',
    body: 'When a performance generates value, the performer receives their share automatically — no chasing invoices.',
    icon: 'payment',
  },
] as const;

// ── Our Mission ───────────────────────────────────────────────────────────────

const missionSignals = [
  {
    title: 'Ownership stays with the performer',
    detail:
      'The performer remains the source of authority over how their digital identity is licensed and used.',
    icon: 'ownership',
  },
  {
    title: 'Permissions are explicit and trackable',
    detail:
      'Every approval is documented clearly, with terms that can be reviewed, enforced, and audited.',
    icon: 'permissions',
  },
  {
    title: 'Studios can create with legal clarity',
    detail:
      'Production teams get a clean operational path to access talent without ambiguity around rights.',
    icon: 'clarity',
  },
] as const;

// ── Our Vision ────────────────────────────────────────────────────────────────

const visionPoints = [
  {
    title: 'Transparent collaboration',
    body: 'Technology and talent working together — openly, fairly, and on equal footing.',
    icon: 'network',
  },
  {
    title: 'Safe participation',
    body: 'Performers can opt into new digital production methods without putting their future at risk.',
    icon: 'shield',
  },
  {
    title: 'Rights-ready access',
    body: 'Studios move forward with confidence, knowing compliance is built into the workflow from day one.',
    icon: 'checklist',
  },
] as const;

// ── Future of Performance ────────────────────────────────────────────────────

const futurePoints = [
  {
    number: '01',
    heading: 'AI will not replace performers',
    body: 'It will change how performances are created, licensed, and experienced — but performers remain the source.',
  },
  {
    number: '02',
    heading: 'The question is who sets the terms',
    body: 'Without structure, those terms get set by whoever holds distribution power. TheatreAI shifts that balance.',
  },
  {
    number: '03',
    heading: 'We are building the framework',
    body: 'A system where performers stay at the center of the AI-era creative economy — not as a footnote, but as the foundation.',
  },
];

// ── Icons ─────────────────────────────────────────────────────────────────────




function NeedMockup({ kind }: { kind: (typeof performerNeeds)[number]['icon'] }) {
  if (kind === 'control') {
    return (
      <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden border-b border-[#E5E7EB] bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6] p-4">
        {/* Decorative background grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Mockup widget */}
        <div className="relative w-full max-w-[280px] rounded-xl border border-white/80 bg-white/90 p-5 shadow-sm backdrop-blur-md">
          <div className="mb-5 flex items-center justify-between">
            <div className="h-2 w-20 rounded-full bg-[#E5E7EB]" />
            <div className="h-2 w-8 rounded-full bg-[#E5E7EB]" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-[#F3F4F6] bg-white p-3">
              <div className="flex items-center gap-3">
                <div className="size-6 rounded-md bg-[#F3F4F6]" />
                <div className="h-2 w-24 rounded-full bg-[#D1D5DB]" />
              </div>
              {/* Toggle ON */}
              <div className="flex h-5 w-9 items-center rounded-full bg-[#D61D1F] p-[3px]">
                <div className="size-3.5 translate-x-4 rounded-full bg-white shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#F3F4F6] bg-white p-3">
              <div className="flex items-center gap-3">
                <div className="size-6 rounded-md bg-[#F3F4F6]" />
                <div className="h-2 w-16 rounded-full bg-[#D1D5DB]" />
              </div>
              {/* Toggle OFF */}
              <div className="flex h-5 w-9 items-center rounded-full bg-[#E5E7EB] p-[3px]">
                <div className="size-3.5 rounded-full bg-white shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'consent') {
    return (
      <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden border-b border-[#E5E7EB] bg-gradient-to-br from-[#FFF5F5] to-[#FCE8E8] p-4">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#D61D1F_1px,transparent_1px),linear-gradient(to_bottom,#D61D1F_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Mockup widget */}
        <div className="relative w-full max-w-[240px] rounded-xl border border-white/80 bg-white/90 p-5 shadow-[0_4px_16px_rgba(214,29,31,0.06)] backdrop-blur-md">
          <div className="mb-5 flex items-start gap-4 border-b border-[#FEE2E2] pb-4">
            <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2]">
              <div className="size-3.5 rounded-full bg-[#D61D1F]" />
            </div>
            <div className="space-y-2.5 pt-1">
              <div className="h-2.5 w-24 rounded-full bg-[#9CA3AF]" />
              <div className="h-2 w-16 rounded-full bg-[#D1D5DB]" />
            </div>
          </div>
          <div className="flex gap-2.5">
            <div className="flex h-9 w-full items-center justify-center rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors">
              <div className="h-2 w-8 rounded-full bg-[#9CA3AF]" />
            </div>
            <div className="flex h-9 w-full items-center justify-center rounded-lg bg-[#D61D1F] shadow-[0_2px_4px_rgba(214,29,31,0.25)] hover:bg-[#C9191B] transition-colors">
              <div className="h-2 w-10 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden border-b border-[#E5E7EB] bg-gradient-to-br from-[#F4F9FF] to-[#EBF3FF] p-4">
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#159FFA_1px,transparent_1px),linear-gradient(to_bottom,#159FFA_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Mockup widget */}
      <div className="relative w-full max-w-[260px] rounded-xl border border-white/80 bg-white/90 p-5 shadow-[0_4px_16px_rgba(21,159,250,0.06)] backdrop-blur-md">
        <div className="mb-4 flex items-center justify-between border-b border-blue-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-7 items-center justify-center rounded-full bg-blue-100">
              <div className="size-2.5 rounded-full bg-[#159FFA]" />
            </div>
            <div className="h-2.5 w-20 rounded-full bg-[#9CA3AF]" />
          </div>
          <div className="h-2.5 w-10 rounded-full bg-[#159FFA]/80" />
        </div>
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-6 rounded-md bg-[#F3F4F6]" />
              <div className="h-2.5 w-24 rounded-full bg-[#E5E7EB]" />
            </div>
            <div className="h-2.5 w-8 rounded-full bg-[#D1D5DB]" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-6 rounded-md bg-[#F3F4F6]" />
              <div className="h-2.5 w-16 rounded-full bg-[#E5E7EB]" />
            </div>
            <div className="h-2.5 w-12 rounded-full bg-[#D1D5DB]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutUsPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const [founderImageSrc, setFounderImageSrc] = useState('/founder_image.jpeg');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsHeroInView(false);
      return;
    }

    const heroNode = heroRef.current;
    if (!heroNode) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroInView(entry.isIntersecting),
      { threshold: 0.1 },
    );

    observer.observe(heroNode);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-dvh bg-white [&_h1]:font-['Inter'] [&_h1]:tracking-[-0.02em] [&_h2]:font-['Inter'] [&_h2]:tracking-[-0.02em] [&_h3]:font-['Inter'] [&_h3]:tracking-[-0.02em]">
      {/* ── Hero (unchanged) ───────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        data-bg-animated={isHeroInView ? 'true' : 'false'}
        className="relative w-full min-h-[96dvh] overflow-hidden bg-white pb-24 pt-24 md:pb-28 md:pt-28"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <HomepageV2HeroAmbient animate={isHeroInView} />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_64%,#ffffff_100%)] md:h-64" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <div className="grid gap-10 lg:gap-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="max-w-[760px]">
              <h1 id="hero-headline" className="mt-6 text-balance text-[40px] leading-[1.06] font-medium text-[#111111] md:text-[60px]">
                The Face Behind TheatreAI
              </h1>
              <p className="mt-6 text-pretty text-[15px] leading-7 text-[#4B5563]">
                My name is <strong className="font-semibold text-[#111111]">Nehal</strong>. I started exploring acting about four years ago while also working in tech. I’m still building my career, auditioning, and learning the craft, but being in this space let me see something clearly: performers like me often feel unsure about how their voice, face, and performances can be used in the digital world.
              </p>
              <p className="mt-4 text-pretty text-[15px] leading-7 text-[#4B5563]">
                Agreements are confusing, rights are unclear, and there is no simple way to protect yourself when AI can recreate your performance. I felt that uncertainty personally and saw that many other creatives were experiencing it too.
              </p>
              <p className="mt-4 text-pretty text-[15px] leading-7 text-[#4B5563]">
                Because I also work in tech, I knew I could build a solution. I could create a system that gives performers control over their digital identity while making it safe and simple for studios to work with those assets.
              </p>
              <p className="mt-4 text-pretty text-[15px] leading-7 text-[#4B5563]">
                That idea became <strong className="font-semibold text-[#111111]">TheatreAI</strong>.
              </p>
              <p className="mt-4 text-pretty text-[15px] leading-7 text-[#4B5563]">
                It is a platform built for performers to stay in control, for studios to work with confidence, and for the creative industry to adopt new technologies responsibly.
              </p>


            </div>

            <figure className="overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
              <img
                src={founderImageSrc}
                alt="Nehal, founder of TheatreAI"
                className="h-[60dvh] w-full object-cover md:h-[68dvh] lg:h-[72dvh]"
                onError={() => {
                  if (founderImageSrc !== '/mask2.png') {
                    setFounderImageSrc('/mask2.png');
                  }
                }}
              />
              <figcaption className="border-t border-[#E5E7EB] bg-white px-4 py-3">
                <p className="text-[14px] font-medium text-[#111111]">Nehal</p>
                <p className="text-[12px] text-[#6B7280]">Founder, TheatreAI</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── Why This Matters ──────────────────────────────────────────────────── */}
      <section className="w-full py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
          {/* Header */}
          <div className="max-w-[800px]">
            <span className="inline-flex rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 text-sm font-medium text-[#159FFA]">
              Why This Matters
            </span>
            <h2 className="mt-5 text-balance text-[34px] leading-[1.08] font-medium text-[#111111] md:text-[46px]">
              A performer’s voice, likeness, and performance are not just files
            </h2>
            <p className="mt-5 text-pretty text-[17px] leading-7 text-[#4B5563]">
              As AI becomes part of filmmaking, gaming, and media, performers need clear protections from day one.
              TheatreAI is built around the three things that matter most.
            </p>
          </div>

          {/* 3-col feature cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {performerNeeds.map((need) => (
              <article
                key={need.label}
                className="group flex flex-col overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-[#FCFCFD]"
              >
                <NeedMockup kind={need.icon} />
                <div className="p-6 md:p-8">
                  <h3 className="text-[20px] font-semibold leading-tight text-[#111111]">
                    {need.label}
                  </h3>
                  <p className="mt-3 text-pretty text-[15px] leading-7 text-[#4B5563]">{need.body}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Statement strip */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-[24px] border border-[#F3F4F6] bg-gradient-to-br from-[#F9FAFB] to-white p-8 text-center sm:flex-row sm:gap-6 sm:p-10 sm:text-left">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <img src="/tai_logo.svg" alt="Theatre.ai logo" className="h-6 w-auto" />
            </div>
            <div>
              <p className="text-[18px] font-semibold leading-snug text-[#111111] sm:text-[20px]">
                TheatreAI exists to make that possible.
              </p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[#4B5563] sm:text-[16px]">
                Built for every performer, scaling securely to every production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Mission ───────────────────────────────────────────────────────── */}
      <section className="w-full py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
            {/* Left — statement */}
            <div>
              <span className="inline-flex rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 text-sm font-medium text-[#159FFA]">
                Our Mission
              </span>
              <h2 className="mt-5 text-balance text-[34px] leading-[1.08] font-medium text-[#111111] md:text-[46px]">
                To give performers clear ownership and control over their digital identity in the age of AI
              </h2>
            </div>

            {/* Right — timeline cards */}
            <div className="flex flex-col gap-8 rounded-[24px] border border-[#E5E7EB] bg-[#FCFCFD] p-6 lg:p-8">
              {missionSignals.map((signal, index) => (
                <div key={signal.title} className="relative flex items-start gap-5">
                  <div className="relative flex flex-col items-center self-stretch pt-0.5">
                    <span className="relative z-10 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F0EAEA] text-[#D61D1F] text-[13px] font-bold ring-8 ring-[#FCFCFD]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {index !== missionSignals.length - 1 && (
                      <div className="absolute top-[36px] bottom-[-34px] left-1/2 w-[2px] -translate-x-1/2 bg-[#F0EAEA]" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold leading-snug text-[#111111]">
                      {signal.title}
                    </h3>
                    <p className="mt-2 text-pretty text-[14px] leading-6 text-[#4B5563]">
                      {signal.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Vision ────────────────────────────────────────────────────────── */}
      <section className="w-full py-20 md:py-28 bg-[#F4F8FF]">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
          {/* Centered header */}
          <div className="mx-auto max-w-[860px] text-center">
            <span className="inline-flex rounded-md bg-[rgba(21,159,250,0.12)] px-3 py-1 text-sm font-medium text-[#159FFA]">
              Our Vision
            </span>
            <h2 className="mt-5 text-balance text-[34px] leading-[1.08] font-medium text-[#111111] md:text-[46px]">
              A creative industry where technology and talent work together transparently, fairly, and with trust.
            </h2>
            <p className="mt-5 text-pretty text-[17px] leading-7 text-[#4B5563]">
              The goal is not abstract policy. It is a working environment where talent can participate confidently and
              studios can move forward knowing the rights structure is already in place.
            </p>
          </div>

          {/* Vision cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {visionPoints.map((point) => (
              <article
                key={point.title}
                className="group relative flex flex-col overflow-hidden rounded-[24px] border border-[#CDDFF7] bg-white shadow-sm"
              >
                {/* Abstract Visual Section */}
                <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#F4F9FF] to-[#E5F0FF] p-6">
                  {/* Common subtle background grid */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#159FFA_1px,transparent_1px),linear-gradient(to_bottom,#159FFA_1px,transparent_1px)] [background-size:16px_16px]" />

                  {point.icon === 'network' && (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="relative z-10 size-28 md:size-32 text-[#159FFA] drop-shadow-lg transition-transform duration-300 group-hover:scale-105">
                      <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
                    </svg>
                  )}

                  {point.icon === 'shield' && (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="relative z-10 size-28 md:size-32 text-[#159FFA] drop-shadow-lg transition-transform duration-300 group-hover:scale-105">
                      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.735c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.97a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                  )}

                  {point.icon === 'checklist' && (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="relative z-10 size-28 md:size-32 text-[#159FFA] drop-shadow-lg transition-transform duration-300 group-hover:scale-105">
                      <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-6 pt-5 md:p-8 md:pt-6">
                  <h3 className="text-[19px] font-semibold leading-snug text-[#111111]">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-pretty text-[15px] leading-7 text-[#4B5563] flex-1">{point.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Future of Performance ─────────────────────────────────────────────── */}
      <section className="w-full pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
          {/* Header */}
          <div className="max-w-[680px]">
            <span className="inline-flex rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 text-sm font-medium text-[#159FFA]">
              Future of Performance
            </span>
            <h2 className="mt-5 text-balance text-[34px] leading-[1.08] font-medium text-[#111111] md:text-[46px]">
              Built for the Future of Performance
            </h2>
            <p className="mt-5 text-pretty text-[17px] leading-7 text-[#4B5563]">
              AI will change how performance is created, licensed, and deployed. The important question is whether
              performers remain central to that process.
            </p>
          </div>

          {/* Manifesto list */}
          <div className="mt-12 divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
            {futurePoints.map((point) => (
              <div
                key={point.number}
                className="grid gap-4 py-8 md:grid-cols-[80px_1fr] md:items-start md:gap-10"
              >
                <span className="text-[48px] font-bold leading-none text-[#E5E7EB] tabular-nums select-none">
                  {point.number}
                </span>
                <div>
                  <h3 className="text-[20px] font-semibold leading-snug text-[#111111]">
                    {point.heading}
                  </h3>
                  <p className="mt-2 text-pretty text-[16px] leading-7 text-[#4B5563]">
                    {point.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={openDemoBookingModal}
              className="rounded-full bg-[#D61D1F] px-7 py-3 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#C9191B]"
            >
              Get a demo
            </button>
            <p className="text-[14px] text-[#6B7280]">
              See how TheatreAI works for actors and studios alike.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
