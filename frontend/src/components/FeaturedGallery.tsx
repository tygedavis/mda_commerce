import React from 'react';
import type { Artwork } from '../types';

interface FeaturedGalleryProps {
    items: Artwork[];
}

const FeaturedGallery: React.FC<FeaturedGalleryProps> = ({ items }) => {
    return (
        <section id="collection" className="py-24 px-6 max-w-7xl mx-auto bg-white">
            <div className="text-center mb-16">
                <span className="text-art-gold uppercase tracking-widest text-xs font-bold mb-3 block">Selected Works</span>
                <h2 className="text-4xl md:text-5xl">Featured Collection</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {items.map((art) => (
                    <div key={art.id} className="group cursor-pointer">
                        <div className="relative overflow-hidden aspect-[4/5] mb-6">
                            <img
                                src={art.image_url}
                                alt={art.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl mb-2 font-serif group-hover:text-art-gold transition-colors">{art.title}</h3>
                            <p className="text-gray-500 text-sm tracking-wide uppercase mb-2">{art.description}</p>
                            <span className="text-art-black font-medium">{art.price}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-16">
                 <button className="border-b border-art-black pb-1 hover:text-art-gold hover:border-art-gold transition-all uppercase tracking-widest text-sm">
                    View All Works
                </button>
            </div>
        </section>
    );
};

export default FeaturedGallery;
