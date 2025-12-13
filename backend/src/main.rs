use axum::{
    routing::get,
    Router,
    Json,
    response::IntoResponse,
    http::StatusCode,
};
use serde_json::{Value, json};
use tower_http::cors::{CorsLayer, Any};
use std::net::SocketAddr;
use sqlx::PgPool;

mod models;
mod handlers;
mod db;

#[cfg(test)]
mod tests;

#[derive(Clone)]
pub struct AppState {
    pub pool: PgPool,
}

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();

    // Initialize Database
    let pool = match db::init_pool().await {
        Ok(pool) => {
            println!("✅ Connection to the database is successful!");
            pool
        },
        Err(err) => {
            eprintln!("🔥 Failed to connect to the database: {:?}", err);
            std::process::exit(1);
        }
    };

    let state = AppState { pool };

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
        .route("/api/products", axum::routing::post(handlers::admin::add_product))
        .nest_service("/assets", tower_http::services::ServeDir::new("frontend/dist/assets"))
        .nest_service("/favicon.ico", tower_http::services::ServeDir::new("frontend/dist/favicon.ico"))
        .fallback(spa_fallback)
        .layer(cors)
        .with_state(state);

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

async fn spa_fallback() -> impl IntoResponse {
    match tokio::fs::read_to_string("frontend/dist/index.html").await {
        Ok(html) => (StatusCode::OK, axum::response::Html(html)).into_response(),
        Err(_) => (StatusCode::NOT_FOUND, "index.html not found").into_response(),
    }
}
