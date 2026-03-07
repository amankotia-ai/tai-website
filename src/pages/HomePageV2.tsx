import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import '../components/Hero.css';
import CardScanner from '../components/CardScanner';
import HomepageV2HeroAmbient from '../components/HomepageV2HeroAmbient';
import MorphingCanvas from '../components/MorphingCanvas';

const IconUser = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-10"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>;
const IconCheckBadge = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-10"><path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 11.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>;
const IconShieldCheck = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-10"><path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>;
const IconClock = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-10"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg>;
const IconDocumentText = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-10"><path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" /><path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" /></svg>;
const IconSparkles = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-10"><path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-0.948.948l-.395 1.183a.75.75 0 01-1.424 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" /></svg>;
const IconGlobe = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-10"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.433 3.664A3.743 3.743 0 0112 5.25c1.604 0 3.064.654 4.122 1.764a.75.75 0 01-.06.059l-1.425 1.14a1.5 1.5 0 00-.45.922l-.1.897a.75.75 0 01-.476.604l-1.847.693a.75.75 0 01-.392.015l-1.096-.274a1.5 1.5 0 00-1.684.773l-1.932 3.864a1.5 1.5 0 00.222 1.796l.823.823A4.5 4.5 0 0111.25 21c-.487 0-.954-.078-1.396-.222l-1.921-1.921a1.5 1.5 0 00-.73-.4l-.862-.172a.75.75 0 01-.568-.52l-.634-1.902a1.5 1.5 0 00-.238-.415L3.6 14.122a1.5 1.5 0 01-.397-1.18v-.522a.75.75 0 01.378-.65l3.52-2.112A1.5 1.5 0 008.25 8.4V7.5a1.5 1.5 0 00-1.282-1.485l-.337-.048a.75.75 0 01-.58-.517C6.736 4.908 8.019 4.321 9.567 5.914z" clipRule="evenodd" /></svg>;
const IconLock = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-10"><path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" /></svg>;
const IconCurrency = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-10"><path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" /><path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v14.25c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 19.125V4.875zm11.25 1.125a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zm0 9a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" clipRule="evenodd" /></svg>;
const IconClipboard = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-10"><path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" /></svg>;
const IconUserGroup = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-10"><path fillRule="evenodd" d="M8.25 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>;

const actorFeaturesData: Array<{ title: string; description: string; icon?: React.ReactNode; demo?: React.ReactNode }> = [
  {
    title: 'Verified Profile',
    description: 'Create a verified CastID profile so studios know they are working with the real you.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        {/* Profile header */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="size-11 rounded-full bg-[#F0EAEA] flex items-center justify-center text-[#D61D1F] text-[16px] font-bold">E</div>
            <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-[#10B981] border-2 border-white">
              <svg viewBox="0 0 12 12" fill="white" className="size-2.5"><path fillRule="evenodd" d="M10.28 3.28a.75.75 0 010 1.06l-5.5 5.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 011.06-1.06L4.25 8.19l4.97-4.97a.75.75 0 011.06.06z" clipRule="evenodd" /></svg>
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#111111] truncate">Emma Chen</p>
            <p className="text-[11px] text-[#6B7280]">Voice Actor · Los Angeles</p>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 text-[10px] font-semibold text-[#166534]">
            <span className="size-1.5 rounded-full bg-[#10B981] inline-block"></span> Verified
          </span>
        </div>
        {/* CastID badge */}
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5 flex items-center gap-2">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#111111] text-white text-[9px] font-bold tracking-tight">ID</div>
          <div className="min-w-0">
            <p className="text-[9px] text-[#6B7280] uppercase tracking-wider">CastID</p>
            <p className="text-[11px] font-medium text-[#111111] font-mono truncate">CAST-EC-2026-8821</p>
          </div>
        </div>
        {/* Consent permissions */}
        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Consent Matrix</p>
          {[
            { label: 'Voice synthesis', allowed: true },
            { label: 'Training data', allowed: false },
            { label: 'Commercial use', allowed: true },
            { label: 'Likeness rights', allowed: false },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between text-[12px]">
              <span className="text-[#4B5563]">{item.label}</span>
              <span className={`font-semibold text-[11px] ${item.allowed ? 'text-[#10B981]' : 'text-[#D61D1F]'}`}>
                {item.allowed ? '✓ Allowed' : '✗ Blocked'}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Review Project Details',
    description: 'See who is requesting your voice or likeness and how it will be used before you approve anything.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Incoming Request</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF7ED] border border-[#FED7AA] px-2 py-0.5 text-[10px] font-semibold text-[#C2410C]">Pending</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#111111] text-white text-[10px] font-bold">AS</div>
          <div>
            <p className="text-[13px] font-semibold text-[#111111]">Atlas Game Studio</p>
            <p className="text-[11px] text-[#6B7280]">Verified Studio · San Francisco</p>
          </div>
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-3 space-y-2">
          {[
            { label: 'Project', value: "'Nebula' Main Character" },
            { label: 'Use type', value: 'Game Voiceover' },
            { label: 'Territory', value: 'North America' },
            { label: 'Duration', value: '24 months' },
            { label: 'Fee', value: '$4,500', bold: true },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between text-[11px]">
              <span className="text-[#6B7280]">{item.label}</span>
              <span className={item.bold ? 'font-semibold text-[#111111]' : 'font-medium text-[#111111]'}>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="flex-1 rounded-lg bg-[#111111] py-1.5 text-[12px] font-medium text-white">Approve</button>
          <button className="flex-1 rounded-lg border border-[#E5E7EB] bg-white py-1.5 text-[12px] font-medium text-[#111111]">Details</button>
        </div>
      </div>
    ),
  },
  {
    title: 'Define Your Terms',
    description: 'Choose where your performance can be used, for how long, and for what type of projects.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Consent Vault</p>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#10B981]">
            <span className="size-1.5 rounded-full bg-[#10B981] inline-block"></span> Active
          </span>
        </div>
        <div className="space-y-0">
          {[
            { label: 'Territory', value: 'United States only' },
            { label: 'Duration', value: '12 months max' },
            { label: 'Renewal', value: 'Re-approval required' },
            { label: 'Training rights', value: 'Not permitted', warn: true },
            { label: 'Derivative works', value: 'Not permitted', warn: true },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between text-[11px] border-b border-[#F4F4F5] py-2 last:border-0">
              <span className="text-[#6B7280]">{item.label}</span>
              <span className={`font-medium ${item.warn ? 'text-[#D61D1F]' : 'text-[#111111]'}`}>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#F0FDF4] border border-[#BBF7D0] p-2.5 flex items-center gap-2">
          <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#10B981] shrink-0"><path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm3.28 5.28a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z" clipRule="evenodd" /></svg>
          <p className="text-[11px] font-medium text-[#166534]">Policy enforced on all active licenses</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Built In Safeguards',
    description: 'Instantly see whether a project falls within the boundaries you set.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Pre-activation checks</p>
          <span className="inline-flex items-center rounded-full bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 text-[10px] font-semibold text-[#1D4ED8]">3 / 4 passed</span>
        </div>
        <div className="space-y-2">
          {[
            { label: 'CastID verification', status: 'pass' },
            { label: 'Consent scope match', status: 'pass' },
            { label: 'Territory gate', status: 'pass' },
            { label: 'Contract signature', status: 'pending' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] p-2.5">
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
    ),
  },
  {
    title: 'Multilingual Licensing',
    description: 'Allow your voice to be used in different languages and regions from one agreement.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Territory Licenses</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF8FF] border border-[#BFDBFE] px-2 py-0.5 text-[10px] font-semibold text-[#159FFA]">4 active</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { region: 'United States', lang: 'EN-US', active: true },
            { region: 'United Kingdom', lang: 'EN-GB', active: true },
            { region: 'Germany', lang: 'DE', active: true },
            { region: 'Japan', lang: 'JA', active: true },
            { region: 'France', lang: 'FR', active: false },
            { region: 'Brazil', lang: 'PT-BR', active: false },
          ].map(r => (
            <div key={r.region} className={`rounded-[8px] p-2 flex items-center gap-1.5 ${r.active ? 'bg-[#F0FDF4] border border-[#BBF7D0]' : 'bg-[#F9F9FA] border border-[#F1F1F1]'}`}>
              <span className={`size-1.5 rounded-full shrink-0 ${r.active ? 'bg-[#10B981]' : 'bg-[#D1D5DB]'}`}></span>
              <div className="min-w-0">
                <p className={`text-[10px] font-semibold truncate ${r.active ? 'text-[#111111]' : 'text-[#9CA3AF]'}`}>{r.lang}</p>
                <p className={`text-[9px] truncate ${r.active ? 'text-[#4B5563]' : 'text-[#9CA3AF]'}`}>{r.region}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#6B7280]">License agreement</span>
            <span className="font-medium text-[#111111]">Single master</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#6B7280]">Renewal model</span>
            <span className="font-medium text-[#111111]">Per-region opt-in</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Secure Media Storage',
    description: 'Store your voice recordings and reference files safely with encrypted access.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Vault Assets</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F9F9FA] border border-[#E5E7EB] px-2 py-0.5 text-[10px] font-medium text-[#6B7280]">AES-256</span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'Reference_Voice_2026.wav', type: 'Voice', size: '24 MB', status: 'verified' },
            { name: 'Likeness_Scan_HD.glb', type: 'Likeness', size: '182 MB', status: 'verified' },
            { name: 'Alt_Take_Studio.wav', type: 'Voice', size: '18 MB', status: 'pending' },
          ].map(f => (
            <div key={f.name} className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#111111] text-white text-[8px] font-bold">{f.type === 'Voice' ? 'WAV' : 'GLB'}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-[#111111] truncate">{f.name}</p>
                <p className="text-[10px] text-[#6B7280]">{f.type} · {f.size}</p>
              </div>
              <span className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${f.status === 'verified' ? 'bg-[#F0FDF4] text-[#166534]' : 'bg-[#FFF7ED] text-[#C2410C]'}`}>
                {f.status}
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5 flex items-center gap-2">
          <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#6B7280] shrink-0"><path fillRule="evenodd" d="M8 1.5a5.25 5.25 0 00-4.25 8.35l-.88 2.93a.25.25 0 00.31.31l2.93-.88A5.25 5.25 0 108 1.5zM8 5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 018 5zm0 5a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" /></svg>
          <p className="text-[11px] text-[#6B7280]">Access gated by active license only</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Full Transparency',
    description: 'See a record of every AI use linked to your licensed performances.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Audit Trail</p>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#10B981]">
            <span className="size-1.5 rounded-full bg-[#10B981] inline-block animate-pulse"></span> Live
          </span>
        </div>
        <div className="space-y-2">
          {[
            { event: 'Generation completed', ref: 'GEN-2026-00441', time: '2m ago', ok: true },
            { event: 'License scope validated', ref: 'LIC-EC-20260112', time: '2m ago', ok: true },
            { event: 'Territory check passed', ref: 'TER-NA-0041', time: '3m ago', ok: true },
            { event: 'Consent version matched', ref: 'CNS-v4.2', time: '3m ago', ok: true },
          ].map(e => (
            <div key={e.ref} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#F0FDF4]">
                <svg viewBox="0 0 8 8" fill="currentColor" className="size-2 text-[#10B981]"><path fillRule="evenodd" d="M6.84 1.84a.5.5 0 010 .71l-3.5 3.5a.5.5 0 01-.71 0l-1.5-1.5a.5.5 0 01.71-.71L3 5.03l3.15-3.15a.5.5 0 01.71-.01z" clipRule="evenodd" /></svg>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-[#111111]">{e.event}</p>
                <p className="text-[10px] text-[#9CA3AF] font-mono">{e.ref}</p>
              </div>
              <span className="text-[10px] text-[#9CA3AF] shrink-0">{e.time}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Usage History',
    description: 'Track every time your voice or likeness is used through the platform.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Generation Log</p>
          <span className="text-[10px] font-medium text-[#6B7280]">Last 7 days</span>
        </div>
        <div className="space-y-2">
          {[
            { project: "'Nebula' Main Character", studio: 'Atlas Game Studio', type: 'Voice', date: 'Mar 2', uses: 3 },
            { project: 'Winter Campaign VO', studio: 'Nova Brands', type: 'Voice', date: 'Feb 28', uses: 1 },
            { project: 'Promo Narration Pack', studio: 'Orbit Media', type: 'Voice', date: 'Feb 26', uses: 7 },
          ].map(e => (
            <div key={e.project} className="rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold text-[#111111] truncate">{e.project}</p>
                <span className="shrink-0 text-[10px] font-medium text-[#6B7280]">{e.date}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px]">
                <span className="text-[#6B7280]">{e.studio}</span>
                <span className="font-medium text-[#D61D1F]">{e.uses}× {e.type}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5 flex items-center justify-between text-[11px]">
          <span className="text-[#6B7280]">Total sessions this period</span>
          <span className="font-semibold text-[#111111]">11 uses</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Payment Tracking',
    description: 'Follow the status of every payment from request to payout.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Invoice Ledger</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 text-[10px] font-semibold text-[#166534]">1 paid</span>
        </div>
        <div className="space-y-2">
          {[
            { id: 'INV-EC-2026-003', studio: 'Atlas Game Studio', amount: '$4,500', status: 'paid' },
            { id: 'INV-EC-2026-002', studio: 'Nova Brands', amount: '$2,800', status: 'in review' },
            { id: 'INV-EC-2026-001', studio: 'Orbit Media', amount: '$1,200', status: 'requested' },
          ].map(inv => (
            <div key={inv.id} className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono text-[#9CA3AF]">{inv.id}</p>
                <p className="text-[11px] font-medium text-[#111111] truncate">{inv.studio}</p>
              </div>
              <span className="shrink-0 font-semibold text-[12px] text-[#111111]">{inv.amount}</span>
              <span className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${inv.status === 'paid' ? 'bg-[#F0FDF4] text-[#166534]' :
                inv.status === 'in review' ? 'bg-[#EFF6FF] text-[#1D4ED8]' :
                  'bg-[#FFF7ED] text-[#C2410C]'
                }`}>{inv.status}</span>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5 flex items-center justify-between text-[11px]">
          <span className="text-[#6B7280]">Outstanding balance</span>
          <span className="font-semibold text-[#111111]">$4,000</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Automatic Payouts',
    description: 'Receive your earnings automatically once the project is completed and paid.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Settlement</p>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#10B981]">
            <span className="size-1.5 rounded-full bg-[#10B981] inline-block"></span> Processing
          </span>
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-3 space-y-2">
          {[
            { label: 'Gross payment', value: '$4,500' },
            { label: 'Platform fee (10%)', value: '−$450' },
            { label: 'Net actor payout', value: '$4,050', bold: true },
          ].map(row => (
            <div key={row.label} className={`flex items-center justify-between text-[11px] ${row.bold ? 'pt-2 border-t border-[#E5E7EB]' : ''}`}>
              <span className={row.bold ? 'font-semibold text-[#111111]' : 'text-[#6B7280]'}>{row.label}</span>
              <span className={row.bold ? 'font-bold text-[#111111] text-[13px]' : 'font-medium text-[#111111]'}>{row.value}</span>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5 flex items-center justify-between text-[11px]">
          <span className="text-[#6B7280]">Wallet</span>
          <span className="font-medium text-[#111111] font-mono">•••• 4821</span>
        </div>
        <div className="rounded-[10px] bg-[#F0FDF4] border border-[#BBF7D0] p-2.5">
          <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold mb-1.5">Timeline</p>
          <div className="flex items-center gap-1 text-[10px] font-medium">
            {['Requested', 'In Review', 'Approved', 'Paid'].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-1">
                <span className={i < 3 ? 'text-[#10B981]' : 'text-[#D1D5DB]'}>{step}</span>
                {i < arr.length - 1 && <span className="text-[#D1D5DB]">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const studioFeaturesData: Array<{ title: string; description: string; icon?: React.ReactNode; demo?: React.ReactNode }> = [
  {
    title: 'Search Verified Actors',
    description: 'Find performers who are ready to license their voice or likeness for AI projects.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Talent Search</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF8FF] border border-[#BFDBFE] px-2 py-0.5 text-[10px] font-semibold text-[#159FFA]">24 results</span>
        </div>
        <div className="rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] px-2.5 py-2 flex items-center gap-2">
          <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#9CA3AF] shrink-0"><path fillRule="evenodd" d="M6.5 1.5a5 5 0 100 10 5 5 0 000-10zM0 6.5a6.5 6.5 0 1111.573 4.072l3.928 3.928a.75.75 0 01-1.06 1.06l-3.928-3.927A6.5 6.5 0 010 6.5z" clipRule="evenodd" /></svg>
          <span className="text-[11px] text-[#9CA3AF]">Voice · North America · License-ready</span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'Emma Chen', role: 'Voice Actor', loc: 'Los Angeles', status: 'license-ready' },
            { name: 'James Adeyemi', role: 'Voice Actor', loc: 'New York', status: 'license-ready' },
            { name: 'Priya Nair', role: 'Voice Actor', loc: 'Toronto', status: 'in negotiation' },
          ].map(t => (
            <div key={t.name} className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#EEF8FF] text-[#159FFA] text-[11px] font-bold">{t.name[0]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-[#111111]">{t.name}</p>
                <p className="text-[10px] text-[#6B7280]">{t.role} · {t.loc}</p>
              </div>
              <span className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${t.status === 'license-ready' ? 'bg-[#F0FDF4] text-[#166534]' : 'bg-[#FFF7ED] text-[#C2410C]'}`}>
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Smart Talent Matching',
    description: 'Discover actors who fit your role based on voice, performance style, and project needs.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Match Results</p>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#159FFA]">
            <span className="size-1.5 rounded-full bg-[#159FFA] inline-block animate-pulse"></span> AI scoring
          </span>
        </div>
        <div className="rounded-[8px] bg-[#F0F8FF] border border-[#BFDBFE] p-2 flex items-center gap-2">
          <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#159FFA] shrink-0"><path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5z" clipRule="evenodd" /></svg>
          <p className="text-[11px] font-medium text-[#1D4ED8]">Brief: Sci-fi narrator · Neutral accent · EN-US</p>
        </div>
        <div className="space-y-2">
          {[
            { name: 'Emma Chen', score: 97, tags: ['neutral', 'commercial'] },
            { name: 'Marcus Reid', score: 91, tags: ['neutral', 'editorial'] },
            { name: 'Yuki Tanaka', score: 86, tags: ['warm', 'narrative'] },
          ].map(m => (
            <div key={m.name} className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#EEF8FF] text-[#159FFA] text-[11px] font-bold">{m.name[0]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-[#111111]">{m.name}</p>
                <div className="flex gap-1 mt-0.5">
                  {m.tags.map(t => <span key={t} className="text-[9px] bg-[#F3F4F6] text-[#6B7280] px-1 py-0.5 rounded">{t}</span>)}
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end">
                <span className="text-[13px] font-bold text-[#159FFA]">{m.score}</span>
                <span className="text-[9px] text-[#9CA3AF]">match</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Set Licensing Terms',
    description: 'Define where, how, and for how long the performance can be used.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">License Builder</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF7ED] border border-[#FED7AA] px-2 py-0.5 text-[10px] font-semibold text-[#C2410C]">Draft</span>
        </div>
        <div className="space-y-2">
          {[
            { label: 'Project', value: "'Nebula' DLC Campaign" },
            { label: 'Use type', value: 'Synthetic voiceover' },
            { label: 'Territory', value: 'Worldwide excl. CN' },
            { label: 'Duration', value: '18 months' },
            { label: 'Training rights', value: 'Not included', warn: true },
            { label: 'License value', value: '$6,200', bold: true },
          ].map(row => (
            <div key={row.label} className={`flex items-center justify-between text-[11px] border-b border-[#F4F4F5] pb-1.5 last:border-0 last:pb-0 ${row.bold ? 'pt-1.5 border-t border-[#E5E7EB]' : ''}`}>
              <span className="text-[#6B7280]">{row.label}</span>
              <span className={`font-medium ${row.bold ? 'font-bold text-[#111111] text-[12px]' : row.warn ? 'text-[#D61D1F]' : 'text-[#111111]'}`}>{row.value}</span>
            </div>
          ))}
        </div>
        <button className="w-full rounded-lg bg-[#159FFA] py-1.5 text-[12px] font-semibold text-white">Send to talent for review</button>
      </div>
    ),
  },
  {
    title: 'Permission First',
    description: "Every request is checked against the actor's approved permissions before anything is created.",
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Workflow Gate</p>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#10B981]">
            <span className="size-1.5 rounded-full bg-[#10B981] inline-block"></span> All clear
          </span>
        </div>
        <div className="rounded-[8px] bg-[#F0F8FF] border border-[#BFDBFE] p-2.5 flex items-center gap-2">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#159FFA] text-white text-[9px] font-bold">REQ</div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-[#111111] truncate">'Nebula' DLC · Dialogue replacement</p>
            <p className="text-[10px] text-[#6B7280]">Atlas Game Studio · Emma Chen</p>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { label: 'Performer consent on file', ok: true },
            { label: 'Use type within scope', ok: true },
            { label: 'Territory gate passed', ok: true },
            { label: 'Expiry date valid', ok: true },
            { label: 'Training exclusion enforced', ok: true },
          ].map(c => (
            <div key={c.label} className="flex items-center gap-2 text-[11px]">
              <span className={`flex size-4 shrink-0 items-center justify-center rounded-full ${c.ok ? 'bg-[#F0FDF4]' : 'bg-[#FEF2F2]'}`}>
                <svg viewBox="0 0 8 8" fill="currentColor" className={`size-2 ${c.ok ? 'text-[#10B981]' : 'text-[#D61D1F]'}`}><path fillRule="evenodd" d="M6.84 1.84a.5.5 0 010 .71l-3.5 3.5a.5.5 0 01-.71 0l-1.5-1.5a.5.5 0 01.71-.71L3 5.03l3.15-3.15a.5.5 0 01.71-.01z" clipRule="evenodd" /></svg>
              </span>
              <span className="text-[#4B5563]">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Built In Compliance',
    description: 'The platform blocks any use that falls outside the agreed licensing terms.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Compliance Engine</p>
          <span className="inline-flex items-center rounded-full bg-[#EEF8FF] border border-[#BFDBFE] px-2 py-0.5 text-[10px] font-semibold text-[#159FFA]">Auto-run</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Territory', result: 'North America', pass: true },
            { label: 'Expiry', result: 'Valid · 214 days', pass: true },
            { label: 'Use class', result: 'Matched', pass: true },
            { label: 'Training block', result: 'Enforced', pass: true },
          ].map(c => (
            <div key={c.label} className={`rounded-[8px] p-2.5 border ${c.pass ? 'bg-[#F0FDF4] border-[#BBF7D0]' : 'bg-[#FEF2F2] border-[#FECACA]'}`}>
              <p className="text-[9px] text-[#6B7280] uppercase tracking-wider">{c.label}</p>
              <p className={`text-[11px] font-semibold mt-0.5 ${c.pass ? 'text-[#166534]' : 'text-[#D61D1F]'}`}>{c.result}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5 flex items-center justify-between text-[11px]">
          <span className="text-[#6B7280]">Render clearance</span>
          <span className="font-semibold text-[#10B981]">✓ Approved to proceed</span>
        </div>
        <div className="rounded-[10px] bg-[#FEF2F2] border border-[#FECACA] p-2.5 flex items-center gap-2">
          <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#D61D1F] shrink-0"><path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM8 5a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 018 5zm0 6a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" /></svg>
          <p className="text-[11px] font-medium text-[#D61D1F]">Unauthorized renders are auto-blocked</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Manage Shortlists',
    description: 'Save and organize actors while your team reviews and approves talent choices.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Project Shortlist</p>
          <span className="text-[10px] font-medium text-[#6B7280]">'Nebula' DLC</span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'Emma Chen', stage: 'License sent', color: 'text-[#159FFA] bg-[#EEF8FF] border-[#BFDBFE]' },
            { name: 'Marcus Reid', stage: 'Shortlisted', color: 'text-[#6B7280] bg-[#F9F9FA] border-[#E5E7EB]' },
            { name: 'James Adeyemi', stage: 'Approved', color: 'text-[#166534] bg-[#F0FDF4] border-[#BBF7D0]' },
            { name: 'Yuki Tanaka', stage: 'Declined', color: 'text-[#D61D1F] bg-[#FEF2F2] border-[#FECACA]' },
          ].map(t => (
            <div key={t.name} className="flex items-center gap-2.5 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#EEF8FF] text-[#159FFA] text-[11px] font-bold">{t.name[0]}</div>
              <span className="flex-1 text-[11px] font-medium text-[#111111]">{t.name}</span>
              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${t.color}`}>{t.stage}</span>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5 flex items-center justify-between text-[11px]">
          <span className="text-[#6B7280]">License locked</span>
          <span className="font-semibold text-[#111111]">1 of 4 talent</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Work With Agents',
    description: 'Coordinate approvals with actors, agents, and production teams in one place.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Project Thread</p>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#10B981]">
            <span className="size-1.5 rounded-full bg-[#10B981] inline-block animate-pulse"></span> Active
          </span>
        </div>
        <div className="space-y-2.5">
          {[
            { from: 'Atlas Studio', role: 'Studio', msg: 'License terms sent for review.', time: '10:22 am', fromStudio: true },
            { from: 'TalentFirst Agency', role: 'Agency', msg: "Emma has reviewed — minor territory amendment requested.", time: '11:05 am', fromStudio: false },
            { from: 'Atlas Studio', role: 'Studio', msg: 'Amendment accepted. Please countersign.', time: '11:40 am', fromStudio: true },
          ].map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.fromStudio ? '' : 'flex-row-reverse'}`}>
              <div className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${m.fromStudio ? 'bg-[#111111]' : 'bg-[#159FFA]'}`}>{m.from[0]}</div>
              <div className={`max-w-[80%] rounded-[10px] p-2 ${m.fromStudio ? 'bg-[#F9F9FA] border border-[#F1F1F1]' : 'bg-[#EEF8FF] border border-[#BFDBFE]'}`}>
                <p className="text-[9px] font-semibold text-[#6B7280] mb-0.5">{m.from} · {m.time}</p>
                <p className="text-[10px] text-[#111111] leading-relaxed">{m.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Simple Payments',
    description: 'Handle project payments, platform fees, and actor payouts from one dashboard.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Payment Dashboard</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF8FF] border border-[#BFDBFE] px-2 py-0.5 text-[10px] font-semibold text-[#159FFA]">Q1 2026</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Gross out', value: '$42,800', sub: '6 projects' },
            { label: 'Platform fees', value: '$4,280', sub: '10% rate' },
            { label: 'Actor payouts', value: '$38,520', sub: '14 talent' },
            { label: 'Pending', value: '$9,200', sub: '2 invoices' },
          ].map(s => (
            <div key={s.label} className="rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <p className="text-[9px] text-[#6B7280] uppercase tracking-wider">{s.label}</p>
              <p className="text-[13px] font-bold text-[#111111] mt-0.5">{s.value}</p>
              <p className="text-[9px] text-[#9CA3AF]">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          {[
            { talent: 'Emma Chen', amount: '$4,050', status: 'paid' },
            { talent: 'Marcus Reid', amount: '$2,520', status: 'processing' },
            { talent: 'James Adeyemi', amount: '$6,300', status: 'paid' },
          ].map(p => (
            <div key={p.talent} className="flex items-center justify-between text-[11px]">
              <span className="text-[#4B5563]">{p.talent}</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#111111]">{p.amount}</span>
                <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${p.status === 'paid' ? 'bg-[#F0FDF4] text-[#166534]' : 'bg-[#EEF8FF] text-[#159FFA]'}`}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Complete Audit Records',
    description: 'Maintain clear records of every contract, approval, and AI generation.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Session Ledger</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F9F9FA] border border-[#E5E7EB] px-2 py-0.5 text-[10px] font-medium text-[#6B7280]">Immutable</span>
        </div>
        <div className="space-y-2">
          {[
            { id: 'SES-2026-0441', event: 'Generation · Dialogue replacement', contract: 'LIC-EC-20260112', time: 'Mar 2, 10:12 am' },
            { id: 'SES-2026-0440', event: 'License activated · Emma Chen', contract: 'LIC-EC-20260112', time: 'Mar 2, 09:58 am' },
            { id: 'SES-2026-0439', event: 'Consent verified · v4.2', contract: 'CNS-EC-v4.2', time: 'Mar 2, 09:55 am' },
          ].map(e => (
            <div key={e.id} className="rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2.5">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-[10px] font-mono text-[#9CA3AF]">{e.id}</p>
                <p className="text-[9px] text-[#9CA3AF] shrink-0">{e.time}</p>
              </div>
              <p className="text-[11px] font-medium text-[#111111]">{e.event}</p>
              <p className="text-[10px] font-mono text-[#6B7280] mt-0.5">↳ {e.contract}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] bg-[#EEF8FF] border border-[#BFDBFE] p-2.5 flex items-center gap-2">
          <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-[#159FFA] shrink-0"><path fillRule="evenodd" d="M12.5 2h-9A1.5 1.5 0 002 3.5v9A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0012.5 2zM5 8.75a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0v-1.5zm3-2a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zm3-2a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0V4.75z" clipRule="evenodd" /></svg>
          <p className="text-[11px] font-medium text-[#1D4ED8]">Export-ready for legal review at any time</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Local Licensing',
    description: 'Manage rights across borders and languages for regional productions.',
    demo: (
      <div className="w-full rounded-[16px] bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Distribution Rights</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF8FF] border border-[#BFDBFE] px-2 py-0.5 text-[10px] font-semibold text-[#159FFA]">5 markets</span>
        </div>
        <div className="space-y-1.5">
          {[
            { market: 'North America', langs: 'EN-US, EN-CA, FR-CA', status: 'cleared', deliverables: 3 },
            { market: 'Western Europe', langs: 'EN-GB, DE, FR, ES', status: 'cleared', deliverables: 4 },
            { market: 'Japan', langs: 'JA', status: 'cleared', deliverables: 1 },
            { market: 'Latin America', langs: 'ES-LAT, PT-BR', status: 'pending', deliverables: 0 },
            { market: 'Middle East', langs: 'AR', status: 'blocked', deliverables: 0 },
          ].map(m => (
            <div key={m.market} className="flex items-center gap-2 rounded-[8px] bg-[#F9F9FA] border border-[#F1F1F1] p-2">
              <span className={`size-2 shrink-0 rounded-full ${m.status === 'cleared' ? 'bg-[#10B981]' : m.status === 'pending' ? 'bg-[#F59E0B]' : 'bg-[#D61D1F]'}`}></span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-[#111111]">{m.market}</p>
                <p className="text-[9px] text-[#6B7280] truncate">{m.langs}</p>
              </div>
              <span className="text-[9px] font-semibold text-[#9CA3AF] shrink-0">
                {m.status === 'cleared' ? `${m.deliverables} files` : m.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const heroSubPoints: Array<{
  key: 'identity' | 'contract' | 'audit';
  title: string;
  description: string;
}> = [
    {
      key: 'identity',
      title: 'Verify Real Actors',
      description: 'We ensure that every profile belongs to a real performer.',
    },
    {
      key: 'contract',
      title: 'License Permissions',
      description: 'Actors control how their voice and likeness can be used.',
    },
    {
      key: 'audit',
      title: 'Track Everything',
      description: 'Every AI creation is recorded so usage stays transparent.',
    },
  ];

function HeroPointIcon({ kind }: { kind: 'identity' | 'contract' | 'audit' }) {
  const iconClassName = 'size-4 text-[#D61D1F]';

  if (kind === 'identity') {
    return (
      <svg viewBox="0 0 16 16" className={iconClassName} fill="currentColor" aria-hidden="true">
        <circle cx="8" cy="5" r="2.6" />
        <path d="M3.4 12.7c0-2.25 2.06-4.1 4.6-4.1s4.6 1.85 4.6 4.1v.55a.75.75 0 0 1-.75.75H4.15a.75.75 0 0 1-.75-.75z" />
      </svg>
    );
  }
  if (kind === 'contract') {
    return (
      <svg viewBox="0 0 16 16" className={iconClassName} fill="currentColor" aria-hidden="true">
        <path d="M4.35 1.95h5.05a1 1 0 0 1 .7.3l2.15 2.15a1 1 0 0 1 .3.7v8.55a1.4 1.4 0 0 1-1.4 1.4h-6.8a1.4 1.4 0 0 1-1.4-1.4v-10.3a1.4 1.4 0 0 1 1.4-1.4z" />
        <rect x="5.1" y="7.1" width="5.9" height="1.1" rx="0.55" fill="#ffffff" />
        <rect x="5.1" y="9.2" width="5.9" height="1.1" rx="0.55" fill="#ffffff" />
        <path d="M9.35 2.2v2.35a.8.8 0 0 0 .8.8h2.35" fill="#ffffff" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className={iconClassName} fill="currentColor" aria-hidden="true">
      <rect x="3" y="2.35" width="10" height="12" rx="1.6" />
      <rect x="5.2" y="5.1" width="5.6" height="1.05" rx="0.52" fill="#ffffff" />
      <rect x="5.2" y="7.25" width="5.6" height="1.05" rx="0.52" fill="#ffffff" />
      <rect x="5.2" y="9.4" width="3.7" height="1.05" rx="0.52" fill="#ffffff" />
      <path d="M9.45 11.45l.9.92 1.7-1.8.75.72-2.44 2.56-1.66-1.68z" fill="#ffffff" />
    </svg>
  );
}

type WhatTabKey = 'actors' | 'studios';
type WhatPointIconKey = 'shield' | 'check' | 'spark' | 'ledger';

type WhatTabData = {
  tabLabel: string;
  title: string;
  description: string;
  points: Array<{
    id: string;
    title: string;
    detail: string;
    icon: WhatPointIconKey;
  }>;
};

const whatTabData: Record<WhatTabKey, WhatTabData> = {
  actors: {
    tabLabel: 'For Actors',
    title: 'Your performance. Your identity. Your rules.',
    description:
      'Approve or decline requests instantly. Track every use of your likeness without slowing productions down.',
    points: [
      {
        id: 'actor-1',
        title: 'Review each request before usage',
        detail: 'See project intent, license scope, and counterpart identity before approval.',
        icon: 'shield',
      },
      {
        id: 'actor-2',
        title: 'Define clear consent boundaries',
        detail: 'Set territory, duration, training limits, and renewal rules in one place.',
        icon: 'check',
      },
      {
        id: 'actor-3',
        title: 'Run policy checks before activation',
        detail: 'Validate project type, training permissions, and territory limits before release.',
        icon: 'spark',
      },
      {
        id: 'actor-4',
        title: 'Track usage and payment history',
        detail: 'Review every generation event, invoice, and payout status in one ledger.',
        icon: 'ledger',
      },
    ],
  },
  studios: {
    tabLabel: 'For Studios',
    title: 'Find verified talent and keep every AI project compliant.',
    description:
      'Source ready-to-license performers, run consent-safe workflows, and keep project records audit-ready from request to payout.',
    points: [
      {
        id: 'studio-1',
        title: 'Find verified talent profiles',
        detail: 'Match performers by identity trust, usage readiness, and rights context for each project brief.',
        icon: 'shield',
      },
      {
        id: 'studio-2',
        title: 'Set project licensing terms',
        detail: 'Define scope, territories, duration, and fee structure before activation.',
        icon: 'check',
      },
      {
        id: 'studio-3',
        title: 'Stay compliant before launch',
        detail: 'Run consent, policy, and region checks so every generation stays within approved rules.',
        icon: 'spark',
      },
      {
        id: 'studio-4',
        title: 'Track project settlement details',
        detail: 'Review invoice, deductions, payout status, and audit history in one linked workflow.',
        icon: 'ledger',
      },
    ],
  },
};

function WhatPointIcon({ kind }: { kind: WhatPointIconKey }) {
  const iconClassName = 'size-4 shrink-0 text-current';

  if (kind === 'shield') {
    return (
      <svg viewBox="0 0 16 16" className={iconClassName} fill="currentColor" aria-hidden="true">
        <path d="M8 1.55 13.25 3.5v3.9c0 3.2-2.12 5.96-5.25 7.05C4.87 13.36 2.75 10.6 2.75 7.4V3.5L8 1.55z" />
      </svg>
    );
  }
  if (kind === 'check') {
    return (
      <svg viewBox="0 0 16 16" className={iconClassName} fill="currentColor" aria-hidden="true">
        <path d="M8 1.7a6.3 6.3 0 1 1 0 12.6A6.3 6.3 0 0 1 8 1.7zm3.2 4.02-3.8 4.02-2-1.98-.84.85 2.53 2.5a.85.85 0 0 0 1.2-.02l4.5-4.78-.59-.59a.7.7 0 0 0-1 0z" />
      </svg>
    );
  }
  if (kind === 'ledger') {
    return (
      <svg viewBox="0 0 16 16" className={iconClassName} fill="currentColor" aria-hidden="true">
        <rect x="2.2" y="2.2" width="11.6" height="11.6" rx="2.1" />
        <rect x="4.5" y="5" width="7" height="1.2" rx="0.6" fill="#ffffff" />
        <rect x="4.5" y="7.4" width="7" height="1.2" rx="0.6" fill="#ffffff" />
        <rect x="4.5" y="9.8" width="4.8" height="1.2" rx="0.6" fill="#ffffff" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className={iconClassName} fill="currentColor" aria-hidden="true">
      <path d="M8 1.4 9.7 5.1l3.98.48-2.96 2.58.82 3.86L8 10.09l-3.54 1.93.82-3.86L2.32 5.58l3.98-.48L8 1.4z" />
    </svg>
  );
}

function ActorsWhatDemo() {
  const waveformHeights = [10, 18, 12, 24, 16, 28, 14, 20, 17, 25, 13, 21, 15, 23, 18, 27] as const;
  const policyChecks = [
    {
      id: 'castid-verification',
      title: 'CastID verification',
      detail: 'Actor and requester identities must match trusted records before activation.',
    },
    {
      id: 'consent-rules',
      title: 'Consent rules',
      detail: 'Use case, duration, and training permissions are validated against vault policy.',
    },
    {
      id: 'territory-gate',
      title: 'Territory gate',
      detail: 'Usage remains limited to approved license regions and distribution zones.',
    },
  ] as const;

  const selectedAssetRows = [
    { id: 'asset-id', label: 'Asset ID', value: 'VAULT-VOICE-2026-001' },
    { id: 'consent-version', label: 'Consent version', value: 'v4.2' },
    { id: 'last-updated', label: 'Last updated', value: 'Jan 12, 2026' },
  ] as const;

  return (
    <article className="flex h-full flex-col rounded-[26px] border border-[#E3E4E8] bg-[#FCFCFD] p-3.5 shadow-[0_1px_0_rgba(16,24,40,0.03)] md:p-4">
      <div className="rounded-[18px] border border-[#E7E9EE] bg-white p-3.5 md:p-4">
        <div className="flex flex-wrap items-start justify-between gap-2.5">
          <div className="flex items-start gap-3">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#EEF3FB] text-[#2B4D8A]">
              <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden="true">
                <path d="M8 2.1a2.7 2.7 0 0 1 2.7 2.7v4.3a2.7 2.7 0 1 1-5.4 0V4.8A2.7 2.7 0 0 1 8 2.1z" />
                <path d="M3.4 8.3a.75.75 0 0 1 .75.75 3.85 3.85 0 0 0 7.7 0 .75.75 0 0 1 1.5 0A5.34 5.34 0 0 1 8.75 14v.9h1.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5h1.5V14A5.34 5.34 0 0 1 2.65 9.05a.75.75 0 0 1 .75-.75z" />
              </svg>
            </span>
            <div>
              <p className="text-[14px] leading-5 font-semibold text-[#111111] md:text-[15px]">Reference_Voice_2026.wav</p>
              <p className="text-[12px] leading-5 text-[#6B7280]">Voice asset • WAV 24-bit</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#BFD3F1] bg-[#EDF3FF] px-2.5 py-0.5 text-[11px] leading-5 font-medium text-[#2B4D8A]">
              Voice
            </span>
            <span className="rounded-full border border-[#DADDE3] bg-[#F6F7F9] px-2.5 py-0.5 text-[11px] leading-5 font-medium text-[#6B7280]">
              verified
            </span>
          </div>
        </div>

        <div className="mt-3 rounded-[12px] border border-[#E6E9EF] bg-[#FBFCFE] p-2.5 md:p-3">
          <div className="flex items-end gap-1">
            {waveformHeights.map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="w-1.5 rounded-full bg-[#C5D3EE]"
                style={{ height: `${Math.max(8, Math.round(height * 0.82))}px` }}
              />
            ))}
          </div>
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#111111] text-white">
                <svg viewBox="0 0 16 16" className="size-2.5" fill="currentColor" aria-hidden="true">
                  <path d="M6.1 4.45c0-.55.6-.9 1.08-.62l4.3 2.47a.72.72 0 0 1 0 1.24l-4.3 2.47A.72.72 0 0 1 6.1 9.4V4.45z" />
                </svg>
              </span>
              <p className="tabular-nums text-[12px] leading-5 text-[#6B7280]">00:18 / 01:42</p>
            </div>
            <span className="rounded-full border border-[#DFE2E8] bg-[#F6F7F9] px-2.5 py-0.5 text-[11px] leading-5 font-medium text-[#6B7280]">
              Studio clean
            </span>
          </div>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-[10px] bg-[#F7F8FA] p-2.5">
            <p className="text-[11px] leading-4 text-[#6B7280]">Duration</p>
            <p className="tabular-nums mt-0.5 text-[14px] leading-5 font-semibold text-[#111111]">01:42</p>
          </div>
          <div className="rounded-[10px] bg-[#F7F8FA] p-2.5">
            <p className="text-[11px] leading-4 text-[#6B7280]">File Size</p>
            <p className="tabular-nums mt-0.5 text-[14px] leading-5 font-semibold text-[#111111]">24 MB</p>
          </div>
          <div className="rounded-[10px] bg-[#F7F8FA] p-2.5">
            <p className="text-[11px] leading-4 text-[#6B7280]">Sample Rate</p>
            <p className="tabular-nums mt-0.5 text-[14px] leading-5 font-semibold text-[#111111]">48 kHz</p>
          </div>
          <div className="rounded-[10px] bg-[#F7F8FA] p-2.5">
            <p className="text-[11px] leading-4 text-[#6B7280]">Language</p>
            <p className="mt-0.5 text-[14px] leading-5 font-semibold text-[#111111]">English (neutral)</p>
          </div>
        </div>
      </div>

      <div className="mt-3 border-t border-dashed border-[#D8DBE1] pt-3">
        <p className="text-[11px] leading-4 font-semibold text-[#6B7280] uppercase">Policy checks</p>
        <p className="mt-1 text-[13px] leading-5 font-medium text-[#111111]">Requirements before activation</p>
        <ul className="mt-3 space-y-2.5">
          {policyChecks.map((check) => (
            <li key={check.id} className="flex gap-2.5">
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#FFF4F4] text-[#D61D1F]">
                <svg viewBox="0 0 16 16" className="size-3" fill="currentColor" aria-hidden="true">
                  <path d="M8 1.7 12.9 3.5v3.8c0 2.9-1.9 5.4-4.9 6.5-3-1.1-4.9-3.6-4.9-6.5V3.5L8 1.7z" />
                </svg>
              </span>
              <div>
                <p className="text-[13px] leading-5 font-medium text-[#111111]">{check.title}</p>
                <p className="mt-0.5 text-[12px] leading-5 text-[#6B7280]">{check.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 border-t border-dashed border-[#D8DBE1] pt-3">
        <p className="text-[11px] leading-4 font-semibold text-[#6B7280] uppercase">Selected asset</p>
        <dl className="mt-2.5 space-y-1.5">
          {selectedAssetRows.map((row) => (
            <div key={row.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-[12px] leading-5">
              <dt className="text-[#6B7280]">{row.label}</dt>
              <dd className="tabular-nums text-right font-medium text-[#111111]">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

function StudiosWhatDemo() {
  const talentRows = [
    { id: 'talent-name', label: 'Talent', value: 'Riya Sharma (Voice)' },
    { id: 'castid', label: 'CastID', value: 'verified' },
    { id: 'readiness', label: 'Readiness', value: 'License-ready' },
    { id: 'wallet', label: 'Wallet', value: 'Actor Wallet • Linked' },
  ] as const;

  const licenseRows = [
    { id: 'use-case', label: 'Use case', value: 'Dialogue replacement' },
    { id: 'territory', label: 'Territory', value: 'India + APAC' },
    { id: 'duration', label: 'Duration', value: '12 months' },
    { id: 'training', label: 'Training rights', value: 'Not permitted' },
  ] as const;

  const complianceRows = [
    {
      id: 'consent-check',
      title: 'Consent scope matches project',
      detail: 'Usage class and performer permissions align with requested output.',
      status: 'pass',
      tone: 'text-[#166534] border-[#BBF7D0] bg-[#F0FDF4]',
    },
    {
      id: 'region-check',
      title: 'Territory and distribution check',
      detail: 'Regional rights are valid for India and APAC campaign release.',
      status: 'pass',
      tone: 'text-[#166534] border-[#BBF7D0] bg-[#F0FDF4]',
    },
    {
      id: 'contract-check',
      title: 'Contract signature status',
      detail: 'Studio signature complete; performer signature in progress.',
      status: 'in review',
      tone: 'text-[#1D4ED8] border-[#BFDBFE] bg-[#EFF6FF]',
    },
  ] as const;

  const settlementRows = [
    { id: 'invoice', label: 'Invoice ID', value: 'INV-ATLAS-2026-021' },
    { id: 'license-value', label: 'License value', value: '$7,800' },
    { id: 'deductions', label: 'Deductions', value: '$780' },
    { id: 'net-payout', label: 'Net actor payout', value: '$7,020' },
  ] as const;

  return (
    <article className="flex h-full flex-col rounded-[26px] border border-[#E3E4E8] bg-[#FCFCFD] p-3.5 shadow-[0_1px_0_rgba(16,24,40,0.03)] md:p-4">
      <div className="rounded-[18px] border border-[#E7E9EE] bg-white p-3.5 md:p-4">
        <div className="rounded-[14px] border border-[#DDE2EC] bg-[#F9FAFC] p-3">
          <div className="flex flex-wrap items-start justify-between gap-2.5">
            <div>
              <p className="text-[14px] leading-5 font-semibold text-[#111111]">Project Atlas • Synthetic Performance License</p>
              <p className="text-[12px] leading-5 text-[#6B7280]">Campaign: Regional launch pack</p>
            </div>
            <span className="rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-0.5 text-[11px] leading-5 font-medium text-[#1D4ED8]">
              in review
            </span>
          </div>
          <dl className="mt-3 grid gap-2 sm:grid-cols-2">
            {talentRows.map((row) => (
              <div key={row.id} className="rounded-[10px] bg-white p-2">
                <dt className="text-[11px] leading-4 text-[#6B7280]">{row.label}</dt>
                <dd className="mt-0.5 text-[12px] leading-5 font-medium text-[#111111]">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-3 border-t border-dashed border-[#D8DBE1] pt-3">
          <p className="text-[11px] leading-4 font-semibold text-[#6B7280] uppercase">License terms</p>
          <dl className="mt-2 space-y-1.5">
            {licenseRows.map((row) => (
              <div key={row.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <dt className="text-[12px] leading-5 text-[#6B7280]">{row.label}</dt>
                <dd className="text-[12px] leading-5 font-medium text-[#111111]">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-3 border-t border-dashed border-[#D8DBE1] pt-3">
          <p className="text-[11px] leading-4 font-semibold text-[#6B7280] uppercase">Compliance checks</p>
          <ul className="mt-2.5 space-y-2">
            {complianceRows.map((row) => (
              <li key={row.id} className="rounded-[10px] bg-[#F8FAFC] p-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[12px] leading-5 font-medium text-[#111111]">{row.title}</p>
                    <p className="text-[11px] leading-4 text-[#6B7280]">{row.detail}</p>
                  </div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] leading-5 font-medium whitespace-nowrap ${row.tone}`}>
                    {row.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 border-t border-dashed border-[#D8DBE1] pt-3">
          <p className="text-[11px] leading-4 font-semibold text-[#6B7280] uppercase">Settlement snapshot</p>
          <dl className="tabular-nums mt-2 space-y-1.5">
            {settlementRows.map((row) => (
              <div key={row.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <dt className={`text-[12px] leading-5 ${row.id === 'net-payout' ? 'font-semibold text-[#111111]' : 'text-[#6B7280]'}`}>{row.label}</dt>
                <dd className={`text-[12px] leading-5 ${row.id === 'net-payout' ? 'font-semibold text-[#111111]' : 'font-medium text-[#111111]'}`}>{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-1.5 text-[11px] leading-5 text-[#6B7280]">
            Timeline: <span className="font-medium text-[#111111]">requested → in review → approved → paid</span>
          </p>
        </div>
      </div>
    </article>
  );
}

type HowTabData = {
  tabLabel: string;
  headline: string;
  description: string;
  steps: Array<{
    id: string;
    title: string;
    detail: string;
    icon: WhatPointIconKey;
    imageSrc: string;
    imageAlt: string;
  }>;
};

const howTabData: Record<WhatTabKey, HowTabData> = {
  actors: {
    tabLabel: 'For Actors',
    headline: 'Your performance. Your identity. Your rules.',
    description:
      'Approve or decline requests instantly. Track every use of your likeness without slowing productions down.',
    steps: [
      {
        id: 'actor-how-1',
        title: 'Receive project requests',
        detail: 'Studios send requests describing how they want to use your voice or likeness.',
        icon: 'shield',
        imageSrc: '/1.png',
        imageAlt: 'Verification progress',
      },
      {
        id: 'actor-how-2',
        title: 'Review and negotiate the terms',
        detail: 'Check the project details and adjust the licensing terms before moving forward.',
        icon: 'check',
        imageSrc: '/2.png',
        imageAlt: 'License details',
      },
      {
        id: 'actor-how-3',
        title: 'Approve the contract',
        detail: 'Once you approve the agreement, your licensed assets can be used for the project.',
        icon: 'spark',
        imageSrc: '/3.png',
        imageAlt: 'Consent matrix',
      },
      {
        id: 'actor-how-4',
        title: 'Track usage and payments',
        detail: 'See every AI use of your performance and follow the status of your payments.',
        icon: 'ledger',
        imageSrc: '/3.png',
        imageAlt: 'Usage history',
      },
    ],
  },
  studios: {
    tabLabel: 'For Studios',
    headline: 'Find verified talent and keep every AI project compliant.',
    description:
      'Source ready-to-license performers, run consent-safe workflows, and keep project records audit-ready.',
    steps: [
      {
        id: 'studio-how-1',
        title: 'Find verified actors',
        detail: 'Search performers who are ready to license their voice or likeness.',
        icon: 'shield',
        imageSrc: '/1.png',
        imageAlt: 'Verified profiles',
      },
      {
        id: 'studio-how-2',
        title: 'Define the licensing terms',
        detail: 'Set where the performance can be used, how long it lasts, and the project fee.',
        icon: 'check',
        imageSrc: '/2.png',
        imageAlt: 'License terms',
      },
      {
        id: 'studio-how-3',
        title: 'Send the request for approval',
        detail: 'Actors review the request and approve the licensing terms before creation begins.',
        icon: 'spark',
        imageSrc: '/3.png',
        imageAlt: 'Compliance checks',
      },
      {
        id: 'studio-how-4',
        title: 'Manage payments and records',
        detail: 'Track invoices, payouts, and project activity from one dashboard.',
        icon: 'ledger',
        imageSrc: '/3.png',
        imageAlt: 'Payout tracking',
      },
    ],
  },
};



function howToneClass(tone: 'granted' | 'blocked' | 'neutral') {
  if (tone === 'granted') return 'border-[#BBF7D0] bg-[#F0FDF4] text-[#166534]';
  if (tone === 'blocked') return 'border-[#F2C8CB] bg-[#FFF1F1] text-[#D61D1F]';
  return 'border-[#E5E7EB] bg-white text-[#6B7280]';
}

function HowStepDemo({ stepIndex, tab }: { stepIndex: number; tab: WhatTabKey }) {
  const isStudio = tab === 'studios';
  const accentColor = isStudio ? '#159FFA' : '#D61D1F';
  const accentSoft = isStudio ? 'bg-[#EEF8FF] text-[#159FFA]' : 'bg-[#FBEDEE] text-[#D61D1F]';
  const accentBg = isStudio ? 'bg-[#159FFA]' : 'bg-[#D61D1F]';
  const accentLine = isStudio ? 'bg-[#BFDBFE]' : 'bg-[#F2C8CB]';

  /* ── Step 1: Review incoming request (Actor) / Find verified talent (Studio) ── */
  if (stepIndex === 0) {
    if (isStudio) {
      const profiles = [
        { initials: 'EC', name: 'Emma Chen', role: 'Voice Actor · LA', id: 'CAST-EC-2026-8821', ready: true },
        { initials: 'RO', name: 'Rafael Ortiz', role: 'Voice Actor · NY', id: 'CAST-RO-2026-4412', ready: true },
        { initials: 'JP', name: 'Jin Park', role: 'Screen Actor · Seoul', id: 'CAST-JP-2026-7705', ready: false },
      ];
      return (
        <div className="h-full flex flex-col overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
          <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
            <p className="text-[12px] font-semibold text-[#111111]">Talent Match Queue</p>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>132 verified</span>
          </div>
          {profiles.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-3 bg-white px-4 py-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${accentSoft}`}>{p.initials}</span>
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-medium text-[#111111]">{p.name}</p>
                  <p className="text-[10px] text-[#6B7280]">{p.role}</p>
                </div>
              </div>
              <span className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${howToneClass(p.ready ? 'granted' : 'neutral')}`}>
                {p.ready ? 'Consent ready' : 'Pending'}
              </span>
            </div>
          ))}
          <div className="mt-auto flex items-center justify-around bg-[#FAFAFA] px-4 py-3">
            {[['87', 'Consent-ready'], ['6', 'Pending checks'], ['39', 'New profiles']].map(([val, lbl]) => (
              <div key={lbl} className="flex-1 text-center">
                <p className="text-[11px] font-semibold text-[#111111]">{val}</p>
                <p className="text-[9px] text-[#6B7280]">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    /* Actor: incoming request card */
    return (
      <div className="h-full flex flex-col overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
        <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
          <p className="text-[12px] font-semibold text-[#111111]">Incoming Request · REQ-2026-0841</p>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>Review</span>
        </div>
        {[
          { label: 'Studio', value: 'Apex Pictures' },
          { label: 'Project', value: 'Nebula S1 · Dialogue Replace' },
          { label: 'Territory', value: 'US + India' },
          { label: 'Duration', value: '6 months' },
        ].map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-3 bg-white px-4 py-3">
            <p className="text-[12px] text-[#6B7280]">{r.label}</p>
            <p className="text-[12px] font-medium text-[#111111]">{r.value}</p>
          </div>
        ))}
        <div className="mt-auto flex items-center gap-3 bg-[#FAFAFA] px-4 py-3">
          <button type="button" className="flex-1 rounded-[8px] border border-[#ECECEC] bg-white py-1.5 text-[11px] font-semibold text-[#6B7280]">Decline</button>
          <button type="button" className={`flex-1 rounded-[8px] py-1.5 text-[11px] font-semibold text-white ${accentBg}`}>Approve</button>
        </div>
      </div>
    );
  }

  /* ── Step 2 ── */
  if (stepIndex === 1) {
    if (isStudio) {
      // Studio: License deal builder — territory chips, fee structure, duration bar
      return (
        <div className="h-full flex flex-col overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
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
          {/* Fee structure */}
          <div className="flex-1 bg-white px-4 py-3">
            <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Fee structure</p>
            <div className="space-y-1.5">
              {[
                { label: 'Base license fee', value: '$8,000', highlight: false },
                { label: 'Training rights', value: 'Excluded', highlight: true },
                { label: 'Renewal model', value: 'Manual · 12 mo', highlight: false },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between">
                  <p className="text-[11px] text-[#6B7280]">{r.label}</p>
                  <p className={`text-[11px] font-semibold ${r.highlight ? 'text-[#D61D1F]' : 'text-[#111111]'}`}>{r.value}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Duration bar */}
          <div className="mt-auto bg-[#FAFAFA] px-4 py-3">
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

    // Actor: Consent vault — permission tiles grid (allow vs block)
    const permissions = [
      { label: 'Commercial use', icon: '✓', allowed: true },
      { label: 'Voice synthesis', icon: '✓', allowed: true },
      { label: 'Training data', icon: '✗', allowed: false },
      { label: 'Face / likeness', icon: '✗', allowed: false },
      { label: 'US + Canada', icon: '✓', allowed: true },
      { label: 'Derivative works', icon: '✗', allowed: false },
    ];
    return (
      <div className="h-full flex flex-col overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
        <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
          <div>
            <p className="text-[12px] font-semibold text-[#111111]">Consent Policy v4.2</p>
            <p className="text-[10px] text-[#6B7280]">Emma Chen · CAST-EC-2026-8821</p>
          </div>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>Active</span>
        </div>
        <div className="flex-1 bg-white px-4 py-3">
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
        <div className="mt-auto flex items-center gap-2 bg-[#FAFAFA] px-4 py-2.5">
          <span className="size-1.5 rounded-full bg-[#10B981]" />
          <p className="text-[10px] text-[#6B7280]">Policy enforced automatically on all incoming requests</p>
        </div>
      </div>
    );
  }

  /* ── Step 3 ── */
  if (stepIndex === 2) {
    if (isStudio) {
      // Studio: Pre-launch compliance checklist — grouped section-level checks
      const sections = [
        {
          title: 'Identity & consent',
          items: ['CastID identity verified', 'Consent scope confirmed'],
          pass: true,
        },
        {
          title: 'Territory & distribution',
          items: ['NA region gate', 'EU distribution cleared'],
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
        <div className="h-full flex flex-col overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
          <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
            <p className="text-[12px] font-semibold text-[#111111]">Pre-launch Checklist · Nebula Ep.1</p>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>{passCount}/{sections.length} clear</span>
          </div>
          {sections.map((s) => (
            <div key={s.title} className="bg-white px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold text-[#111111]">{s.title}</p>
                <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${howToneClass(s.pass ? 'granted' : 'neutral')}`}>
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
          <div className="mt-auto flex items-center gap-3 bg-[#FAFAFA] px-4 py-3">
            <p className="shrink-0 text-[11px] text-[#6B7280]">Overall</p>
            <div className="flex-1 h-1.5 rounded-full bg-[#ECECEC]">
              <div className={`h-full rounded-full ${accentBg}`} style={{ width: `${pct}%` }} />
            </div>
            <p className="shrink-0 text-[11px] font-semibold" style={{ color: accentColor }}>{pct}%</p>
          </div>
        </div>
      );
    }

    // Actor: Consent rules vs incoming request — two-column match table
    const rules = [
      { rule: 'Territory', yours: 'US + Canada', request: 'US + India', match: true },
      { rule: 'Training', yours: 'Blocked', request: 'Not requested', match: true },
      { rule: 'Duration', yours: '≤ 12 mo', request: '6 months', match: true },
      { rule: 'Use type', yours: 'Commercial', request: 'Dialogue rep.', match: true },
    ];
    return (
      <div className="h-full flex flex-col overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
        <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
          <p className="text-[12px] font-semibold text-[#111111]">Consent screening · REQ-2026-0841</p>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>4/4 match</span>
        </div>
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
        <div className="mt-auto flex items-center gap-2 bg-[#FAFAFA] px-4 py-2.5">
          <span className="size-1.5 rounded-full bg-[#10B981]" />
          <p className="text-[10px] text-[#6B7280]">All rules passed — request is within your consent scope</p>
        </div>
      </div>
    );
  }

  /* ── Step 4 ── */
  if (isStudio) {
    // Studio: Invoice workflow — bill-to/from, line items, payment status bar
    return (
      <div className="h-full flex flex-col overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
        <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
          <div>
            <p className="text-[12px] font-semibold text-[#111111]">Invoice · INV-ATLAS-2026-021</p>
            <p className="text-[10px] text-[#6B7280]">Nebula S1 · Emma Chen · Voice</p>
          </div>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${accentSoft}`}>Approved</span>
        </div>
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
        <div className="flex-1 bg-white px-4 py-3 space-y-1.5">
          {[
            { desc: 'Base license fee', amount: '$8,000' },
            { desc: 'Platform fee (10%)', amount: '-$800' },
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
        <div className="mt-auto bg-[#FAFAFA] px-4 py-3">
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

  // Actor: Per-use earnings — running total hero + per-event log
  const usageEvents = [
    { id: 'USE-884', desc: 'Trailer cutdown · 30 sec', payout: '+$420', date: 'Mar 2', tone: 'granted' as const },
    { id: 'USE-885', desc: 'Dialogue replace · Ep.4', payout: '+$1,100', date: 'Mar 3', tone: 'granted' as const },
    { id: 'USE-886', desc: 'Regional dub · LATAM', payout: 'Pending', date: 'Mar 5', tone: 'neutral' as const },
  ];
  return (
    <div className="h-full flex flex-col overflow-hidden rounded-[14px] border border-[#ECECEC] divide-y divide-[#ECECEC]">
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
          <span className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${howToneClass(entry.tone)}`}>
            {entry.payout}
          </span>
        </div>
      ))}
      <div className="mt-auto flex items-center justify-around bg-[#FAFAFA] px-4 py-3">
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

export default function HomePageV2() {
  const heroRef = useRef<HTMLElement | null>(null);
  const ambientShowcaseRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHeroInView, setIsHeroInView] = useState(true);
  const [isAmbientShowcaseInView, setIsAmbientShowcaseInView] = useState(false);
  const [activeWhatTab, setActiveWhatTab] = useState<WhatTabKey>('actors');
  const [activeHowTab, setActiveHowTab] = useState<WhatTabKey>('actors');
  const [activeHowStepIndex, setActiveHowStepIndex] = useState(0);

  const isStudiosTab = activeWhatTab === 'studios';
  const activeTabTextColor = isStudiosTab ? 'text-[#159FFA]' : 'text-[#D61D1F]';
  const activeTabBgColor = isStudiosTab ? 'bg-[#EEF8FF]' : 'bg-[#F0EAEA]';
  const activeDotColor = isStudiosTab ? 'bg-[#159FFA]' : 'bg-[#D61D1F]';


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
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsAmbientShowcaseInView(false);
      return;
    }

    const showcaseNode = ambientShowcaseRef.current;
    if (!showcaseNode) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAmbientShowcaseInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(showcaseNode);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle How steps
  useEffect(() => {
    const stepCount = howTabData[activeHowTab].steps.length;
    const timer = setInterval(() => {
      setActiveHowStepIndex((prev) => (prev + 1) % stepCount);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeHowTab]);

  return (
    <main className="bg-white [&_h1]:font-['Inter'] [&_h1]:tracking-[-0.02em] [&_h2]:font-['Inter'] [&_h2]:tracking-[-0.02em] [&_h3]:font-['Inter'] [&_h3]:tracking-[-0.02em]">
      <section
        ref={heroRef}
        data-homepage-v2-hero="true"
        data-bg-animated={isHeroInView ? 'true' : 'false'}
        className="relative w-full min-h-[104dvh] overflow-hidden bg-white pt-36 pb-24 md:min-h-[112dvh] md:pb-28"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <HomepageV2HeroAmbient animate={isHeroInView} />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_64%,#ffffff_100%)] md:h-64" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <div className="flex flex-col gap-8">
            <h1 className="max-w-[800px] text-balance text-[40px] leading-[1.06] font-medium text-[#111111] md:text-[54px]">
              Protecting Performance in the Age of AI
            </h1>
            <div className="max-w-[980px] space-y-3">
              {heroSubPoints.map((point) => (
                <div key={point.key} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-6 shrink-0 items-center justify-center rounded-[7px] bg-[rgba(214,29,31,0.10)]"
                  >
                    <HeroPointIcon kind={point.key} />
                  </span>
                  <p className="text-[13px] leading-6 whitespace-nowrap md:text-[14px]">
                    <span className="font-semibold text-[#111111]">{point.title}</span>
                    <span className="text-[#4B5563]"> — {point.description}</span>
                  </p>
                </div>
              ))}
            </div>
            <button className="w-fit rounded-full bg-[#D61D1F] px-6 py-3 text-[14px] font-medium text-white hover:bg-[#D61D1F]">
              Book a demo
            </button>
            <div className="w-full">
              <CardScanner includeFeatures={false} fullBleed size="hero" startFromMiddle scannerPosition={0.25} enableWebGLShine />
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-dvh w-screen overflow-hidden">
        <img
          src="/homepage_divider_1.png"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 top-[70%] px-6 text-center md:px-10">
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
            className="mx-auto max-w-[900px] text-balance text-[34px] leading-[1.08] font-medium text-[#D61D1F] md:text-[46px]"
          >
            tai your performance
          </motion.h2>
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
            Platform Features
          </span>
          <h2 className="max-w-[740px] text-balance text-[34px] leading-[1.08] font-medium text-[#111111] md:text-[46px]">
            Approve. License. Track.
          </h2>
          <p className="mt-5 max-w-[560px] text-pretty text-[17px] leading-7 text-[#4B5563]">
            Whether you're a performer protecting your likeness or a studio building with AI — every workflow starts and ends with verified consent.
          </p>

          <div className="mt-8 inline-flex w-fit gap-1" role="tablist" aria-label="What section views">
            {(Object.keys(whatTabData) as WhatTabKey[]).map((tabKey) => {
              const isActive = activeWhatTab === tabKey;
              return (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => {
                    setActiveWhatTab(tabKey);
                    if (carouselRef.current) carouselRef.current.scrollTo({ left: 0, behavior: 'instant' });
                  }}
                  className={`rounded-full px-5 py-2 text-[14px] leading-5 font-medium md:text-[16px] ${isActive ? `${activeTabBgColor} ${activeTabTextColor}` : 'text-[#6B7280] hover:text-[#111111]'}`}
                  aria-selected={isActive}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className={`size-2 rounded-full ${tabKey === 'studios' ? 'bg-[#159FFA]' : 'bg-[#D61D1F]'}`} />
                    {whatTabData[tabKey].tabLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Container bleeding to the right */}
        <div className="mt-12 w-full pl-6 md:pl-10 min-[1300px]:pl-[calc(50vw-610px)]">
          <div className="relative">
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-10 pr-6 md:pr-10"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {(activeWhatTab === 'actors' ? actorFeaturesData : studioFeaturesData).map((feature, idx) => {
                const iconTextClass = activeWhatTab === 'actors' ? 'text-[#D61D1F]' : 'text-[#159FFA]';
                const iconBgClass = activeWhatTab === 'actors' ? 'bg-[rgba(214,29,31,0.1)]' : 'bg-[rgba(21,159,250,0.1)]';
                const hasDemo = 'demo' in feature && feature.demo != null;

                return (
                  <div
                    key={idx}
                    className={`snap-start shrink-0 w-[280px] md:w-[320px] rounded-[24px] bg-[#F7F7F7] p-5 lg:p-6 flex flex-col ${hasDemo ? 'min-h-[420px]' : 'min-h-[300px]'}`}
                  >
                    {hasDemo ? (
                      <div className="flex-1">{feature.demo}</div>
                    ) : (
                      <div className={`inline-flex size-20 items-center justify-center rounded-[16px] ${iconBgClass} ${iconTextClass}`}>
                        {feature.icon}
                      </div>
                    )}
                    <div className="mt-auto pt-6">
                      <h3 className="text-[18px] font-semibold text-[#111111] leading-snug">{feature.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-[#4B5563] text-pretty">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute -bottom-4 right-0 flex items-center justify-end gap-3 pr-6 md:pr-10 bg-gradient-to-l from-white via-white to-transparent pl-12">
              <button
                onClick={() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollBy({ left: -(carouselRef.current.clientWidth * 0.8), behavior: 'smooth' });
                  }
                }}
                className="flex size-10 items-center justify-center rounded-full bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#111111] transition-colors"
                aria-label="Previous"
              >
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" /></svg>
              </button>
              <button
                onClick={() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollBy({ left: carouselRef.current.clientWidth * 0.8, behavior: 'smooth' });
                  }
                }}
                className="flex size-10 items-center justify-center rounded-full bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#111111] transition-colors"
                aria-label="Next"
              >
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>


      <section className="relative w-full overflow-hidden bg-white">
        <img
          src="/section_space_1.png"
          alt=""
          className="block h-auto w-full"
          loading="lazy"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 10%, black 24%, black 80%, rgba(0,0,0,0.25) 92%, transparent 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 10%, black 24%, black 80%, rgba(0,0,0,0.25) 92%, transparent 100%)',
          }}
        />
      </section>

      <section className="w-full py-28">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <span className="section-pill !mb-3 inline-flex items-center gap-2 self-start">
            <svg
              viewBox="0 0 16 16"
              className="size-3.5 text-[#159FFA]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 1.6 13.4 4.7v6.6L8 14.4 2.6 11.3V4.7L8 1.6z" />
              <path d="m6.8 8.2 1 1 1.8-2 .7.7-2.5 2.7-1.7-1.7.7-.7Z" fill="#ffffff" />
            </svg>
            How It Works
          </span>
          <h2 className="max-w-[640px] text-balance text-[34px] leading-[1.08] font-medium text-[#111111] md:text-[46px]">
            A clear path from request to approval to payment.
          </h2>

          <div className="mt-8 rounded-[28px] bg-[#FAFAFA] p-5 md:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
              <div className="flex flex-col">
                <div
                  className="inline-flex w-fit rounded-full border border-[#DDDDDF] bg-[#F9F9FA] p-1"
                  role="tablist"
                  aria-label="How section audience views"
                >
                  {(Object.keys(howTabData) as WhatTabKey[]).map((tabKey) => {
                    const isActive = activeHowTab === tabKey;
                    const activeBg = tabKey === 'studios' ? 'bg-[#EEF8FF] text-[#159FFA]' : 'bg-[#F0EAEA] text-[#D61D1F]';
                    const inactive = 'text-[#6B7280] hover:text-[#111111]';
                    return (
                      <button
                        key={tabKey}
                        type="button"
                        role="tab"
                        id={`how-tab-${tabKey}`}
                        onClick={() => {
                          setActiveHowTab(tabKey);
                          setActiveHowStepIndex(0);
                        }}
                        className={`rounded-full px-4 py-1.5 text-[14px] leading-5 font-medium md:px-5 md:py-2 md:text-[15px] ${isActive ? activeBg : inactive}`}
                        aria-selected={isActive}
                        aria-controls={`how-panel-${tabKey}`}
                        tabIndex={isActive ? 0 : -1}
                      >
                        <span className="inline-flex items-center gap-2">
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className={`size-2 rounded-full ${tabKey === 'studios' ? 'bg-[#159FFA]' : 'bg-[#D61D1F]'}`}
                            />
                          )}
                          {howTabData[tabKey].tabLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <ol className="mt-6 space-y-2">
                  {howTabData[activeHowTab].steps.map((item, index) => {
                    const isLast = index === howTabData[activeHowTab].steps.length - 1;
                    const isActive = index === activeHowStepIndex;
                    const accentBg = activeHowTab === 'studios' ? 'bg-[#EAF3FF] text-[#159FFA]' : 'bg-[#FBEDEE] text-[#D61D1F]';
                    const lineColor = activeHowTab === 'studios' ? 'bg-[#C9DDF6]' : 'bg-[#F2C8CB]';
                    return (
                      <li
                        key={item.id}
                        className={`relative pl-12 py-4 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}
                      >
                        {!isLast && (
                          <span
                            aria-hidden="true"
                            className={`absolute left-[15px] top-[44px] h-[calc(100%-12px)] w-px ${lineColor}`}
                          />
                        )}
                        <span
                          aria-hidden="true"
                          className={`absolute top-4 left-0 inline-flex size-8 items-center justify-center rounded-[12px] transition-transform duration-500 ${accentBg} ${isActive ? 'scale-110' : 'scale-100'}`}
                        >
                          <WhatPointIcon kind={item.icon} />
                        </span>
                        <p className="text-[16px] leading-6 font-medium text-[#111111] md:text-[17px]">{item.title}</p>
                        <p className="mt-0.5 text-pretty text-[12px] leading-5 text-[#4B5563] md:text-[13px]">{item.detail}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div
                key={`${activeHowTab}-${activeHowStepIndex}`}
                className="h-full overflow-hidden rounded-[20px] bg-white p-5 md:p-6 animate-[fadeIn_0.5s_ease-in-out] flex flex-col"
              >
                <HowStepDemo stepIndex={activeHowStepIndex} tab={activeHowTab} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={ambientShowcaseRef}
        data-homepage-v2-ambient-showcase="true"
        data-bg-animated={isAmbientShowcaseInView ? 'true' : 'false'}
        className="relative h-dvh w-full overflow-hidden bg-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-white/95 md:h-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-56 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_22%,rgba(255,255,255,0.58)_52%,rgba(255,255,255,0)_100%)] md:h-72"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-white via-white/90 to-transparent md:h-56"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <HomepageV2HeroAmbient animate={isAmbientShowcaseInView} />
        </div>
        <div className="relative z-20 mx-auto flex h-full w-full max-w-[1300px] items-center px-6 md:px-10">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:translate-y-10">
            <div className="max-w-[525px]">
              <span className="section-pill !mb-3 inline-flex items-center gap-2 self-start">
                <svg
                  viewBox="0 0 16 16"
                  className="size-3.5 text-[#159FFA]"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 1.6 13.4 4.7v6.6L8 14.4 2.6 11.3V4.7L8 1.6z" />
                  <path d="m6.8 8.2 1 1 1.8-2 .7.7-2.5 2.7-1.7-1.7.7-.7Z" fill="#ffffff" />
                </svg>
                Trust Layer
              </span>
              <h2 className="text-balance text-[34px] leading-[1.08] font-medium text-[#111111] md:text-[46px]">
                Built on Trust
              </h2>
              <p className="mt-5 max-w-[420px] text-pretty text-[17px] leading-7 text-[#4B5563]">
                When your performance travels through AI, your identity travels with it.
              </p>
            </div>
            <div className="relative flex h-[420px] w-full max-w-[620px] items-center justify-end md:h-[520px]">
              <div className="w-full overflow-hidden rounded-[24px]">
                <MorphingCanvas
                  width={720}
                  height={720}
                  intervalMs={5000}
                  morphDurationMs={2000}
                  className="aspect-square w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-white py-16 md:py-24" />

      <section className="relative h-dvh w-screen overflow-hidden bg-white">
        <img
          src="/homepage_divider_2.png"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
          }}
        />
      </section>

      <section className="relative z-10 w-full -mt-20 pb-12 pt-4 md:-mt-28 md:pb-16" style={{ background: 'linear-gradient(to bottom, transparent 0%, white 35%)' }}>
        <div className="mx-auto w-full max-w-[980px] px-6 text-center md:px-10">
          <h2 className="text-balance text-[34px] leading-[1.08] font-medium text-[#0F172A] md:text-[52px]">
            Perform freely.
            <br />
            Get paid fairly.
          </h2>
          <p className="mx-auto mt-5 max-w-[340px] text-pretty text-[17px] leading-7 text-[#4B5563]">
            The future of AI performance starts with permission.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <button className="btn-primary">
              Claim your CastID
            </button>
            <button className="btn-secondary">
              Book a demo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
