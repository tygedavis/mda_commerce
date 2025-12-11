import React, { useEffect, useState } from 'react';
import type { ContactPageData } from '../types';

const ContactPage: React.FC = () => {
    const [data, setData] = useState<ContactPageData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/contact')
            .then(res => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch contact data:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="h-96 w-full flex items-center justify-center bg-art-cream text-art-gold font-serif text-xl animate-pulse">
                Loading Contact...
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
        <section className="py-24 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif mb-6">{data.title}</h1>
                    <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                        {data.description}
                    </p>
                </div>

                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm uppercase tracking-wider text-gray-500 font-light">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-art-gold transition-colors bg-transparent"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm uppercase tracking-wider text-gray-500 font-light">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-art-gold transition-colors bg-transparent"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm uppercase tracking-wider text-gray-500 font-light">Message</label>
                        <textarea
                            id="message"
                            rows={6}
                            className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-art-gold transition-colors bg-transparent resize-none"
                            placeholder="How can I help you?"
                        ></textarea>
                    </div>

                    <div className="text-center pt-8">
                        <button
                            type="button"
                            className="bg-art-black text-white px-10 py-4 uppercase tracking-widest text-sm hover:bg-art-gold transition-colors duration-300"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactPage;
