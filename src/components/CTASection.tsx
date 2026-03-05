import React from 'react';
import './Hero.css'; // Import Hero CSS for button and font styles

const CTASection: React.FC = () => {
    return (
        <section className="relative z-10 mx-auto w-full max-w-[1300px] px-6 py-24 md:px-10">
            {/* Background matched to Workflow card grey #FAFAFA */}
            <div className="bg-[#FAFAFA] rounded-[24px] p-24 text-center shadow-sm">
                <h2 className="text-5xl md:text-6xl font-medium text-[#111827] mb-6 tracking-tight" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
                    A new age of <br />
                    AI Intelligence
                </h2>

                <p className="text-[17px] text-[#6b7280] mb-10 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Start your 14 day free trial today and get see your <br className="hidden md:block" />
                    live visitors in minutes.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    <button className="btn-primary">
                        Start 14 day free trial
                    </button>
                    <button className="btn-secondary">
                        See demo
                    </button>
                </div>

                <p className="text-sm text-[#9ca3af] mt-6" style={{ fontFamily: "'Inter', sans-serif" }}>No credit card required</p>
            </div>
        </section>
    );
};

export default CTASection;
