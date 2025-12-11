#[cfg(test)]
mod tests {
    use crate::{health_check, handlers};
    use axum::{
        body::Body,
        http::{Request, StatusCode},
        routing::get,
        Router,
    };
    use tower::ServiceExt;
    use serde_json::Value;

    #[tokio::test]
    async fn test_health_check() {
        let app = Router::new().route("/api/health", get(health_check));

        let response = app
            .oneshot(Request::builder().uri("/api/health").body(Body::empty()).unwrap())
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::OK);
    }

    #[tokio::test]
    async fn test_landing_page_data() {
        let app = Router::new().route("/api/landing", get(handlers::landing::get_landing_page_data));

        let response = app
            .oneshot(Request::builder().uri("/api/landing").body(Body::empty()).unwrap())
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::OK);

        let body_bytes = axum::body::to_bytes(response.into_body(), usize::MAX).await.unwrap();
        let body_json: Value = serde_json::from_slice(&body_bytes).unwrap();

        assert!(body_json.get("hero").is_some());
        assert!(body_json.get("featured_collection").is_some());
        assert!(body_json.get("about").is_some());
        assert!(body_json.get("social_feed").is_some());
    }

    #[tokio::test]
    async fn test_shop_page_data() {
        let app = Router::new().route("/api/shop", get(handlers::shop::get_shop_data));

        let response = app
            .oneshot(Request::builder().uri("/api/shop").body(Body::empty()).unwrap())
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::OK);

        let body_bytes = axum::body::to_bytes(response.into_body(), usize::MAX).await.unwrap();
        let body_json: Value = serde_json::from_slice(&body_bytes).unwrap();

        assert!(body_json.get("items").is_some());
        assert_eq!(body_json["items"].as_array().unwrap().len(), 16);
    }

    #[tokio::test]
    async fn test_about_page_data() {
        let app = Router::new().route("/api/about", get(handlers::about::get_about_data));

        let response = app
            .oneshot(Request::builder().uri("/api/about").body(Body::empty()).unwrap())
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::OK);

        let body_bytes = axum::body::to_bytes(response.into_body(), usize::MAX).await.unwrap();
        let body_json: Value = serde_json::from_slice(&body_bytes).unwrap();

        assert!(body_json.get("title").is_some());
        assert!(body_json.get("description").is_some());
        assert_eq!(body_json["title"], "About the Artist");
    }

    #[tokio::test]
    async fn test_contact_page_data() {
        let app = Router::new().route("/api/contact", get(handlers::contact::get_contact_data));

        let response = app
            .oneshot(Request::builder().uri("/api/contact").body(Body::empty()).unwrap())
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::OK);

        let body_bytes = axum::body::to_bytes(response.into_body(), usize::MAX).await.unwrap();
        let body_json: Value = serde_json::from_slice(&body_bytes).unwrap();

        assert!(body_json.get("title").is_some());
        assert_eq!(body_json["title"], "Contact Me");
    }
}
