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
        className="pt-4 text-balance text-[31px] leading-[1.14] font-medium text-[#111111] md:text-[36px]"
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === 'quote') {
    return (
      <blockquote key={`${block.type}-${index}`} className="rounded-[24px] border border-[#E5E7EB] bg-[#FCFCFD] p-7">
        <p className="text-pretty text-[22px] leading-8 text-[#374151]">"{block.text}"</p>
        <p className="mt-4 text-[14px] font-semibold text-[#111111]">{block.attribution}</p>
      </blockquote>
    );
  }

  return (
    <p key={`${block.type}-${index}`} className="text-pretty text-[17px] leading-8 text-[var(--color-text-body)]">
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
      <main className="min-h-dvh bg-white pt-32">
        <section className="mx-auto w-full max-w-[860px] px-6 pb-28 md:px-10">
          <Link
            to="/research"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#6B7280] transition-colors duration-200 hover:text-[#D61D1F]"
          >
            <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blog
          </Link>
          <h1 className="mt-8 text-balance text-[40px] leading-[1.1] font-medium text-[#111111] md:text-[54px]">
            Article not found
          </h1>
          <p className="mt-4 text-pretty text-[17px] leading-7 text-[var(--color-text-body)]">
            This story may have moved or the URL is invalid.
          </p>
        </section>
      </main>
    );
  }

  const relatedArticles = getRelatedResearchArticles(article.id);

  return (
    <main className="min-h-dvh bg-white [&_h1]:font-['Inter'] [&_h2]:font-['Inter'] [&_h3]:font-['Inter']">
      <section
        ref={heroRef}
        data-bg-animated={isHeroInView ? 'true' : 'false'}
        className="relative w-full min-h-[94dvh] overflow-hidden bg-white pb-20 pt-32 md:pb-24 md:pt-36"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <HomepageV2HeroAmbient animate={isHeroInView} />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_64%,#ffffff_100%)] md:h-64" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
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
                <span>{article.readTime}</span>
              </div>

              <h1 className="mt-5 max-w-[800px] text-balance text-[40px] leading-[1.06] font-medium text-[#111111] md:text-[56px]">
                {article.title}
              </h1>
              <p className="mt-5 max-w-[760px] text-pretty text-[18px] leading-8 text-[var(--color-text-body)]">
                {article.subtitle}
              </p>

              <div className="mt-8 rounded-[18px] border border-[#E5E7EB] bg-white/95 p-5 backdrop-blur-sm">
                <p className="text-[12px] uppercase text-[#6B7280]">Written by</p>
                <p className="mt-1 text-[18px] font-semibold text-[#111111]">{article.author}</p>
                <p className="text-[14px] text-[#6B7280]">{article.role}</p>
              </div>
            </div>

            <div className="h-[64dvh] overflow-hidden rounded-[24px] border border-[#ECECEC] bg-[#111111] shadow-lg md:h-[70dvh]">
              <img src={article.coverImage} alt={article.coverImageAlt} className="size-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20">
        <article className="mx-auto w-full max-w-[980px] px-6 md:px-10">
          <div className="rounded-[24px] border border-[#E5E7EB] bg-[#FCFCFD] p-7">
            <p className="text-[12px] font-semibold uppercase text-[#6B7280]">At a glance</p>
            <p className="mt-3 text-pretty text-[17px] leading-7 text-[var(--color-text-body)]">
              This article focuses on practical implementation patterns, clear governance boundaries, and
              repeatable production workflows for AI-enabled creative teams.
            </p>
          </div>

          <div className="mt-10 space-y-8">{article.content.map((block, index) => renderContentBlock(block, index))}</div>
        </article>
      </section>

      <section className="w-full pb-24">
        <div className="mx-auto w-full max-w-[1300px] border-t border-[#E5E7EB] px-6 pt-12 md:px-10">
          <h2 className="text-balance text-[34px] leading-[1.08] font-medium text-[#111111] md:text-[46px]">
            Read next
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {relatedArticles.map((relatedArticle) => (
              <Link
                key={relatedArticle.id}
                to={`/research/${relatedArticle.id}`}
                className="group overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-[#FCFCFD]"
              >
                <div className="h-[220px] overflow-hidden bg-[#111111]">
                  <img
                    src={relatedArticle.coverImage}
                    alt={relatedArticle.coverImageAlt}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[12px] text-[#6B7280]">
                    <span className="rounded-md bg-[#F3F4F6] px-2.5 py-1 font-medium text-[#374151]">
                      {relatedArticle.category}
                    </span>
                    <span>{relatedArticle.date}</span>
                  </div>
                  <h3 className="mt-4 text-balance text-[30px] leading-[1.12] font-medium text-[#111111] transition-colors duration-200 group-hover:text-[#D61D1F]">
                    {relatedArticle.title}
                  </h3>
                  <p className="mt-3 text-pretty text-[15px] leading-6 text-[var(--color-text-body)]">
                    {relatedArticle.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCta />
    </main>
  );
}
