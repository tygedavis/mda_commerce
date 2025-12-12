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

    // Build our application with routes
    let app = Router::new()
        .route("/api/health", get(health_check))
        .route("/api/landing", get(handlers::landing::get_landing_page_data))
        .route("/api/shop", get(handlers::shop::get_shop_data))
        .route("/api/about", get(handlers::about::get_about_data))
        .route("/api/contact", get(handlers::contact::get_contact_data))
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
