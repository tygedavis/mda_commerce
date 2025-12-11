#[cfg(test)]
mod tests {
    use crate::{health_check, get_landing_page_data};
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
        let app = Router::new().route("/api/landing", get(get_landing_page_data));

        let response = app
            .oneshot(Request::builder().uri("/api/landing").body(Body::empty()).unwrap())
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::OK);

        let body_bytes = axum::body::to_bytes(response.into_body(), usize::MAX).await.unwrap();
        let body_json: Value = serde_json::from_slice(&body_bytes).unwrap();

        // Verify structure
        assert!(body_json.get("hero").is_some());
        assert!(body_json.get("featured_collection").is_some());
        assert!(body_json.get("about").is_some());
        assert!(body_json.get("social_feed").is_some());

        // Verify specific content
        assert_eq!(body_json["hero"]["title"], "Timeless Beauty in Every Stroke");
        assert!(body_json["featured_collection"].as_array().unwrap().len() >= 3);
    }
}
