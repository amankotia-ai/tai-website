import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const navLinks = [
        { to: '/cast-id', label: 'CastID' },
        { to: '/licensing', label: 'Licensing' },
        { to: '/about-us', label: 'About Us' },
        { to: '/research', label: 'Research' },
    ];

    return (
        <footer className="relative z-10 mt-12 mx-auto w-full max-w-[1300px] px-6 py-20 md:px-10 bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                {/* Brand Column */}
                <div className="lg:col-span-2">
                    <p className="text-gray-500 mb-8 max-w-xs leading-relaxed text-[15px]">
                        Built over hundreds of late nights, Theatre AI secures your likeness, automates licensing, and helps you create with confidence.
                    </p>
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-gray-500 text-sm">Operational</span>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#12B76A]"></div>
                    </div>
                    <p className="text-gray-400 text-sm">© 2026</p>
                </div>

                <div className="md:justify-self-end md:text-right">
                    <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 md:justify-end">
                        {navLinks.map((link) => (
                            <li key={link.to}>
                                <Link to={link.to} className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
