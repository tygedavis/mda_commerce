import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import FeaturedGallery from '../components/FeaturedGallery';
import SocialFeed from '../components/SocialFeed';
import type { LandingPageData } from '../types';

const LandingPage: React.FC = () => {
  const [data, setData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/landing')
      .then(res => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch landing page data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-art-cream text-art-gold font-serif text-2xl animate-pulse">
        Loading Artistry...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-art-cream text-red-500 font-sans">
        Unable to load content. Please ensure the backend is running.
      </div>
    );
  }

  return (
    <>
      {/* Hero section handles its own top padding/margin if needed, usually it sits under header */}
      <Hero data={data.hero} />
      <FeaturedGallery items={data.featured_collection} />
      {/* About Section removed as requested */}
      <SocialFeed items={data.social_feed} />
    </>
  );
};

export default LandingPage;
