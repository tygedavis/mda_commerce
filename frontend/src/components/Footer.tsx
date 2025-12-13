import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer id="contact" className="bg-art-black text-white py-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">

                {/* Brand */}
                <div className="mb-10 md:mb-0">
                    <h3 className="text-3xl font-serif mb-4">Artist Name</h3>
                    <p className="text-gray-400 text-sm tracking-wide">Fine Art & Prints</p>
                </div>

                {/* Navigation Links */}
                <div className="mb-10 md:mb-0 flex flex-col space-y-3 text-sm uppercase tracking-wider text-gray-400">
                    <a href="#" className="hover:text-white transition-colors">Shop</a>
                    <a href="#about" className="hover:text-white transition-colors">About</a>
                    <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                    <a href="#" className="hover:text-white transition-colors">Terms & Shipping</a>
                </div>

                {/* Newsletter */}
                <div className="max-w-md w-full md:w-auto">
                    <h4 className="text-lg font-serif mb-4">Join the List</h4>
                    <p className="text-gray-400 text-sm mb-6 font-light">Be the first to know about new collections and studio updates.</p>
                    <div className="flex border-b border-gray-600 pb-2">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="bg-transparent w-full outline-none placeholder-gray-500 text-white"
                        />
                        <button className="uppercase text-xs tracking-widest text-gray-400 hover:text-white transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 tracking-wide flex flex-col md:flex-row justify-between items-center">
                <span>&copy; {new Date().getFullYear()} Artist Name. All rights reserved.</span>
                <a href="/admin/login" className="mt-2 md:mt-0 hover:text-white transition-colors">Admin Login</a>
            </div>
        </footer>
    );
};

export default Footer;
