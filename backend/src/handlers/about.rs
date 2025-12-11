use axum::Json;
use crate::models::AboutSection;

pub async fn get_about_data() -> Json<AboutSection> {
    Json(AboutSection {
        title: "About the Artist".to_string(),
        description: "With a passion for capturing the ephemeral moments of life, my work explores the intersection of light, shadow, and emotion. Every piece is a journey into the unknown, crafted with patience and love.".to_string(),
        image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop".to_string(),
    })
}
