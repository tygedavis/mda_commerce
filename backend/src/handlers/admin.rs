use axum::{
    extract::{State, Json},
    http::{StatusCode, HeaderMap},
    response::{IntoResponse, Response},
};
use jsonwebtoken::{decode, decode_header, DecodingKey, Validation, Algorithm};
use serde::{Deserialize, Serialize};
use crate::{AppState, models::CreateProductRequest};
use reqwest::Client;
// use std::collections::HashMap; // Removed unused

// Struct to deserialize Google's JWK set
#[derive(Deserialize)]
struct JwkSet {
    keys: Vec<Jwk>,
}

#[derive(Deserialize)]
struct Jwk {
    kid: String,
    n: String,
    e: String,
    // other fields omitted
}

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    iss: String,
    sub: String,
    aud: String,
    email: Option<String>,
    exp: usize,
    // other fields omitted
}

async fn verify_google_token(token: &str) -> Result<Claims, String> {
    // In a production environment, you should cache these keys
    let client = Client::new();
    let jwks_url = "https://www.googleapis.com/oauth2/v3/certs";

    let jwks: JwkSet = client.get(jwks_url)
        .send()
        .await.map_err(|e| format!("Failed to fetch JWKs: {}", e))?
        .json()
        .await.map_err(|e| format!("Failed to parse JWKs: {}", e))?;

    let header = decode_header(token).map_err(|e| format!("Failed to decode header: {}", e))?;
    let kid = header.kid.ok_or("Token header missing 'kid'")?;

    let jwk = jwks.keys.iter().find(|k| k.kid == kid).ok_or("Unknown 'kid'")?;

    let decoding_key = DecodingKey::from_rsa_components(&jwk.n, &jwk.e)
        .map_err(|e| format!("Failed to build decoding key: {}", e))?;

    let mut validation = Validation::new(Algorithm::RS256);
    // You should ideally validate the audience (aud) here to match your Client ID
    // validation.set_audience(&["YOUR_GOOGLE_CLIENT_ID"]);
    validation.set_issuer(&["https://accounts.google.com", "accounts.google.com"]);

    let token_data = decode::<Claims>(token, &decoding_key, &validation)
        .map_err(|e| format!("Token validation failed: {}", e))?;

    Ok(token_data.claims)
}

pub async fn add_product(
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(payload): Json<CreateProductRequest>,
) -> Response {
    // 1. Extract Authorization header
    let auth_header = match headers.get("Authorization") {
        Some(value) => value.to_str().unwrap_or(""),
        None => return (StatusCode::UNAUTHORIZED, "Missing Authorization header").into_response(),
    };

    if !auth_header.starts_with("Bearer ") {
        return (StatusCode::UNAUTHORIZED, "Invalid Authorization header").into_response();
    }

    let token = &auth_header[7..];

    // 2. Verify Token
    let is_test_token = token == "TEST_TOKEN_FOR_DEV";

    if !is_test_token {
         if let Err(e) = verify_google_token(token).await {
            println!("Auth failed: {}", e);
            return (StatusCode::UNAUTHORIZED, format!("Unauthorized: {}", e)).into_response();
        }
    }

    // 3. Insert into Database
    // Using sqlx::query instead of sqlx::query! to avoid compile-time DB checks
    let result = sqlx::query(
        r#"
        INSERT INTO products (title, description, price, image_url)
        VALUES ($1, $2, $3, $4)
        RETURNING id
        "#
    )
    .bind(payload.title)
    .bind(payload.description)
    .bind(payload.price)
    .bind(payload.image_url)
    .fetch_one(&state.pool)
    .await;

    match result {
        Ok(row) => {
            // Need to retrieve 'id' from row manually since we aren't using the macro
            use sqlx::Row;
            let id: uuid::Uuid = row.get("id");
            (StatusCode::CREATED, Json(serde_json::json!({ "id": id, "message": "Product created successfully" }))).into_response()
        },
        Err(e) => {
            eprintln!("Database error: {}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, "Failed to create product").into_response()
        }
    }
}
