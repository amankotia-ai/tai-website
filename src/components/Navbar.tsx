import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `text-[14px] font-medium transition-colors duration-200 ease-out ${isActive ? 'text-[#D61D1F]' : 'text-[#111111] hover:text-gray-500'}`;

    return (
        <nav
            className="w-full z-[100] fixed top-0 left-0 flex justify-center border-b border-[#F1F1F1] bg-white"
        >
            <div className="w-full max-w-[1300px] mx-auto py-3 px-6 md:px-10 flex items-center justify-between font-['Inter']">
                <div className="flex items-center gap-10">
                    {/* Logo */}
                    <Link
                        to="/homepage-v2"
                        className="flex items-center gap-[6px] text-[18px] font-bold tracking-tight transition-colors duration-200 ease-out hover:opacity-80 font-['Inter'] text-[#111111]"
                    >
                        <div className="flex gap-[2px]">
                            <div className="w-[3px] h-[15px] rounded-sm transition-colors duration-200 ease-out bg-[#111111]"></div>
                            <div className="w-[3px] h-[15px] rounded-sm transition-colors duration-200 ease-out bg-[#111111]"></div>
                        </div>
                        <span className="font-semibold tracking-tight">Theatre.ai</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <NavLink to="/cast-id" className={navLinkClass}>CastID</NavLink>
                        <NavLink to="/licensing" className={navLinkClass}>Licensing</NavLink>
                        <NavLink to="/research" className={navLinkClass}>Research</NavLink>
                    </div>
                </div>

                {/* Right Side Buttons */}
                <div className="flex items-center gap-2">
                    <button className="text-[14px] font-medium transition-colors duration-200 ease-out px-4 py-2 rounded-full text-[#111111] hover:bg-gray-100">
                        Log in
                    </button>
                    <button className="px-5 py-2 rounded-full text-[14px] font-medium transition-colors duration-200 ease-out bg-[#D61D1F] text-white hover:bg-[#D61D1F]">
                        Sign up
                    </button>
                </div>
            </div>
        </nav>
    );
}
