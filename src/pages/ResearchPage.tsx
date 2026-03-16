import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HomepageV2HeroAmbient from '../components/HomepageV2HeroAmbient';
import PreFooterCta from '../components/PreFooterCta';
import { researchArticles } from '../data/researchArticles';

const FEATURED_ARTICLE_ID = 5;

export default function ResearchPage() {
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

  const [firstArticle] = researchArticles;
  if (!firstArticle) return null;

  const featuredArticle =
    researchArticles.find((article) => article.id === FEATURED_ARTICLE_ID) ?? firstArticle;
  const latestArticles = researchArticles.filter((article) => article.id !== featuredArticle.id);
  const uniqueCategories = Array.from(new Set(researchArticles.map((article) => article.category)));

  return (
    <main className="min-h-dvh bg-white [&_h1]:font-['Inter'] [&_h1]:tracking-[-0.02em] [&_h2]:font-['Inter'] [&_h2]:tracking-[-0.02em] [&_h3]:font-['Inter'] [&_h3]:tracking-[-0.02em]">
      <Helmet>
        <title>Research &amp; Blog &mdash; TheatreAI</title>
        <meta name="description" content="Research and field notes for consent-first AI production. Practical updates from our product, legal, and engineering teams." />
        <meta property="og:title" content="Research &amp; Blog &mdash; TheatreAI" />
        <meta property="og:description" content="Research and field notes for consent-first AI production. Practical updates from our product, legal, and engineering teams." />
        <meta property="og:image" content="/og_image.jpeg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Research &amp; Blog &mdash; TheatreAI" />
        <meta name="twitter:description" content="Research and field notes for consent-first AI production. Practical updates from our product, legal, and engineering teams." />
        <meta name="twitter:image" content="/og_image.jpeg" />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        data-bg-animated={isHeroInView ? 'true' : 'false'}
        className="relative w-full overflow-hidden bg-white pt-32 pb-24 md:pt-40 md:pb-32"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <HomepageV2HeroAmbient animate={isHeroInView} />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_64%,#ffffff_100%)] md:h-64" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <span className="inline-flex rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 text-sm font-medium text-[#159FFA]">
            Research & Blog
          </span>

          <h1 className="mt-6 max-w-[760px] text-balance text-[40px] leading-[1.06] font-medium text-[#111111] md:text-[58px]">
            Research and field notes for consent-first AI production.
          </h1>

          <p className="mt-5 max-w-[600px] text-pretty text-[17px] leading-7 text-[#4B5563]">
            Practical updates from our product, legal, and engineering teams. Follow what we are
            learning while building performer-safe AI workflows.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={featuredArticle.externalUrl ?? `/research/${featuredArticle.id}`}
              target={featuredArticle.externalUrl ? '_blank' : undefined}
              rel={featuredArticle.externalUrl ? 'noopener noreferrer' : undefined}
              className="rounded-full bg-[#D61D1F] px-7 py-3 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#C9191B]"
            >
              Read featured story
            </a>
            <a
              href="#latest-posts"
              className="rounded-full bg-[#F3F4F6] px-7 py-3 text-[14px] font-medium text-[#111111] transition-colors duration-200 hover:bg-[#E5E7EB]"
            >
              Browse all posts
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-medium text-[#6B7280]">Topics:</span>
            {uniqueCategories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-[#E5E7EB] bg-white/80 px-3.5 py-1.5 text-[12px] font-medium text-[#374151] backdrop-blur-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Article ─────────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">

          <div className="mb-8 flex items-center gap-4">
            <span className="inline-flex shrink-0 rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 text-sm font-medium text-[#159FFA]">
              Featured
            </span>
            <div className="h-px w-full bg-[#E5E7EB]" />
          </div>

          <a
            href={featuredArticle.externalUrl ?? `/research/${featuredArticle.id}`}
            target={featuredArticle.externalUrl ? '_blank' : undefined}
            rel={featuredArticle.externalUrl ? 'noopener noreferrer' : undefined}
            className="group grid overflow-hidden rounded-[26px] border border-[#E5E7EB] bg-[#FCFCFD] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.07)] md:grid-cols-2"
          >
            {/* Image */}
            <div className="h-[300px] overflow-hidden bg-[#111111] md:h-full md:min-h-[480px]">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.coverImageAlt}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#6B7280]">
                <span className="rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 text-[12px] font-medium text-[#159FFA]">
                  {featuredArticle.category}
                </span>
                <span>{featuredArticle.date}</span>
                <span>{featuredArticle.readTime}</span>
              </div>

              <h2 className="mt-5 text-balance text-[30px] leading-[1.1] font-medium text-[#111111] md:text-[38px]">
                {featuredArticle.title}
              </h2>

              <p className="mt-4 text-pretty text-[16px] leading-7 text-[#4B5563]">
                {featuredArticle.description}
              </p>

              <div className="mt-5 text-[13px] text-[#6B7280]">
                <span className="font-medium text-[#111111]">{featuredArticle.author}</span>
                <span className="mx-1.5">·</span>
                <span>{featuredArticle.role}</span>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-[#111111] transition-colors duration-200 group-hover:text-[#D61D1F]">
                Read full article
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                  <path
                    fillRule="evenodd"
                    d="M3.5 10a.75.75 0 0 1 .75-.75h9.19L9.22 5.03a.75.75 0 1 1 1.06-1.06l5.5 5.5a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 1 1-1.06-1.06l4.22-4.22H4.25A.75.75 0 0 1 3.5 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ── Latest Posts ─────────────────────────────────────────────────────── */}
      <section id="latest-posts" className="w-full pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">

          <div className="mb-10 flex items-center gap-4">
            <span className="inline-flex shrink-0 rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 text-sm font-medium text-[#159FFA]">
              Latest
            </span>
            <div className="h-px w-full bg-[#E5E7EB]" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {latestArticles.map((article) => {
              const cardClass =
                'group flex flex-col overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-[#FCFCFD] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]';

              const cardContent = (
                <>
                  {/* Cover image */}
                  <div className="h-[220px] shrink-0 overflow-hidden bg-[#111111]">
                    <img
                      src={article.coverImage}
                      alt={article.coverImageAlt}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[rgba(21,159,250,0.08)] px-2.5 py-1 text-[11px] font-medium text-[#159FFA]">
                        {article.category}
                      </span>
                      <span className="text-[12px] text-[#6B7280]">{article.date}</span>
                      {article.externalUrl && (
                        <span className="ml-auto flex items-center gap-1 text-[11px] text-[#9CA3AF]">
                          <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                            <path d="M8.914 1.048a.75.75 0 0 1 .038 1.06l-4.146 4.392 4.146 4.392a.75.75 0 1 1-1.092 1.03l-4.6-4.874a.75.75 0 0 1 0-1.06l4.6-4.874a.75.75 0 0 1 1.054-.066ZM13.5 1a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-1.5 0V1.75A.75.75 0 0 1 13.5 1Z" />
                          </svg>
                          External
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 flex-1 text-balance text-[22px] leading-[1.25] font-medium text-[#111111] transition-colors duration-200 group-hover:text-[#D61D1F]">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-pretty text-[15px] leading-6 text-[#4B5563]">
                      {article.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-[#E5E7EB] pt-4 text-[13px]">
                      <span className="font-medium text-[#111111]">{article.author}</span>
                      <span className="text-[#6B7280]">{article.readTime}</span>
                    </div>
                  </div>
                </>
              );

              return article.externalUrl ? (
                <a
                  key={article.id}
                  href={article.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {cardContent}
                </a>
              ) : (
                <Link
                  key={article.id}
                  to={`/research/${article.id}`}
                  className={cardClass}
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <PreFooterCta />
    </main>
  );
}
