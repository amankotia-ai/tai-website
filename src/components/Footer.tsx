import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 mt-12 mx-auto w-full max-w-[1300px] px-6 py-20 md:px-10 bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
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

                {/* Spacer Column (optional, or just using grid gaps) */}
                <div className="hidden lg:block lg:col-span-1"></div>

                {/* Product Column */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4 text-sm">Product</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">Home</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">Login</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">Register</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">Docs</a></li>
                    </ul>
                </div>

                {/* Features Column */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4 text-sm">Features</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">AI Checker</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">Usage Token</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">Licensing</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">Audit</a></li>
                    </ul>
                </div>

                {/* Company Column */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4 text-sm">Company</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">Contact</a></li>
                        <li><Link to="/research" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">Blog</Link></li>
                        <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">GDPR</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">Data policy</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">DPA</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">Privacy</a></li>
                        <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14px]">Terms</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
