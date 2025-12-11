import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="fixed w-full z-50 bg-art-black/95 backdrop-blur-sm border-b border-gray-800 transition-all duration-300 text-white">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-serif tracking-widest uppercase cursor-pointer text-white">
                    Artist Name
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-10 text-sm tracking-wide uppercase font-light text-gray-300">
                    <a href="#collection" className="hover:text-art-gold transition-colors">Collection</a>
                    <a href="#about" className="hover:text-art-gold transition-colors">About</a>
                    <a href="#contact" className="hover:text-art-gold transition-colors">Contact</a>
                </nav>

                {/* Cart / Actions (Placeholder) */}
                <div className="flex items-center space-x-6 text-gray-300">
                    <button className="hover:text-art-gold transition-colors">
                        Cart (0)
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
