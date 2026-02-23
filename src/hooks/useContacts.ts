import { useState, useEffect } from 'react';

const CATALOG_URL = 'https://functions.poehali.dev/b9910e84-f352-424f-acce-99d333033b22';

export interface ContactSettings {
  phone_main: string;
  phone_main_note: string;
  phone_2: string;
  phone_3: string;
  email_main: string;
  email_2: string;
  email_3: string;
  address: string;
  address_note: string;
  hours_weekdays: string;
  hours_saturday: string;
  hours_sunday: string;
  vk_url: string;
  telegram_url: string;
  company_name: string;
  inn: string;
  kpp: string;
  ogrn: string;
  legal_address: string;
  bank_name: string;
  bank_account: string;
  bank_corr: string;
  bank_bik: string;
}

const DEFAULTS: ContactSettings = {
  phone_main: '8 (800) 500-75-27',
  phone_main_note: 'Бесплатный звонок по России',
  phone_2: '8 (926) 108-14-92',
  phone_3: '8 (926) 430-92-08',
  email_main: 'info@tkexclusiv.ru',
  email_2: 'ya.exc03@yandex.ru',
  email_3: 'ya.exc08@yandex.ru',
  address: 'г. Москва, ул. Докукина, д. 8, стр. 3',
  address_note: '5 минут пешком от метро «Бауманская»',
  hours_weekdays: 'Понедельник - Пятница: 9:00 - 18:00',
  hours_saturday: 'Суббота: 10:00 - 15:00',
  hours_sunday: 'Воскресенье: выходной',
  vk_url: 'https://vk.com',
  telegram_url: 'https://t.me',
  company_name: 'ООО Торговая Компания «ЭКСКЛЮЗИВ»',
  inn: '7716634770',
  kpp: '771601001',
  ogrn: '1097746018226 от 22.01.2009 г.',
  legal_address: '129226, Москва, ул. Докукина, д.8, стр.3',
  bank_name: 'филиал «Центральный» Банка ВТБ (ПАО), г. Москва',
  bank_account: '40702810300290001324',
  bank_corr: '30101810145250000411',
  bank_bik: '044525411',
};

export function useContacts() {
  const [contacts, setContacts] = useState<ContactSettings>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${CATALOG_URL}?resource=settings`)
      .then(r => r.json())
      .then(data => {
        if (data.settings) {
          setContacts({ ...DEFAULTS, ...data.settings });
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  return { contacts, loaded };
}
