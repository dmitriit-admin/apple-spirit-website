import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import ImageUploader from '@/components/ui/image-uploader';
import { toast } from 'sonner';
import { Category, ApiCall, UploadImage } from './types';

interface CategoryPanelProps {
  categories: Category[];
  loading: boolean;
  apiCall: ApiCall;
  uploadImage: UploadImage;
  onReload: () => Promise<void>;
  onEditStart: (cat: Category) => void;
}

const EMPTY_FORM = { slug: '', name: '', icon: 'Package', image_url: '', sort_order: 0 };

export default function CategoryPanel({ categories, loading, apiCall, uploadImage, onReload, onEditStart }: CategoryPanelProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [uploading, setUploading] = useState(false);

  const startEdit = (cat: Category) => {
    setEditCat(cat);
    setForm({ slug: cat.slug, name: cat.name, icon: cat.icon || 'Package', image_url: cat.image_url || '', sort_order: cat.sort_order });
    onEditStart(cat);
  };

  const cancel = () => {
    setEditCat(null);
    setForm(EMPTY_FORM);
  };

  const save = async () => {
    if (!form.slug || !form.name) { toast.error('Заполните slug и название'); return; }
    const data = editCat
      ? await apiCall('PUT', 'categories', form, editCat.id)
      : await apiCall('POST', 'categories', form);
    if (data.category) {
      toast.success(editCat ? 'Категория обновлена' : 'Категория добавлена');
      cancel();
      await onReload();
    } else {
      toast.error((data.error as string) || 'Ошибка');
    }
  };

  const toggleActive = async (cat: Category) => {
    await apiCall('PATCH', 'categories', { is_active: !cat.is_active }, cat.id);
    await onReload();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        {/* Form */}
        <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {editCat ? 'Редактировать категорию' : 'Новая категория'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Slug (латиница)*</Label>
            <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="buttons" className="mt-1" />
          </div>
          <div>
            <Label>Название*</Label>
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Пуговицы" className="mt-1" />
          </div>
          <div>
            <Label>Иконка (Lucide)</Label>
            <Input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="Package" className="mt-1" />
          </div>
          <div>
            <Label>Изображение</Label>
            <ImageUploader
              value={form.image_url}
              onChange={url => setForm(f => ({ ...f, image_url: url }))}
              uploading={uploading}
              onUpload={async (file) => {
                setUploading(true);
                const url = await uploadImage(file, 'categories');
                setUploading(false);
                return url;
              }}
            />
          </div>
          <div>
            <Label>Порядок сортировки</Label>
            <Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} className="mt-1" />
          </div>
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" onClick={save} disabled={loading}>
              <Icon name="Save" size={16} className="mr-2" />
              {editCat ? 'Сохранить' : 'Добавить'}
            </Button>
            {editCat && (
              <Button variant="outline" onClick={cancel}>Отмена</Button>
            )}
          </div>
        </CardContent>
        </Card>
      </div>

      {/* List */}
      <div className="lg:col-span-2">
        <div className="space-y-3">
          {categories.length === 0 && <p className="text-muted-foreground text-center py-8">Категорий пока нет</p>}
          {categories.map(cat => (
            <Card key={cat.id} className={!cat.is_active ? 'opacity-50' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={cat.icon} size={20} className="text-primary" fallback="Package" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{cat.name}</div>
                      <div className="text-sm text-muted-foreground">
                        <code className="bg-muted px-1 rounded text-xs">{cat.slug}</code>
                        {' '}&nbsp;
                        <Badge variant="secondary" className="text-xs">{cat.product_count} товаров</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => startEdit(cat)}>
                      <Icon name="Pencil" size={14} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toggleActive(cat)}>
                      <Icon name={cat.is_active ? 'EyeOff' : 'Eye'} size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}