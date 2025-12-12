use axum::{
    routing::get,
    Router,
    Json,
};
use serde_json::{Value, json};
use tower_http::cors::{CorsLayer, Any};
use std::net::SocketAddr;

mod models;
mod handlers;
mod db;

#[cfg(test)]
mod tests;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();

    // Initialize Database
    let _pool = match db::init_pool().await {
        Ok(pool) => {
            println!("✅ Connection to the database is successful!");
            pool
        },
        Err(err) => {
            eprintln!("🔥 Failed to connect to the database: {:?}", err);
            std::process::exit(1);
        }
    };

    // CORS configuration
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Serve frontend static files
    let app = Router::new()
        .route("/api/health", get(health_check))
        .route("/api/landing", get(handlers::landing::get_landing_page_data))
        .route("/api/shop", get(handlers::shop::get_shop_data))
        .route("/api/about", get(handlers::about::get_about_data))
        .route("/api/contact", get(handlers::contact::get_contact_data))
        .nest_service("/", tower_http::services::ServeDir::new("frontend/dist"))
        .layer(cors);

    // Run our app with hyper
    let port = std::env::var("PORT").unwrap_or_else(|_| "3001".to_string());
    let addr_str = format!("0.0.0.0:{}", port);
    let addr: SocketAddr = addr_str.parse().expect("Invalid address");
    
    println!("listening on {}", addr);
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

pub(crate) async fn health_check() -> Json<Value> {
    Json(json!({ "status": "ok", "message": "Health Check: OK" }))
}
