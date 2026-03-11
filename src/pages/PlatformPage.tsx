import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import '../components/Hero.css';
import CTASection from '../components/CTASection';
import FloatingOrbsBackground from '../components/FloatingOrbsBackground';

const actorCastingCalls = [
  {
    title: 'Lead Role - Sci-Fi Feature',
    studio: 'Universal Pictures',
    type: 'Film',
    deadline: '2d left',
    location: 'Los Angeles, CA',
    budget: '$4,500',
  },
  {
    title: 'Voice Actor for Animation',
    studio: 'DreamWorks',
    type: 'Voice',
    deadline: '5d left',
    location: 'Burbank, CA',
    budget: '$2,100',
  },
  {
    title: 'Background Artists Needed',
    studio: 'Netflix',
    type: 'TV Series',
    deadline: '1w left',
    location: 'New York, NY',
    budget: '$900',
  },
];

const actorQuickActions = ['Submit Self Tape', 'Update Profile', 'Browse Castings', 'Voice Samples'];

const actorSavedItems = [
  { label: 'Saved Roles', count: 8 },
  { label: 'Saved Profiles', count: 24 },
  { label: 'Saved Posts', count: 56 },
];

const actorConnections = [
  { name: 'James Cameron', role: 'Director' },
  { name: 'Sarah Jones', role: 'Casting Director' },
];

const agencyFilters = ['Pre-cleared', 'Age 25-34', 'Female', 'Neutral English', 'TV/Film'];

const agencyTalentResults = [
  {
    name: 'Priya Sharma',
    specialty: 'Voice + Likeness',
    clearance: 'pre-cleared',
    location: 'Mumbai, IN',
    match: '98%',
  },
  {
    name: 'Aanya Mehta',
    specialty: 'Voice Actor',
    clearance: 'conditional',
    location: 'Bengaluru, IN',
    match: '91%',
  },
  {
    name: 'Rohan Verma',
    specialty: 'Performance Capture',
    clearance: 'pre-cleared',
    location: 'London, UK',
    match: '88%',
  },
];

const agencyContracts = [
  {
    title: 'Synthetic Performance License - Project Atlas',
    scope: 'Voice + Likeness • India + APAC',
    status: 'active',
  },
  {
    title: 'Voice Dubbing Agreement - Neon Nights',
    scope: 'Voice • Worldwide',
    status: 'pending',
  },
];

const agencyPayments = [
  { label: 'Gross Volume', value: '$7,800' },
  { label: 'Platform Fee (10%)', value: '$780' },
  { label: 'Net Actor Payout', value: '$7,020' },
];

const agencyTimeline = ['initiated', 'processing', 'paid'];
const selectedAsset = {
  name: 'Reference_Voice_2026.wav',
  type: 'Voice',
  status: 'verified',
  format: 'WAV 24-bit',
  duration: '01:42',
  sampleRate: '48 kHz',
  fileSize: '24 MB',
  language: 'English (neutral)',
  quality: 'Studio clean',
  consentVersion: 'v4.2',
  assetId: 'VAULT-VOICE-2026-001',
  lastUpdated: 'Jan 12, 2026',
};
const assetPreviewBars = [20, 36, 18, 44, 30, 52, 24, 40, 28, 50, 22, 38, 16, 34, 26, 46, 19, 42, 27, 48];
const selectedProjectPayment = {
  project: 'Project Atlas',
  license: 'Synthetic Performance License',
  status: 'processing',
  invoiceId: 'INV-ATLAS-2026-021',
  paymentId: 'PAY-ATLAS-1002',
  billingDate: 'Feb 6, 2026',
  payoutDate: 'Feb 8, 2026',
  recipient: 'Actor Wallet • Test',
};
const projectPaymentLineItems = [
  {
    label: 'Base license fee',
    note: 'Voice + likeness rights package',
    amount: '$6,500',
    type: 'credit',
  },
  {
    label: 'Regional distribution add-on',
    note: 'India + APAC release rights',
    amount: '$1,300',
    type: 'credit',
  },
  {
    label: 'Platform fee (10%)',
    note: 'Workflow, compliance, and payment rail',
    amount: '-$780',
    type: 'debit',
  },
];
const projectPaymentTotals = [
  { label: 'Gross project amount', value: '$7,800' },
  { label: 'Total deductions', value: '$780' },
  { label: 'Net actor payout', value: '$7,020' },
];
const policyChecks = [
  {
    label: 'CastID verification',
    detail: 'Actor and requester identities must match trusted records before activation.',
  },
  {
    label: 'Consent rules',
    detail: 'Use case, duration, and training permissions are validated against vault policy.',
  },
  {
    label: 'Territory gate',
    detail: 'Usage remains limited to approved license regions and distribution zones.',
  },
];
const platformFeatureCards = [
  {
    title: 'Verified Talent Discovery',
    description: 'Search actors by clearance status, role fit, and production constraints before outreach.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M9.5 3.5a6 6 0 014.8 9.6l3.55 3.55a.75.75 0 11-1.06 1.06l-3.55-3.55A6 6 0 119.5 3.5zm0 1.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
      </svg>
    ),
  },
  {
    title: 'Multilingual Voice Licensing',
    description: 'Configure localized voice usage by territory and approved delivery formats for each contract.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 2.5A2.5 2.5 0 007.5 5v4a2.5 2.5 0 005 0V5A2.5 2.5 0 0010 2.5z" />
        <path d="M5.75 8.75a.75.75 0 00-1.5 0 5.75 5.75 0 005 5.7v1.8H7a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-2.25v-1.8a5.75 5.75 0 005-5.7.75.75 0 00-1.5 0 4.25 4.25 0 11-8.5 0z" />
      </svg>
    ),
  },
  {
    title: 'Usage Audit Ledger',
    description: 'Record every synthetic session with consent version, territory scope, and contract linkage.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M8.75 2A.75.75 0 008 2.75V3a.25.25 0 00.25.25h3.5A.25.25 0 0012 3v-.25A.75.75 0 0011.25 2h-2.5z" />
        <path d="M7 2.75A1.75 1.75 0 008.75 4.5h2.5A1.75 1.75 0 0013 2.75h1.25A2.75 2.75 0 0117 5.5v9A2.75 2.75 0 0114.25 17h-8.5A2.75 2.75 0 013 14.5v-9A2.75 2.75 0 015.75 2.75H7zm.25 5.25a.75.75 0 01.75-.75h4a.75.75 0 010 1.5H8A.75.75 0 017.25 8zm0 3a.75.75 0 01.75-.75h4a.75.75 0 010 1.5H8a.75.75 0 01-.75-.75z" />
      </svg>
    ),
  },
  {
    title: 'Agency & Studio Collaboration',
    description: 'Coordinate introductions, approvals, and deal progression across networked production teams.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M9.5 6a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
        <path d="M2.75 14.25A3.25 3.25 0 016 11h2a3.25 3.25 0 013.25 3.25V16a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-1.75zm9.5 2.75h4a1 1 0 001-1v-1.25a2.75 2.75 0 00-2.75-2.75h-1.6c-.43 0-.84.1-1.2.27.5.65.8 1.46.8 2.33V16a2.98 2.98 0 01-.2 1z" />
      </svg>
    ),
  },
];

const whyPlatformSignals = [
  {
    label: 'Identity verification',
    value: 'CastID + role checks',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.5a1 1 0 01.4.08l7 3A1 1 0 0120 6.5V12c0 4.79-2.96 8.52-7.57 10.37a1.2 1.2 0 01-.86 0C6.96 20.52 4 16.79 4 12V6.5a1 1 0 01.6-.92l7-3a1 1 0 01.4-.08zM10.9 13.6l-1.8-1.8a1 1 0 10-1.42 1.4l2.5 2.5a1 1 0 001.42 0l4.8-4.8a1 1 0 00-1.42-1.4l-4.08 4.1z" />
      </svg>
    ),
  },
  {
    label: 'Policy validation',
    value: 'Territory + duration gates',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3.5 6A2.5 2.5 0 016 3.5h12A2.5 2.5 0 0120.5 6v12A2.5 2.5 0 0118 20.5H6A2.5 2.5 0 013.5 18V6zm4 2.75A1.75 1.75 0 019.25 7h5.5a1.75 1.75 0 010 3.5h-5.5A1.75 1.75 0 017.5 8.75zM7.5 15.25A1.75 1.75 0 019.25 13.5h2.5a1.75 1.75 0 010 3.5h-2.5a1.75 1.75 0 01-1.75-1.75z" />
      </svg>
    ),
  },
  {
    label: 'Audit retention',
    value: 'Time-stamped activity logs',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3.5a8.5 8.5 0 108.5 8.5A8.51 8.51 0 0012 3.5zm1 4.5a1 1 0 10-2 0v4.59l3.2 2.13a1 1 0 101.1-1.66L13 11.53V8z" />
      </svg>
    ),
  },
  {
    label: 'Data protection',
    value: 'Encrypted vault controls',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9 9V7a3 3 0 116 0v2h1.5A2.5 2.5 0 0119 11.5v8a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 015 19.5v-8A2.5 2.5 0 017.5 9H9zm2 0h2V7a1 1 0 10-2 0v2z" />
      </svg>
    ),
  },
];

type PlatformView = 'actor' | 'agency';
const platformSectionHeadingClass = 'text-[30px] leading-[1.08] md:text-[40px] font-medium text-[#111111] text-balance';

function statusClass(status: string): string {
  if (status === 'active') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  if (status === 'pending') return 'border-amber-200 bg-amber-50 text-amber-700';
  if (status === 'pre-cleared') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  if (status === 'conditional') return 'border-amber-200 bg-amber-50 text-amber-700';
  if (status === 'initiated') return 'border-amber-200 bg-amber-50 text-amber-700';
  if (status === 'processing') return 'border-blue-200 bg-blue-50 text-blue-700';
  return 'border-[#ECECEC] bg-[#FAFAFA] text-[#4B5563]';
}

function ActorShowcaseDemo() {
  return (
    <div className="grid gap-4 xl:grid-cols-[260px_1fr_260px]">
      <div className="space-y-4">
        <div className="rounded-2xl border border-[#ECECEC] bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-full bg-[#F5F6F8] p-0.5">
              <div className="flex size-full items-center justify-center rounded-full bg-[#D61D1F]/10 text-[13px] font-semibold text-[#D61D1F]">
                TS
              </div>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-[#111111]">Test</p>
              <p className="text-[11px] text-[#6B7280]">Actor • Public</p>
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#6B7280]">Profile Strength</span>
              <span className="tabular-nums font-semibold text-[#D61D1F]">70%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#F0F1F3]">
              <div className="h-full rounded-full bg-[#D61D1F]" style={{ width: '70%' }} />
            </div>
          </div>

          <button className="mt-4 w-full rounded-xl bg-[#111827] px-3 py-2 text-[12px] font-medium text-white">
            View & Edit Profile
          </button>
        </div>

        <div className="rounded-2xl border border-[#ECECEC] bg-white p-4">
          <p className="text-[13px] font-semibold text-[#111111]">Saved Items</p>
          <div className="mt-3 space-y-2">
            {actorSavedItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1">
                <span className="text-[12px] text-[#111111]">{item.label}</span>
                <span className="text-[12px] tabular-nums text-[#6B7280]">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[#ECECEC] bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[16px] font-semibold text-[#111111]">Casting Calls</p>
            <button className="text-[12px] font-medium text-[#D61D1F]">View all</button>
          </div>
          <div className="space-y-3">
            {actorCastingCalls.map((call) => (
              <div key={call.title} className="rounded-xl border border-[#ECECEC] bg-[#FAFAFA] p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="line-clamp-1 text-[13px] font-semibold text-[#111111]">{call.title}</p>
                  <span className="text-[11px] text-[#6B7280]">{call.deadline}</span>
                </div>
                <p className="mt-1 text-[11px] text-[#6B7280]">{call.studio} • {call.type}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[11px] text-[#6B7280]">{call.location}</span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">{call.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#ECECEC] bg-white p-4">
          <div className="mb-3 flex items-center gap-3 text-[12px]">
            <button className="border-b-2 border-[#1DA0F2] pb-1 font-medium text-[#1DA0F2]">Connections</button>
            <button className="pb-1 text-[#6B7280]">Requests</button>
            <button className="pb-1 text-[#6B7280]">Following</button>
          </div>
          <div className="space-y-2">
            {actorConnections.map((person) => (
              <div key={person.name} className="flex items-center justify-between rounded-xl border border-[#ECECEC] bg-[#FAFAFA] px-3 py-2.5">
                <div>
                  <p className="text-[12px] font-medium text-[#111111]">{person.name}</p>
                  <p className="text-[11px] text-[#6B7280]">{person.role}</p>
                </div>
                <button className="rounded-full border border-[#ECECEC] bg-white px-3 py-1 text-[11px] text-[#111111]">
                  Message
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="rounded-2xl border border-[#ECECEC] bg-white p-4">
          <p className="text-[14px] font-semibold text-[#111111]">Quick Actions</p>
          <div className="mt-3 space-y-2">
            {actorQuickActions.map((action) => (
              <button
                key={action}
                className="flex w-full items-center justify-between rounded-xl border border-[#ECECEC] bg-[#FAFAFA] px-3 py-2 text-left text-[12px] font-medium text-[#111111]"
              >
                {action}
                <span className="text-[#9CA3AF]">›</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AgencyShowcaseDemo() {
  return (
    <div className="grid gap-4 xl:grid-cols-[240px_1fr_240px]">
      <div className="space-y-4">
        <div className="rounded-2xl border border-[#ECECEC] bg-white p-4">
          <p className="text-[13px] font-semibold text-[#111111]">Search Filters</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {agencyFilters.map((filter) => (
              <span
                key={filter}
                className="rounded-full border border-[#DCE7FF] bg-[#EDF3FF] px-2.5 py-1 text-[10px] font-medium text-[#2B4D8A]"
              >
                {filter}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#ECECEC] bg-white p-4">
          <p className="text-[13px] font-semibold text-[#111111]">Shortlist</p>
          <div className="mt-3 space-y-2">
            {agencyTalentResults.slice(0, 2).map((talent) => (
              <div key={`short-${talent.name}`} className="rounded-xl border border-[#ECECEC] bg-[#FAFAFA] p-2.5">
                <p className="text-[12px] font-medium text-[#111111]">{talent.name}</p>
                <p className="text-[11px] text-[#6B7280]">{talent.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[#ECECEC] bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[16px] font-semibold text-[#111111]">Talent Search Results</p>
            <button className="rounded-full border border-[#ECECEC] bg-[#FAFAFA] px-2.5 py-1 text-[11px] text-[#111111]">
              Save to list
            </button>
          </div>
          <div className="space-y-3">
            {agencyTalentResults.map((talent) => (
              <div key={talent.name} className="rounded-xl border border-[#ECECEC] bg-[#FAFAFA] p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[13px] font-semibold text-[#111111]">{talent.name}</p>
                    <p className="text-[11px] text-[#6B7280]">{talent.specialty}</p>
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusClass(talent.clearance)}`}>
                    {talent.clearance}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-[#6B7280]">
                  <span>{talent.location}</span>
                  <span className="tabular-nums font-medium text-[#2B4D8A]">Match {talent.match}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#ECECEC] bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[14px] font-semibold text-[#111111]">Contract + License Queue</p>
            <button className="rounded-lg bg-[#111827] px-3 py-1.5 text-[11px] font-medium text-white">
              Generate License
            </button>
          </div>
          <div className="space-y-2">
            {agencyContracts.map((contract) => (
              <div key={contract.title} className="rounded-xl border border-[#ECECEC] bg-[#FAFAFA] p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="line-clamp-1 text-[12px] font-medium text-[#111111]">{contract.title}</p>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusClass(contract.status)}`}>
                    {contract.status}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[#6B7280]">{contract.scope}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[#ECECEC] bg-white p-4">
          <p className="text-[14px] font-semibold text-[#111111]">Payment Rail Workflow</p>
          <div className="mt-3 space-y-2">
            {agencyPayments.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-[11px]">
                <span className="text-[#6B7280]">{item.label}</span>
                <span className="tabular-nums font-semibold text-[#111111]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#ECECEC] bg-white p-4">
          <p className="text-[14px] font-semibold text-[#111111]">Status Timeline</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {agencyTimeline.map((step) => (
              <span key={step} className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${statusClass(step)}`}>
                {step}
              </span>
            ))}
          </div>
          <p className="mt-2 text-pretty text-[11px] text-[#6B7280]">
            Every studio payment creates linked invoice and actor payout records in the ledger.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProductCapabilitiesSection() {
  const paymentStatus = selectedProjectPayment.status;
  const paymentStatusIndex = agencyTimeline.indexOf(paymentStatus);

  return (
    <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-10 mt-48 mb-0">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
        <div className="flex flex-col gap-3">
          <span className="section-pill !mb-0 self-start">What Theatre.ai Does</span>
          <h2 className={platformSectionHeadingClass}>
            License, track, and localize digital performance in one operating layer.
          </h2>
        </div>
        <p className="max-w-[560px] lg:ml-auto text-[16px] leading-6 text-[#4B5563] text-pretty">
          This section mirrors real product behavior: vault consent controls, contract and usage governance, payment rails, and talent discovery workflows for actors, agencies, and studios.
        </p>
      </div>
      <div className="mt-12 grid gap-4 xl:grid-cols-2">
        <div className="border-shadow flex h-full flex-col rounded-[24px] bg-[#F7F7F7] p-4 md:p-5">
          <div>
            <div className="mb-2 inline-flex text-[#FF0402]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10 2.25l6 2v4.83c0 3.78-2.4 6.91-6 8.67-3.6-1.76-6-4.89-6-8.67V4.25l6-2zm0 1.58L5.5 5.34v3.74c0 3.02 1.8 5.61 4.5 7.19 2.7-1.58 4.5-4.17 4.5-7.19V5.34L10 3.83z" />
                <path d="M8.03 9.52a.75.75 0 00-1.06 1.06l1.6 1.6a.75.75 0 001.06 0l3.4-3.4a.75.75 0 10-1.06-1.06L9.1 10.59l-1.07-1.07z" />
              </svg>
            </div>
            <p className="text-[16px] font-semibold text-[#111111]">Asset Consent & Rights Controls</p>
            <p className="mt-1 text-[16px] leading-6 text-[#4B5563] text-pretty">Define how this specific verified asset can be licensed and used.</p>
          </div>

          <div className="mt-5 flex-1 rounded-xl border border-[#ECECEC] bg-white p-4">
            <div className="rounded-xl border border-[#ECECEC] bg-[#FAFAFA] p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#EDF3FF] text-[#2B4D8A]">
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10 2.5A2.5 2.5 0 007.5 5v4a2.5 2.5 0 005 0V5A2.5 2.5 0 0010 2.5z" />
                      <path d="M5.75 8.75a.75.75 0 00-1.5 0 5.75 5.75 0 005 5.7v1.8H7a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-2.25v-1.8a5.75 5.75 0 005-5.7.75.75 0 00-1.5 0 4.25 4.25 0 11-8.5 0z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold text-[#111111]">{selectedAsset.name}</p>
                    <p className="mt-0.5 text-[10px] text-[#6B7280]">{selectedAsset.type} asset • {selectedAsset.format}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full border border-[#DCE7FF] bg-[#EDF3FF] px-2 py-0.5 text-[10px] text-[#2B4D8A]">
                    {selectedAsset.type}
                  </span>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] ${statusClass(selectedAsset.status)}`}>
                    {selectedAsset.status}
                  </span>
                </div>
              </div>

              <div className="mt-3 rounded-lg border border-[#E6E6E6] bg-white px-2.5 py-2">
                <div className="flex h-9 items-end gap-1">
                  {assetPreviewBars.map((height, index) => (
                    <span
                      key={`${height}-${index}`}
                      className="w-1.5 rounded-full bg-[#CBD8F7]"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#111111] text-white">
                      <svg width="8" height="8" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M7 5.75a.75.75 0 011.14-.64l6.5 4.25a.75.75 0 010 1.28l-6.5 4.25A.75.75 0 017 14.25v-8.5z" />
                      </svg>
                    </span>
                    <span className="tabular-nums text-[10px] text-[#6B7280]">00:18 / {selectedAsset.duration}</span>
                  </div>
                  <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[10px] text-[#6B7280]">{selectedAsset.quality}</span>
                </div>
              </div>

              <div className="mt-3 grid gap-2 text-[10px] sm:grid-cols-2">
                <div className="rounded-lg bg-white px-2.5 py-2">
                  <p className="text-[#6B7280]">Duration</p>
                  <p className="mt-0.5 text-[11px] text-[#111111]">{selectedAsset.duration}</p>
                </div>
                <div className="rounded-lg bg-white px-2.5 py-2">
                  <p className="text-[#6B7280]">File Size</p>
                  <p className="mt-0.5 text-[11px] text-[#111111]">{selectedAsset.fileSize}</p>
                </div>
                <div className="rounded-lg bg-white px-2.5 py-2">
                  <p className="text-[#6B7280]">Sample Rate</p>
                  <p className="mt-0.5 text-[11px] text-[#111111]">{selectedAsset.sampleRate}</p>
                </div>
                <div className="rounded-lg bg-white px-2.5 py-2">
                  <p className="text-[#6B7280]">Language</p>
                  <p className="mt-0.5 text-[11px] text-[#111111]">{selectedAsset.language}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-dashed border-[#D9D9D9] pt-4">
              <p className="text-[11px] font-medium text-[#111111]">Policy checks for this asset before activation</p>
              <div className="mt-2.5 space-y-2">
                {policyChecks.map((check) => (
                  <div
                    key={check.label}
                    className="flex items-start gap-2 py-2"
                  >
                    <span className="mt-0.5 inline-flex size-5 items-center justify-center rounded-full bg-[#FFF1F1] text-[#D61D1F]">
                      <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10 2.25l6 2v4.83c0 3.78-2.4 6.91-6 8.67-3.6-1.76-6-4.89-6-8.67V4.25l6-2zm0 1.58L5.5 5.34v3.74c0 3.02 1.8 5.61 4.5 7.19 2.7-1.58 4.5-4.17 4.5-7.19V5.34L10 3.83z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[11px] font-medium text-[#111111]">{check.label}</p>
                      <p className="mt-0.5 text-[10px] leading-4 text-[#6B7280] text-pretty">{check.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-dashed border-[#D9D9D9] pt-4">
              <p className="text-[11px] font-medium text-[#111111]">Selected asset details</p>
              <div className="mt-3 space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Asset ID</span>
                  <span className="text-[#111111]">{selectedAsset.assetId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Consent version</span>
                  <span className="text-[#111111]">{selectedAsset.consentVersion}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Last updated</span>
                  <span className="text-[#111111]">{selectedAsset.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-shadow flex h-full flex-col rounded-[24px] bg-[#F7F7F7] p-4 md:p-5">
          <div>
            <div className="mb-2 inline-flex text-[#FF0402]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M7.5 3.25a.75.75 0 010 1.5H5.3l1.38 1.38a5.75 5.75 0 018.57 7.6.75.75 0 11-1.32-.72 4.25 4.25 0 00-6.35-5.62l1.2 1.2H5.25V5.06L6.53 6.34A5.74 5.74 0 0110.75 4h.25A.75.75 0 017.5 3.25z" />
                <path d="M14.7 15.25l-1.38-1.38a5.75 5.75 0 01-8.57-7.6.75.75 0 111.32.72 4.25 4.25 0 006.35 5.62l-1.2-1.2h3.53v3.53z" />
              </svg>
            </div>
            <p className="text-[16px] font-semibold text-[#111111]">License Lifecycle & Payout Reconciliation</p>
            <p className="mt-1 text-[16px] leading-6 text-[#4B5563] text-pretty">Track approvals, active licenses, and payout split from studio payment to actor net.</p>
          </div>

          <div className="mt-5 flex-1 rounded-xl border border-[#ECECEC] bg-white p-4">
            <div>
              <p className="text-[11px] font-medium text-[#111111]">Project payment details</p>
              <div className="mt-2.5 rounded-xl border border-[#ECECEC] bg-[#FAFAFA] p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[13px] font-semibold text-[#111111]">
                      {selectedProjectPayment.license} - {selectedProjectPayment.project}
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#6B7280]">{selectedProjectPayment.recipient}</p>
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] ${statusClass(selectedProjectPayment.status)}`}>
                    {selectedProjectPayment.status}
                  </span>
                </div>
                <div className="mt-3 grid gap-1.5 text-[11px] sm:grid-cols-2">
                  <div className="flex items-center justify-between sm:block">
                    <p className="text-[#6B7280]">Invoice ID</p>
                    <p className="text-[#111111]">{selectedProjectPayment.invoiceId}</p>
                  </div>
                  <div className="flex items-center justify-between sm:block">
                    <p className="text-[#6B7280]">Payment ID</p>
                    <p className="text-[#111111]">{selectedProjectPayment.paymentId}</p>
                  </div>
                  <div className="flex items-center justify-between sm:block">
                    <p className="text-[#6B7280]">Billing date</p>
                    <p className="text-[#111111]">{selectedProjectPayment.billingDate}</p>
                  </div>
                  <div className="flex items-center justify-between sm:block">
                    <p className="text-[#6B7280]">Payout date</p>
                    <p className="text-[#111111]">{selectedProjectPayment.payoutDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-dashed border-[#D9D9D9] pt-4">
              <p className="text-[11px] font-medium text-[#111111]">Payment breakdown</p>
              <div className="mt-2.5 space-y-2">
                {projectPaymentLineItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg bg-[#FAFAFA] px-2.5 py-2"
                  >
                    <div>
                      <p className="text-[11px] text-[#111111]">{item.label}</p>
                      <p className="mt-0.5 text-[10px] text-[#6B7280]">{item.note}</p>
                    </div>
                    <span className={`tabular-nums text-[11px] font-medium ${item.type === 'debit' ? 'text-[#B45309]' : 'text-[#111111]'}`}>
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 border-t border-[#ECECEC] pt-3 space-y-2 text-[11px]">
                {projectPaymentTotals.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between ${index === projectPaymentTotals.length - 1 ? 'font-semibold text-[#111111]' : ''}`}
                  >
                    <span className={index === projectPaymentTotals.length - 1 ? 'text-[#111111]' : 'text-[#6B7280]'}>{item.label}</span>
                    <span className="tabular-nums">{item.value}</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-[11px] font-medium text-[#111111]">Status timeline</p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {agencyTimeline.map((step, index) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] ${index <= paymentStatusIndex ? statusClass(step) : 'border-[#ECECEC] bg-white text-[#6B7280]'
                        }`}
                    >
                      {step}
                    </span>
                    {index < agencyTimeline.length - 1 && <span className="text-[10px] text-[#9CA3AF]">→</span>}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-[#6B7280]">
                Current state: <span className="font-medium text-[#111111]">{paymentStatus}</span> • invoice, settlement, and actor ledger records remain linked.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {platformFeatureCards.map((feature) => (
          <div key={feature.title} className="border-shadow rounded-2xl bg-[#F7F7F7] p-4">
            <div className="mb-3 inline-flex text-[#FF0402]">
              {feature.icon}
            </div>
            <p className="text-[16px] font-semibold text-[#111111]">{feature.title}</p>
            <p className="mt-1 text-[16px] leading-6 text-[#4B5563] text-pretty">{feature.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

function WhyPlatformSection() {
  return (
    <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-10 mt-32 md:mt-36">
      <div className="flex flex-col gap-3">
        <span className="section-pill !mb-0 self-start">Why This Platform</span>
        <h2 className={platformSectionHeadingClass}>
          Built on trust for every
          <br className="hidden md:block" /> AI performance workflow.
        </h2>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-[1.1fr_1fr]">
        <article className="flex h-full flex-col rounded-[24px] bg-[rgba(21,159,250,0.1)] p-5 md:p-6">
          <h3 className="mt-4 text-[28px] leading-[1.12] text-[#111111] md:text-[34px] text-balance font-['Inter']">
            A trust layer designed for studios, agencies, and talent.
          </h3>
          <p className="mt-3 max-w-[560px] text-[16px] leading-7 text-[#334155] text-pretty">
            Theatre.ai verifies identity, locks consent terms, enforces policy at runtime, and keeps legal-ready records from first request through final delivery.
          </p>

          <div className="mt-6">
            <div className="divide-y divide-dashed divide-[#C8DBF8]">
              {whyPlatformSignals.map((signal) => (
                <div key={signal.label} className="grid gap-1 py-3 sm:grid-cols-[170px_1fr] sm:items-center sm:gap-4">
                  <div className="flex items-center gap-2 text-[#159FFA]">
                    <span className="inline-flex size-4 items-center justify-center">{signal.icon}</span>
                    <p className="text-[11px] font-medium text-[#51627F]">{signal.label}</p>
                  </div>
                  <p className="text-[13px] leading-5 font-semibold text-[#111111]">{signal.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4">
            <p className="text-[12px] font-semibold text-[#111111] font-['Inter']">Trust checkpoint</p>
            <p className="mt-2 text-[13px] leading-6 text-[#334155] text-pretty">
              Before release, every output is matched to verified identity, active consent scope, territory rights, and connected payout records.
            </p>
          </div>
        </article>

        <div className="border-shadow rounded-[24px] border border-[#E5E7EB] bg-[#F7F7F7] p-2 sm:p-3">
          <img
            src="/trust_image.svg"
            alt="Trust and security workflow illustration"
            className="h-full w-full rounded-[18px] object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default function PlatformPage() {
  const [activeView, setActiveView] = useState<PlatformView>('actor');

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Platform — TheatreAI</title>
        <meta name="description" content="The platform for safe, compliant, AI-ready performance. Manage consent, licensing, and payouts for actors, agencies, and studios." />
        <meta property="og:title" content="Platform — TheatreAI" />
        <meta property="og:description" content="The platform for safe, compliant, AI-ready performance. Manage consent, licensing, and payouts for actors, agencies, and studios." />
        <meta property="og:image" content="/og_image.jpeg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Platform — TheatreAI" />
        <meta name="twitter:description" content="The platform for safe, compliant, AI-ready performance. Manage consent, licensing, and payouts for actors, agencies, and studios." />
        <meta name="twitter:image" content="/og_image.jpeg" />
      </Helmet>
      <section className="w-full relative overflow-hidden bg-white pb-10" style={{ paddingLeft: 0, paddingRight: 0 }}>

        {/* ─── Hero area with scoped background ─── */}
        <div className="relative overflow-hidden pt-32 pb-16" style={{ background: 'linear-gradient(180deg, #F5F5F7 0%, #F3F3F5 40%, #F9F9FA 75%, #FFFFFF 100%)' }}>

          {/* Floating orbs background */}
          <FloatingOrbsBackground />

          <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-10 mt-12">
            <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-16 lg:items-end mb-8 mt-4">
              <div className="flex-1">
                <h1 className="text-[36px] sm:text-[42px] md:text-[48px] leading-[1.05] tracking-[-0.02em] font-medium text-[#111111] font-['Inter'] m-0 p-0 text-left text-balance">
                  The platform for<br />safe, compliant,<br />AI-ready performance.
                </h1>
              </div>
            </div>
          </div>

          <div className="w-full relative z-10 mt-12 mb-0 max-w-[1300px] mx-auto px-6 md:px-10">
            <div className="relative w-full">
              <div className="w-full flex flex-col gap-6 md:flex-row md:justify-between md:items-end mb-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-[24px] md:text-[28px] leading-[1.2] font-medium text-[#111111] font-['Inter'] text-balance">
                    {activeView === 'actor'
                      ? 'Your Performance. Your Choice.'
                      : 'Real Actors. Clear Permission.'}
                  </h2>
                  <div className="text-[15px] md:text-[16px] leading-[1.5] text-[#4B5563]">
                    {activeView === 'actor' ? (
                      <p>
                        You stay in control of your voice and face. You decide how AI can use it. You get paid.
                      </p>
                    ) : (
                      <p>Find verified performers and create AI performances legally.</p>
                    )}
                  </div>
                </div>

                <div className="relative inline-grid w-fit grid-cols-2 items-center rounded-full bg-[#F3F4F6] p-1 shrink-0">
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full bg-white transition-transform duration-200 ease-out ${activeView === 'actor' ? 'translate-x-0' : 'translate-x-full'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setActiveView('actor')}
                    aria-pressed={activeView === 'actor'}
                    className={`relative z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[13px] md:text-[14px] font-medium transition-colors duration-200 ${activeView === 'actor' ? 'text-[#FF0402]' : 'text-gray-500'
                      }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF0402]" />
                    Actor Platform
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveView('agency')}
                    aria-pressed={activeView === 'agency'}
                    className={`relative z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[13px] md:text-[14px] font-medium transition-colors duration-200 ${activeView === 'agency' ? 'text-[#1DA0F2]' : 'text-gray-500'
                      }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1DA0F2]" />
                    Agency & Studios
                  </button>
                </div>
              </div>

              <div className="w-full rounded-[24px] bg-[#F8F8F8] p-4 md:p-[18px]">
                <div key={activeView} className="platform-tab-panel-enter">
                  {activeView === 'actor' ? <ActorShowcaseDemo /> : <AgencyShowcaseDemo />}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductCapabilitiesSection />

        <WhyPlatformSection />
      </section>

      <div className="relative z-10 bg-white">
        <CTASection />
      </div>
    </div>
  );
}
