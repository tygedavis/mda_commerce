import React from 'react';
import type { SocialPost } from '../types';

interface SocialFeedProps {
    items: SocialPost[];
}

const SocialFeed: React.FC<SocialFeedProps> = ({ items }) => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h3 className="text-3xl font-serif mb-2">Follow Along</h3>
                <a href="#" className="text-art-gold text-sm tracking-widest uppercase hover:underline mb-12 block">@ArtistName</a>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.map((post) => (
                        <a key={post.id} href={post.link} className="block relative aspect-square group overflow-hidden">
                             <img
                                src={post.image_url}
                                alt="Instagram Post"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="text-white text-2xl"><i className="fab fa-instagram"></i></span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialFeed;
