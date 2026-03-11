import { openDemoBookingModal } from '../utils/demoBookingModal';

const PreFooterCta = () => {
  return (
    <>
      <section
        className="relative z-10 w-full pb-12 pt-4 md:pb-16"
      >
        <div className="mx-auto w-full max-w-[980px] px-6 text-center md:px-10">
          <h2 className="text-balance text-[34px] leading-[1.08] font-medium text-[#0F172A] md:text-[52px]">
            Perform freely. Get paid fairly.
          </h2>
          <p className="mx-auto mt-5 whitespace-nowrap text-[17px] leading-7 text-[#4B5563]">
            The future of AI performance starts with permission.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <button type="button" onClick={openDemoBookingModal} className="btn-primary">
              Get a demo
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PreFooterCta;
