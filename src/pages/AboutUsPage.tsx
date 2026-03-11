import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HomepageV2HeroAmbient from '../components/HomepageV2HeroAmbient';
import { openDemoBookingModal } from '../utils/demoBookingModal';



// ── Why This Matters ─────────────────────────────────────────────────────────

const performerNeeds = [
  {
    label: 'Autonomy',
    body: 'Performers decide where their digital identity appears, how it is used, and when it is available.',
    icon: 'control',
  },
  {
    label: 'Consent',
    body: 'Every use requires clear approval. No blanket permissions or retroactive agreements.',
    icon: 'consent',
  },
  {
    label: 'Fair payment',
    body: 'When a performance is generated, the performer is paid automatically. No chasing payments or approvals.',
    icon: 'payment',
  },
] as const;

// ── Our Vision ────────────────────────────────────────────────────────────────

const visionPoints = [
  {
    label: 'For performers',
    body: 'A live monitoring layer that flags when their voice, likeness, or performance appears in AI-generated content.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-[#159FFA]">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'For studios',
    body: 'Policy-forward compliance built alongside industry bodies, so productions can work with AI talent responsibly.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-[#159FFA]">
        <path fillRule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'For AI platforms',
    body: 'A certification badge for AI-generated performances created from verified and licensed digital assets.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-[#159FFA]">
        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
      </svg>
    ),
  },
] as const;

// ── Future of Performance ────────────────────────────────────────────────────

const futurePoints = [
  {
    number: '01',
    heading: 'AI will not replace performers',
    body: 'It will change how performances are created, licensed, and experienced, but performers remain the source.',
  },
  {
    number: '02',
    heading: 'The question is who sets the terms',
    body: 'Without structure, those terms get set by whoever holds distribution power. TheatreAI shifts that balance.',
  },
  {
    number: '03',
    heading: 'We are building the framework',
    body: 'A system where performers stay at the center of the AI-era creative economy, not as a footnote, but as the foundation.',
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
      <Helmet>
        <title>About Us &mdash; TheatreAI</title>
        <meta name="description" content="Meet the face behind TheatreAI. Learn why we are building the infrastructure to keep performers in control of their digital identity in the age of AI." />
        <meta property="og:title" content="About Us &mdash; TheatreAI" />
        <meta property="og:description" content="Meet the face behind TheatreAI. Learn why we are building the infrastructure to keep performers in control of their digital identity in the age of AI." />
        <meta property="og:image" content="/og_image.jpeg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us &mdash; TheatreAI" />
        <meta name="twitter:description" content="Meet the face behind TheatreAI. Learn why we are building the infrastructure to keep performers in control of their digital identity in the age of AI." />
        <meta name="twitter:image" content="/og_image.jpeg" />
      </Helmet>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        data-bg-animated={isHeroInView ? 'true' : 'false'}
        className="relative w-full overflow-hidden bg-white pb-24 pt-24 md:pb-28 md:pt-28"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <HomepageV2HeroAmbient animate={isHeroInView} />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_64%,#ffffff_100%)] md:h-64" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[800px] px-6 text-center md:px-10 flex flex-col items-center">
          <h1 id="hero-headline" className="mt-6 text-balance text-[36px] leading-[1.06] font-medium text-[#111111] md:text-[56px]">
            Face Behind TheatreAI
          </h1>

          <figure className="mt-12 overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm w-full max-w-[480px]">
            <img
              src={founderImageSrc}
              alt="Nehal, founder of TheatreAI"
              className="h-[50dvh] w-full object-cover md:h-[60dvh]"
              onError={() => {
                if (founderImageSrc !== '/mask2.png') {
                  setFounderImageSrc('/mask2.png');
                }
              }}
            />
          </figure>

          <div className="mt-12 max-w-[680px]">
            <p className="text-pretty text-[16px] leading-8 text-[#4B5563]">
              My name is <strong className="font-semibold text-[#111111]">Nehal</strong>.
            </p>
            <p className="mt-6 text-pretty text-[16px] leading-8 text-[#4B5563]">
              Four years ago I started exploring acting while building my career in tech. In May 2023, I was working as a product manager in Los Angeles when the <strong className="font-semibold text-[#111111]">Writers Guild of America strike</strong> began. Writers spent months on strike over how AI could change storytelling, authorship, and ownership in Hollywood. It was the first time the industry had to confront generative AI head on.
            </p>
            <p className="mt-6 text-pretty text-[16px] leading-8 text-[#4B5563]">
              Soon the concerns became real cases. In September 2023, <strong className="font-semibold text-[#111111]">Anil Kapoor</strong> went to court in India to stop the unauthorized use of his voice and likeness in AI generated content. The <strong className="font-semibold text-[#111111]">Delhi High Court</strong> ruled in his favor. Then in May 2024, <strong className="font-semibold text-[#111111]">Scarlett Johansson</strong> spoke out after a voice used by <strong className="font-semibold text-[#111111]">ChatGPT</strong> sounded strikingly similar to hers despite her refusing permission.
            </p>
            <p className="mt-6 text-pretty text-[16px] leading-8 text-[#4B5563]">
              It became clear that AI could recreate performances, but there was no simple way for actors to stay in control of their voice, face, or digital identity.
            </p>
            <p className="mt-6 text-pretty text-[16px] leading-8 text-[#4B5563]">
              At the same time I was auditioning, acting in short films, and learning the craft myself. Like many actors, I felt the uncertainty about where this technology was taking our industry.
            </p>
            <p className="mt-6 text-pretty text-[16px] leading-8 text-[#4B5563]">
              But I also saw something else. This was a systems problem. The kind I had spent years solving in tech.
            </p>
            <p className="mt-6 text-pretty text-[16px] leading-8 text-[#4B5563]">
              So I started researching how generative AI was reshaping the creative industries and how performances were being replicated without clear consent or ownership. After months of studying and iterating, one idea kept standing out.
            </p>
            <p className="mt-6 text-pretty text-[16px] leading-8 text-[#4B5563]">
              That idea became <strong className="font-semibold text-[#111111]">TheatreAI</strong>.
            </p>
            <p className="mt-6 text-pretty text-[16px] leading-8 text-[#4B5563]">
              A platform designed to keep performers in control of their digital identity while giving studios a trusted way to work with AI performances.
            </p>
            <p className="mt-6 text-pretty text-[16px] leading-8 text-[#4B5563]">
              In a world where AI can recreate anyone, <a href="http://theatre.ai/" target="_blank" rel="noopener noreferrer" className="text-[#159FFA] hover:underline hover:text-[#0B85DC] font-medium">TheatreAI</a> makes sure the performer and the performance are never separated.
            </p>
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
              A performer’s voice, likeness, and performance are not just files.
            </h2>
            <p className="mt-5 text-pretty text-[17px] leading-7 text-[#4B5563]">
              As AI begins to generate performances, it becomes easy for the person behind them to disappear.
              That should never happen.
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
                Theatre.ai keeps the performer connected to the performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Mission ───────────────────────────────────────────────────────── */}
      <section className="w-full py-20 md:py-28">
        <div className="mx-auto w-full max-w-[860px] px-6 md:px-10 text-center">
          <span className="inline-flex rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 text-sm font-medium text-[#159FFA]">
            Our Mission
          </span>
          <h2 className="mt-6 text-balance text-[34px] leading-[1.1] font-medium text-[#111111] md:text-[52px]">
            To ensure that AI-generated performances remain human at their core.
          </h2>
        </div>
      </section>

      {/* ── Our Vision ────────────────────────────────────────────────────────── */}
      <section className="w-full py-20 md:py-28 bg-[#F4F8FF]">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
          {/* Header */}
          <div className="max-w-[860px]">
            <span className="inline-flex rounded-md bg-[rgba(21,159,250,0.12)] px-3 py-1 text-sm font-medium text-[#159FFA]">
              Our Vision
            </span>
            <h2 className="mt-5 text-balance text-[34px] leading-[1.08] font-medium text-[#111111] md:text-[46px]">
              The Standard for AI Talent
            </h2>
            <p className="mt-5 text-pretty text-[17px] leading-7 text-[#4B5563]">
              We will become the global standard for trusted AI performances.
            </p>
          </div>

          {/* Vision cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {visionPoints.map((point) => (
              <article
                key={point.label}
                className="flex flex-col gap-4 rounded-[24px] border border-[#CDDFF7] bg-white p-6 md:p-8 shadow-sm"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] border border-[#CDDFF7]">
                  {point.icon}
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold leading-snug text-[#111111]">
                    {point.label}
                  </h3>
                  <p className="mt-2 text-pretty text-[15px] leading-7 text-[#4B5563]">{point.body}</p>
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
