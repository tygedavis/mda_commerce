import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedGallery from './components/FeaturedGallery';
import AboutSection from './components/AboutSection';
import SocialFeed from './components/SocialFeed';
import Footer from './components/Footer';
import type { LandingPageData } from './types';

function App() {
  const [data, setData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real production app, we would use an environment variable for the API URL
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
    <div className="font-sans text-art-black antialiased">
      <Header />
      <Hero data={data.hero} />
      <FeaturedGallery items={data.featured_collection} />
      <AboutSection data={data.about} />
      <SocialFeed items={data.social_feed} />
      <Footer />
    </div>
  );
}

export default App;
