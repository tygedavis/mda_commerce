import React from 'react';
import type { HeroSection as HeroData } from '../types';

interface HeroProps {
    data: HeroData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
    const scrollToCollection = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const element = document.getElementById('collection');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${data.background_image})` }}
            >
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl mb-6 tracking-tight leading-tight">
                    {data.title}
                </h1>
                <p className="text-lg md:text-xl font-light mb-10 tracking-wide max-w-2xl mx-auto opacity-90">
                    {data.subtitle}
                </p>
                <a
                    href="#collection"
                    onClick={scrollToCollection}
                    className="bg-white text-art-black px-10 py-4 uppercase tracking-widest text-sm hover:bg-art-gold hover:text-white transition-all duration-300 border border-white hover:border-art-gold inline-block cursor-pointer"
                >
                    {data.cta_text}
                </a>
            </div>
        </section>
    );
};

export default Hero;
