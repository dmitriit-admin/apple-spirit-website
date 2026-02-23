CREATE TABLE IF NOT EXISTS banners (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  image_url TEXT,
  badge VARCHAR(100) DEFAULT 'Новость',
  button_text VARCHAR(200) DEFAULT 'Подробнее',
  button_url VARCHAR(500) DEFAULT '/catalog',
  gradient VARCHAR(200) DEFAULT 'from-secondary/95 to-muted/90',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);