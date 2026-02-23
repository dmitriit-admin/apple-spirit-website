import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import ImageUploader from '@/components/ui/image-uploader';
import { toast } from 'sonner';
import { ApiCall, UploadImage } from './types';

export interface Banner {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  badge: string;
  button_text: string;
  button_url: string;
  gradient: string;
  is_active: boolean;
  sort_order: number;
}

interface BannersPanelProps {
  banners: Banner[];
  loading: boolean;
  apiCall: ApiCall;
  uploadImage: UploadImage;
  onReload: () => Promise<void>;
}

const GRADIENTS = [
  { label: 'Серый', value: 'from-secondary/95 to-muted/90' },
  { label: 'Зелёный', value: 'from-green-600/90 to-green-500/70' },
  { label: 'Синий', value: 'from-blue-700/90 to-blue-500/70' },
  { label: 'Красный', value: 'from-red-600/90 to-red-500/70' },
  { label: 'Фиолетовый', value: 'from-purple-700/90 to-purple-500/70' },
  { label: 'Оранжевый', value: 'from-orange-600/90 to-orange-400/70' },
];

const EMPTY_FORM = {
  title: '', description: '', image_url: '', badge: 'Новость',
  button_text: 'Подробнее', button_url: '/catalog',
  gradient: 'from-secondary/95 to-muted/90', is_active: true, sort_order: 0,
};

export default function BannersPanel({ banners, loading, apiCall, uploadImage, onReload }: BannersPanelProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [editBan, setEditBan] = useState<Banner | null>(null);
  const [uploading, setUploading] = useState(false);

  const startEdit = (ban: Banner) => {
    setEditBan(ban);
    setForm({
      title: ban.title,
      description: ban.description || '',
      image_url: ban.image_url || '',
      badge: ban.badge,
      button_text: ban.button_text,
      button_url: ban.button_url,
      gradient: ban.gradient,
      is_active: ban.is_active,
      sort_order: ban.sort_order,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancel = () => { setEditBan(null); setForm(EMPTY_FORM); };

  const save = async () => {
    if (!form.title) { toast.error('Введите заголовок'); return; }
    const data = editBan
      ? await apiCall('PUT', 'banners', form, editBan.id)
      : await apiCall('POST', 'banners', form);
    if (data.banner) {
      toast.success(editBan ? 'Баннер обновлён' : 'Баннер добавлен');
      cancel();
      await onReload();
    } else {
      toast.error((data.error as string) || 'Ошибка');
    }
  };

  const toggleActive = async (ban: Banner) => {
    await apiCall('PATCH', 'banners', { is_active: !ban.is_active }, ban.id);
    await onReload();
  };

  const deleteBan = async (ban: Banner) => {
    if (!confirm(`Удалить баннер «${ban.title}»?`)) return;
    const data = await apiCall('DELETE', 'banners', undefined, ban.id);
    if (data.deleted) {
      toast.success('Баннер удалён');
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
            <CardTitle className="text-lg">{editBan ? 'Редактировать баннер' : 'Новый баннер'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Заголовок*</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Поступление молний SBS" className="mt-1" />
            </div>
            <div>
              <Label>Описание</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Краткое описание баннера..." className="mt-1 resize-none" rows={3} />
            </div>
            <div>
              <Label>Метка (badge)</Label>
              <Input value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} placeholder="Новость" className="mt-1" />
            </div>
            <div>
              <Label>Текст кнопки</Label>
              <Input value={form.button_text} onChange={e => setForm(f => ({ ...f, button_text: e.target.value }))} placeholder="Подробнее" className="mt-1" />
            </div>
            <div>
              <Label>Ссылка кнопки</Label>
              <Input value={form.button_url} onChange={e => setForm(f => ({ ...f, button_url: e.target.value }))} placeholder="/catalog" className="mt-1" />
            </div>
            <div>
              <Label>Цвет градиента</Label>
              <select
                className="w-full mt-1 border border-input rounded-md px-3 py-2 text-sm bg-background"
                value={form.gradient}
                onChange={e => setForm(f => ({ ...f, gradient: e.target.value }))}
              >
                {GRADIENTS.map(g => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Изображение</Label>
              <ImageUploader
                value={form.image_url}
                onChange={url => setForm(f => ({ ...f, image_url: url }))}
                uploading={uploading}
                onUpload={async (file) => {
                  setUploading(true);
                  const url = await uploadImage(file, 'banners');
                  setUploading(false);
                  return url;
                }}
              />
            </div>
            <div>
              <Label>Порядок сортировки</Label>
              <Input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))} className="mt-1" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="ban_active" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} className="w-4 h-4" />
              <Label htmlFor="ban_active">Активен</Label>
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={save} disabled={loading}>
                <Icon name="Save" size={16} className="mr-2" />
                {editBan ? 'Сохранить' : 'Добавить'}
              </Button>
              {editBan && <Button variant="outline" onClick={cancel}>Отмена</Button>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* List */}
      <div className="lg:col-span-2 space-y-3">
        {banners.length === 0 && <p className="text-muted-foreground text-center py-8">Баннеров пока нет</p>}
        {banners.map(ban => (
          <Card key={ban.id} className={!ban.is_active ? 'opacity-50' : ''}>
            <CardContent className="p-0 overflow-hidden rounded-lg">
              {/* Preview */}
              <div
                className="relative h-24 flex items-center px-4 overflow-hidden"
                style={ban.image_url ? { backgroundImage: `url(${ban.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${ban.gradient}`} />
                <div className="relative z-10 flex-1 min-w-0 mr-3">
                  <span className="text-white/80 text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">{ban.badge}</span>
                  <p className="text-white font-bold text-sm mt-1 truncate">{ban.title}</p>
                  {ban.description && <p className="text-white/80 text-xs truncate">{ban.description}</p>}
                </div>
                <div className="relative z-10 flex gap-1 flex-shrink-0">
                  <Button size="sm" variant="secondary" onClick={() => startEdit(ban)}>
                    <Icon name="Pencil" size={14} />
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => toggleActive(ban)} title={ban.is_active ? 'Скрыть' : 'Показать'}>
                    <Icon name={ban.is_active ? 'EyeOff' : 'Eye'} size={14} />
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => deleteBan(ban)} className="text-destructive">
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
