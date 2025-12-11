use axum::Json;
use crate::models::{Artwork, ShopPageData};

pub async fn get_shop_data() -> Json<ShopPageData> {
    let mut items = Vec::new();

    // Generating 16 mock items as requested
    for i in 1..=16 {
        items.push(Artwork {
            id: i,
            title: format!("Artwork #{}", i),
            price: format!("${}", 200 + i * 50),
            image_url: format!("https://source.unsplash.com/random/800x600?art,abstract&sig={}", i), // Using unsplash source with sig for variety
            description: format!("Description for artwork #{}. A beautiful piece.", i),
        });
    }

    Json(ShopPageData { items })
}
