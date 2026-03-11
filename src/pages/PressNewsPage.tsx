import { Helmet } from 'react-helmet-async';

const partnerRows = [
  ['Studio 1', 'Studio 2', 'Studio 3', 'Studio 4'],
  ['Agency 1', 'Agency 2', 'Agency 3', 'Agency 4'],
];

const newsItems = [
  {
    title: 'Headline 1',
    publishedDate: 'Published Date',
    body:
      'AI opened new creative doors and new legal risks. THEATRE.AI gives studios and actors a shared, compliant way to license, track, and protect voice and likeness assets. AI You Can Legally Use.',
  },
  {
    title: 'Headline 2',
    publishedDate: 'Published Date',
    body:
      'AI opened new creative doors and new legal risks. THEATRE.AI gives studios and actors a shared, compliant way to license, track, and protect voice and likeness assets. AI You Can Legally Use.',
  },
];

export default function PressNewsPage() {
  return (
    <div className="min-h-dvh bg-[var(--color-page)] text-[var(--color-text-primary)]">
      <Helmet>
        <title>Press &amp; News &mdash; TheatreAI</title>
        <meta name="description" content="Theatre.ai is shaping the conversation around synthetic performance, consent, and rights in entertainment." />
        <meta property="og:title" content="Press &amp; News &mdash; TheatreAI" />
        <meta property="og:description" content="Theatre.ai is shaping the conversation around synthetic performance, consent, and rights in entertainment." />
        <meta property="og:image" content="/og_image.jpeg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Press &amp; News &mdash; TheatreAI" />
        <meta name="twitter:description" content="Theatre.ai is shaping the conversation around synthetic performance, consent, and rights in entertainment." />
        <meta name="twitter:image" content="/og_image.jpeg" />
      </Helmet>
      <main className="mx-auto max-w-[1200px] px-6 pb-24 pt-36 md:pt-40" style={{ fontFamily: 'var(--font-body)' }}>
        <section className="mx-auto max-w-4xl text-center">
          <span className="mb-6 inline-flex rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 text-sm font-medium text-[#159FFA]">
            Press &amp; News
          </span>
          <h1
            className="text-balance text-[40px] leading-[1.15] text-[var(--color-text-primary)] md:text-[56px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Theatre.ai is shaping the conversation around synthetic performance, consent, and rights in entertainment.
          </h1>
        </section>

        <section className="mt-16 md:mt-20">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`h-[170px] rounded-[16px] border border-[#f1f1f1] bg-[var(--color-surface)] shadow-sm md:h-[200px] ${index % 2 === 1 ? 'translate-y-4 md:translate-y-8' : ''}`}
              />
            ))}
          </div>
        </section>

        <section className="mt-24 md:mt-28">
          <h2
            className="text-balance text-center text-[34px] leading-tight md:text-[44px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Trusted by leading studios and agencies
          </h2>

          <div className="mt-10 overflow-hidden rounded-[2px] border border-[var(--color-border)] bg-[var(--color-page)]">
            <table className="w-full border-collapse">
              <tbody>
                {partnerRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((partner) => (
                      <td
                        key={partner}
                        className="border border-[var(--color-border)] px-4 py-7 text-center text-[28px] leading-tight text-[var(--color-text-primary)] md:text-[36px]"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {partner}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-24 md:mt-28">
          <h2
            className="text-balance text-center text-[40px] leading-tight md:text-[50px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            News
          </h2>

          <div className="mt-16 space-y-10">
            {newsItems.map((item) => (
              <article key={item.title} className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-center">
                <div className="h-[280px] rounded-[18px] border border-[#f1f1f1] bg-[var(--color-surface)] shadow-sm md:h-[340px]" />
                <div>
                  <h3
                    className="text-balance text-[32px] leading-tight md:text-[40px]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-pretty text-[15px] leading-6 text-[var(--color-text-muted)]">
                    {item.publishedDate}
                  </p>
                  <p className="mt-3 max-w-2xl text-pretty text-[17px] leading-7 text-[var(--color-text-body)]">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
