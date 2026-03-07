const PreFooterCta = () => {
  return (
    <>
      <section className="relative h-dvh w-full overflow-hidden bg-white">
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

      <section
        className="relative z-10 w-full -mt-20 pb-12 pt-4 md:-mt-28 md:pb-16"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, white 35%)' }}
      >
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
    </>
  );
};

export default PreFooterCta;
