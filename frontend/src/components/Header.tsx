import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 transition-all duration-300 text-art-black">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-serif tracking-widest uppercase cursor-pointer">
                    Artist Name
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-4 text-sm tracking-wide uppercase font-light">
                    <a href="#collection" className="px-4 py-2 rounded transition-all duration-300 hover:bg-art-black hover:text-white">Collection</a>
                    <a href="#about" className="px-4 py-2 rounded transition-all duration-300 hover:bg-art-black hover:text-white">About</a>
                    <a href="#contact" className="px-4 py-2 rounded transition-all duration-300 hover:bg-art-black hover:text-white">Contact</a>
                </nav>

                {/* Cart / Actions (Placeholder) */}
                <div className="flex items-center space-x-6">
                    <button className="hover:text-art-gold transition-colors">
                        Cart (0)
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
