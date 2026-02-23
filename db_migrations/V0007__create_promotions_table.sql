CREATE TABLE IF NOT EXISTS promotions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  badge VARCHAR(100) DEFAULT 'СКИДКА',
  badge_value VARCHAR(100) DEFAULT '',
  button_text VARCHAR(200) DEFAULT 'Смотреть товары',
  button_url VARCHAR(500) DEFAULT '/catalog',
  expires_at VARCHAR(100) DEFAULT '',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);