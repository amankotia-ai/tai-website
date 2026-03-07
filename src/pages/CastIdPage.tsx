import { type SyntheticEvent, useEffect, useRef, useState } from 'react';
import HomepageV2HeroAmbient from '../components/HomepageV2HeroAmbient';
import PreFooterCta from '../components/PreFooterCta';
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
    title: 'Build with verified performers and cleaner licensing workflows.',
    description:
      'Find CastID-verified talent, define usage terms, and pass compliance checks before any generation ships.',
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
    eyebrow: 'Actor Journey',
    headline: 'Move from identity setup to safe approvals without losing control.',
    description:
      'CastID gives performers a clear sequence: secure your vault, define boundaries, approve intent, and verify settlement.',
    steps: [
      {
        id: 'actors-how-1',
        title: 'Create your CastID vault',
        detail: 'Register identity and lock voice and likeness assets to your performer profile.',
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
        title: 'Define consent boundaries',
        detail: 'Set territory, duration, training rights, and derivative restrictions before any project reaches you.',
        icon: 'consent',
        imageSrc: '/1.png',
        imageAlt: 'Actor consent controls',
        visualRows: [
          { label: 'Territory scope', value: 'US + Canada', tone: 'granted' },
          { label: 'Training rights', value: 'Blocked', tone: 'blocked' },
          { label: 'Renewal model', value: 'Manual approval', tone: 'neutral' },
        ],
        visualNote: 'Policies are enforced automatically so non-compliant requests are stopped early.',
      },
      {
        id: 'actors-how-3',
        title: 'Review project intent',
        detail: 'Inspect incoming request terms and approve only if usage matches your active consent matrix.',
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
        title: 'Track usage and payout trail',
        detail: 'Audit generated outputs and settlement events from a single verified ledger.',
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
    eyebrow: 'Studio Journey',
    headline: 'Build compliant AI projects with verified performers from day one.',
    description:
      'Studios follow a structured journey: source trusted talent, draft scope, pass guardrails, and settle with full traceability.',
    steps: [
      {
        id: 'studios-how-1',
        title: 'Source verified performers',
        detail: 'Shortlist talent profiles already linked to active CastID identity and consent readiness.',
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
        title: 'Draft licensing scope',
        detail: 'Define territories, timeline, and project constraints directly against performer permissions.',
        icon: 'consent',
        imageSrc: '/2.png',
        imageAlt: 'Studio licensing draft workflow',
        visualRows: [
          { label: 'Territory package', value: 'NA + EU', tone: 'granted' },
          { label: 'Training clause', value: 'Excluded', tone: 'blocked' },
          { label: 'Contract state', value: 'Draft v1', tone: 'neutral' },
        ],
        visualNote: 'Usage terms stay aligned to performer policy before legal execution begins.',
      },
      {
        id: 'studios-how-3',
        title: 'Run policy guardrails',
        detail: 'Validate each request against consent, geography, and contract signatures before release.',
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
        title: 'Release and settle transparently',
        detail: 'Track outputs, invoices, and payouts through one ledger for production, legal, and finance.',
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
        { initials: 'EC', name: 'Emma Chen', type: 'Voice · LA', id: 'CAST-EC-2026-8821', score: 98, ready: true },
        { initials: 'RO', name: 'Rafael Ortiz', type: 'Voice+Screen · NY', id: 'CAST-RO-2026-4412', score: 94, ready: true },
        { initials: 'JP', name: 'Jin Park', type: 'Screen · Seoul', id: 'CAST-JP-2026-7705', score: 81, ready: false },
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
            <span className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${accentSoft}`}>EC</span>
            <div>
              <p className="text-[12px] font-semibold text-[#111111]">Emma Chen · Performer</p>
              <p className="text-[10px] text-[#6B7280]">CAST-EC-2026-8821</p>
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
              <p className="text-[10px] text-[#6B7280]">Project: Nebula · Emma Chen · Voice</p>
            </div>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>Draft saved</span>
          </div>
          {/* Territory chips */}
          <div className="bg-white px-4 py-3">
            <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Territory scope</p>
            <div className="flex flex-wrap gap-1.5">
              {['North America', 'EU', 'UK'].map((t) => (
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
      { label: 'US + Canada', icon: '✓', allowed: true },
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
            <p className="text-[12px] font-semibold text-[#111111]">Pre-activation Guardrail · Nebula Ep.1</p>
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
      { rule: 'Territory', yours: 'US + Canada', request: 'US + India', match: true },
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
            <p className="text-[12px] font-semibold text-[#111111]">Invoice · INV-NEBULA-2026-021</p>
            <p className="text-[10px] text-[#6B7280]">Nebula S1 · Emma Chen · Voice</p>
          </div>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>Approved</span>
        </div>
        {/* Bill-to/from */}
        <div className="grid grid-cols-2 divide-x divide-[#ECECEC] bg-white">
          <div className="px-4 py-3">
            <p className="text-[9px] font-semibold text-[#9CA3AF] uppercase mb-1">Bill from</p>
            <p className="text-[11px] font-medium text-[#111111]">Emma Chen</p>
            <p className="text-[9px] text-[#6B7280]">Performer · CastID verified</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[9px] font-semibold text-[#9CA3AF] uppercase mb-1">Bill to</p>
            <p className="text-[11px] font-medium text-[#111111]">Apex Pictures</p>
            <p className="text-[9px] text-[#6B7280]">Studio · Project Nebula</p>
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
    { id: 'USE-886', desc: 'Regional dub · LATAM', payout: 'Pending', date: 'Mar 5', tone: 'neutral' as WhatCardTone },
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

const whatMockImage = {
  actorPortrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
  faceScanA: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
  faceScanB: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
  faceScanC: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80',
  consentDoc: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80',
  usageTimeline: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80',
  studioActorA: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
  studioActorB: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
  licenseDoc: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1000&q=80',
  policyChecklist: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
  invoiceDoc: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
} as const;

function handleMockImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied === 'true') return;
  image.dataset.fallbackApplied = 'true';
  image.src = '/1.png';
}

function MockPreviewImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return <img src={src} alt={alt} className={className} loading="lazy" onError={handleMockImageError} />;
}

function DemoDetailRow({
  label,
  value,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  tone?: WhatCardTone;
}) {
  return (
    <div className="flex items-center justify-between rounded-[10px] bg-white px-3 py-2">
      <p className="text-[11px] text-[#111111]">{label}</p>
      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${whatCardToneClass(tone)}`}>{value}</span>
    </div>
  );
}

function AudioFileRow({
  fileName,
  duration,
  tone,
  accent,
}: {
  fileName: string;
  duration: string;
  tone: WhatCardTone;
  accent: 'actors' | 'studios';
}) {
  const waveBars = [6, 11, 8, 14, 9, 12, 7, 10] as const;
  const playButtonClass = accent === 'studios' ? 'bg-[#EEF8FF] text-[#159FFA]' : 'bg-[#F0EAEA] text-[#D61D1F]';
  const waveColorClass = accent === 'studios' ? 'bg-[#159FFA]' : 'bg-[#D61D1F]';

  return (
    <div className="flex items-center gap-2 rounded-[10px] bg-white px-2.5 py-2">
      <button
        type="button"
        aria-label={`Play ${fileName}`}
        className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full ${playButtonClass}`}
      >
        <svg viewBox="0 0 16 16" fill="currentColor" className="size-3" aria-hidden="true">
          <path d="M5.8 4.6c0-.62.67-1.01 1.2-.7l4.62 2.73a.8.8 0 0 1 0 1.38L7 10.74a.8.8 0 0 1-1.2-.7V4.6z" />
        </svg>
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-medium text-[#111111]">{fileName}</p>
        <div className="mt-1 flex items-end gap-[2px]">
          {waveBars.map((bar, index) => (
            <span key={`${fileName}-${index}`} className={`${waveColorClass} w-0.5 rounded-full opacity-65`} style={{ height: `${bar}px` }} />
          ))}
        </div>
      </div>
      <span className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${whatCardToneClass(tone)}`}>
        {duration}
      </span>
    </div>
  );
}

function WhatCardDemo({
  cardId,
  tab,
  isWide,
}: {
  cardId: string;
  tab: WhatTabKey;
  isWide: boolean;
}) {
  const accent = tab === 'studios' ? 'studios' : 'actors';
  const accentTagClass = tab === 'studios' ? 'bg-[#EEF8FF] text-[#159FFA]' : 'bg-[#F0EAEA] text-[#D61D1F]';
  const panelClass = 'rounded-[10px] bg-[#F9F9FA] p-3';

  if (cardId === 'actors-voice-assets') {
    return (
      <div className="flex h-full flex-col rounded-[16px] bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">Voice Files</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>Vault active</span>
        </div>
        <div className="space-y-2">
          <AudioFileRow fileName="hero_take_v3.wav" duration="00:22" tone="granted" accent={accent} />
          <AudioFileRow fileName="scene_04_alt.wav" duration="00:17" tone="neutral" accent={accent} />
        </div>
        <div className={`mt-3 space-y-2 ${panelClass}`}>
          <DemoDetailRow label="Scope" value="Project-only" tone="granted" />
          <DemoDetailRow label="Training rights" value="Blocked" tone="blocked" />
          <DemoDetailRow label="Expiry" value="12 months" tone="neutral" />
        </div>
        <div className={`mt-3 flex items-center gap-2 ${panelClass}`}>
          <MockPreviewImage
            src={whatMockImage.actorPortrait}
            alt="Performer portrait thumbnail"
            className="size-9 rounded-[8px] border border-[#ECECEC] object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium text-[#111111]">CastID owner</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">CAST-EC-2026-8821</p>
          </div>
          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${whatCardToneClass('granted')}`}>Verified</span>
        </div>
      </div>
    );
  }

  if (cardId === 'actors-face-assets') {
    if (isWide) {
      return (
        <div className="flex h-full flex-col rounded-[16px] bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">Likeness Files</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>Image set</span>
          </div>
          <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-[12px] bg-[#F9F9FA]">
              <MockPreviewImage
                src={whatMockImage.faceScanA}
                alt="Primary likeness scan"
                className="h-[186px] w-full object-cover"
              />
              <div className="px-3 py-2">
                <p className="text-[10px] text-[var(--color-text-muted)]">Primary capture</p>
                <p className="text-[11px] font-medium text-[#111111]">Neutral expression base</p>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                {[whatMockImage.faceScanB, whatMockImage.faceScanC].map((src, index) => (
                  <MockPreviewImage
                    key={src}
                    src={src}
                    alt={`Additional likeness frame ${index + 1}`}
                    className="h-[66px] w-full rounded-[10px] object-cover"
                  />
                ))}
              </div>
              <div className={`space-y-2 ${panelClass}`}>
                <DemoDetailRow label="Capture pack" value="4D set" tone="granted" />
                <DemoDetailRow label="Ownership hash" value="Locked" tone="granted" />
                <DemoDetailRow label="Derivative use" value="Blocked" tone="blocked" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full flex-col rounded-[16px] bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">Likeness Files</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>Image set</span>
        </div>
        <div className="overflow-hidden rounded-[10px]">
          <MockPreviewImage src={whatMockImage.faceScanA} alt="Face scan preview" className="h-[120px] w-full object-cover" />
        </div>
        <div className={`mt-3 space-y-2 ${panelClass}`}>
          <DemoDetailRow label="Capture pack" value="4D set" tone="granted" />
          <DemoDetailRow label="Derivative use" value="Blocked" tone="blocked" />
        </div>
      </div>
    );
  }

  if (cardId === 'actors-consent-rules') {
    if (isWide) {
      return (
        <div className="flex h-full flex-col rounded-[16px] bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">Consent Rules</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>Policy v4.2</span>
          </div>
          <div className="grid gap-3 md:grid-cols-[1.05fr_0.95fr]">
            <div className={`${panelClass}`}>
              <MockPreviewImage
                src={whatMockImage.consentDoc}
                alt="Consent contract preview"
                className="h-[104px] w-full rounded-[10px] object-cover"
              />
              <div className="mt-2 space-y-2">
                <DemoDetailRow label="Signer" value="Emma Chen" tone="granted" />
                <DemoDetailRow label="Last updated" value="Jan 12, 2026" tone="neutral" />
              </div>
            </div>
            <div className="space-y-2">
              <DemoDetailRow label="Territory" value="US + UK" tone="granted" />
              <DemoDetailRow label="Duration" value="12 months" tone="neutral" />
              <DemoDetailRow label="Training" value="Blocked" tone="blocked" />
              <DemoDetailRow label="Derivative works" value="Blocked" tone="blocked" />
              <div className={`${panelClass}`}>
                <p className="text-[10px] text-[var(--color-text-muted)]">Training dataset access</p>
                <p className="text-[11px] font-medium text-[#D61D1F]">Blocked unless explicit performer override</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full flex-col rounded-[16px] bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">Consent Rules</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>Policy v4.2</span>
        </div>
        <div className={`${panelClass}`}>
          <MockPreviewImage
            src={whatMockImage.consentDoc}
            alt="Consent contract preview"
            className="h-[92px] w-full rounded-[8px] object-cover"
          />
        </div>
        <div className="mt-3 space-y-2">
          <DemoDetailRow label="Territory" value="US + UK" tone="granted" />
          <DemoDetailRow label="Duration" value="12 months" tone="neutral" />
          <DemoDetailRow label="Training" value="Blocked" tone="blocked" />
        </div>
        <div className={`mt-2 ${panelClass}`}>
          <p className="text-[10px] text-[var(--color-text-muted)]">Training dataset access</p>
          <p className="text-[11px] font-medium text-[#D61D1F]">Blocked unless explicit performer override</p>
        </div>
      </div>
    );
  }

  if (cardId === 'actors-usage-ledger') {
    return (
      <div className="flex h-full flex-col rounded-[16px] bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">Recent Activity</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>Live feed</span>
        </div>
        <div className={`space-y-2 ${panelClass}`}>
          <div className="flex items-center gap-2 rounded-[10px] bg-white px-2.5 py-2">
            <MockPreviewImage
              src={whatMockImage.usageTimeline}
              alt="Generated usage timeline thumbnail"
              className="size-8 rounded-[7px] object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium text-[#111111]">Trailer cutdown visual</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">IMG · Mar 2</p>
            </div>
            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${whatCardToneClass('granted')}`}>Approved</span>
          </div>
          <div className="flex items-center justify-between rounded-[10px] bg-white px-2.5 py-2">
            <p className="text-[11px] text-[#111111]">Dialogue replacement · Episode 4</p>
            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${whatCardToneClass('granted')}`}>Approved</span>
          </div>
          <div className="flex items-center justify-between rounded-[10px] bg-white px-2.5 py-2">
            <p className="text-[11px] text-[#111111]">Regional dub · LATAM</p>
            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${whatCardToneClass('neutral')}`}>Review</span>
          </div>
        </div>
      </div>
    );
  }

  if (cardId === 'studios-talent-queue') {
    return (
      <div className="flex h-full flex-col rounded-[16px] bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">Casting Intake</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>132 verified</span>
        </div>
        {[
          [whatMockImage.studioActorA, 'Emma Chen', 'hero_vo_audition.wav'],
          [whatMockImage.studioActorB, 'Rafael Ortiz', 'villain_take_ref.wav'],
        ].map(([image, name, audio]) => (
          <div key={name} className={`mb-2 ${panelClass}`}>
            <div className="mb-2 flex items-center gap-2">
              <MockPreviewImage
                src={image}
                alt={`${name} profile`}
                className="size-8 rounded-[7px] object-cover"
              />
              <div>
                <p className="text-[11px] font-medium text-[#111111]">{name}</p>
                <p className="text-[10px] text-[var(--color-text-muted)]">Consent ready</p>
              </div>
            </div>
            <AudioFileRow fileName={audio} duration="00:16" tone="granted" accent={accent} />
          </div>
        ))}
      </div>
    );
  }

  if (cardId === 'studios-license-draft') {
    if (isWide) {
      return (
        <div className="flex h-full flex-col rounded-[16px] bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">Draft Terms</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>v1 saved</span>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
            <div className="space-y-2">
              <DemoDetailRow label="Project" value="Nebula Main Character" tone="granted" />
              <DemoDetailRow label="Region" value="NA + EU" tone="granted" />
              <DemoDetailRow label="Duration" value="24 months" tone="neutral" />
              <DemoDetailRow label="Training clause" value="Excluded" tone="blocked" />
            </div>
            <div className={`${panelClass}`}>
              <p className="text-[10px] font-medium text-[var(--color-text-muted)]">Attachments</p>
              <MockPreviewImage
                src={whatMockImage.licenseDoc}
                alt="Contract visual attachment"
                className="mt-2 h-[96px] w-full rounded-[10px] object-cover"
              />
              <div className="mt-2 rounded-[8px] bg-white px-2 py-1.5">
                <p className="text-[10px] text-[var(--color-text-muted)]">Contract note</p>
                <p className="truncate text-[11px] font-medium text-[#111111]">No training rights clause included in this draft.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full flex-col rounded-[16px] bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">Draft Terms</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>v1 saved</span>
        </div>
        <div className="space-y-2">
          <DemoDetailRow label="Project" value="Nebula Main Character" tone="granted" />
          <DemoDetailRow label="Region" value="NA + EU" tone="granted" />
          <DemoDetailRow label="Duration" value="24 months" tone="neutral" />
        </div>
        <div className={`mt-3 ${panelClass}`}>
          <p className="text-[10px] font-medium text-[var(--color-text-muted)]">Attachments</p>
          <div className="mt-2 flex items-center gap-2">
            <MockPreviewImage
              src={whatMockImage.licenseDoc}
              alt="Contract visual attachment"
              className="size-8 rounded-[7px] object-cover"
            />
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-[#111111]">
              likeness_scope.png
            </span>
          </div>
          <div className="mt-2 rounded-[8px] bg-white px-2 py-1.5">
            <p className="text-[10px] text-[var(--color-text-muted)]">Contract note</p>
            <p className="truncate text-[11px] font-medium text-[#111111]">No training rights clause included in this draft.</p>
          </div>
        </div>
      </div>
    );
  }

  if (cardId === 'studios-policy-check') {
    if (isWide) {
      return (
        <div className="flex h-full flex-col rounded-[16px] bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">Pre-Activation</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>3/4 pass</span>
          </div>
          <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
            <div className={`space-y-2 ${panelClass}`}>
              <DemoDetailRow label="CastID verification" value="Pass" tone="granted" />
              <DemoDetailRow label="Consent scope match" value="Pass" tone="granted" />
              <DemoDetailRow label="Territory gate" value="Pass" tone="granted" />
              <DemoDetailRow label="Contract signature" value="Pending" tone="neutral" />
              <div className="pt-1">
                <p className="mb-1 text-[10px] text-[var(--color-text-muted)]">Compliance score</p>
                <div className="h-1.5 rounded-full bg-[#ECECEC]">
                  <div className="h-full w-[76%] rounded-full bg-[#159FFA]" />
                </div>
              </div>
            </div>
            <div className={`${panelClass}`}>
              <MockPreviewImage
                src={whatMockImage.policyChecklist}
                alt="Policy checklist preview"
                className="h-[96px] w-full rounded-[10px] object-cover"
              />
              <p className="mt-2 text-[10px] text-[var(--color-text-muted)]">Inspected files</p>
              <p className="text-[11px] font-medium text-[#111111]">policy_reference.png + consent_scope.pdf</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full flex-col rounded-[16px] bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">Pre-Activation</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>3/4 pass</span>
        </div>
        <div className={`space-y-2 ${panelClass}`}>
          <DemoDetailRow label="CastID verification" value="Pass" tone="granted" />
          <DemoDetailRow label="Consent scope match" value="Pass" tone="granted" />
          <DemoDetailRow label="Contract signature" value="Pending" tone="neutral" />
        </div>
        <div className={`mt-3 flex items-center gap-2 ${panelClass}`}>
          <MockPreviewImage
            src={whatMockImage.policyChecklist}
            alt="Policy checklist preview"
            className="size-8 rounded-[7px] border border-[#ECECEC] object-cover"
          />
          <div className="flex-1">
            <p className="text-[10px] text-[var(--color-text-muted)]">Inspected files</p>
            <p className="text-[11px] font-medium text-[#111111]">policy_reference.png + consent_scope.pdf</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-[16px] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase">Finance Trace</p>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentTagClass}`}>Current cycle</span>
      </div>
      <div className={`space-y-2 ${panelClass}`}>
        <DemoDetailRow label="INV-2041" value="$6,100" tone="granted" />
        <DemoDetailRow label="INV-2042" value="$4,750" tone="neutral" />
        <DemoDetailRow label="INV-2043" value="$7,600" tone="granted" />
      </div>
      <div className={`mt-3 ${panelClass}`}>
        <div className="mb-2 flex items-center gap-2">
          <MockPreviewImage
            src={whatMockImage.invoiceDoc}
            alt="Invoice proof document"
            className="size-8 rounded-[7px] object-cover"
          />
          <span className="text-[11px] font-medium text-[#111111]">invoice_proof_2042.png</span>
        </div>
        <div className="rounded-[8px] bg-white px-2 py-1.5">
          <p className="text-[10px] text-[var(--color-text-muted)]">Payment note</p>
          <p className="truncate text-[11px] font-medium text-[#111111]">Settlement queued after legal clearance on Mar 6.</p>
        </div>
      </div>
    </div>
  );
}

export default function CastIdPage() {
  const [activeWhatTab, setActiveWhatTab] = useState<WhatTabKey>('actors');
  const [activeHowTab, setActiveHowTab] = useState<WhatTabKey>('actors');
  const [activeHowStepIndex, setActiveHowStepIndex] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const whatCarouselRef = useRef<HTMLDivElement | null>(null);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const isStudiosWhatTab = activeWhatTab === 'studios';
  const isStudiosHowTab = activeHowTab === 'studios';
  const activeWhatTabBgColor = isStudiosWhatTab ? 'bg-[#EEF8FF]' : 'bg-[#F0EAEA]';
  const activeWhatTabTextColor = isStudiosWhatTab ? 'text-[#159FFA]' : 'text-[#D61D1F]';
  const activeHowTabBgColor = isStudiosHowTab ? 'bg-[#EEF8FF]' : 'bg-[#F0EAEA]';
  const activeHowTabTextColor = isStudiosHowTab ? 'text-[#159FFA]' : 'text-[#D61D1F]';
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
                <h1 className="max-w-[760px] text-balance text-[40px] leading-[1.06] font-medium text-[#111111] md:text-[54px]">
                  Protect your digital double.
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
                      <p className="text-[14px] leading-6 text-[#111111] md:text-[15px]">{point.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="rounded-full bg-[#D61D1F] px-6 py-3 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#D61D1F]">
                    Create CastID
                  </button>
                  <button className="rounded-full bg-[var(--color-page)] px-6 py-3 text-[14px] font-medium text-[#111111] transition-colors duration-200 hover:bg-[#ECECEC]">
                    View Product Demo
                  </button>
                </div>
              </div>

              <div className="aspect-square h-[68dvh] justify-self-end self-end overflow-hidden rounded-[24px] border border-[#ECECEC] bg-[#111111] shadow-lg md:h-[74dvh]">
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

          <div className="mt-8 inline-flex w-fit gap-1" role="tablist" aria-label="What section views">
            {(Object.keys(whatSectionData) as WhatTabKey[]).map((tabKey) => {
              const isActive = activeWhatTab === tabKey;
              return (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => {
                    setActiveWhatTab(tabKey);
                    if (whatCarouselRef.current) whatCarouselRef.current.scrollTo({ left: 0, behavior: 'auto' });
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
        </div>

        <div className="mt-12 w-full pl-6 md:pl-10 min-[1300px]:pl-[calc(50vw-610px)]">
          <div className="relative">
            <div
              ref={whatCarouselRef}
              className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-10 pr-6 md:pr-10"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {whatContent.cards.map((card, index) => {
                const isWideCard = index === 1 || index === 2;
                const cardWidthClass = isWideCard ? 'w-[560px] md:w-[640px]' : 'w-[280px] md:w-[320px]';

                return (
                  <article
                    key={card.title}
                    className={`flex shrink-0 snap-start flex-col rounded-[24px] bg-[#F7F7F7] p-5 lg:p-6 h-[440px] ${cardWidthClass}`}
                  >
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

            <div className="absolute right-0 -bottom-4 flex items-center justify-end gap-3 bg-gradient-to-l from-white via-white to-transparent pl-12 pr-6 md:pr-10">
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
      </section>

      <section className="h-dvh w-screen overflow-hidden">
        <img
          src="/castid_divider_2.png"
          alt="Performer on stage"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </section>

      <section className="w-full pb-24 pt-20 md:pb-28 md:pt-24">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <span className="section-pill !mb-3 inline-flex self-start">How</span>
          <h2 className="max-w-[760px] text-balance text-[34px] leading-[1.08] font-medium text-[#111111] md:text-[46px]">
            Journey from identity setup to verified usage.
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

      <PreFooterCta />
    </main>
  );
}
