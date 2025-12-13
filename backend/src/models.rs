use serde::{Serialize, Deserialize};
use uuid::Uuid;

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

// Matching the database schema
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Product {
    pub id: Uuid,
    pub title: String,
    pub description: Option<String>,
    pub price: i32, // Stored in cents
    pub image_url: Option<String>,
    pub status: String,
    // created_at is handled by DB default
}

#[derive(Deserialize, Debug)]
pub struct CreateProductRequest {
    pub title: String,
    pub description: Option<String>,
    pub price: i32, // Cents
    pub image_url: Option<String>,
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
