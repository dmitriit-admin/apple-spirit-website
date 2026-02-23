import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { ApiCall } from './types';

interface SettingsMap {
  [key: string]: { value: string; label: string };
}

interface ContactsPanelProps {
  apiCall: ApiCall;
}

const GROUPS = [
  {
    title: 'Телефоны',
    icon: 'Phone',
    fields: [
      { key: 'phone_main', label: 'Основной телефон', placeholder: '8 (800) 500-75-27' },
      { key: 'phone_main_note', label: 'Примечание к основному', placeholder: 'Бесплатный звонок по России' },
      { key: 'phone_2', label: 'Телефон 2', placeholder: '8 (926) 108-14-92' },
      { key: 'phone_3', label: 'Телефон 3', placeholder: '8 (926) 430-92-08' },
    ],
  },
  {
    title: 'Email',
    icon: 'Mail',
    fields: [
      { key: 'email_main', label: 'Основной email', placeholder: 'info@example.ru' },
      { key: 'email_2', label: 'Email 2', placeholder: '' },
      { key: 'email_3', label: 'Email 3', placeholder: '' },
    ],
  },
  {
    title: 'Адрес и часы работы',
    icon: 'MapPin',
    fields: [
      { key: 'address', label: 'Адрес', placeholder: 'г. Москва, ул. ...' },
      { key: 'address_note', label: 'Примечание к адресу', placeholder: '5 минут от метро...' },
      { key: 'hours_weekdays', label: 'Часы работы (будни)', placeholder: 'Понедельник - Пятница: 9:00 - 18:00' },
      { key: 'hours_saturday', label: 'Суббота', placeholder: 'Суббота: 10:00 - 15:00' },
      { key: 'hours_sunday', label: 'Воскресенье', placeholder: 'Воскресенье: выходной' },
    ],
  },
  {
    title: 'Социальные сети',
    icon: 'Share2',
    fields: [
      { key: 'vk_url', label: 'ВКонтакте (ссылка)', placeholder: 'https://vk.com/...' },
      { key: 'telegram_url', label: 'Telegram (ссылка)', placeholder: 'https://t.me/...' },
    ],
  },
  {
    title: 'Реквизиты компании',
    icon: 'Building2',
    fields: [
      { key: 'company_name', label: 'Полное наименование', placeholder: 'ООО ...' },
      { key: 'legal_address', label: 'Юридический адрес', placeholder: '' },
      { key: 'inn', label: 'ИНН', placeholder: '' },
      { key: 'kpp', label: 'КПП', placeholder: '' },
      { key: 'ogrn', label: 'ОГРН', placeholder: '' },
      { key: 'bank_name', label: 'Банк', placeholder: '' },
      { key: 'bank_account', label: 'Расчётный счёт', placeholder: '' },
      { key: 'bank_corr', label: 'Корр. счёт', placeholder: '' },
      { key: 'bank_bik', label: 'БИК', placeholder: '' },
    ],
  },
];

export default function ContactsPanel({ apiCall }: ContactsPanelProps) {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiCall('GET', 'settings').then(data => {
      if (data.settings) {
        const map: Record<string, string> = {};
        Object.entries(data.settings as SettingsMap).forEach(([k, v]) => {
          map[k] = v.value;
        });
        setSettings(map);
      }
      setLoaded(true);
    });
  }, []);

  const set = (key: string, value: string) => setSettings(s => ({ ...s, [key]: value }));

  const save = async () => {
    setSaving(true);
    const data = await apiCall('POST', 'settings', { settings });
    setSaving(false);
    if (data.saved) {
      toast.success('Контактная информация сохранена');
    } else {
      toast.error((data.error as string) || 'Ошибка сохранения');
    }
  };

  if (!loaded) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 bg-secondary rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {GROUPS.map(group => (
        <Card key={group.title}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Icon name={group.icon} size={18} className="text-primary" fallback="Settings" />
              {group.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {group.fields.map(field => (
              <div key={field.key}>
                <Label className="text-sm text-muted-foreground">{field.label}</Label>
                <Input
                  value={settings[field.key] ?? ''}
                  onChange={e => set(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="mt-1"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Button onClick={save} disabled={saving} size="lg" className="w-full">
        <Icon name="Save" size={16} className="mr-2" />
        {saving ? 'Сохраняю...' : 'Сохранить все изменения'}
      </Button>
    </div>
  );
}
