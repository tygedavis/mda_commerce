use axum::Json;
use crate::models::ContactPageData;

pub async fn get_contact_data() -> Json<ContactPageData> {
    Json(ContactPageData {
        title: "Contact Me".to_string(),
        description: "I'd love to hear from you. Whether you're interested in a commission, have a question about my work, or just want to say hello, please fill out the form below.".to_string(),
    })
}
