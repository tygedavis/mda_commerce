import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-serif tracking-widest uppercase cursor-pointer">
                    Artist Name
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-10 text-sm tracking-wide uppercase font-light">
                    <a href="#collection" className="hover:text-art-gold transition-colors">Collection</a>
                    <a href="#about" className="hover:text-art-gold transition-colors">About</a>
                    <a href="#contact" className="hover:text-art-gold transition-colors">Contact</a>
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
