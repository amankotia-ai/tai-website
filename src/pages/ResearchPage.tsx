import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HomepageV2HeroAmbient from '../components/HomepageV2HeroAmbient';
import PreFooterCta from '../components/PreFooterCta';
import { researchArticles } from '../data/researchArticles';

const FEATURED_ARTICLE_ID = 2;

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
    <main className="min-h-dvh bg-white [&_h1]:font-['Inter'] [&_h2]:font-['Inter'] [&_h3]:font-['Inter']">
      <section
        ref={heroRef}
        data-bg-animated={isHeroInView ? 'true' : 'false'}
        className="relative w-full min-h-[96dvh] overflow-hidden bg-white pb-20 pt-32 md:pb-24 md:pt-36"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <HomepageV2HeroAmbient animate={isHeroInView} />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_64%,#ffffff_100%)] md:h-64" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <span className="inline-flex rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 text-sm font-medium text-[#159FFA]">
                Research & Blog
              </span>
              <h1 id="hero-headline" className="mt-6 max-w-[820px] text-balance text-[40px] leading-[1.06] font-medium text-[#111111] md:text-[58px]">
                Research and field notes for consent-first AI production.
              </h1>
              <p className="mt-5 max-w-[720px] text-pretty text-[17px] leading-7 text-[var(--color-text-body)]">
                Practical updates from our product, legal, and engineering teams. Follow what we are
                learning while building performer-safe AI workflows.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={`/research/${featuredArticle.id}`}
                  className="rounded-full bg-[#D61D1F] px-7 py-3 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#C9191B]"
                >
                  Read featured story
                </Link>
                <a
                  href="#latest-blog"
                  className="rounded-full bg-[#F3F4F6] px-7 py-3 text-[14px] font-medium text-[#111111] transition-colors duration-200 hover:bg-[#E5E7EB]"
                >
                  Browse latest posts
                </a>
              </div>
            </div>

            <aside className="rounded-[24px] border border-[#ECECEC] bg-white/95 p-6 shadow-sm backdrop-blur-sm">
              <p className="text-[12px] font-semibold uppercase text-[#6B7280]">Blog index</p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="border-shadow rounded-[14px] bg-[#F7F7F7] px-3 py-4">
                  <p className="text-[25px] font-semibold leading-none text-[#111111]">
                    {researchArticles.length}
                  </p>
                  <p className="mt-1 text-[12px] text-[#6B7280]">Stories</p>
                </div>
                <div className="border-shadow rounded-[14px] bg-[#F7F7F7] px-3 py-4">
                  <p className="text-[25px] font-semibold leading-none text-[#111111]">
                    {uniqueCategories.length}
                  </p>
                  <p className="mt-1 text-[12px] text-[#6B7280]">Topics</p>
                </div>
                <div className="border-shadow rounded-[14px] bg-[#F7F7F7] px-3 py-4">
                  <p className="text-[25px] font-semibold leading-none text-[#111111]">2026</p>
                  <p className="mt-1 text-[12px] text-[#6B7280]">Season</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {uniqueCategories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12px] font-medium text-[#374151]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <span className="inline-flex rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 text-sm font-medium text-[#159FFA]">
            Featured
          </span>

          <Link
            to={`/research/${featuredArticle.id}`}
            className="group mt-6 grid overflow-hidden rounded-[26px] border border-[#E5E7EB] bg-[#FCFCFD] md:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="order-2 p-6 md:order-1 md:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#6B7280]">
                <span className="rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 font-medium text-[#159FFA]">
                  {featuredArticle.category}
                </span>
                <span>{featuredArticle.date}</span>
                <span>{featuredArticle.readTime}</span>
              </div>
              <h2 className="mt-5 text-balance text-[34px] leading-[1.1] font-medium text-[#111111] md:text-[44px]">
                {featuredArticle.title}
              </h2>
              <p className="mt-4 max-w-[640px] text-pretty text-[16px] leading-7 text-[var(--color-text-body)]">
                {featuredArticle.description}
              </p>
              <div className="mt-7 flex items-center gap-2 text-[14px] font-semibold text-[#111111] transition-colors duration-200 group-hover:text-[#D61D1F]">
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

            <div className="order-1 h-[280px] overflow-hidden bg-[#111111] md:order-2 md:h-full">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.coverImageAlt}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
          </Link>
        </div>
      </section>

      <section id="latest-blog" className="w-full pb-24">
        <div className="mx-auto w-full max-w-[1300px] px-6 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 text-sm font-medium text-[#159FFA]">
                Latest
              </span>
              <h2 className="mt-4 text-balance text-[34px] leading-[1.1] font-medium text-[#111111] md:text-[46px]">
                Blog showcase
              </h2>
            </div>
            <p className="max-w-[420px] text-pretty text-[15px] leading-6 text-[var(--color-text-body)]">
              A running archive of product learnings, policy frameworks, and deployment notes from real teams.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {latestArticles.map((article) => (
              <Link
                key={article.id}
                to={`/research/${article.id}`}
                className="group overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-[#FCFCFD]"
              >
                <div className="h-[220px] overflow-hidden bg-[#111111]">
                  <img
                    src={article.coverImage}
                    alt={article.coverImageAlt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#6B7280]">
                    <span className="rounded-md bg-[#F3F4F6] px-2.5 py-1 font-medium text-[#374151]">
                      {article.category}
                    </span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="mt-4 text-balance text-[29px] leading-[1.12] font-medium text-[#111111] transition-colors duration-200 group-hover:text-[#D61D1F]">
                    {article.title}
                  </h3>
                  <p className="mt-4 text-pretty text-[15px] leading-6 text-[var(--color-text-body)]">
                    {article.description}
                  </p>
                  <div className="mt-6 border-t border-[#E5E7EB] pt-4 text-[13px] text-[#6B7280]">
                    <span className="font-medium text-[#111111]">{article.author}</span>
                    <span className="mx-1.5">·</span>
                    <span>{article.readTime}</span>
                  </div>
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
