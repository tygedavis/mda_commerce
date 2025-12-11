import React from 'react';
import type { AboutSection as AboutData } from '../types';

interface AboutProps {
    data: AboutData;
}

const AboutSection: React.FC<AboutProps> = ({ data }) => {
    return (
        <section id="about" className="py-24 bg-art-cream">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Image Side */}
                <div className="order-2 md:order-1 relative">
                    <div className="absolute -top-4 -left-4 w-full h-full border border-art-gold z-0 hidden md:block"></div>
                    <img
                        src={data.image_url}
                        alt="Artist"
                        className="w-full relative z-10 shadow-xl"
                    />
                </div>

                {/* Text Side */}
                <div className="order-1 md:order-2">
                    <span className="text-art-gold uppercase tracking-widest text-xs font-bold mb-3 block">The Artist</span>
                    <h2 className="text-4xl md:text-5xl mb-8">{data.title}</h2>
                    <p className="text-gray-600 leading-relaxed text-lg font-light mb-8">
                        {data.description}
                    </p>
                    <button className="bg-art-black text-white px-8 py-3 uppercase tracking-widest text-xs hover:bg-art-gold transition-colors">
                        Read Full Bio
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
