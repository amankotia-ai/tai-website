import { useEffect, useRef, useState } from 'react';
import HomepageV2HeroAmbient from '../components/HomepageV2HeroAmbient';
import PreFooterCta from '../components/PreFooterCta';
import { openDemoBookingModal } from '../utils/demoBookingModal';
import '../components/Hero.css';

type WhatTabKey = 'actors' | 'studios';

const heroSubPoints = [
  { key: 'identity', label: 'Your verified identity and likeness' },
  { key: 'consent', label: 'Real time consent for every use' },
  { key: 'audit', label: 'Clear records for legal and production teams' },
] as const;

type HeroPointKey = (typeof heroSubPoints)[number]['key'];

function HeroPointIcon({ kind }: { kind: HeroPointKey }) {
  if (kind === 'identity') {
    return (
      <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#D61D1F]" aria-hidden="true">
        <path d="M8 1.333c-1.91 0-3.333 1.423-3.333 3.333 0 1.91 1.423 3.334 3.333 3.334 1.91 0 3.333-1.424 3.333-3.334S9.91 1.333 8 1.333ZM2 13.073c0-2.085 1.82-3.74 4.119-3.74h3.762C12.18 9.333 14 10.988 14 13.073c0 .28-.227.507-.507.507H2.507A.507.507 0 0 1 2 13.073Z" />
      </svg>
    );
  }

  if (kind === 'consent') {
    return (
      <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#D61D1F]" aria-hidden="true">
        <path d="M8 1.333A2.667 2.667 0 0 0 5.333 4v1.333h-.666A2 2 0 0 0 2.667 7.333v5.334a2 2 0 0 0 2 2h6.666a2 2 0 0 0 2-2V7.333a2 2 0 0 0-2-2h-.666V4A2.667 2.667 0 0 0 8 1.333Zm1.333 4h-2.666V4a1.333 1.333 0 1 1 2.666 0v1.333Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#D61D1F]" aria-hidden="true">
      <path d="M4 1.333A1.333 1.333 0 0 0 2.667 2.667v10.666A1.333 1.333 0 0 0 4 14.667h8a1.333 1.333 0 0 0 1.333-1.334V2.667A1.333 1.333 0 0 0 12 1.333H4Zm1.333 2h5.334a.667.667 0 1 1 0 1.334H5.333a.667.667 0 0 1 0-1.334Zm0 2.667h5.334a.667.667 0 1 1 0 1.333H5.333a.667.667 0 0 1 0-1.333Zm0 2.667h3.334a.667.667 0 1 1 0 1.333H5.333a.667.667 0 0 1 0-1.333Z" />
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
    title: 'One secure vault for your voice and likeness.',
    description:
      'Define consent rules, manage your assets, and track every approved use from your CastID workspace.',
    cards: [
      {
        id: 'actors-voice-assets',
        title: 'Voice Vault',
        description: 'Secure approved voice recordings with usage scope attached to every file.',
      },
      {
        id: 'actors-face-assets',
        title: 'Likeness Vault',
        description: 'Store verified face scans with built in limits for territory, duration, and derivatives.',
      },
      {
        id: 'actors-consent-rules',
        title: 'Consent Rules',
        description: 'Set the boundaries for where and how your likeness can appear.',
      },
      {
        id: 'actors-usage-ledger',
        title: 'Activity Ledger',
        description: 'See every output, approval, and renewal in one clear timeline.',
      },
    ],
  },
  studios: {
    tabLabel: 'For Studios',
    title: 'One secure vault for your voice and likeness.',
    description:
      'Define consent rules, manage your assets, and track every approved use from your CastID workspace.',
    cards: [
      {
        id: 'studios-talent-queue',
        title: 'Talent Discovery',
        description: 'Browse verified performers with rights ready identity profiles.',
      },
      {
        id: 'studios-license-draft',
        title: 'License Builder',
        description: 'Configure territory, term, and project scope before activation.',
      },
      {
        id: 'studios-policy-check',
        title: 'Compliance Check',
        description: 'Validate performer permissions and regional rights before release.',
      },
      {
        id: 'studios-settlement-ledger',
        title: 'Settlement Ledger',
        description: 'Monitor licensed usage and payment status in one place.',
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
    headline: 'How identity becomes a trusted AI asset',
    description:
      'Create your CastID, secure your assets, prepare them for AI workflows, and control exactly how they can be used.',
    steps: [
      {
        id: 'actors-how-1',
        title: 'Verify Your Performer Identity',
        detail: 'Create your CastID by confirming your credentials through your IMDb profile and a secure KYC based identity check.',
        icon: 'identity',
        imageSrc: '/Castid_hero.png',
        imageAlt: 'Actor identity onboarding',
        visualRows: [
          { label: 'Identity verification', value: 'Completed', tone: 'granted' },
          { label: 'Vault encryption', value: 'Active', tone: 'granted' },
          { label: 'Asset onboarding', value: 'In progress', tone: 'neutral' },
        ],
        visualNote: 'Every downstream request references this identity record before it can move forward.',
      },
      {
        id: 'actors-how-2',
        title: 'Secure Your Digital Assets',
        detail: 'Upload voice recordings and likeness scans that are stored with AES-256 encryption and linked directly to your CastID identity.',
        icon: 'consent',
        imageSrc: '/1.png',
        imageAlt: 'Actor consent controls',
        visualRows: [
          { label: 'Territory scope', value: 'India + APAC', tone: 'granted' },
          { label: 'Training rights', value: 'Blocked', tone: 'blocked' },
          { label: 'Renewal model', value: 'Manual approval', tone: 'neutral' },
        ],
        visualNote: 'Policies are enforced automatically so non-compliant requests are stopped early.',
      },
      {
        id: 'actors-how-3',
        title: 'Prepare Assets for AI Use',
        detail: 'Your recordings and scans are processed into structured inputs that AI systems can safely reference for voice, likeness, or motion generation.',
        icon: 'shield',
        imageSrc: '/2.png',
        imageAlt: 'Actor request review workflow',
        visualRows: [
          { label: 'Intent match', value: 'Pass', tone: 'granted' },
          { label: 'License scope', value: 'Pass', tone: 'granted' },
          { label: 'Training clause', value: 'Blocked', tone: 'blocked' },
        ],
        visualNote: 'Your decision gates activation, so no output ships without explicit performer consent.',
      },
      {
        id: 'actors-how-4',
        title: 'Control AI Access',
        detail: 'Set clear permissions for how AI can use your assets including training, generation, and derivative uses.',
        icon: 'ledger',
        imageSrc: '/3.png',
        imageAlt: 'Actor payout and audit timeline',
        visualRows: [
          { label: 'Usage log', value: 'Live', tone: 'granted' },
          { label: 'Invoice status', value: '2 pending', tone: 'neutral' },
          { label: 'Audit readiness', value: 'Exportable', tone: 'granted' },
        ],
        visualNote: 'Every approval, generation, and payment remains linked to your CastID record.',
      },
    ],
  },
  studios: {
    tabLabel: 'For Studios',
    eyebrow: 'For Studios',
    headline: 'How identity becomes a trusted AI asset',
    description:
      'Studios can verify CastID status, match talent to production scope, review registered assets, and confirm permissions before licensing.',
    steps: [
      {
        id: 'studios-how-1',
        title: 'Check CastID Status',
        detail: 'Quickly see a performer’s CastID verification, asset coverage, and permission settings, with demo previews available where allowed.',
        icon: 'identity',
        imageSrc: '/1.png',
        imageAlt: 'Studio talent sourcing dashboard',
        visualRows: [
          { label: 'Verified profiles', value: '132 active', tone: 'granted' },
          { label: 'Consent-ready talent', value: '87 available', tone: 'granted' },
          { label: 'Pending checks', value: '6 profiles', tone: 'neutral' },
        ],
        visualNote: 'Identity-first sourcing reduces legal uncertainty before drafting project terms.',
      },
      {
        id: 'studios-how-2',
        title: 'Match Talent to Project Requirements',
        detail: 'Find performers whose CastID assets and consent standards align with your project’s scope and production needs.',
        icon: 'consent',
        imageSrc: '/2.png',
        imageAlt: 'Studio licensing draft workflow',
        visualRows: [
          { label: 'Territory package', value: 'India + APAC', tone: 'granted' },
          { label: 'Training clause', value: 'Excluded', tone: 'blocked' },
          { label: 'Contract state', value: 'Draft v1', tone: 'neutral' },
        ],
        visualNote: 'Usage terms stay aligned to performer policy before legal execution begins.',
      },
      {
        id: 'studios-how-3',
        title: 'Preview Registered Assets',
        detail: 'Review demo samples of voice, likeness, or motion assets registered to a performer’s CastID.',
        icon: 'shield',
        imageSrc: '/3.png',
        imageAlt: 'Studio policy validation panel',
        visualRows: [
          { label: 'Consent scope', value: 'Pass', tone: 'granted' },
          { label: 'Territory gate', value: 'Pass', tone: 'granted' },
          { label: 'Signature state', value: 'Pending actor', tone: 'neutral' },
        ],
        visualNote: 'Guardrails catch non-compliant terms early so launch timelines stay predictable.',
      },
      {
        id: 'studios-how-4',
        title: 'View Permission Settings',
        detail: 'See what types of AI usage a performer has approved before moving forward with licensing.',
        icon: 'ledger',
        imageSrc: '/Castid_hero.png',
        imageAlt: 'Studio settlement and audit ledger',
        visualRows: [
          { label: 'License lifecycle', value: 'Active', tone: 'granted' },
          { label: 'Settlement queue', value: '3 invoices', tone: 'neutral' },
          { label: 'Audit package', value: 'Ready', tone: 'granted' },
        ],
        visualNote: 'Final delivery and payout are fully traceable for internal and external review.',
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
  const accentColor = isStudio ? '#159FFA' : '#D61D1F';
  const accentSoft = isStudio ? 'bg-[#EEF8FF] text-[#159FFA]' : 'bg-[#F0EAEA] text-[#D61D1F]';
  const accentBg = isStudio ? 'bg-[#159FFA]' : 'bg-[#D61D1F]';
  const accentLine = isStudio ? 'bg-[#BFDBFE]' : 'bg-[#F2C8CB]';
  const stage = step.id.slice(-1);

  /* ── Step 1: Vault setup (Actor) / Talent sourcing (Studio) ── */
  if (stage === '1') {
    if (isStudio) {
      // Studio: Talent filter shortlist — search-style panel with CastID trust indicators
      const filters = ['Voice', 'Face', 'Screen', 'AI-ready'];
      const talent = [
        { initials: 'AS', name: 'Arjun Sharma', type: 'Voice · Mumbai', id: 'CAST-AS-2026-8821', score: 98, ready: true },
        { initials: 'PN', name: 'Priya Nair', type: 'Voice+Screen · Chennai', id: 'CAST-PN-2026-4412', score: 94, ready: true },
        { initials: 'RM', name: 'Rahul Mehta', type: 'Screen · Delhi', id: 'CAST-RM-2026-7705', score: 81, ready: false },
      ];
      return (
        <div className="mt-4 overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
          {/* Filter bar */}
          <div className="flex items-center gap-2 bg-[#FAFAFA] px-4 py-3 flex-wrap">
            <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase shrink-0">Filter:</p>
            {filters.map((f, i) => (
              <span key={f} className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${i < 2 ? accentSoft : 'bg-white border border-[#ECECEC] text-[#6B7280]'}`}>{f}</span>
            ))}
            <span className="ml-auto text-[10px] text-[#6B7280]">87 results</span>
          </div>
          {/* Talent rows */}
          {talent.map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-3 bg-white px-4 py-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${accentSoft}`}>{t.initials}</span>
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-medium text-[#111111]">{t.name}</p>
                  <p className="text-[10px] text-[#6B7280]">{t.type} · Trust {t.score}</p>
                </div>
              </div>
              <span className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${t.ready ? whatCardToneClass('granted') : whatCardToneClass('neutral')}`}>
                {t.ready ? 'Consent ready' : 'Pending'}
              </span>
            </div>
          ))}
          {/* Summary footer */}
          <div className="flex items-center justify-around bg-[#FAFAFA] px-4 py-3">
            {[['132', 'Verified profiles'], ['87', 'Consent-ready'], ['6', 'Pending']].map(([val, lbl]) => (
              <div key={lbl} className="flex-1 text-center">
                <p className="text-[11px] font-semibold text-[#111111]">{val}</p>
                <p className="text-[9px] text-[#6B7280]">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Actor: CastID vault setup — identity card + asset onboarding progress
    const assets = [
      { name: 'voice_primary_take.wav', type: 'WAV', size: '4.3 MB', status: 'Verified', tone: 'granted' as WhatCardTone },
      { name: 'face_scan_neutral.4d', type: '4D', size: '12.8 MB', status: 'Verified', tone: 'granted' as WhatCardTone },
      { name: 'voice_alt_take.wav', type: 'WAV', size: '3.1 MB', status: 'Pending', tone: 'neutral' as WhatCardTone },
    ];
    return (
      <div className="mt-4 overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
        {/* Identity header */}
        <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${accentSoft}`}>AS</span>
            <div>
              <p className="text-[12px] font-semibold text-[#111111]">Arjun Sharma · Performer</p>
              <p className="text-[10px] text-[#6B7280]">CAST-AS-2026-8821</p>
            </div>
          </div>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>Verified</span>
        </div>
        {/* Vault setup checklist */}
        <div className="bg-white px-4 py-3">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Vault setup</p>
          <div className="space-y-1.5">
            {[
              { label: 'Identity verification', done: true },
              { label: 'Vault encryption', done: true },
              { label: 'Asset onboarding', done: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`size-1.5 shrink-0 rounded-full ${item.done ? 'bg-[#10B981]' : 'bg-[#F59E0B]'}`} />
                <p className="text-[11px] text-[#111111]">{item.label}</p>
                <span className={`ml-auto rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${whatCardToneClass(item.done ? 'granted' : 'neutral')}`}>
                  {item.done ? 'Done' : 'In progress'}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Asset rows */}
        {assets.map((f) => (
          <div key={f.name} className="flex items-center justify-between gap-3 bg-white px-4 py-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`inline-flex h-5 min-w-[28px] shrink-0 items-center justify-center rounded-[5px] text-[9px] font-bold ${accentSoft}`}>{f.type}</span>
              <p className="min-w-0 truncate text-[11px] font-medium text-[#111111]">{f.name}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="text-[10px] text-[#6B7280]">{f.size}</span>
              <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${whatCardToneClass(f.tone)}`}>{f.status}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ── Step 2: Consent vault (Actor) / License deal builder (Studio) ── */
  if (stage === '2') {
    if (isStudio) {
      // Studio: License scope builder — territory chips, fee structure, duration bar
      return (
        <div className="mt-4 overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
          <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
            <div>
              <p className="text-[12px] font-semibold text-[#111111]">License Draft v1</p>
              <p className="text-[10px] text-[#6B7280]">Project: Brahmastra 2 · Arjun Sharma · Voice</p>
            </div>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>Draft saved</span>
          </div>
          {/* Territory chips */}
          <div className="bg-white px-4 py-3">
            <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Territory scope</p>
            <div className="flex flex-wrap gap-1.5">
              {['India', 'APAC', 'UAE'].map((t) => (
                <span key={t} className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${accentSoft}`}>{t}</span>
              ))}
              <span className="rounded-full border border-dashed border-[#D1D5DB] px-2.5 py-0.5 text-[10px] text-[#9CA3AF]">+ Add region</span>
            </div>
          </div>
          {/* Fee + constraints */}
          <div className="bg-white px-4 py-3 space-y-1.5">
            <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Terms</p>
            {[
              { label: 'Base license fee', value: '$8,000', highlight: false },
              { label: 'AI training rights', value: 'Excluded', highlight: true },
              { label: 'Contract state', value: 'Draft v1', highlight: false },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between">
                <p className="text-[11px] text-[#6B7280]">{r.label}</p>
                <p className={`text-[11px] font-semibold ${r.highlight ? 'text-[#D61D1F]' : 'text-[#111111]'}`}>{r.value}</p>
              </div>
            ))}
          </div>
          {/* Duration bar */}
          <div className="bg-[#FAFAFA] px-4 py-3">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] text-[#6B7280]">License window</p>
              <p className="text-[10px] font-semibold text-[#111111]">12 months</p>
            </div>
            <div className="h-1.5 rounded-full bg-[#ECECEC]">
              <div className={`h-full w-[80%] rounded-full ${accentBg}`} />
            </div>
            <div className="mt-1 flex justify-between">
              <p className="text-[9px] text-[#9CA3AF]">Mar 2026</p>
              <p className="text-[9px] text-[#9CA3AF]">Mar 2027</p>
            </div>
          </div>
        </div>
      );
    }

    // Actor: Consent vault — permission tile grid (allow vs block)
    const permissions = [
      { label: 'Commercial use', icon: '✓', allowed: true },
      { label: 'Voice synthesis', icon: '✓', allowed: true },
      { label: 'Training data', icon: '✗', allowed: false },
      { label: 'Face / likeness', icon: '✗', allowed: false },
      { label: 'India + APAC', icon: '✓', allowed: true },
      { label: 'Derivative works', icon: '✗', allowed: false },
    ];
    return (
      <div className="mt-4 overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
        <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
          <div>
            <p className="text-[12px] font-semibold text-[#111111]">Consent Policy v4.2</p>
            <p className="text-[10px] text-[#6B7280]">Emma Chen · CAST-EC-2026-8821</p>
          </div>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>Active</span>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2.5">Your permissions</p>
          <div className="grid grid-cols-2 gap-2">
            {permissions.map((p) => (
              <div
                key={p.label}
                className={`flex items-center gap-2 rounded-[8px] border px-2.5 py-2 ${p.allowed ? 'border-[#BBF7D0] bg-[#F0FDF4]' : 'border-[#F2C8CB] bg-[#FFF9F9]'}`}
              >
                <span className={`text-[11px] font-bold ${p.allowed ? 'text-[#10B981]' : 'text-[#D61D1F]'}`}>{p.icon}</span>
                <p className={`text-[11px] font-medium leading-tight ${p.allowed ? 'text-[#166534]' : 'text-[#991B1B]'}`}>{p.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#FAFAFA] px-4 py-2.5">
          <span className="size-1.5 rounded-full bg-[#10B981]" />
          <p className="text-[10px] text-[#6B7280]">Policy enforced automatically on all incoming requests</p>
        </div>
      </div>
    );
  }

  /* ── Step 3: Request review + policy match (Actor) / Pre-activation guardrail (Studio) ── */
  if (stage === '3') {
    if (isStudio) {
      // Studio: Grouped pre-activation guardrail — section-level validation
      const sections = [
        {
          title: 'Identity & CastID',
          items: ['CastID identity verified', 'Performer profile active'],
          pass: true,
        },
        {
          title: 'Consent scope',
          items: ['Consent scope matches request', 'Training clause excluded'],
          pass: true,
        },
        {
          title: 'Signatures & contracts',
          items: ['Studio signature complete', 'Actor signature pending'],
          pass: false,
        },
      ];
      const passCount = sections.filter((s) => s.pass).length;
      const pct = Math.round((passCount / sections.length) * 100);
      return (
        <div className="mt-4 overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
          <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
            <p className="text-[12px] font-semibold text-[#111111]">Pre-activation Guardrail · Brahmastra 2 Ep.1</p>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>{passCount}/{sections.length} clear</span>
          </div>
          {sections.map((s) => (
            <div key={s.title} className="bg-white px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold text-[#111111]">{s.title}</p>
                <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${whatCardToneClass(s.pass ? 'granted' : 'neutral')}`}>
                  {s.pass ? 'Cleared' : 'Pending'}
                </span>
              </div>
              <div className="space-y-1">
                {s.items.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className={`size-1.5 shrink-0 rounded-full ${s.pass ? 'bg-[#10B981]' : 'bg-[#F59E0B]'}`} />
                    <p className="text-[11px] text-[#6B7280]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3 bg-[#FAFAFA] px-4 py-3">
            <p className="shrink-0 text-[11px] text-[#6B7280]">Overall</p>
            <div className="flex-1 h-1.5 rounded-full bg-[#ECECEC]">
              <div className={`h-full rounded-full ${accentBg}`} style={{ width: `${pct}%` }} />
            </div>
            <p className="shrink-0 text-[11px] font-semibold" style={{ color: accentColor }}>{pct}%</p>
          </div>
        </div>
      );
    }

    // Actor: Incoming request matched against your consent rules — two-column table + CTA
    const rules = [
      { rule: 'Territory', yours: 'India + APAC', request: 'India + UAE', match: true },
      { rule: 'Training', yours: 'Blocked', request: 'Not requested', match: true },
      { rule: 'Duration', yours: '≤ 12 mo', request: '6 months', match: true },
      { rule: 'Use type', yours: 'Commercial', request: 'Dialogue rep.', match: true },
    ];
    return (
      <div className="mt-4 overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
        <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
          <p className="text-[12px] font-semibold text-[#111111]">Consent screening · REQ-2026-0841</p>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>4/4 match</span>
        </div>
        {/* Column headers */}
        <div className="grid grid-cols-[72px_1fr_1fr] gap-2 bg-[#FAFAFA] px-4 py-2">
          <p className="text-[9px] font-semibold text-[#9CA3AF] uppercase">Rule</p>
          <p className="text-[9px] font-semibold text-[#9CA3AF] uppercase">Your policy</p>
          <p className="text-[9px] font-semibold text-[#9CA3AF] uppercase">Request</p>
        </div>
        {rules.map((r) => (
          <div key={r.rule} className="grid grid-cols-[72px_1fr_1fr] items-center gap-2 bg-white px-4 py-2.5">
            <p className="text-[11px] text-[#6B7280]">{r.rule}</p>
            <p className="text-[11px] font-medium text-[#111111] truncate">{r.yours}</p>
            <div className="flex items-center gap-1.5">
              <span className={`size-1.5 shrink-0 rounded-full ${r.match ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`} />
              <p className="text-[11px] text-[#111111] truncate">{r.request}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-3 bg-[#FAFAFA] px-4 py-3">
          <button type="button" className="flex-1 rounded-[8px] border border-[#ECECEC] bg-white py-1.5 text-[11px] font-semibold text-[#6B7280]">Decline</button>
          <button type="button" className={`flex-1 rounded-[8px] py-1.5 text-[11px] font-semibold text-white ${accentBg}`}>Approve</button>
        </div>
      </div>
    );
  }

  /* ── Step 4: Per-use earnings (Actor) / Invoice settlement (Studio) ── */
  if (isStudio) {
    // Studio: Invoice workflow — bill-to/from, line items, payment status progression
    return (
      <div className="mt-4 overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
        <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
          <div>
            <p className="text-[12px] font-semibold text-[#111111]">Invoice · INV-B2-2026-021</p>
            <p className="text-[10px] text-[#6B7280]">Brahmastra 2 · Arjun Sharma · Voice</p>
          </div>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>Approved</span>
        </div>
        {/* Bill-to/from */}
        <div className="grid grid-cols-2 divide-x divide-[#ECECEC] bg-white">
          <div className="px-4 py-3">
            <p className="text-[9px] font-semibold text-[#9CA3AF] uppercase mb-1">Bill from</p>
            <p className="text-[11px] font-medium text-[#111111]">Arjun Sharma</p>
            <p className="text-[9px] text-[#6B7280]">Performer · CastID verified</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[9px] font-semibold text-[#9CA3AF] uppercase mb-1">Bill to</p>
            <p className="text-[11px] font-medium text-[#111111]">Dharma Productions</p>
            <p className="text-[9px] text-[#6B7280]">Studio · Brahmastra 2</p>
          </div>
        </div>
        {/* Line items */}
        <div className="bg-white px-4 py-3 space-y-1.5">
          {[
            { desc: 'Base license fee', amount: '$8,000' },
            { desc: 'Platform fee (10%)', amount: '−$800' },
          ].map((item) => (
            <div key={item.desc} className="flex items-center justify-between">
              <p className="text-[11px] text-[#6B7280]">{item.desc}</p>
              <p className="text-[11px] font-medium text-[#111111]">{item.amount}</p>
            </div>
          ))}
          <div className="border-t border-[#ECECEC] pt-1.5 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-[#111111]">Net payout</p>
            <p className="text-[12px] font-semibold text-[#111111]">$7,200</p>
          </div>
        </div>
        {/* Payment status bar */}
        <div className="bg-[#FAFAFA] px-4 py-3">
          <p className="text-[10px] text-[#6B7280] mb-2">Payment status</p>
          <div className="flex items-center gap-1">
            {['Issued', 'Approved', 'Processing', 'Paid'].map((stage, i) => (
              <div key={stage} className="flex flex-1 flex-col items-center gap-1">
                <div className={`h-1.5 w-full rounded-full ${i < 3 ? accentBg : 'bg-[#D1D5DB]'}`} />
                <p className="text-[8px] text-[#9CA3AF] text-center">{stage}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Actor: Per-use earnings log — running total hero + event timeline
  const usageEvents = [
    { id: 'USE-884', desc: 'Trailer cutdown · 30 sec', payout: '+$420', date: 'Mar 2', tone: 'granted' as WhatCardTone },
    { id: 'USE-885', desc: 'Dialogue replace · Ep.4', payout: '+$1,100', date: 'Mar 3', tone: 'granted' as WhatCardTone },
    { id: 'USE-886', desc: 'Regional dub · South India', payout: 'Pending', date: 'Mar 5', tone: 'neutral' as WhatCardTone },
  ];
  return (
    <div className="mt-4 overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
      {/* Earnings hero */}
      <div className="flex items-center justify-between gap-3 bg-[#FFF9F9] px-4 py-4">
        <div>
          <p className="text-[10px] text-[#6B7280]">Q1 2026 earnings</p>
          <p className="text-[22px] font-bold text-[#111111] leading-tight">$1,520</p>
          <p className="text-[10px] text-[#6B7280]">across 2 approved events</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-[#6B7280]">Next payout</p>
          <p className="text-[11px] font-semibold" style={{ color: accentColor }}>Mar 15, 2026</p>
        </div>
      </div>
      {/* Per-use events */}
      {usageEvents.map((entry, index) => (
        <div key={entry.id} className="relative flex items-center justify-between gap-3 bg-white pl-9 pr-4 py-3">
          {index !== usageEvents.length - 1 && (
            <span aria-hidden="true" className={`absolute left-[19px] top-[34px] h-[calc(100%-10px)] w-px ${accentLine}`} />
          )}
          <span aria-hidden="true" className={`absolute left-4 top-[18px] size-2 rounded-full ${accentBg}`} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium text-[#111111]">{entry.desc}</p>
            <p className="text-[9px] text-[#6B7280]">{entry.id} · {entry.date}</p>
          </div>
          <span className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${whatCardToneClass(entry.tone)}`}>
            {entry.payout}
          </span>
        </div>
      ))}
      {/* Summary footer */}
      <div className="flex items-center justify-around bg-[#FAFAFA] px-4 py-3">
        {[['Live', 'Usage log'], ['1 pending', 'Payout'], ['Exportable', 'Audit trail']].map(([val, lbl]) => (
          <div key={lbl} className="flex-1 text-center">
            <p className="text-[11px] font-semibold text-[#111111]">{val}</p>
            <p className="text-[9px] text-[#6B7280]">{lbl}</p>
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


function WhatCardDemo({
  cardId,
  tab,
}: {
  cardId: string;
  tab: WhatTabKey;
}) {
  const isStudio = tab === 'studios';
  const accentSoft = isStudio ? 'bg-[#EEF8FF] text-[#159FFA]' : 'bg-[#F0EAEA] text-[#D61D1F]';
  const accentBg = isStudio ? 'bg-[#159FFA]' : 'bg-[#D61D1F]';

  if (cardId === 'actors-voice-assets') {
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Voice Vault</p>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>
            <span className="size-1.5 rounded-full bg-[#10B981] inline-block" />Active
          </span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'hero_take_v3.wav', type: 'WAV', size: '4.3 MB', status: 'Verified', tone: 'granted' as WhatCardTone },
            { name: 'scene_04_alt.wav', type: 'WAV', size: '3.1 MB', status: 'Verified', tone: 'granted' as WhatCardTone },
            { name: 'voice_alt_take.wav', type: 'WAV', size: '2.8 MB', status: 'Pending', tone: 'neutral' as WhatCardTone },
          ].map(f => (
            <div key={f.name} className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <div className={`flex size-7 shrink-0 items-center justify-center rounded-md text-[8px] font-bold text-white ${accentBg}`}>{f.type}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-[#111111] truncate">{f.name}</p>
                <p className="text-[10px] text-[#6B7280]">{f.size}</p>
              </div>
              <span className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${whatCardToneClass(f.tone)}`}>{f.status}</span>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5 space-y-1.5">
          {[
            { label: 'Scope', value: 'Project-only' },
            { label: 'Training rights', value: 'Blocked', warn: true },
            { label: 'Expiry', value: '12 months' },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between text-[11px]">
              <span className="text-[#6B7280]">{r.label}</span>
              <span className={`font-medium ${r.warn ? 'text-[#D61D1F]' : 'text-[#111111]'}`}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (cardId === 'actors-face-assets') {
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Likeness Vault</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>Image set</span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'face_scan_neutral.4d', type: '4D', size: '12.8 MB', status: 'Verified', tone: 'granted' as WhatCardTone },
            { name: 'face_expressions_b.4d', type: '4D', size: '9.4 MB', status: 'Verified', tone: 'granted' as WhatCardTone },
            { name: 'face_alt_angle.jpg', type: 'IMG', size: '3.2 MB', status: 'Pending', tone: 'neutral' as WhatCardTone },
          ].map(f => (
            <div key={f.name} className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <div className={`flex size-7 shrink-0 items-center justify-center rounded-md text-[8px] font-bold text-white ${accentBg}`}>{f.type}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-[#111111] truncate">{f.name}</p>
                <p className="text-[10px] text-[#6B7280]">{f.size}</p>
              </div>
              <span className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${whatCardToneClass(f.tone)}`}>{f.status}</span>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5 space-y-1.5">
          {[
            { label: 'Capture pack', value: '4D set' },
            { label: 'Ownership hash', value: 'Locked' },
            { label: 'Derivative use', value: 'Blocked', warn: true },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between text-[11px]">
              <span className="text-[#6B7280]">{r.label}</span>
              <span className={`font-medium ${r.warn ? 'text-[#D61D1F]' : 'text-[#111111]'}`}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (cardId === 'actors-consent-rules') {
    const permissions = [
      { label: 'Commercial use', allowed: true },
      { label: 'Voice synthesis', allowed: true },
      { label: 'Training data', allowed: false },
      { label: 'Face / likeness', allowed: false },
      { label: 'India + APAC', allowed: true },
      { label: 'Derivative works', allowed: false },
    ];
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Consent Policy v4.2</p>
          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold text-[#10B981]`}>
            <span className="size-1.5 rounded-full bg-[#10B981] inline-block" />Active
          </span>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2.5">Your permissions</p>
          <div className="grid grid-cols-2 gap-2">
            {permissions.map((p) => (
              <div
                key={p.label}
                className={`flex items-center gap-2 rounded-[8px] border px-2.5 py-2 ${p.allowed ? 'border-[#BBF7D0] bg-[#F0FDF4]' : 'border-[#F2C8CB] bg-[#FFF9F9]'}`}
              >
                <span className={`text-[11px] font-bold ${p.allowed ? 'text-[#10B981]' : 'text-[#D61D1F]'}`}>{p.allowed ? '✓' : '✗'}</span>
                <p className={`text-[11px] font-medium leading-tight ${p.allowed ? 'text-[#166534]' : 'text-[#991B1B]'}`}>{p.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
          <span className="size-1.5 rounded-full bg-[#10B981]" />
          <p className="text-[10px] text-[#6B7280]">Policy enforced automatically on all incoming requests</p>
        </div>
      </div>
    );
  }

  if (cardId === 'actors-usage-ledger') {
    const usageEvents = [
      { id: 'USE-884', desc: 'Trailer cutdown · 30 sec', payout: '+$420', date: 'Mar 2', tone: 'granted' as WhatCardTone },
      { id: 'USE-885', desc: 'Dialogue replace · Ep.4', payout: '+$1,100', date: 'Mar 3', tone: 'granted' as WhatCardTone },
      { id: 'USE-886', desc: 'Regional dub · South India', payout: 'Pending', date: 'Mar 5', tone: 'neutral' as WhatCardTone },
    ];
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Activity Ledger</p>
          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold text-[#10B981]`}>
            <span className="size-1.5 rounded-full bg-[#10B981] inline-block animate-pulse" />Live
          </span>
        </div>
        <div className="rounded-[10px] bg-[#FFF9F9] border border-[#F4DADB] p-3">
          <p className="text-[10px] text-[#6B7280]">Q1 2026 earnings</p>
          <p className="text-[20px] font-bold text-[#111111] leading-tight">$1,520</p>
          <p className="text-[10px] text-[#6B7280]">across 2 approved events</p>
        </div>
        <div className="space-y-2">
          {usageEvents.map((entry) => (
            <div key={entry.id} className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <div className="flex-1 min-w-0">
                <p className="truncate text-[11px] font-medium text-[#111111]">{entry.desc}</p>
                <p className="text-[10px] text-[#6B7280]">{entry.id} · {entry.date}</p>
              </div>
              <span className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${whatCardToneClass(entry.tone)}`}>
                {entry.payout}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (cardId === 'studios-talent-queue') {
    const talent = [
      { initials: 'AS', name: 'Arjun Sharma', role: 'Voice · Mumbai', id: 'CAST-AS-2026-8821', ready: true },
      { initials: 'PN', name: 'Priya Nair', role: 'Voice+Screen · Chennai', id: 'CAST-PN-2026-4412', ready: true },
      { initials: 'RM', name: 'Rahul Mehta', role: 'Screen · Delhi', id: 'CAST-RM-2026-7705', ready: false },
    ];
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Talent Discovery</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>132 verified</span>
        </div>
        <div className="rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] px-2.5 py-2 flex items-center gap-2">
          <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#9CA3AF] shrink-0"><path fillRule="evenodd" d="M6.5 1.5a5 5 0 100 10 5 5 0 000-10zM0 6.5a6.5 6.5 0 1111.573 4.072l3.928 3.928a.75.75 0 01-1.06 1.06l-3.928-3.927A6.5 6.5 0 010 6.5z" clipRule="evenodd" /></svg>
          <span className="text-[11px] text-[#9CA3AF]">Voice · India + APAC · Consent-ready</span>
        </div>
        <div className="space-y-2">
          {talent.map(t => (
            <div key={t.id} className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <span className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${accentSoft}`}>{t.initials}</span>
              <div className="flex-1 min-w-0">
                <p className="truncate text-[11px] font-medium text-[#111111]">{t.name}</p>
                <p className="text-[10px] text-[#6B7280]">{t.role}</p>
              </div>
              <span className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${whatCardToneClass(t.ready ? 'granted' : 'neutral')}`}>
                {t.ready ? 'Consent ready' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (cardId === 'studios-license-draft') {
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">License Builder</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>Draft saved</span>
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-3 space-y-2">
          {[
            { label: 'Project', value: 'Brahmastra 2 Lead' },
            { label: 'Use type', value: 'Synthetic voiceover' },
            { label: 'Territory', value: 'India + APAC' },
            { label: 'Duration', value: '24 months' },
            { label: 'Training rights', value: 'Not included', warn: true },
            { label: 'License value', value: '$8,000', bold: true },
          ].map(row => (
            <div key={row.label} className={`flex items-center justify-between text-[11px] ${row.bold ? 'pt-1.5 border-t border-[#E5E7EB]' : ''}`}>
              <span className="text-[#6B7280]">{row.label}</span>
              <span className={`font-medium ${row.bold ? 'font-bold text-[#111111] text-[12px]' : row.warn ? 'text-[#D61D1F]' : 'text-[#111111]'}`}>{row.value}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Territory scope</p>
          <div className="flex flex-wrap gap-1.5">
            {['India', 'APAC'].map(t => (
              <span key={t} className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${accentSoft}`}>{t}</span>
            ))}
            <span className="rounded-full border border-dashed border-[#D1D5DB] px-2.5 py-0.5 text-[10px] text-[#9CA3AF]">+ Add region</span>
          </div>
        </div>
      </div>
    );
  }

  if (cardId === 'studios-policy-check') {
    const checks = [
      { label: 'CastID verification', status: 'pass' },
      { label: 'Consent scope match', status: 'pass' },
      { label: 'Territory gate', status: 'pass' },
      { label: 'Contract signature', status: 'pending' },
    ];
    const passCount = checks.filter(c => c.status === 'pass').length;
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Compliance Check</p>
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>{passCount} / {checks.length} passed</span>
        </div>
        <div className="space-y-2">
          {checks.map(item => (
            <div key={item.label} className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <span className={`flex size-5 shrink-0 items-center justify-center rounded-full ${item.status === 'pass' ? 'bg-[#10B981]' : 'bg-[#F59E0B]'}`}>
                {item.status === 'pass' ? (
                  <svg viewBox="0 0 12 12" fill="white" className="size-3"><path fillRule="evenodd" d="M10.28 3.28a.75.75 0 010 1.06l-5.5 5.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 011.06-1.06L4.25 8.19l4.97-4.97a.75.75 0 011.06.06z" clipRule="evenodd" /></svg>
                ) : (
                  <svg viewBox="0 0 12 12" fill="white" className="size-3"><path d="M6 7a1 1 0 110-2 1 1 0 010 2zm0-4a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0v-2A.75.75 0 016 3z" /></svg>
                )}
              </span>
              <span className="text-[12px] font-medium text-[#111111] flex-1">{item.label}</span>
              <span className={`text-[10px] font-semibold ${item.status === 'pass' ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}>
                {item.status === 'pass' ? 'Pass' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#FFFBEB] border border-[#FDE68A] p-2.5 flex items-center gap-2">
          <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#F59E0B] shrink-0"><path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM8 5a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 018 5zm0 6a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" /></svg>
          <p className="text-[11px] font-medium text-[#92400E]">Awaiting counterparty signature</p>
        </div>
      </div>
    );
  }

  // studios-settlement-ledger (default)
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Settlement Ledger</p>
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold bg-[#F0FDF4] text-[#166534]`}>
          <span className="size-1.5 rounded-full bg-[#10B981] inline-block" />1 paid
        </span>
      </div>
      <div className="space-y-2">
        {[
          { id: 'INV-B2-2026-021', studio: 'Dharma Productions · Arjun Sharma', amount: '$8,000', status: 'paid' as const },
          { id: 'INV-B2-2026-019', studio: 'YRF Studios · Priya Nair', amount: '$5,400', status: 'in review' as const },
          { id: 'INV-B2-2026-017', studio: 'T-Series Films · Rahul Mehta', amount: '$3,200', status: 'pending' as const },
        ].map(inv => (
          <div key={inv.id} className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono text-[#9CA3AF]">{inv.id}</p>
              <p className="text-[11px] font-medium text-[#111111] truncate">{inv.studio}</p>
            </div>
            <span className="shrink-0 font-semibold text-[12px] text-[#111111]">{inv.amount}</span>
            <span className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${inv.status === 'paid' ? 'bg-[#F0FDF4] text-[#166534]' : inv.status === 'in review' ? 'bg-[#EFF6FF] text-[#1D4ED8]' : 'bg-[#FFF7ED] text-[#C2410C]'}`}>{inv.status}</span>
          </div>
        ))}
      </div>
      <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5 flex items-center justify-between text-[11px]">
        <span className="text-[#6B7280]">Outstanding balance</span>
        <span className="font-semibold text-[#111111]">$8,600</span>
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

export default function CastIdPage() {
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
  const activeWhatTabBgColor = isStudiosWhatTab ? 'bg-[#EEF8FF]' : 'bg-[#F0EAEA]';
  const activeWhatTabTextColor = isStudiosWhatTab ? 'text-[#159FFA]' : 'text-[#D61D1F]';
  const activeHowTabBgColor = isStudiosHowTab ? 'bg-[#EEF8FF]' : 'bg-[#F0EAEA]';
  const activeHowTabTextColor = isStudiosHowTab ? 'text-[#159FFA]' : 'text-[#D61D1F]';
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
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
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
            <div className="grid h-full w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <h1 id="hero-headline" className="max-w-[820px] text-[46px] leading-[1.04] font-medium text-[#111111] md:text-[64px]">
                  <span className="block">Protect your</span>
                  <span className="block">digital double.</span>
                </h1>
                <div className="mt-6 max-w-[760px] space-y-3">
                  {heroSubPoints.map((point) => (
                    <div key={point.label} className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="inline-flex size-6 shrink-0 items-center justify-center rounded-[7px] bg-[rgba(214,29,31,0.10)]"
                      >
                        <HeroPointIcon kind={point.key} />
                      </span>
                      <p className="text-[16px] leading-7 text-[#111111] md:text-[18px]">{point.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={openDemoBookingModal}
                    className="rounded-full bg-[#D61D1F] px-6 py-3 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#D61D1F]"
                  >
                    Get a demo
                  </button>
                </div>
              </div>

              <div className="aspect-square h-[50dvh] max-h-[560px] justify-self-end self-end overflow-hidden rounded-[24px] border border-[#ECECEC] bg-[#111111] shadow-lg md:h-[58dvh]">
                <video
                  src="/castid_hero.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  disableRemotePlayback
                  className="size-full object-cover"
                  aria-label="CastID hero video"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <span className="section-pill !mb-3 inline-flex items-center gap-2 self-start">
            <svg
              viewBox="0 0 16 16"
              className="size-3.5 text-[#159FFA]"
              fill="currentColor"
              aria-hidden="true"
            >
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

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex w-fit gap-1" role="tablist" aria-label="What section views">
              {(Object.keys(whatSectionData) as WhatTabKey[]).map((tabKey) => {
                const isActive = activeWhatTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    type="button"
                    onClick={() => {
                      setActiveWhatTab(tabKey);
                    }}
                    className={`rounded-full px-5 py-2 text-[14px] leading-5 font-medium md:text-[16px] ${isActive ? `${activeWhatTabBgColor} ${activeWhatTabTextColor}` : 'text-[#6B7280] hover:text-[#111111]'}`}
                    aria-selected={isActive}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className={`size-2 rounded-full ${tabKey === 'studios' ? 'bg-[#159FFA]' : 'bg-[#D61D1F]'}`} />
                      {whatSectionData[tabKey].tabLabel}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (whatCarouselRef.current) {
                    whatCarouselRef.current.scrollBy({ left: -(whatCarouselRef.current.clientWidth * 0.8), behavior: 'smooth' });
                  }
                }}
                className="flex size-10 items-center justify-center rounded-full bg-[#E5E7EB] text-[#111111] transition-colors hover:bg-[#D1D5DB]"
                aria-label="Previous"
              >
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (whatCarouselRef.current) {
                    whatCarouselRef.current.scrollBy({ left: whatCarouselRef.current.clientWidth * 0.8, behavior: 'smooth' });
                  }
                }}
                className="flex size-10 items-center justify-center rounded-full bg-[#E5E7EB] text-[#111111] transition-colors hover:bg-[#D1D5DB]"
                aria-label="Next"
              >
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <div className="relative">
            <div
              ref={whatCarouselRef}
              className="hide-scrollbar flex items-stretch snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-10 pt-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div
                aria-hidden="true"
                className="shrink-0 snap-start"
                style={{ width: carouselLeadIn }}
              />
              {whatContent.cards.map((card, index) => {
                const isWide = index === 1 || index === 3;
                const widthClass = isWide ? 'w-[560px] md:w-[640px]' : 'w-[280px] md:w-[320px]';
                return (
                  <article
                    key={card.title}
                    className={`flex flex-col min-w-0 overflow-hidden snap-start shrink-0 ${widthClass} rounded-[24px] border border-[#ECECEC] bg-white min-h-[420px]`}
                  >
                    <div
                      className="flex h-[360px] shrink-0 items-center justify-center p-6 border-b border-[#ECECEC]"
                      style={getGridStyles(activeWhatTab, index)}
                    >
                      <div className="w-full rounded-[16px] bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#ECECEC]/60">
                        <WhatCardDemo cardId={card.id} tab={activeWhatTab} />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-[18px] font-semibold text-[#111111] leading-snug">{card.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-body)] text-pretty">{card.description}</p>
                    </div>
                  </article>
                );
              })}
              <div
                aria-hidden="true"
                className="shrink-0 snap-start"
                style={{ width: carouselLeadIn }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="h-dvh w-screen overflow-hidden">
        <img
          src="/castid_divider_2.png"
          alt="You stay you everywhere visual"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </section>

      <section className="w-full pb-24 pt-20 md:pb-28 md:pt-24">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <span className="section-pill !mb-3 inline-flex self-start">How</span>
          <h2 className="max-w-[760px] text-balance text-[34px] leading-[1.08] font-medium text-[#111111] md:text-[46px]">
            How identity becomes a trusted AI asset
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
                        id={`castid-how-tab-${tabKey}`}
                        onClick={() => setActiveHowTab(tabKey)}
                        className={`rounded-full px-4 py-1.5 text-[14px] leading-5 font-medium md:px-5 md:py-2 md:text-[15px] ${isActive ? `${activeHowTabBgColor} ${activeHowTabTextColor}` : 'text-[#6B7280] hover:text-[#111111]'}`}
                        aria-selected={isActive}
                        aria-controls={`castid-how-panel-${tabKey}`}
                        tabIndex={isActive ? 0 : -1}
                      >
                        <span className="inline-flex items-center gap-2">
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className={`size-2 rounded-full ${tabKey === 'studios' ? 'bg-[#159FFA]' : 'bg-[#D61D1F]'}`}
                            />
                          )}
                          {howJourneyData[tabKey].tabLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>


                <ol className="mt-6 space-y-2">
                  {howContent.steps.map((step, index) => {
                    const isLast = index === howContent.steps.length - 1;
                    const isActive = index === activeHowStepIndex;
                    const accentBg = isStudiosHowTab ? 'bg-[#EAF3FF] text-[#159FFA]' : 'bg-[#FBEDEE] text-[#D61D1F]';
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
                id={`castid-how-panel-${activeHowTab}`}
                role="tabpanel"
                aria-labelledby={`castid-how-tab-${activeHowTab}`}
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


              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 px-6 md:px-10">
        <div className="mx-auto grid grid-cols-2 gap-4 max-w-[1300px] md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <video
              key={i}
              src={`/${i}.mp4`}
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-square rounded-2xl object-cover"
            />
          ))}
        </div>
      </section>

      <PreFooterCta />
    </main >
  );
}
