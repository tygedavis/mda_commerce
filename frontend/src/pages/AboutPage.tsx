import React, { useEffect, useState } from 'react';
import type { AboutSection as AboutData } from '../types';

const AboutPage: React.FC = () => {
    const [data, setData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/about')
            .then(res => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch about data:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="h-96 w-full flex items-center justify-center bg-art-cream text-art-gold font-serif text-xl animate-pulse">
                Loading About...
            </div>
        );
    }

    if (!data) {
        return (
            <div className="h-96 w-full flex items-center justify-center bg-art-cream text-red-500 font-sans">
                Unable to load content.
            </div>
        );
    }

    return (
        <section className="py-24 bg-art-cream">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <div className="absolute top-4 -left-4 w-full h-full border border-art-gold/30 z-0"></div>
                            <img
                                src={data.image_url}
                                alt="The Artist"
                                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 relative z-10 shadow-xl"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-serif mb-8">{data.title}</h2>
                        <div className="w-16 h-0.5 bg-art-gold mb-8 mx-auto md:mx-0"></div>
                        <p className="text-lg leading-relaxed text-gray-700 font-light mb-8">
                            {data.description}
                        </p>
                        <p className="text-lg leading-relaxed text-gray-700 font-light mb-8">
                           My studio is my sanctuary, a place where the chaotic noise of the world fades into the rhythm of brushstrokes on canvas. Every collection I release is a chapter of my life, translated into color and form.
                        </p>
                        <img
                           src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png"
                           alt="Signature"
                           className="h-12 opacity-60 mx-auto md:mx-0"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;
