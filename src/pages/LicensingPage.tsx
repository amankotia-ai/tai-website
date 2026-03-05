import { type SyntheticEvent, useEffect, useRef, useState } from 'react';
import HomepageV2HeroAmbient from '../components/HomepageV2HeroAmbient';
import PreFooterCta from '../components/PreFooterCta';
import '../components/Hero.css';

type WhatTabKey = 'actors' | 'studios';

const heroSubPoints = [
  { key: 'efficiency', label: 'Organize the chaos of legal rights' },
  { key: 'industry', label: 'Built keeping the current landscape in mind' },
  { key: 'mindset', label: 'Not scared of legal issues, focused on efficiency' },
] as const;

type HeroPointKey = (typeof heroSubPoints)[number]['key'];

function HeroPointIcon({ kind }: { kind: HeroPointKey }) {
  if (kind === 'efficiency') {
    return (
      <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#159FFA]" aria-hidden="true">
        <path d="M12.667 4.667A2.667 2.667 0 0 0 10 2H6a2.667 2.667 0 0 0-2.667 2.667v6.666A2.667 2.667 0 0 0 6 14h4a2.667 2.667 0 0 0 2.667-2.667V4.667ZM11.333 4v7.333H4.667V4h6.666ZM7 6h2V4.667H7V6Z" />
      </svg>
    );
  }

  if (kind === 'industry') {
    return (
      <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#159FFA]" aria-hidden="true">
        <path d="M2.667 13.333H13.333V4H2.667v9.333ZM1.333 14.667V2.667A1.333 1.333 0 0 1 2.667 1.333H13.333A1.333 1.333 0 0 1 14.667 2.667v12H1.333ZM5.333 6h2A1.333 1.333 0 0 1 8.667 7.333v2A1.333 1.333 0 0 1 7.333 10h-2A1.333 1.333 0 0 1 4 8.667v-2A1.333 1.333 0 0 1 5.333 6ZM5.333 7.333v2h2v-2h-2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#159FFA]" aria-hidden="true">
      <path d="M8 1.333a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 8 1.333ZM2.667 8a5.333 5.333 0 1 1 10.666 0 5.333 5.333 0 0 1-10.666 0ZM7.333 8h2A1.333 1.333 0 0 1 10.667 9.333v1.334A1.333 1.333 0 0 1 9.333 12h-2A1.333 1.333 0 0 1 6 10.667V9.333A1.333 1.333 0 0 1 7.333 8Z" />
    </svg>
  );
}

type WhatCardTone = 'granted' | 'blocked' | 'neutral';

type WhatCard = {
  id: string;
  title: string;
  description: string;
};

type WhatTabContent = {
  tabLabel: string;
  title: string;
  description: string;
  cards: WhatCard[];
};

const whatSectionData: Record<WhatTabKey, WhatTabContent> = {
  actors: {
    tabLabel: 'For Actors',
    title: 'Unlock monetization while protecting your rights.',
    description:
      'Seamlessly monetize your digital assets. Keep track of every payment and license securely.',
    cards: [
      {
        id: 'actors-monetization',
        title: 'Monetization Ledger',
        description: 'See incoming royalties for your approved digital performances.',
      },
      {
        id: 'actors-payment',
        title: 'Automated Payments',
        description: 'Ensure you are paid efficiently without manual chasing.',
      },
      {
        id: 'actors-history',
        title: 'Complete Ledger',
        description: 'Track the legal status and history of all your digital appearances.',
      },
    ],
  },
  studios: {
    tabLabel: 'For Studios',
    title: 'Time effectiveness, Clarity, and Efficiency.',
    description:
      'A compliant legal framework that reduces messy negotiation and tracks everything for immediate use.',
    cards: [
      {
        id: 'studios-time',
        title: 'Time Effectiveness',
        description: 'Speed up negotiations and launch projects faster with pre-cleared rights.',
      },
      {
        id: 'studios-clarity',
        title: 'Clarity & Efficiency',
        description: 'Remove ambiguity. Know exactly what rights you own and for how long.',
      },
      {
        id: 'studios-tracking',
        title: 'Tracking Everything',
        description: 'An immutable ledger that automatically logs every generation and permission.',
      },
    ],
  },
};

type HowJourneyIconKey = 'identity' | 'consent' | 'shield' | 'ledger';

type HowJourneyStep = {
  id: string;
  title: string;
  detail: string;
  icon: HowJourneyIconKey;
  imageSrc: string;
  imageAlt: string;
  visualRows: Array<{
    label: string;
    value: string;
    tone: WhatCardTone;
  }>;
  visualNote: string;
};

type HowJourneyContent = {
  tabLabel: string;
  eyebrow: string;
  headline: string;
  description: string;
  steps: HowJourneyStep[];
};

const howJourneyData: Record<WhatTabKey, HowJourneyContent> = {
  actors: {
    tabLabel: 'For Actors',
    eyebrow: 'Actor Workflow',
    headline: 'From request to payout, fully streamlined.',
    description:
      'A dashboard to organize incoming licensing opportunities, process contracts, and manage payouts quickly.',
    steps: [
      {
        id: 'how-actors-dashboard',
        title: 'Dashboard',
        detail: 'View all your active licenses, pending requests, and overall usage stats in one place.',
        icon: 'identity',
        imageSrc: '/1.png',
        imageAlt: 'Actor Dashboard',
        visualRows: [
          { label: 'Active Projects', value: '12', tone: 'granted' },
          { label: 'Pending Requests', value: '4', tone: 'neutral' },
          { label: 'Royalties', value: '$8k', tone: 'granted' },
        ],
        visualNote: 'An overview built for immediate clarity.',
      },
      {
        id: 'how-actors-chats',
        title: 'Chats',
        detail: 'Communicate directly with studios to clarify usage terms or negotiate fees.',
        icon: 'consent',
        imageSrc: '/2.png',
        imageAlt: 'Actor Chats',
        visualRows: [
          { label: 'Active threads', value: '3', tone: 'neutral' },
          { label: 'Negotiations', value: '1 pending', tone: 'neutral' },
          { label: 'Team', value: 'Agent attached', tone: 'granted' },
        ],
        visualNote: 'Keep all dialogue right beside the contract data.',
      },
      {
        id: 'how-actors-contracts',
        title: 'Contracts',
        detail: 'Approve or reject clear, standardized legal terms for specific usage requests.',
        icon: 'shield',
        imageSrc: '/3.png',
        imageAlt: 'Actor Contracts',
        visualRows: [
          { label: 'Clearance', value: 'Signed', tone: 'granted' },
          { label: 'AI Training', value: 'Excluded', tone: 'blocked' },
          { label: 'Duration', value: '2 Years', tone: 'neutral' },
        ],
        visualNote: 'Rights are protected via a unified licensing system.',
      },
      {
        id: 'how-actors-ledger',
        title: 'Usage Ledger',
        detail: 'Watch exactly when and how your digital assets are utilized.',
        icon: 'ledger',
        imageSrc: '/Castid_hero.png',
        imageAlt: 'Actor Usage Ledger',
        visualRows: [
          { label: 'Outputs', value: '24 generated', tone: 'granted' },
          { label: 'Territory checks', value: 'Passed', tone: 'granted' },
          { label: 'Renewals', value: 'Upcoming', tone: 'neutral' },
        ],
        visualNote: 'Every generated frame leaves an auditable trail.',
      },
    ],
  },
  studios: {
    tabLabel: 'For Studios',
    eyebrow: 'Studio Workflow',
    headline: 'Clear permissions, fast compliance.',
    description:
      'Efficiently manage legal rights from drafting terms to clearing assets and tracking usage history.',
    steps: [
      {
        id: 'how-studios-dashboard',
        title: 'Dashboard',
        detail: 'Track total licensing spends, available talent, and compliance scores across all your active campaigns.',
        icon: 'identity',
        imageSrc: '/1.png',
        imageAlt: 'Studio Dashboard',
        visualRows: [
          { label: 'Active Campaigns', value: '8', tone: 'granted' },
          { label: 'Licenses Drafted', value: '32', tone: 'neutral' },
          { label: 'Compliance Index', value: '98%', tone: 'granted' },
        ],
        visualNote: 'Central command for enterprise rights management.',
      },
      {
        id: 'how-studios-chats',
        title: 'Chats',
        detail: 'Coordinate with agencies, performers, and internal legal teams directly to streamline approvals.',
        icon: 'consent',
        imageSrc: '/2.png',
        imageAlt: 'Studio Chats',
        visualRows: [
          { label: 'Approvals Pending', value: '5', tone: 'neutral' },
          { label: 'Legal team', value: 'Cleared', tone: 'granted' },
          { label: 'Agent feedback', value: 'Received', tone: 'granted' },
        ],
        visualNote: 'No more lost emails. All clearance dialogue is tracked.',
      },
      {
        id: 'how-studios-contracts',
        title: 'Contracts',
        detail: 'Generate modular, industry-standard agreements instantly mapped to the performers consent settings.',
        icon: 'shield',
        imageSrc: '/3.png',
        imageAlt: 'Studio Contracts',
        visualRows: [
          { label: 'Template match', value: '100%', tone: 'granted' },
          { label: 'Region bounds', value: 'Global', tone: 'granted' },
          { label: 'Signatures', value: 'Complete', tone: 'granted' },
        ],
        visualNote: 'Move from request to ready-to-render without friction.',
      },
      {
        id: 'how-studios-ledger',
        title: 'Usage Ledger',
        detail: 'Audit every render output against active licenses. Settle invoices and ensure clean title for your deliverables.',
        icon: 'ledger',
        imageSrc: '/Castid_hero.png',
        imageAlt: 'Studio Usage Ledger',
        visualRows: [
          { label: 'Session logs', value: 'Immutable', tone: 'granted' },
          { label: 'Settlement status', value: 'Paid in full', tone: 'granted' },
          { label: 'Audit report', value: 'Exportable', tone: 'granted' },
        ],
        visualNote: 'Never guess if a generated asset has proper clearance.',
      },
    ],
  },
};

function HowJourneyIcon({ kind }: { kind: HowJourneyIconKey }) {
  if (kind === 'identity') {
    return (
      <svg viewBox="0 0 16 16" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M8 1.7a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6ZM2.7 13.1c0-2.35 2.15-4.2 4.9-4.2h.8c2.75 0 4.9 1.85 4.9 4.2a.7.7 0 0 1-.7.7H3.4a.7.7 0 0 1-.7-.7Z" />
      </svg>
    );
  }

  if (kind === 'consent') {
    return (
      <svg viewBox="0 0 16 16" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M8 1.6A2.6 2.6 0 0 0 5.4 4.2v1.2h-.65a1.9 1.9 0 0 0-1.9 1.9v4.95a1.9 1.9 0 0 0 1.9 1.9h6.5a1.9 1.9 0 0 0 1.9-1.9V7.3a1.9 1.9 0 0 0-1.9-1.9h-.65V4.2A2.6 2.6 0 0 0 8 1.6Zm1.3 3.8H6.7V4.2a1.3 1.3 0 1 1 2.6 0v1.2Z" />
      </svg>
    );
  }

  if (kind === 'shield') {
    return (
      <svg viewBox="0 0 16 16" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M8 1.55 13.2 3.5v3.85c0 3.15-2.1 5.87-5.2 6.95-3.1-1.08-5.2-3.8-5.2-6.95V3.5L8 1.55Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="size-4" aria-hidden="true">
      <rect x="2.3" y="2.1" width="11.4" height="11.8" rx="2.1" />
      <rect x="4.6" y="5" width="6.8" height="1.1" rx="0.55" fill="#ffffff" />
      <rect x="4.6" y="7.2" width="6.8" height="1.1" rx="0.55" fill="#ffffff" />
      <rect x="4.6" y="9.4" width="4.5" height="1.1" rx="0.55" fill="#ffffff" />
    </svg>
  );
}

function HowStepPreview({
  step,
  tab,
}: {
  step: HowJourneyStep;
  tab: WhatTabKey;
}) {
  const isStudio = tab === 'studios';
  const accentSoft = isStudio ? 'bg-[#EEF8FF] text-[#159FFA]' : 'bg-[#F0EAEA] text-[#D61D1F]';
  const stageClass = isStudio ? 'text-[#159FFA]' : 'text-[#D61D1F]';

  return (
    <div className="mt-4 overflow-hidden rounded-[14px] border border-[#ECECEC] bg-white divide-y divide-[#ECECEC]">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${accentSoft}`}>
            {isStudio ? 'S' : 'A'}
          </span>
          <div>
            <p className="text-[12px] font-semibold text-[#111111]">{step.title}</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">Live Data View</p>
          </div>
        </div>
      </div>
      <div className="bg-[#F9F9FA] px-4 py-4">
        <MockPreviewImage
          src={step.imageSrc}
          alt={step.imageAlt}
          className="h-[140px] w-full rounded-md object-cover border border-[#ECECEC]"
        />
      </div>
      <div className="flex items-center justify-around bg-white px-4 py-3">
        {step.visualRows.map((r) => (
          <div key={r.label} className="flex-1 text-center">
            <p className="text-[9px] text-[var(--color-text-muted)]">{r.label}</p>
            <span className={`mt-0.5 inline-block rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${whatCardToneClass(r.tone)}`}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


function whatCardToneClass(tone: WhatCardTone): string {
  if (tone === 'granted') return 'border-[#BBF7D0] bg-[#F0FDF4] text-[#166534]';
  if (tone === 'blocked') return 'border-[#F2C8CB] bg-[#FFF1F1] text-[#D61D1F]';
  return 'border-[#ECECEC] bg-white text-[var(--color-text-muted)]';
}

function handleMockImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied === 'true') return;
  image.dataset.fallbackApplied = 'true';
  image.src = '/1.png';
}

function MockPreviewImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  return <img src={src} alt={alt} className={className} loading="lazy" onError={handleMockImageError} />;
}

function DemoDetailRow({ label, value, tone = 'neutral' }: { label: string; value: string; tone?: WhatCardTone }) {
  return (
    <div className="flex items-center justify-between rounded-[10px] bg-white px-3 py-2 border border-[#ECECEC]">
      <p className="text-[11px] text-[#111111]">{label}</p>
      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${whatCardToneClass(tone)}`}>{value}</span>
    </div>
  );
}

function WhatCardDemo({ cardId, tab, isWide }: { cardId: string; tab: WhatTabKey; isWide: boolean }) {
  const accentTagClass = tab === 'studios' ? 'bg-[#EEF8FF] text-[#159FFA]' : 'bg-[#F0EAEA] text-[#D61D1F]';
  const panelClass = 'rounded-[10px] bg-[#F9F9FA] p-3';

  if (cardId === 'actors-monetization' || cardId === 'studios-time') {
    return (
      <div className="flex h-full flex-col rounded-[16px] bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">Finance View</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>Active</span>
        </div>
        <div className="overflow-hidden rounded-[10px] border border-[#ECECEC]">
          <MockPreviewImage src="/3.png" alt="Demo" className="h-[120px] w-full object-cover" />
        </div>
        <div className={`mt-3 space-y-2 ${panelClass}`}>
          <DemoDetailRow label="Revenue/Saved" value="$4K+" tone="granted" />
          <DemoDetailRow label="Effeciency" value="High" tone="granted" />
        </div>
      </div>
    );
  }

  if (cardId === 'actors-payment' || cardId === 'studios-clarity') {
    return (
      <div className="flex h-full flex-col rounded-[16px] bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">System State</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>Automated</span>
        </div>
        <div className="overflow-hidden rounded-[10px] border border-[#ECECEC]">
          <MockPreviewImage src="/2.png" alt="Demo" className="h-[120px] w-full object-cover" />
        </div>
        <div className={`mt-3 space-y-2 ${panelClass}`}>
          <DemoDetailRow label="Legals" value="Cleared" tone="granted" />
          <DemoDetailRow label="Ambiguity" value="Zero" tone="neutral" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-[16px] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">Ledger</p>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>Secure</span>
      </div>
      <div className={`space-y-2 ${panelClass}`}>
        <DemoDetailRow label="Transaction 1" value="Logged" tone="granted" />
        <DemoDetailRow label="Transaction 2" value="Logged" tone="granted" />
        <DemoDetailRow label="Transaction 3" value="Logged" tone="granted" />
      </div>
      <div className={`mt-3 ${panelClass}`}>
        <p className="text-[10px] text-[var(--color-text-muted)]">Immutable Database</p>
        <p className="text-[11px] font-medium text-[#111111]">Every permission change is securely recorded on the blockchain.</p>
      </div>
    </div>
  );
}

export default function LicensingPage() {
  const [activeWhatTab, setActiveWhatTab] = useState<WhatTabKey>('actors');
  const [activeHowTab, setActiveHowTab] = useState<WhatTabKey>('actors');
  const [activeHowStepIndex, setActiveHowStepIndex] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const [isHeroInView, setIsHeroInView] = useState(true);

  const isStudiosWhatTab = activeWhatTab === 'studios';
  const isStudiosHowTab = activeHowTab === 'studios';
  const activeWhatTabBgColor = isStudiosWhatTab ? 'bg-[#EEF8FF]' : 'bg-[#EF4444]';
  const activeWhatTabTextColor = isStudiosWhatTab ? 'text-[#159FFA]' : 'text-white';
  const activeHowTabBgColor = isStudiosHowTab ? 'bg-[#EEF8FF]' : 'bg-[#EF4444]';
  const activeHowTabTextColor = isStudiosHowTab ? 'text-[#159FFA]' : 'text-white';

  const whatContent = whatSectionData[activeWhatTab];
  const howContent = howJourneyData[activeHowTab];
  const activeHowStep = howContent.steps[activeHowStepIndex] ?? howContent.steps[0];

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

  useEffect(() => {
    setActiveHowStepIndex(0);
  }, [activeHowTab]);

  return (
    <main className="min-h-dvh bg-white [&_h1]:font-['Inter'] [&_h1]:tracking-[-0.02em] [&_h2]:font-['Inter'] [&_h2]:tracking-[-0.02em] [&_h3]:font-['Inter'] [&_h3]:tracking-[-0.02em]">
      <section
        ref={heroRef}
        data-bg-animated={isHeroInView ? 'true' : 'false'}
        className="relative w-full min-h-dvh overflow-hidden bg-white pt-32 md:pt-36"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <HomepageV2HeroAmbient animate={isHeroInView} />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_64%,#ffffff_100%)] md:h-64" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <div className="flex h-[calc(100dvh-11rem)] items-end pb-20 md:h-[calc(100dvh-13rem)] md:pb-20">
            <div className="grid h-full w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <h1 className="max-w-[760px] text-balance text-[40px] leading-[1.06] font-medium text-[#111111] md:text-[60px]">
                  Organize the chaos. Ready for the industry.
                </h1>
                <div className="mt-6 max-w-[760px] space-y-3">
                  {heroSubPoints.map((point) => (
                    <div key={point.label} className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="inline-flex size-6 shrink-0 items-center justify-center rounded-[7px] bg-[rgba(21,159,250,0.10)]"
                      >
                        <HeroPointIcon kind={point.key} />
                      </span>
                      <p className="text-[14px] leading-6 text-[#111111] md:text-[15px]">{point.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="rounded-full bg-[#159FFA] px-8 py-3.5 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-[#1188D4]">
                    Start Licensing
                  </button>
                  <button className="rounded-full bg-[#F3F4F6] px-8 py-3.5 text-[15px] font-medium text-[#111111] transition-colors duration-200 hover:bg-[#E5E7EB]">
                    Talk to Sales
                  </button>
                </div>
              </div>

              <div className="h-[62dvh] w-auto justify-self-end overflow-hidden rounded-[24px] border border-[#ECECEC] bg-[#111111] shadow-lg aspect-[5/8] md:h-[68dvh] lg:h-[72dvh] lg:self-center">
                <video
                  src="/licensing_page_demo.mp4"
                  className="size-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="auto"
                  aria-label="Licensing hero demo video"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <span className="section-pill !mb-3 inline-flex items-center gap-2 self-start">
            <svg viewBox="0 0 16 16" className="size-3.5 text-[#159FFA]" fill="currentColor" aria-hidden="true">
              <path d="M8 1.6 13.4 4.7v6.6L8 14.4 2.6 11.3V4.7L8 1.6z" />
            </svg>
            What
          </span>
          <h2 className="max-w-[760px] text-balance text-[34px] leading-[1.08] font-medium text-[#111111] md:text-[46px]">
            {whatContent.title}
          </h2>
          <p className="mt-5 max-w-[640px] text-pretty text-[17px] leading-7 text-[var(--color-text-body)]">
            {whatContent.description}
          </p>

          <div className="mt-8 inline-flex w-fit gap-1" role="tablist" aria-label="What section views">
            {(Object.keys(whatSectionData) as WhatTabKey[]).map((tabKey) => {
              const isActive = activeWhatTab === tabKey;
              return (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => setActiveWhatTab(tabKey)}
                  className={`rounded-full px-5 py-2 text-[14px] leading-5 font-medium md:text-[16px] ${isActive ? `${activeWhatTabBgColor} ${activeWhatTabTextColor}` : 'text-[#6B7280] hover:text-[#111111]'}`}
                  aria-selected={isActive}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className={`size-2 rounded-full ${tabKey === 'studios' ? 'bg-[#159FFA]' : 'bg-[#EF4444]'}`} />
                    {whatSectionData[tabKey].tabLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-[1300px] px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1fr_1.35fr_1fr]">
            {whatContent.cards.map((card, index) => {
              const isWideCard = index === 1;

              return (
                <article key={card.title} className="flex min-w-0 flex-col rounded-[24px] bg-[#F7F7F7] p-5 lg:p-6 h-[440px]">
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <WhatCardDemo cardId={card.id} tab={activeWhatTab} isWide={isWideCard} />
                  </div>
                  <div className="shrink-0 pt-5">
                    <h3 className="text-[18px] leading-snug font-semibold text-[#111111]">{card.title}</h3>
                    <p className="mt-2 text-pretty text-[13px] leading-relaxed text-[var(--color-text-body)]">{card.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full pb-24 pt-20 md:pb-28 md:pt-24">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <span className="section-pill !mb-3 inline-flex self-start">How</span>
          <h2 className="max-w-[760px] text-balance text-[34px] leading-[1.08] font-medium text-[#111111] md:text-[46px]">
            The exact journey you will follow.
          </h2>

          <div className="mt-10 rounded-[28px] bg-[var(--color-page)] p-5 md:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div>
                <div className="inline-flex w-fit gap-1 rounded-full border border-[#DDDDDF] bg-[#F9F9FA] p-1" role="tablist" aria-label="How section audience views">
                  {(Object.keys(howJourneyData) as WhatTabKey[]).map((tabKey) => {
                    const isActive = activeHowTab === tabKey;
                    return (
                      <button
                        key={tabKey}
                        type="button"
                        role="tab"
                        id={`how-tab-${tabKey}`}
                        onClick={() => setActiveHowTab(tabKey)}
                        className={`rounded-full px-4 py-1.5 text-[14px] leading-5 font-medium md:px-5 md:py-2 md:text-[15px] ${isActive ? `${activeHowTabBgColor} ${activeHowTabTextColor}` : 'text-[#6B7280] hover:text-[#111111]'}`}
                        aria-selected={isActive}
                        aria-controls={`how-panel-${tabKey}`}
                        tabIndex={isActive ? 0 : -1}
                      >
                        <span className="inline-flex items-center gap-2">
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className={`size-2 rounded-full ${tabKey === 'studios' ? 'bg-[#159FFA]' : 'bg-[#EF4444]'}`}
                            />
                          )}
                          {howJourneyData[tabKey].tabLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="mt-5 text-[12px] font-semibold uppercase text-[var(--color-text-muted)]">
                  {howContent.eyebrow}
                </p>
                <h3 className="mt-2 max-w-[620px] text-balance text-[28px] leading-[1.1] font-medium text-[#111111] md:text-[34px]">
                  {howContent.headline}
                </h3>
                <p className="mt-3 max-w-[640px] text-pretty text-[15px] leading-7 text-[var(--color-text-body)] md:text-[16px]">
                  {howContent.description}
                </p>

                <ol className="mt-6 space-y-2">
                  {howContent.steps.map((step, index) => {
                    const isLast = index === howContent.steps.length - 1;
                    const isActive = index === activeHowStepIndex;
                    const accentBg = isStudiosHowTab ? 'bg-[#EAF3FF] text-[#159FFA]' : 'bg-[#FBEDEE] text-[#EF4444]';
                    const lineColor = isStudiosHowTab ? 'bg-[#C9DDF6]' : 'bg-[#F2C8CB]';

                    return (
                      <li key={step.id} className={`relative pl-12 py-3 ${isActive ? 'opacity-100' : 'opacity-55'}`}>
                        {!isLast && (
                          <span
                            aria-hidden="true"
                            className={`absolute left-[15px] top-[42px] h-[calc(100%-10px)] w-px ${lineColor}`}
                          />
                        )}
                        <button
                          type="button"
                          className="w-full text-left"
                          onClick={() => setActiveHowStepIndex(index)}
                        >
                          <span
                            aria-hidden="true"
                            className={`absolute top-3 left-0 inline-flex size-8 items-center justify-center rounded-[12px] ${accentBg}`}
                          >
                            <HowJourneyIcon kind={step.icon} />
                          </span>
                          <p className="text-[16px] leading-6 font-medium text-[#111111] md:text-[17px]">{step.title}</p>
                          <p className="mt-0.5 text-pretty text-[12px] leading-5 text-[#4B5563] md:text-[13px]">{step.detail}</p>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div
                id={`how-panel-${activeHowTab}`}
                role="tabpanel"
                aria-labelledby={`how-tab-${activeHowTab}`}
                className="rounded-[20px] border border-[#ECECEC] bg-white p-5 md:p-6"
              >
                <div className="mt-4 flex items-center justify-between gap-2">
                  <p className="text-[12px] font-semibold uppercase text-[var(--color-text-muted)]">{howContent.eyebrow}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${activeHowTabBgColor} ${activeHowTabTextColor}`}>
                    Step {activeHowStepIndex + 1} of {howContent.steps.length}
                  </span>
                </div>
                <h3 className="mt-2 text-balance text-[22px] leading-[1.15] font-medium text-[#111111] md:text-[24px]">
                  {activeHowStep.title}
                </h3>
                <p className="mt-2 text-pretty text-[13px] leading-6 text-[var(--color-text-body)]">
                  {activeHowStep.detail}
                </p>

                <HowStepPreview step={activeHowStep} tab={activeHowTab} />

                <p className="mt-4 text-pretty text-[12px] leading-6 text-[var(--color-text-muted)]">
                  {activeHowStep.visualNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PreFooterCta />
    </main>
  );
}
