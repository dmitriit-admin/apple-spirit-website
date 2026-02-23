CREATE TABLE IF NOT EXISTS settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  label VARCHAR(255),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO settings (key, value, label) VALUES
  ('phone_main', '8 (800) 500-75-27', 'Основной телефон'),
  ('phone_main_note', 'Бесплатный звонок по России', 'Примечание к основному телефону'),
  ('phone_2', '8 (926) 108-14-92', 'Телефон 2'),
  ('phone_3', '8 (926) 430-92-08', 'Телефон 3'),
  ('email_main', 'info@tkexclusiv.ru', 'Основной email'),
  ('email_2', 'ya.exc03@yandex.ru', 'Email 2'),
  ('email_3', 'ya.exc08@yandex.ru', 'Email 3'),
  ('address', 'г. Москва, ул. Докукина, д. 8, стр. 3', 'Адрес'),
  ('address_note', '5 минут пешком от метро «Бауманская»', 'Примечание к адресу'),
  ('hours_weekdays', 'Понедельник - Пятница: 9:00 - 18:00', 'Часы работы (будни)'),
  ('hours_saturday', 'Суббота: 10:00 - 15:00', 'Часы работы (суббота)'),
  ('hours_sunday', 'Воскресенье: выходной', 'Воскресенье'),
  ('vk_url', 'https://vk.com', 'ВКонтакте'),
  ('telegram_url', 'https://t.me', 'Telegram'),
  ('company_name', 'ООО Торговая Компания «ЭКСКЛЮЗИВ»', 'Название компании'),
  ('inn', '7716634770', 'ИНН'),
  ('kpp', '771601001', 'КПП'),
  ('ogrn', '1097746018226 от 22.01.2009 г.', 'ОГРН'),
  ('legal_address', '129226, Москва, ул. Докукина, д.8, стр.3', 'Юридический адрес'),
  ('bank_name', 'филиал «Центральный» Банка ВТБ (ПАО), г. Москва', 'Банк'),
  ('bank_account', '40702810300290001324', 'Расчётный счёт'),
  ('bank_corr', '30101810145250000411', 'Корр. счёт'),
  ('bank_bik', '044525411', 'БИК')
ON CONFLICT (key) DO NOTHING;