import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { openDemoBookingModal } from '../utils/demoBookingModal';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Reset to transparent on route change immediately
        setScrolled(false);

        // Wait for the new page components to mount before looking for the headline
        const timeout = setTimeout(() => {
            const headline = document.getElementById('hero-headline');
            let threshold = 10;

            if (headline) {
                // Determine absolute Y position of the headline from the very top of the document
                const initialY = headline.getBoundingClientRect().top + window.scrollY;
                // Go solid well before it reaches the navbar (e.g. 120px above the headline)
                // Guarantee at least a 10px scroll so it's transparent on initial load at the very top.
                threshold = Math.max(10, initialY - 120);
            }

            const handleScroll = () => {
                setScrolled(window.scrollY > threshold);
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // Check once now that we have the threshold

            // Store it so we can remove it later
            (window as any)._navbarScrollListener = handleScroll;
        }, 100);

        return () => {
            clearTimeout(timeout);
            if ((window as any)._navbarScrollListener) {
                window.removeEventListener('scroll', (window as any)._navbarScrollListener);
            }
        };
    }, [location.pathname]);

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `text-[14px] font-medium transition-colors duration-200 ease-out ${isActive ? 'text-[#D61D1F]' : 'text-[#111111] hover:text-gray-500'}`;

    return (
        <nav
            className={`w-full z-[100] fixed top-0 left-0 flex justify-center transition-all duration-300 ease-in-out ${scrolled
                ? 'bg-white border-b border-[#F1F1F1]'
                : 'bg-transparent border-b border-transparent'
                }`}
        >
            <div className="w-full max-w-[1300px] mx-auto py-3 px-6 md:px-10 flex items-center justify-between font-['Inter']">
                <div className="flex items-center gap-10">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-[6px] text-[18px] font-bold tracking-tight transition-colors duration-200 ease-out hover:opacity-80 font-['Inter'] text-[#111111]"
                    >
                        <img
                            src="/tai_logo.svg"
                            alt="Theatre.ai logo"
                            className="h-[20px] w-auto"
                        />
                        <span className="font-semibold tracking-tight">TheatreAI</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <NavLink to="/cast-id" className={navLinkClass}>CastID</NavLink>
                        <NavLink to="/licensing" className={navLinkClass}>Licensing</NavLink>
                        <NavLink to="/about-us" className={navLinkClass}>About Us</NavLink>
                        <NavLink to="/research" className={navLinkClass}>Research</NavLink>
                    </div>
                </div>

                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={openDemoBookingModal}
                        className="px-5 py-2 rounded-full text-[14px] font-medium transition-colors duration-200 ease-out bg-[#D61D1F] text-white hover:bg-[#D61D1F]"
                    >
                        Get a demo
                    </button>
                </div>
            </div>
        </nav>
    );
}
