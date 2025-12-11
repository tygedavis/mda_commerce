import React, { useEffect, useState } from 'react';
import type { ShopPageData } from '../types';

const ShopPage: React.FC = () => {
    const [data, setData] = useState<ShopPageData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/shop')
            .then(res => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch shop data:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="h-96 w-full flex items-center justify-center bg-art-cream text-art-gold font-serif text-xl animate-pulse">
                Loading Shop...
            </div>
        );
    }

    if (!data) {
        return (
            <div className="h-96 w-full flex items-center justify-center bg-art-cream text-red-500 font-sans">
                Unable to load shop content.
            </div>
        );
    }

    return (
        <div className="py-20 bg-art-cream/30 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-serif text-center mb-16 tracking-wider">Shop Collection</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.items.map((item) => (
                        <div key={item.id} className="group cursor-pointer">
                            <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-4 relative">
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white uppercase tracking-widest text-sm border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors">
                                        View Details
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="font-serif text-lg text-art-black mb-1">{item.title}</h3>
                                <p className="text-sm text-gray-500 tracking-wide">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
