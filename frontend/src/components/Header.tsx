import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 transition-all duration-300 text-art-black">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-serif tracking-widest uppercase cursor-pointer">
                    Artist Name
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-stretch h-full space-x-0 text-sm tracking-wide uppercase font-light">
                    <Link to="/shop" className="flex items-center px-6 transition-all duration-300 hover:bg-art-black hover:text-art-gold">Shop</Link>
                    <Link to="/about" className="flex items-center px-6 transition-all duration-300 hover:bg-art-black hover:text-art-gold">About</Link>
                    <Link to="/contact" className="flex items-center px-6 transition-all duration-300 hover:bg-art-black hover:text-art-gold">Contact</Link>
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
