const teamMembers = [
  { name: 'Name', role: 'Role', intro: 'Intro' },
  { name: 'Name', role: 'Role', intro: 'Intro' },
  { name: 'Name', role: 'Role', intro: 'Intro' },
  { name: 'Name', role: 'Role', intro: 'Intro' },
];

export default function WhoWeArePage() {
  return (
    <div className="min-h-dvh bg-[var(--color-page)] text-[var(--color-text-primary)]">
      <main className="mx-auto max-w-[1200px] px-6 pb-24 pt-36 md:pt-40" style={{ fontFamily: 'var(--font-body)' }}>
        <section className="mx-auto max-w-4xl py-10 text-center md:py-16">
          <span className="mb-6 inline-flex rounded-md bg-[rgba(21,159,250,0.1)] px-3 py-1 text-sm font-medium text-[#159FFA]">
            Who We Are
          </span>
          <h1
            className="text-balance text-[40px] leading-[1.15] md:text-[60px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The moment we saw how easy it was to generate a convincing voice or face, we realized the risk of misuse.
          </h1>
        </section>

        <div className="h-px bg-[var(--color-border)]" />

        <section className="mx-auto max-w-5xl py-16 text-center">
          <p className="text-sm text-[var(--color-text-body)] md:text-base">MISSION</p>
          <h2
            className="mt-3 text-balance text-[38px] leading-tight md:text-[52px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            To protect creative identity while accelerating the future of entertainment.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-[17px] leading-7 text-[var(--color-text-body)]">
            AI is changing how stories get made. We&apos;re making sure the rules around consent, usage, and ownership
            evolve just as fast.
          </p>
          <button className="mt-8 rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[var(--color-accent-hover)]">
            Join Us
          </button>
        </section>

        <div className="h-px bg-[var(--color-border)]" />

        <section className="mx-auto max-w-4xl py-16 text-center">
          <h2
            className="text-balance text-[38px] leading-tight md:text-[48px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Our Story
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-pretty text-[20px] leading-[1.55] text-[var(--color-text-primary)] md:text-[34px]">
            We started theatre.ai because we saw something that unsettled us. AI could replicate a voice or face in
            seconds, and the technology was moving faster than anyone could track. We realized that a performer&apos;s
            identity could be used without their knowledge, and there was no record, no proof, and no way to stop it.
            That moment made us act. We built theatre.ai to create clear, enforceable permissions, so talent stays
            protected and studios can move forward with confidence.
          </p>
        </section>

        <div className="h-px bg-[var(--color-border)]" />

        <section className="py-16 text-center">
          <h2
            className="text-balance text-[38px] leading-tight md:text-[48px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The Team
          </h2>
          <p
            className="mt-8 text-balance text-[36px] leading-tight md:text-[52px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Built by people who understand the stakes
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <article key={`${member.name}-${index}`} className="text-left">
                <div className="h-[170px] rounded-[16px] border border-[#f1f1f1] bg-[var(--color-surface)] shadow-sm md:h-[210px]" />
                <div className="mt-4">
                  <p
                    className="text-[28px] leading-tight md:text-[34px]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {member.name}
                  </p>
                  <p
                    className="mt-1 text-[28px] leading-tight text-[var(--color-text-body)] md:text-[34px]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {member.role}
                  </p>
                  <p
                    className="mt-1 text-[28px] leading-tight text-[var(--color-text-body)] md:text-[34px]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {member.intro}
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
