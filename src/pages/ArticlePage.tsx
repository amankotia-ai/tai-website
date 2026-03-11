import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HomepageV2HeroAmbient from '../components/HomepageV2HeroAmbient';
import PreFooterCta from '../components/PreFooterCta';
import {
  getRelatedResearchArticles,
  getResearchArticleById,
  type ResearchArticleBlock,
} from '../data/researchArticles';

function renderContentBlock(block: ResearchArticleBlock, index: number) {
  if (block.type === 'heading') {
    return (
      <h2
        key={`${block.type}-${index}`}
        className="pt-6 text-balance text-[26px] leading-[1.2] font-semibold text-[#111111] md:text-[30px]"
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === 'quote') {
    return (
      <blockquote
        key={`${block.type}-${index}`}
        className="border-l-[3px] border-[#D61D1F] pl-6"
      >
        <p className="text-pretty text-[20px] leading-9 italic text-[#374151]">"{block.text}"</p>
        <p className="mt-3 text-[13px] font-semibold uppercase tracking-wide text-[#6B7280]">
          — {block.attribution}
        </p>
      </blockquote>
    );
  }

  return (
    <p
      key={`${block.type}-${index}`}
      className="text-pretty text-[17px] leading-[1.9] text-[#4B5563]"
    >
      {block.text}
    </p>
  );
}

export default function ArticlePage() {
  const { id } = useParams();
  const parsedId = Number(id);
  const article = Number.isNaN(parsedId) ? undefined : getResearchArticleById(parsedId);

  const heroRef = useRef<HTMLElement | null>(null);
  const [isHeroInView, setIsHeroInView] = useState(true);

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

  if (!article) {
    return (
      <main className="min-h-dvh bg-white [&_h1]:font-['Inter'] [&_h1]:tracking-[-0.02em]">
        <section className="mx-auto w-full max-w-[760px] px-6 pt-36 pb-28 md:px-10">
          <Link
            to="/research"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#6B7280] transition-colors duration-200 hover:text-[#D61D1F]"
          >
            <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blog
          </Link>
          <h1 className="mt-8 text-[40px] leading-[1.06] font-medium text-[#111111] md:text-[54px]">
            Article not found
          </h1>
          <p className="mt-4 text-[17px] leading-7 text-[#4B5563]">
            This story may have moved or the URL is invalid.
          </p>
        </section>
      </main>
    );
  }

  const relatedArticles = getRelatedResearchArticles(article.id);

  return (
    <main className="min-h-dvh bg-white [&_h1]:font-['Inter'] [&_h1]:tracking-[-0.02em] [&_h2]:font-['Inter'] [&_h2]:tracking-[-0.02em] [&_h3]:font-['Inter'] [&_h3]:tracking-[-0.02em]">

      {/* ── Article Header ───────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        data-bg-animated={isHeroInView ? 'true' : 'false'}
        className="relative w-full overflow-hidden bg-white pt-32 pb-14 md:pt-40 md:pb-16"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <HomepageV2HeroAmbient animate={isHeroInView} />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.8)_60%,#ffffff_100%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[760px] px-6 md:px-10">
          <Link
            to="/research"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#6B7280] transition-colors duration-200 hover:text-[#D61D1F]"
          >
            <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blog
          </Link>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-[13px] text-[#6B7280]">
            <span className="rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 font-medium text-[#159FFA]">
              {article.category}
            </span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="mt-5 text-balance text-[38px] leading-[1.06] font-medium text-[#111111] md:text-[52px]">
            {article.title}
          </h1>

          <p className="mt-5 text-pretty text-[18px] leading-8 text-[#4B5563]">
            {article.subtitle}
          </p>

          <div className="mt-8 flex items-center gap-3 border-t border-[#E5E7EB] pt-6 text-[14px]">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-[13px] font-semibold text-[#374151]">
              {article.author.charAt(0)}
            </div>
            <div>
              <span className="font-semibold text-[#111111]">{article.author}</span>
              <span className="mx-1.5 text-[#D1D5DB]">·</span>
              <span className="text-[#6B7280]">{article.role}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cover Image ──────────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
        <div className="h-[340px] overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-[#111111] md:h-[500px]">
          <img
            src={article.coverImage}
            alt={article.coverImageAlt}
            className="size-full object-cover"
          />
        </div>
      </div>

      {/* ── Article Body ─────────────────────────────────────────────────────── */}
      <article className="mx-auto w-full max-w-[760px] px-6 py-16 md:px-10 md:py-20">
        <div className="space-y-7">
          {article.content.map((block, index) => renderContentBlock(block, index))}
        </div>
      </article>

      {/* ── Read Next ────────────────────────────────────────────────────────── */}
      {relatedArticles.length > 0 && (
        <section className="w-full pb-24">
          <div className="mx-auto w-full max-w-[1300px] border-t border-[#E5E7EB] px-6 pt-12 md:px-10">
            <div className="mb-8 flex items-center gap-4">
              <span className="inline-flex shrink-0 rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 text-sm font-medium text-[#159FFA]">
                Read next
              </span>
              <div className="h-px w-full bg-[#E5E7EB]" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/research/${rel.id}`}
                  className="group flex flex-col overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-[#FCFCFD] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
                >
                  <div className="h-[200px] shrink-0 overflow-hidden bg-[#111111]">
                    <img
                      src={rel.coverImage}
                      alt={rel.coverImageAlt}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[rgba(21,159,250,0.08)] px-2.5 py-1 text-[11px] font-medium text-[#159FFA]">
                        {rel.category}
                      </span>
                      <span className="text-[12px] text-[#6B7280]">{rel.date}</span>
                    </div>
                    <h3 className="mt-4 flex-1 text-balance text-[22px] leading-[1.25] font-medium text-[#111111] transition-colors duration-200 group-hover:text-[#D61D1F]">
                      {rel.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-6 text-[#4B5563]">
                      {rel.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-[#E5E7EB] pt-4 text-[13px]">
                      <span className="font-medium text-[#111111]">{rel.author}</span>
                      <span className="text-[#6B7280]">{rel.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <PreFooterCta />
    </main>
  );
}
