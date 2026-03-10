import { type SyntheticEvent, useEffect, useRef, useState } from 'react';
import HomepageV2HeroAmbient from '../components/HomepageV2HeroAmbient';
import PreFooterCta from '../components/PreFooterCta';
import { openDemoBookingModal } from '../utils/demoBookingModal';
import '../components/Hero.css';

type WhatTabKey = 'actors' | 'studios';

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
    title: 'Clarity, Speed, and Structure',
    description:
      'Reduce messy negotiations with standardized agreements, transparent records, and automated financial settlement.',
    cards: [
      {
        id: 'actors-approve-project-usage',
        title: 'Approve Project Usage',
        description: 'Authorize a studio to use your CastID assets within a specific production.',
      },
      {
        id: 'actors-transparent-monetization',
        title: 'Transparent Monetization',
        description: 'Track royalties and earnings generated from licensed uses of your assets.',
      },
      {
        id: 'actors-automated-payments',
        title: 'Automated Payments',
        description: 'Receive payouts automatically when licensed usage triggers payment terms.',
      },
      {
        id: 'actors-payment-history',
        title: 'Payment History',
        description: 'Access a complete record of all licenses, asset usage, and payments tied to your CastID.',
      },
    ],
  },
  studios: {
    tabLabel: 'For Studios',
    title: 'Clarity, Speed, and Structure',
    description:
      'Reduce messy negotiations with standardized agreements, transparent records, and automated financial settlement.',
    cards: [
      {
        id: 'studios-secure-usage-rights',
        title: 'Secure Usage Rights',
        description: 'Obtain permission to use a performer’s voice, likeness, or motion assets within a production.',
      },
      {
        id: 'studios-standardized-agreements',
        title: 'Standardized Agreements',
        description: 'Generate structured licensing contracts aligned with performer CastID permissions.',
      },
      {
        id: 'studios-automated-payments',
        title: 'Automated Payments',
        description: 'Trigger royalty or usage payments automatically based on licensing terms.',
      },
      {
        id: 'studios-usage-records',
        title: 'Usage Records',
        description: 'Maintain a clear history of licensing agreements, asset usage, and payments for each project.',
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
    eyebrow: 'For Actors',
    headline: 'From Request to Payout, Fully Streamlined',
    description:
      'A single workspace to review licensing requests, communicate with studios, approve contracts, and track earnings.',
    steps: [
      {
        id: 'how-actors-dashboard',
        title: 'Dashboard',
        detail: 'View all incoming licensing requests, active agreements, and usage activity in one place.',
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
        detail: 'Communicate directly with studios to clarify project details, usage terms, or fees.',
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
        title: 'Approve or Deny Contracts',
        detail: 'Review and approve standardized licensing terms for specific usage requests.',
        icon: 'shield',
        imageSrc: '/3.png',
        imageAlt: 'Actor Licensing Contracts',
        visualRows: [
          { label: 'Clearance', value: 'Signed', tone: 'granted' },
          { label: 'AI Training', value: 'Excluded', tone: 'blocked' },
          { label: 'Duration', value: '2 Years', tone: 'neutral' },
        ],
        visualNote: 'Rights are protected via a unified licensing system.',
      },
      {
        id: 'how-actors-ledger',
        title: 'Track Activity and Royalties',
        detail: 'Track when your digital assets are used and see the royalties generated from each licensed project.',
        icon: 'ledger',
        imageSrc: '/Castid_hero.png',
        imageAlt: 'Actor Royalties Activity',
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
    eyebrow: 'For Studios',
    headline: 'Clear Permissions. Faster Clearance.',
    description:
      'A single workspace to manage licensing requests, finalize agreements, and track approved asset usage across your productions.',
    steps: [
      {
        id: 'how-studios-requests',
        title: 'Submit Licensing Requests',
        detail: 'Send structured requests outlining project context, scope, and duration.',
        icon: 'identity',
        imageSrc: '/1.png',
        imageAlt: 'Studio Licensing Requests',
        visualRows: [
          { label: 'Active Campaigns', value: '8', tone: 'granted' },
          { label: 'Licenses Drafted', value: '32', tone: 'neutral' },
          { label: 'Compliance Index', value: '98%', tone: 'granted' },
        ],
        visualNote: 'Central command for enterprise rights management.',
      },
      {
        id: 'how-studios-agreements',
        title: 'Finalize Licensing Agreements',
        detail: 'Generate standardized contracts aligned with performer CastID permissions.',
        icon: 'consent',
        imageSrc: '/2.png',
        imageAlt: 'Studio Licensing Agreements',
        visualRows: [
          { label: 'Approvals Pending', value: '5', tone: 'neutral' },
          { label: 'Legal team', value: 'Cleared', tone: 'granted' },
          { label: 'Agent feedback', value: 'Received', tone: 'granted' },
        ],
        visualNote: 'No more lost emails. All clearance dialogue is tracked.',
      },
      {
        id: 'how-studios-tracking',
        title: 'Track Usage and Payments',
        detail: 'Monitor how licensed assets are used and maintain records for compliance and royalty settlement.',
        icon: 'shield',
        imageSrc: '/3.png',
        imageAlt: 'Studio Usage and Payments',
        visualRows: [
          { label: 'Template match', value: '100%', tone: 'granted' },
          { label: 'Region bounds', value: 'Global', tone: 'granted' },
          { label: 'Signatures', value: 'Complete', tone: 'granted' },
        ],
        visualNote: 'Move from request to ready-to-render without friction.',
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

function WhatCardDemo({ cardId, tab }: { cardId: string; tab: WhatTabKey }) {
  const isStudio = tab === 'studios';
  const accentSoft = isStudio ? 'bg-[#EEF8FF] text-[#159FFA]' : 'bg-[#F0EAEA] text-[#D61D1F]';
  const accentBg = isStudio ? 'bg-[#159FFA]' : 'bg-[#D61D1F]';

  // ── ACTORS ──────────────────────────────────────────────────

  if (cardId === 'actors-approve-project-usage') {
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Usage Approval</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF7ED] border border-[#FED7AA] px-2 py-0.5 text-[10px] font-semibold text-[#C2410C]">Pending</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
          <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-white text-[10px] font-bold ${accentBg}`}>AP</div>
          <div>
            <p className="text-[13px] font-semibold text-[#111111]">Apex Pictures</p>
            <p className="text-[11px] text-[#6B7280]">Verified Studio · Project Nebula</p>
          </div>
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-3 space-y-1.5">
          {[
            { label: 'Use type', value: 'Dialogue replacement' },
            { label: 'Territory', value: 'US + Canada' },
            { label: 'Duration', value: '6 months' },
            { label: 'Fee', value: '$4,500', bold: true },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between text-[11px]">
              <span className="text-[#6B7280]">{r.label}</span>
              <span className={r.bold ? 'font-bold text-[#111111]' : 'font-medium text-[#111111]'}>{r.value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button className={`flex-1 rounded-lg py-1.5 text-[12px] font-semibold text-white ${accentBg}`}>Approve</button>
          <button className="flex-1 rounded-lg border border-[#E5E7EB] bg-white py-1.5 text-[12px] font-semibold text-[#6B7280]">Decline</button>
        </div>
      </div>
    );
  }

  if (cardId === 'actors-transparent-monetization') {
    const streams = [
      { label: 'Feature voice · Nebula S1', value: '$3,200', pct: 82 },
      { label: 'Ad campaign · Nova Brands', value: '$1,100', pct: 43 },
      { label: 'Regional dub · LATAM', value: '$820', pct: 30 },
    ];
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Royalty Streams</p>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#10B981]">
            <span className="size-1.5 rounded-full bg-[#10B981] inline-block animate-pulse" />Live
          </span>
        </div>
        <div className="rounded-[10px] bg-[#FFF9F9] border border-[#F4DADB] p-3">
          <p className="text-[10px] text-[#6B7280]">Q1 2026 total earnings</p>
          <p className="text-[22px] font-bold text-[#111111] leading-tight">$5,120</p>
          <p className="text-[10px] text-[#6B7280]">across 3 active licenses</p>
        </div>
        <div className="space-y-2">
          {streams.map(s => (
            <div key={s.label} className="rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <p className="font-medium text-[#111111] truncate pr-2">{s.label}</p>
                <p className="tabular-nums font-semibold text-[#111111] shrink-0">{s.value}</p>
              </div>
              <div className="h-1.5 rounded-full bg-[#E5E7EB]">
                <div className="h-full rounded-full bg-[#10B981]" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (cardId === 'actors-automated-payments') {
    const steps = [
      { label: 'License signed', detail: 'Trigger created instantly', done: true },
      { label: 'Invoice generated', detail: 'Auto-issued · INV-EC-2026-003', done: true },
      { label: 'Payout window opens', detail: 'Net-14 · $4,050 queued', done: false },
    ];
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Payment Rails</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>Automated</span>
        </div>
        <div className="space-y-2">
          {steps.map(s => (
            <div key={s.label} className="flex items-start gap-3 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${s.done ? 'bg-[#10B981]' : 'bg-[#E5E7EB]'}`}>
                {s.done ? (
                  <svg viewBox="0 0 12 12" fill="white" className="size-3"><path fillRule="evenodd" d="M10.28 3.28a.75.75 0 010 1.06l-5.5 5.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 011.06-1.06L4.25 8.19l4.97-4.97a.75.75 0 011.06.06z" clipRule="evenodd" /></svg>
                ) : (
                  <span className="size-2 rounded-full bg-[#9CA3AF]" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-[#111111]">{s.label}</p>
                <p className="text-[10px] text-[#6B7280]">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#F0FDF4] border border-[#BBF7D0] p-2.5 flex items-center gap-2">
          <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#10B981] shrink-0"><path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm3.28 5.28a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z" clipRule="evenodd" /></svg>
          <p className="text-[11px] font-medium text-[#166534]">Wallet •••• 4821 · disbursement pending</p>
        </div>
      </div>
    );
  }

  if (cardId === 'actors-payment-history') {
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Payment History</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 text-[10px] font-semibold text-[#166534]">Audit-ready</span>
        </div>
        <div className="space-y-2">
          {[
            { id: 'INV-EC-2026-003', project: 'Atlas Game Studio', amount: '$4,500', status: 'paid' as const },
            { id: 'INV-EC-2026-002', project: 'Nova Brands', amount: '$2,800', status: 'in review' as const },
            { id: 'INV-EC-2026-001', project: 'Orbit Media', amount: '$1,200', status: 'requested' as const },
          ].map(inv => (
            <div key={inv.id} className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono text-[#9CA3AF]">{inv.id}</p>
                <p className="text-[11px] font-medium text-[#111111] truncate">{inv.project}</p>
              </div>
              <span className="shrink-0 font-semibold text-[12px] text-[#111111]">{inv.amount}</span>
              <span className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${inv.status === 'paid' ? 'bg-[#F0FDF4] text-[#166534]' : inv.status === 'in review' ? 'bg-[#EFF6FF] text-[#1D4ED8]' : 'bg-[#FFF7ED] text-[#C2410C]'}`}>{inv.status}</span>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5 flex items-center justify-between text-[11px]">
          <span className="text-[#6B7280]">Outstanding balance</span>
          <span className="font-semibold text-[#111111]">$4,000</span>
        </div>
      </div>
    );
  }

  // ── STUDIOS ─────────────────────────────────────────────────

  if (cardId === 'studios-secure-usage-rights') {
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Rights Request</p>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-semibold text-[#1D4ED8]">In Review</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold bg-[#EEF8FF] text-[#159FFA]">EC</span>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-[#111111]">Emma Chen</p>
            <p className="text-[10px] text-[#6B7280]">CastID verified · CAST-EC-2026-8821</p>
          </div>
          <span className="shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] text-[#166534]">Consent ready</span>
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-3 space-y-1.5">
          {[
            { label: 'Asset type', value: 'Voice + Likeness' },
            { label: 'Project', value: 'Nebula S1 · Dialogue' },
            { label: 'Territory', value: 'US + Canada' },
            { label: 'Training rights', value: 'Not included', warn: true },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between text-[11px]">
              <span className="text-[#6B7280]">{r.label}</span>
              <span className={`font-medium ${r.warn ? 'text-[#D61D1F]' : 'text-[#111111]'}`}>{r.value}</span>
            </div>
          ))}
        </div>
        <button className="w-full rounded-lg bg-[#159FFA] py-1.5 text-[12px] font-semibold text-white">Submit rights request</button>
      </div>
    );
  }

  if (cardId === 'studios-standardized-agreements') {
    const clauses = [
      { label: 'Usage territory', value: 'US + Canada', warn: false },
      { label: 'License duration', value: '24 months', warn: false },
      { label: 'Training clause', value: 'Excluded', warn: true },
      { label: 'Renewal rule', value: 'Manual re-approval', warn: false },
      { label: 'Derivative works', value: 'Not permitted', warn: true },
    ];
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Agreement Builder</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>Draft v1</span>
        </div>
        <div className="space-y-1.5">
          {clauses.map(c => (
            <div key={c.label} className="flex items-center justify-between rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] px-2.5 py-2">
              <div className="flex items-center gap-2">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#10B981]">
                  <svg viewBox="0 0 8 8" fill="white" className="size-2"><path fillRule="evenodd" d="M6.84 1.84a.5.5 0 010 .71l-3.5 3.5a.5.5 0 01-.71 0l-1.5-1.5a.5.5 0 01.71-.71L3 5.03l3.15-3.15a.5.5 0 01.71-.01z" clipRule="evenodd" /></svg>
                </span>
                <p className="text-[11px] font-medium text-[#111111]">{c.label}</p>
              </div>
              <span className={`text-[10px] font-semibold ${c.warn ? 'text-[#D61D1F]' : 'text-[#111111]'}`}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-[10px] bg-[#F0FDF4] border border-[#BBF7D0] p-2.5">
          <span className="size-1.5 rounded-full bg-[#10B981]" />
          <p className="text-[10px] text-[#166534] font-medium">Aligned to performer CastID permissions</p>
        </div>
      </div>
    );
  }

  if (cardId === 'studios-automated-payments') {
    const queue = [
      { id: 'INV-481', studio: 'Emma Chen · Voice', amount: '$2,400', pct: 88 },
      { id: 'INV-477', studio: 'Marcus Reid · Screen', amount: '$1,120', pct: 64 },
      { id: 'INV-472', studio: 'Yuki Tanaka · Voice', amount: '$870', pct: 41 },
    ];
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Settlement Queue</p>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#10B981]">
            <span className="size-1.5 rounded-full bg-[#10B981] inline-block" />Auto-run
          </span>
        </div>
        <div className="space-y-2">
          {queue.map(item => (
            <div key={item.id} className="rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] text-[#9CA3AF]">{item.id}</p>
                  <p className="font-medium text-[#111111] truncate">{item.studio}</p>
                </div>
                <p className="tabular-nums font-semibold text-[#111111] shrink-0 pl-2">{item.amount}</p>
              </div>
              <div className="h-1.5 rounded-full bg-[#E5E7EB]">
                <div className="h-full rounded-full bg-[#159FFA]" style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5 flex items-center justify-between text-[11px]">
          <span className="text-[#6B7280]">Total queued payouts</span>
          <span className="font-semibold text-[#111111]">$4,390</span>
        </div>
      </div>
    );
  }

  // studios-usage-records (default)
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Usage Records</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF8FF] border border-[#BFDBFE] px-2 py-0.5 text-[10px] font-semibold text-[#159FFA]">Auditable</span>
      </div>
      <div className="space-y-2">
        {[
          { event: 'License activated · Nebula S1', ref: 'LIC-EC-20260312', time: '2m ago', ok: true },
          { event: 'Territory check passed · NA', ref: 'TER-NA-0041', time: '3m ago', ok: true },
          { event: 'Settlement record stored', ref: 'INV-481 · $2,400', time: '5m ago', ok: true },
          { event: 'Renewal alert triggered', ref: 'LIC-RO-20260101 · 14d', time: '1h ago', ok: false },
        ].map(e => (
          <div key={e.ref} className="flex items-start gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
            <span className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ${e.ok ? 'bg-[#F0FDF4]' : 'bg-[#FFF7ED]'}`}>
              {e.ok ? (
                <svg viewBox="0 0 8 8" fill="currentColor" className="size-2 text-[#10B981]"><path fillRule="evenodd" d="M6.84 1.84a.5.5 0 010 .71l-3.5 3.5a.5.5 0 01-.71 0l-1.5-1.5a.5.5 0 01.71-.71L3 5.03l3.15-3.15a.5.5 0 01.71-.01z" clipRule="evenodd" /></svg>
              ) : (
                <svg viewBox="0 0 8 8" fill="currentColor" className="size-2 text-[#F59E0B]"><path d="M4 5a.5.5 0 110-1 .5.5 0 010 1zm0-3a.375.375 0 01.375.375v1.5a.375.375 0 01-.75 0v-1.5A.375.375 0 014 2z" /></svg>
              )}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-[#111111] truncate">{e.event}</p>
              <p className="text-[10px] text-[#9CA3AF] font-mono">{e.ref}</p>
            </div>
            <span className="text-[10px] text-[#9CA3AF] shrink-0">{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getGridStyles(tab: WhatTabKey, index: number) {
  const isGrey = index % 2 === 0;

  if (isGrey) {
    return {
      backgroundColor: '#F9F9FA',
      backgroundImage: `radial-gradient(#E5E7EB 1px, transparent 1px)`,
      backgroundSize: '12px 12px',
      backgroundPosition: 'center top',
    };
  }

  if (tab === 'actors') {
    return {
      backgroundColor: '#FFF1F1',
      backgroundImage: `radial-gradient(rgba(214, 29, 31, 0.2) 1px, transparent 1px)`,
      backgroundSize: '12px 12px',
      backgroundPosition: 'center top',
    };
  }

  // studios
  return {
    backgroundColor: '#EEF8FF',
    backgroundImage: `radial-gradient(rgba(21, 159, 250, 0.2) 1px, transparent 1px)`,
    backgroundSize: '12px 12px',
    backgroundPosition: 'center top',
  };
}

export default function LicensingPage() {
  const [activeWhatTab, setActiveWhatTab] = useState<WhatTabKey>('actors');
  const [activeHowTab, setActiveHowTab] = useState<WhatTabKey>('actors');
  const [activeHowStepIndex, setActiveHowStepIndex] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const whatCarouselRef = useRef<HTMLDivElement | null>(null);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const resetWhatCarouselPosition = () => {
    const carouselNode = whatCarouselRef.current;
    if (!carouselNode) return;
    carouselNode.scrollTo({ left: 0, behavior: 'auto' });
  };

  const isStudiosWhatTab = activeWhatTab === 'studios';
  const isStudiosHowTab = activeHowTab === 'studios';
  const activeWhatTabBgColor = isStudiosWhatTab ? 'bg-[#EEF8FF]' : 'bg-[#EF4444]';
  const activeWhatTabTextColor = isStudiosWhatTab ? 'text-[#159FFA]' : 'text-white';
  const activeHowTabBgColor = isStudiosHowTab ? 'bg-[#EEF8FF]' : 'bg-[#EF4444]';
  const activeHowTabTextColor = isStudiosHowTab ? 'text-[#159FFA]' : 'text-white';

  const whatContent = whatSectionData[activeWhatTab];
  const howContent = howJourneyData[activeHowTab];
  const activeHowStep = howContent.steps[activeHowStepIndex] ?? howContent.steps[0];
  const computeCarouselPl = () => {
    if (typeof window === 'undefined') return 24;
    const vw = window.innerWidth;
    if (vw >= 1300) return vw * 0.5 - 610;
    if (vw >= 768) return 40;
    return 24;
  };
  const [carouselPl, setCarouselPl] = useState(computeCarouselPl);
  const carouselLeadIn = Math.max(carouselPl - 24, 0);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHowStepIndex((prev) => (prev + 1) % howContent.steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeHowTab, activeHowStepIndex, howContent.steps.length]);

  useEffect(() => {
    const update = () => setCarouselPl(computeCarouselPl());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      resetWhatCarouselPosition();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeWhatTab]);

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
                <h1 id="hero-headline" className="max-w-[760px] text-balance text-[40px] leading-[1.06] font-medium text-[#111111] md:text-[60px]">
                  Turn Assets Into Authorized Use
                </h1>
                <p className="mt-6 max-w-[760px] text-pretty text-[17px] leading-7 text-[#4B5563]">
                  Digital assets alone don't grant the right to use a performance.
                  <br />
                  Licensing creates the agreement that allows studios to use a performer's voice, likeness, or motion assets within a defined project.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={openDemoBookingModal}
                    className="rounded-full bg-[#159FFA] px-8 py-3.5 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-[#1188D4]"
                  >
                    Get a demo
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
                  aria-label="tai your performance visual"
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whatContent.cards.map((card, index) => (
              <article key={card.title} className="flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#ECECEC] bg-white h-full">
                <div
                  className="flex h-[360px] shrink-0 items-center justify-center p-6 border-b border-[#ECECEC]"
                  style={getGridStyles(activeWhatTab, index)}
                >
                  <div className="w-full rounded-[16px] bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#ECECEC]/60">
                    <WhatCardDemo cardId={card.id} tab={activeWhatTab} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[18px] leading-snug font-semibold text-[#111111]">{card.title}</h3>
                  <p className="mt-3 text-pretty text-[13px] leading-relaxed text-[var(--color-text-body)]">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-dvh w-screen overflow-hidden">
        <img
          src="/homepage_divider_1.png"
          alt="tai your performance visual"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 top-[70%] px-6 text-center md:px-10">
          <h2 className="mx-auto max-w-[900px] text-balance text-[34px] leading-[1.08] font-medium text-[#D61D1F] md:text-[46px]">
            tai your performance
          </h2>
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
