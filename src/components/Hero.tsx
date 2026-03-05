import { useEffect } from 'react';
import './Hero.css';
import CardScanner from './CardScanner';
import Workflow from './Workflow';
import showcaseImage from '../assets/showcase-screenshot.png';

export default function Hero() {
    useEffect(() => {
        // Load Unicorn Studio script
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
        script.onload = function () {
            // @ts-ignore
            if (!window.UnicornStudio || !window.UnicornStudio.isInitialized) {
                // @ts-ignore
                UnicornStudio.init();
                // @ts-ignore
                if (!window.UnicornStudio) window.UnicornStudio = {};
                // @ts-ignore
                window.UnicornStudio.isInitialized = true;
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <section className="hero relative overflow-hidden min-h-screen flex items-start justify-start pt-36">
            {/* Background (component) added by Aura - Hidden */}
            {/* <div className="aura-background-component top-0 w-full h-screen -z-20 absolute" data-alpha-mask="80"
                style={{
                    maskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)"
                }}>
                <div className="aura-background-component w-full h-full absolute top-0 left-0"
                    style={{
                        filter: "grayscale(1) invert(1)",
                        transform: "scaleY(-1)"
                    }}>
                    <div className="aura-background-component top-0 w-full -z-10 absolute h-full">
                        <div data-us-project="tPmIIl0vKqHO9yqmtge2" className="absolute w-full h-full left-0 top-0 -z-10"></div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-[#D61D1F] mix-blend-screen pointer-events-none"></div>
            </div> */}

            {/* Dynamic Live Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Drifting Grid - Disabled */}
                {/* <div className="absolute inset-0 bg-grid opacity-30 animate-grid" style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`
                }}></div> */}




                {/* Ambient Color Blobs - Light Theme (Removed in favor of WebGL) */}
                {/* <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/40 blur-[100px] animate-float opacity-60 mix-blend-multiply"></div>
                <div className="absolute bottom-[0%] right-[-10%] w-[40%] h-[60%] rounded-full bg-blue-200/40 blur-[120px] animate-float opacity-50 mix-blend-multiply" style={{ animationDelay: "-5s" }}></div>
                <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] rounded-full bg-purple-200/40 blur-[90px] animate-pulse-glow opacity-50 mix-blend-multiply"></div> */}

                {/* Grain Texture Overlay - Removed as per user request */}
                {/* <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div> */}
            </div>

            <div className="hero-content relative z-10 w-full max-w-7xl mx-auto px-6">
                <h1>Protecting Performance<br />in the Age of AI</h1>
                <p>The first rights and consent layer for the Indian entertainment industry.<br />Secure your likeness, automate licensing, and create with confidence.</p>
                <div className="hero-actions">
                    <button className="btn-primary">Register</button>
                    <button className="btn-secondary">See demo</button>
                </div>
            </div>

            {/* Pixel Border Showcase Section */}
            <div className="pixel-showcase-section">
                <div className="pixel-grid-container">
                    {/* Generate pixel grid pattern */}
                    <div className="pixel-grid">
                        {Array.from({ length: 400 }).map((_, i) => (
                            <div
                                key={i}
                                className="pixel"
                                style={{
                                    opacity: Math.random() > 0.6 ? Math.random() * 0.6 + 0.2 : 0,
                                    animationDelay: `${Math.random() * 6}s`,
                                    animationDuration: `${4 + Math.random() * 4}s`
                                }}
                            />
                        ))}
                    </div>
                    {/* Noise overlay - above tiles, below card */}
                    <div className="noise-overlay"></div>
                    {/* White center card */}
                    <div className="showcase-card">
                        <img
                            src={showcaseImage}
                            alt="Theatre.ai Dashboard"
                            className="w-full h-full object-cover object-top rounded-[24px]"
                        />
                    </div>
                </div>
            </div>

            {/* Description text below showcase */}
            <p className="showcase-description">
                Theatre.ai is the secure licensing platform for voice and likeness. Verify actors, standardize contracts, and issue AI-safe usage tokens in minutes.
            </p>

            {/* Why Theatre.AI Section Header */}
            <div className="section-header">
                <span className="section-pill">Why Theatre.AI</span>
                <h2 className="section-heading">
                    Built for a world where<br />
                    <span className="section-heading-bold">performance is digital.</span>
                </h2>
                <p className="section-subtext">
                    AI opened new creative doors and new legal risks. THEATRE.AI gives studios and actors a shared, compliant way to license, track, and protect voice and likeness assets. AI You Can Legally Use.
                </p>
            </div>

            {/* Card Scanner Carousel */}
            <CardScanner />

            {/* Workflow Section */}
            <Workflow />
        </section>
    );
}
