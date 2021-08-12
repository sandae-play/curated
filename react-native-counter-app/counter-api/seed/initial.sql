CREATE TABLE user_counts (
    user_id VARCHAR(255) NOT NULL,
    count   INTEGER NOT NULL DEFAULT 0,
    UNIQUE(user_id, count)
);