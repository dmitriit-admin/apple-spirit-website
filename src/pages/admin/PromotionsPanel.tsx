import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { ApiCall } from './types';

export interface Promotion {
  id: number;
  title: string;
  description: string | null;
  badge: string;
  badge_value: string;
  button_text: string;
  button_url: string;
  expires_at: string;
  is_active: boolean;
  sort_order: number;
}

interface PromotionsPanelProps {
  promotions: Promotion[];
  loading: boolean;
  apiCall: ApiCall;
  onReload: () => Promise<void>;
}

const BADGE_PRESETS = ['СКИДКА', 'ПОДАРОК', 'АКЦИЯ', 'НОВИНКА', 'ХИТ', 'РАСПРОДАЖА'];

const EMPTY_FORM = {
  title: '', description: '', badge: 'СКИДКА', badge_value: '',
  button_text: 'Смотреть товары', button_url: '/catalog',
  expires_at: '', is_active: true, sort_order: 0,
};

export default function PromotionsPanel({ promotions, loading, apiCall, onReload }: PromotionsPanelProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [editPromo, setEditPromo] = useState<Promotion | null>(null);

  const startEdit = (p: Promotion) => {
    setEditPromo(p);
    setForm({
      title: p.title,
      description: p.description || '',
      badge: p.badge,
      badge_value: p.badge_value,
      button_text: p.button_text,
      button_url: p.button_url,
      expires_at: p.expires_at,
      is_active: p.is_active,
      sort_order: p.sort_order,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancel = () => { setEditPromo(null); setForm(EMPTY_FORM); };

  const save = async () => {
    if (!form.title) { toast.error('Введите заголовок'); return; }
    const data = editPromo
      ? await apiCall('PUT', 'promotions', form, editPromo.id)
      : await apiCall('POST', 'promotions', form);
    if (data.promotion) {
      toast.success(editPromo ? 'Акция обновлена' : 'Акция добавлена');
      cancel();
      await onReload();
    } else {
      toast.error((data.error as string) || 'Ошибка');
    }
  };

  const toggleActive = async (p: Promotion) => {
    await apiCall('PATCH', 'promotions', { is_active: !p.is_active }, p.id);
    await onReload();
  };

  const deletePromo = async (p: Promotion) => {
    if (!confirm(`Удалить акцию «${p.title}»?`)) return;
    const data = await apiCall('DELETE', 'promotions', undefined, p.id);
    if (data.deleted) {
      toast.success('Акция удалена');
      await onReload();
    } else {
      toast.error((data.error as string) || 'Ошибка');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{editPromo ? 'Редактировать акцию' : 'Новая акция'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Заголовок*</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Зимняя распродажа" className="mt-1" />
            </div>
            <div>
              <Label>Описание</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Скидки до 30% на весь ассортимент..." className="mt-1 resize-none" rows={3} />
            </div>
            <div>
              <Label>Метка</Label>
              <div className="flex gap-1.5 flex-wrap mt-1 mb-1">
                {BADGE_PRESETS.map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, badge: b }))}
                    className={`px-2 py-0.5 rounded text-xs font-bold border transition-colors ${form.badge === b ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
              <Input value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} placeholder="СКИДКА" className="mt-1" />
            </div>
            <div>
              <Label>Значение метки</Label>
              <Input value={form.badge_value} onChange={e => setForm(f => ({ ...f, badge_value: e.target.value }))} placeholder="-30% или «подарок»" className="mt-1" />
            </div>
            <div>
              <Label>Срок действия</Label>
              <Input value={form.expires_at} onChange={e => setForm(f => ({ ...f, expires_at: e.target.value }))} placeholder="До 31 января 2025" className="mt-1" />
            </div>
            <div>
              <Label>Текст кнопки</Label>
              <Input value={form.button_text} onChange={e => setForm(f => ({ ...f, button_text: e.target.value }))} placeholder="Смотреть товары" className="mt-1" />
            </div>
            <div>
              <Label>Ссылка кнопки</Label>
              <Input value={form.button_url} onChange={e => setForm(f => ({ ...f, button_url: e.target.value }))} placeholder="/catalog" className="mt-1" />
            </div>
            <div>
              <Label>Порядок сортировки</Label>
              <Input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))} className="mt-1" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="promo_active" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} className="w-4 h-4" />
              <Label htmlFor="promo_active">Активна</Label>
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={save} disabled={loading}>
                <Icon name="Save" size={16} className="mr-2" />
                {editPromo ? 'Сохранить' : 'Добавить'}
              </Button>
              {editPromo && <Button variant="outline" onClick={cancel}>Отмена</Button>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* List */}
      <div className="lg:col-span-2 space-y-3">
        {promotions.length === 0 && (
          <p className="text-muted-foreground text-center py-8">Акций пока нет</p>
        )}
        {promotions.map(p => (
          <Card key={p.id} className={!p.is_active ? 'opacity-50' : ''}>
            <CardContent className="p-0 overflow-hidden rounded-lg">
              {/* Header stripe */}
              <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm">{p.badge}</span>
                  {p.badge_value && (
                    <span className="text-xl font-bold">{p.badge_value}</span>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="secondary" className="h-7 w-7 p-0" onClick={() => startEdit(p)}>
                    <Icon name="Pencil" size={13} />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-7 w-7 p-0" onClick={() => toggleActive(p)} title={p.is_active ? 'Скрыть' : 'Показать'}>
                    <Icon name={p.is_active ? 'EyeOff' : 'Eye'} size={13} />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-7 w-7 p-0 text-destructive" onClick={() => deletePromo(p)}>
                    <Icon name="Trash2" size={13} />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-base mb-1">{p.title}</h3>
                {p.description && <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{p.description}</p>}
                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  {p.expires_at && (
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {p.expires_at}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Icon name="Link" size={12} />
                    {p.button_text} → {p.button_url}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
