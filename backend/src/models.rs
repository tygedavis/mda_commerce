use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct HeroSection {
    pub title: String,
    pub subtitle: String,
    pub cta_text: String,
    pub background_image: String,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Artwork {
    pub id: u32,
    pub title: String,
    pub price: String,
    pub image_url: String,
    pub description: String,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct AboutSection {
    pub title: String,
    pub description: String,
    pub image_url: String,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct SocialPost {
    pub id: u32,
    pub image_url: String,
    pub link: String,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct LandingPageData {
    pub hero: HeroSection,
    pub featured_collection: Vec<Artwork>,
    pub about: AboutSection,
    pub social_feed: Vec<SocialPost>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct ShopPageData {
    pub items: Vec<Artwork>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct ContactPageData {
    pub title: String,
    pub description: String,
}
