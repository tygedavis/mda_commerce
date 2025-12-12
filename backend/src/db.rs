use sqlx::postgres::PgPoolOptions;
use sqlx::PgPool;
use std::env;

pub async fn init_pool() -> Result<PgPool, sqlx::Error> {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    
    // The user constraint specifies the DB is at 127.0.0.1:5432 via Auth Proxy.
    // We rely on DATABASE_URL to reflect this (e.g. postgres://user:pass@127.0.0.1:5432/db).

    PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
}
