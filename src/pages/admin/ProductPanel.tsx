import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import ImageUploader from '@/components/ui/image-uploader';
import { toast } from 'sonner';
import { Category, Product, ApiCall, UploadImage } from './types';

interface ProductPanelProps {
  products: Product[];
  categories: Category[];
  loading: boolean;
  apiCall: ApiCall;
  uploadImage: UploadImage;
  onReload: () => Promise<void>;
  onEditStart: (prod: Product) => void;
}

const EMPTY_FORM = { name: '', category_slug: '', price: '', description: '', image_url: '', in_stock: true, sort_order: 0 };

export default function ProductPanel({ products, categories, loading, apiCall, uploadImage, onReload, onEditStart }: ProductPanelProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [editProd, setEditProd] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);

  const startEdit = (prod: Product) => {
    setEditProd(prod);
    setForm({
      name: prod.name,
      category_slug: prod.category_slug || '',
      price: String(prod.price),
      description: prod.description || '',
      image_url: prod.image_url || '',
      in_stock: prod.in_stock,
      sort_order: prod.sort_order,
    });
    onEditStart(prod);
  };

  const cancel = () => {
    setEditProd(null);
    setForm(EMPTY_FORM);
  };

  const save = async () => {
    if (!form.name) { toast.error('Введите название товара'); return; }
    if (!form.price || isNaN(Number(form.price))) { toast.error('Введите корректную цену'); return; }
    const payload = { ...form, price: Number(form.price) };
    const data = editProd
      ? await apiCall('PUT', 'products', payload, editProd.id)
      : await apiCall('POST', 'products', payload);
    if (data.product) {
      toast.success(editProd ? 'Товар обновлён' : 'Товар добавлен');
      cancel();
      await onReload();
    } else {
      toast.error((data.error as string) || 'Ошибка');
    }
  };

  const toggleActive = async (prod: Product) => {
    await apiCall('PATCH', 'products', { is_active: !prod.is_active }, prod.id);
    await onReload();
  };

  const toggleStock = async (prod: Product) => {
    await apiCall('PATCH', 'products', { in_stock: !prod.in_stock }, prod.id);
    await onReload();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        {/* Form */}
        <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {editProd ? 'Редактировать товар' : 'Новый товар'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Название*</Label>
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Пуговицы перламутровые" className="mt-1" />
          </div>
          <div>
            <Label>Категория</Label>
            <select
              className="w-full mt-1 border border-input rounded-md px-3 py-2 text-sm bg-background"
              value={form.category_slug}
              onChange={e => setForm({ ...form, category_slug: e.target.value })}
            >
              <option value="">— без категории —</option>
              {categories.filter(c => c.is_active).map(c => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Цена (₽)*</Label>
            <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="120" className="mt-1" />
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Описание товара..." className="mt-1 resize-none" rows={3} />
          </div>
          <div>
            <Label>Изображение</Label>
            <ImageUploader
              value={form.image_url}
              onChange={url => setForm(f => ({ ...f, image_url: url }))}
              uploading={uploading}
              onUpload={async (file) => {
                setUploading(true);
                const url = await uploadImage(file, 'products');
                setUploading(false);
                return url;
              }}
            />
          </div>
          <div>
            <Label>Порядок сортировки</Label>
            <Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} className="mt-1" />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="in_stock"
              checked={form.in_stock}
              onChange={e => setForm({ ...form, in_stock: e.target.checked })}
              className="w-4 h-4"
            />
            <Label htmlFor="in_stock">В наличии</Label>
          </div>
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" onClick={save} disabled={loading}>
              <Icon name="Save" size={16} className="mr-2" />
              {editProd ? 'Сохранить' : 'Добавить'}
            </Button>
            {editProd && (
              <Button variant="outline" onClick={cancel}>Отмена</Button>
            )}
          </div>
        </CardContent>
        </Card>
      </div>

      {/* List */}
      <div className="lg:col-span-2">
        <div className="space-y-3">
          {products.length === 0 && <p className="text-muted-foreground text-center py-8">Товаров пока нет</p>}
          {products.map(prod => (
            <Card key={prod.id} className={!prod.is_active ? 'opacity-50' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {prod.image_url ? (
                      <img src={prod.image_url} alt={prod.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                    ) : (
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Package" size={20} className="text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{prod.name}</div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-sm font-bold text-primary">{Number(prod.price).toLocaleString('ru')} ₽</span>
                        {prod.category_name && <Badge variant="outline" className="text-xs">{prod.category_name}</Badge>}
                        <Badge variant={prod.in_stock ? 'default' : 'secondary'} className="text-xs">
                          {prod.in_stock ? 'В наличии' : 'Нет'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => startEdit(prod)}>
                      <Icon name="Pencil" size={14} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toggleStock(prod)} title={prod.in_stock ? 'Убрать из наличия' : 'Добавить в наличие'}>
                      <Icon name={prod.in_stock ? 'PackageX' : 'PackageCheck'} size={14} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toggleActive(prod)}>
                      <Icon name={prod.is_active ? 'EyeOff' : 'Eye'} size={14} />
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