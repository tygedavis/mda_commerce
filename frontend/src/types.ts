export interface HeroSection {
    title: string;
    subtitle: string;
    cta_text: string;
    background_image: string;
}

export interface Artwork {
    id: number;
    title: string;
    price: string;
    image_url: string;
    description: string;
}

export interface AboutSection {
    title: string;
    description: string;
    image_url: string;
}

export interface SocialPost {
    id: number;
    image_url: string;
    link: string;
}

export interface LandingPageData {
    hero: HeroSection;
    featured_collection: Artwork[];
    about: AboutSection;
    social_feed: SocialPost[];
}
