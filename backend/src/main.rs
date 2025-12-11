use axum::{
    routing::get,
    Router,
    Json,
};
use serde::{Serialize, Deserialize};
use serde_json::{Value, json};
use tower_http::cors::{CorsLayer, Any};
use std::net::SocketAddr;

#[cfg(test)]
mod tests;

#[derive(Serialize, Deserialize)]
struct HeroSection {
    title: String,
    subtitle: String,
    cta_text: String,
    background_image: String,
}

#[derive(Serialize, Deserialize)]
struct Artwork {
    id: u32,
    title: String,
    price: String,
    image_url: String,
    description: String,
}

#[derive(Serialize, Deserialize)]
struct AboutSection {
    title: String,
    description: String,
    image_url: String,
}

#[derive(Serialize, Deserialize)]
struct SocialPost {
    id: u32,
    image_url: String,
    link: String,
}

#[derive(Serialize, Deserialize)]
struct LandingPageData {
    hero: HeroSection,
    featured_collection: Vec<Artwork>,
    about: AboutSection,
    social_feed: Vec<SocialPost>,
}

#[tokio::main]
async fn main() {
    // CORS configuration
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Build our application with a route
    let app = Router::new()
        .route("/api/health", get(health_check))
        .route("/api/landing", get(get_landing_page_data))
        .layer(cors);

    // Run our app with hyper
    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("listening on {}", addr);
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

pub(crate) async fn health_check() -> Json<Value> {
    Json(json!({ "status": "ok", "message": "Health Check: OK" }))
}

pub(crate) async fn get_landing_page_data() -> Json<LandingPageData> {
    let data = LandingPageData {
        hero: HeroSection {
            title: "Timeless Beauty in Every Stroke".to_string(),
            subtitle: "Discover a collection of fine art that speaks to the soul.".to_string(),
            cta_text: "View Collection".to_string(),
            // Unsplash image: Abstract/Artistic
            background_image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop".to_string(),
        },
        featured_collection: vec![
            Artwork {
                id: 1,
                title: "Golden Horizon".to_string(),
                price: "$450".to_string(),
                // Unsplash: Painting
                image_url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop".to_string(),
                description: "Oil on canvas, 24x36".to_string(),
            },
            Artwork {
                id: 2,
                title: "Serenity in Blue".to_string(),
                price: "$320".to_string(),
                // Unsplash: Abstract
                image_url: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1000&auto=format&fit=crop".to_string(),
                description: "Acrylic pour, 18x24".to_string(),
            },
            Artwork {
                id: 3,
                title: "Urban Echoes".to_string(),
                price: "$500".to_string(),
                // Unsplash: Modern Art
                image_url: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop".to_string(),
                description: "Mixed media, 30x30".to_string(),
            },
        ],
        about: AboutSection {
            title: "About the Artist".to_string(),
            description: "With a passion for capturing the ephemeral moments of life, my work explores the intersection of light, shadow, and emotion. Every piece is a journey into the unknown, crafted with patience and love.".to_string(),
            // Unsplash: Portrait of artist/person
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
