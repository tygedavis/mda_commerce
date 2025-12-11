use axum::Json;
use crate::models::{LandingPageData, HeroSection, Artwork, AboutSection, SocialPost};

pub async fn get_landing_page_data() -> Json<LandingPageData> {
    let data = LandingPageData {
        hero: HeroSection {
            title: "Timeless Beauty in Every Stroke".to_string(),
            subtitle: "Discover a collection of fine art that speaks to the soul.".to_string(),
            cta_text: "View Collection".to_string(),
            background_image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop".to_string(),
        },
        featured_collection: vec![
            Artwork {
                id: 1,
                title: "Golden Horizon".to_string(),
                price: "$450".to_string(),
                image_url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop".to_string(),
                description: "Oil on canvas, 24x36".to_string(),
            },
            Artwork {
                id: 2,
                title: "Serenity in Blue".to_string(),
                price: "$320".to_string(),
                image_url: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1000&auto=format&fit=crop".to_string(),
                description: "Acrylic pour, 18x24".to_string(),
            },
            Artwork {
                id: 3,
                title: "Urban Echoes".to_string(),
                price: "$500".to_string(),
                image_url: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop".to_string(),
                description: "Mixed media, 30x30".to_string(),
            },
        ],
        about: AboutSection {
            title: "About the Artist".to_string(),
            description: "With a passion for capturing the ephemeral moments of life, my work explores the intersection of light, shadow, and emotion. Every piece is a journey into the unknown, crafted with patience and love.".to_string(),
            image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop".to_string(),
        },
        social_feed: vec![
            SocialPost {
                id: 1,
                image_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop".to_string(),
                link: "#".to_string(),
            },
            SocialPost {
                id: 2,
                image_url: "https://images.unsplash.com/photo-1576158189578-1a55c067d34d?q=80&w=1000&auto=format&fit=crop".to_string(),
                link: "#".to_string(),
            },
            SocialPost {
                id: 3,
                image_url: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1000&auto=format&fit=crop".to_string(),
                link: "#".to_string(),
            },
            SocialPost {
                id: 4,
                image_url: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=1000&auto=format&fit=crop".to_string(),
                link: "#".to_string(),
            },
        ],
    };

    Json(data)
}
