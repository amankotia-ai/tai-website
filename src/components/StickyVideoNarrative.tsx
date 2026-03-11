import { useEffect, useRef, useState } from 'react';

const narrativePoints = [
  {
    step: '01',
    headline: 'AI ads are already here.',
    body: 'This ad shows Jake Gyllenhaal wearing Prada sunglasses. His face, his presence. The entire performance was generated with AI.',
  },
  {
    step: '02',
    headline: 'Jake approved it.',
    body: 'Before a single frame rendered, his team reviewed the terms: usage rights, territory, duration. Then signed off.',
  },
  {
    step: '03',
    headline: 'That process took months.',
    body: 'Emails, attorneys, NDAs, and redlines. All to answer one question: is this use authorised?',
  },
  {
    step: '04',
    headline: 'TAI answers that in minutes.',
    body: 'Structured licensing workflows replace the back-and-forth. Consent is on record, terms are transparent, and every use is trackable from day one.',
  },
];

function NarrativePoint({
  step,
  headline,
  body,
}: {
  step: string;
  headline: string;
  body: string | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex min-h-0 items-start py-8 lg:min-h-[70vh] lg:items-center lg:py-0">
      <div
        className={`w-full max-w-[560px] transition-all duration-700 ease-out ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <span className="font-mono text-[11px] font-medium tracking-[0.12em] text-[#D61D1F]">
          {step}
        </span>
        <h3
          className="mt-3 text-balance text-[32px] font-medium leading-[1.1] tracking-[-0.02em] text-[#111111] md:text-[44px]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {headline}
        </h3>
        {body ? (
          <p className="mt-5 text-pretty text-[17px] leading-7 text-[#4B5563]">{body}</p>
        ) : null}
      </div>
    </div>
  );
}

export default function StickyVideoNarrative() {
  return (
    <section className="w-full bg-white py-4">
      <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24">

          {/* Sticky image — desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <div className="py-16">
                <div
                  className="w-full overflow-hidden rounded-[24px] border border-[#ECECEC] bg-[#F5F5F5] shadow-sm"
                  style={{ aspectRatio: '5 / 8', maxHeight: '74vh' }}
                >
                  <video
                    src="/licensing_page_demo.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                    aria-label="AI performance licensing demo"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Narrative points */}
          <div className="py-10 lg:py-0">
            {/* Mobile-only video */}
            <div className="mb-8 lg:hidden">
              <div
                className="mx-auto w-full overflow-hidden rounded-[22px] border border-[#ECECEC] bg-[#F5F5F5] shadow-sm"
                style={{ aspectRatio: '3 / 4', maxHeight: '55vh' }}
              >
                <video
                  src="/licensing_page_demo.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="h-full w-full object-cover"
                  aria-label="AI performance licensing demo"
                />
              </div>
            </div>

            {narrativePoints.map((point, i) => (
              <div key={point.step}>
                {i > 0 && <hr className="border-t border-[#F1F1F1] lg:hidden" />}
                <NarrativePoint {...point} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
