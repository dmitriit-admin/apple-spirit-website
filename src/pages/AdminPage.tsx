import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import ImageUploader from '@/components/ui/image-uploader';
import { toast } from 'sonner';

const ADMIN_URL = 'https://functions.poehali.dev/7f596fac-a8fe-498a-bf36-7bfa5c3c69c5';
const UPLOAD_URL = 'https://functions.poehali.dev/e6b8ed0a-5d91-4a0e-b345-ce02226791ef';

interface Category {
  id: number;
  slug: string;
  name: string;
  icon: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  product_count: number;
}

interface Product {
  id: number;
  name: string;
  category_slug: string;
  category_name: string;
  price: string;
  description: string | null;
  image_url: string | null;
  in_stock: boolean;
  is_active: boolean;
  sort_order: number;
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem('admin_key') || '');
  const [isAuth, setIsAuth] = useState(false);
  const [tab, setTab] = useState<'categories' | 'products'>('categories');

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // category form
  const [catForm, setCatForm] = useState({ slug: '', name: '', icon: 'Package', image_url: '', sort_order: 0 });
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [catUploading, setCatUploading] = useState(false);

  // product form
  const [prodForm, setProdForm] = useState({ name: '', category_slug: '', price: '', description: '', image_url: '', in_stock: true, sort_order: 0 });
  const [editProd, setEditProd] = useState<Product | null>(null);
  const [prodUploading, setProdUploading] = useState(false);

  const apiCall = async (method: string, path: string, body?: object) => {
    const res = await fetch(`${ADMIN_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey },
      body: body ? JSON.stringify(body) : undefined,
    });
    return res.json();
  };

  const uploadImage = async (file: File, folder: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string) ?? '';
        try {
          const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey },
            body: JSON.stringify({ file: base64, content_type: file.type, folder }),
          });
          const data = await res.json();
          if (data.url) {
            resolve(data.url);
          } else {
            toast.error(data.error || 'Ошибка загрузки');
            resolve(null);
          }
        } catch {
          toast.error('Ошибка загрузки');
          resolve(null);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const login = async () => {
    setLoading(true);
    try {
      const data = await apiCall('GET', '/categories');
      if (data.categories !== undefined) {
        setIsAuth(true);
        setCategories(data.categories);
        localStorage.setItem('admin_key', adminKey);
        toast.success('Вход выполнен');
      } else {
        toast.error('Неверный пароль');
      }
    } catch {
      toast.error('Ошибка подключения');
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    const data = await apiCall('GET', '/categories');
    if (data.categories) setCategories(data.categories);
  };

  const loadProducts = async () => {
    const data = await apiCall('GET', '/products');
    if (data.products) setProducts(data.products);
  };

  useEffect(() => {
    if (isAuth) {
      loadCategories();
      loadProducts();
    }
  }, [isAuth]);

  // ---- Category actions ----
  const saveCat = async () => {
    if (!catForm.slug || !catForm.name) { toast.error('Заполните slug и название'); return; }
    setLoading(true);
    let data;
    if (editCat) {
      data = await apiCall('PUT', `/categories/${editCat.id}`, catForm);
    } else {
      data = await apiCall('POST', '/categories', catForm);
    }
    if (data.category) {
      toast.success(editCat ? 'Категория обновлена' : 'Категория добавлена');
      setCatForm({ slug: '', name: '', icon: 'Package', image_url: '', sort_order: 0 });
      setEditCat(null);
      await loadCategories();
    } else {
      toast.error(data.error || 'Ошибка');
    }
    setLoading(false);
  };

  const toggleCatActive = async (cat: Category) => {
    await apiCall('PATCH', `/categories/${cat.id}`, { is_active: !cat.is_active });
    await loadCategories();
  };

  const startEditCat = (cat: Category) => {
    setEditCat(cat);
    setCatForm({ slug: cat.slug, name: cat.name, icon: cat.icon || 'Package', image_url: cat.image_url || '', sort_order: cat.sort_order });
    setTab('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---- Product actions ----
  const saveProd = async () => {
    if (!prodForm.name) { toast.error('Введите название товара'); return; }
    if (!prodForm.price || isNaN(Number(prodForm.price))) { toast.error('Введите корректную цену'); return; }
    setLoading(true);
    const payload = { ...prodForm, price: Number(prodForm.price) };
    let data;
    if (editProd) {
      data = await apiCall('PUT', `/products/${editProd.id}`, payload);
    } else {
      data = await apiCall('POST', '/products', payload);
    }
    if (data.product) {
      toast.success(editProd ? 'Товар обновлён' : 'Товар добавлен');
      setProdForm({ name: '', category_slug: '', price: '', description: '', image_url: '', in_stock: true, sort_order: 0 });
      setEditProd(null);
      await loadProducts();
    } else {
      toast.error(data.error || 'Ошибка');
    }
    setLoading(false);
  };

  const toggleProdActive = async (prod: Product) => {
    await apiCall('PATCH', `/products/${prod.id}`, { is_active: !prod.is_active });
    await loadProducts();
  };

  const toggleProdStock = async (prod: Product) => {
    await apiCall('PATCH', `/products/${prod.id}`, { in_stock: !prod.in_stock });
    await loadProducts();
  };

  const startEditProd = (prod: Product) => {
    setEditProd(prod);
    setProdForm({
      name: prod.name,
      category_slug: prod.category_slug || '',
      price: String(prod.price),
      description: prod.description || '',
      image_url: prod.image_url || '',
      in_stock: prod.in_stock,
      sort_order: prod.sort_order,
    });
    setTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="ShieldCheck" size={22} className="text-primary" />
              Вход в админ-панель
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Пароль</Label>
              <Input
                type="password"
                value={adminKey}
                onChange={e => setAdminKey(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && login()}
                placeholder="Введите пароль"
                className="mt-1"
              />
            </div>
            <Button className="w-full" onClick={login} disabled={loading}>
              {loading ? 'Проверяю...' : 'Войти'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Админ-панель</h1>
            <p className="text-muted-foreground mt-1">Управление каталогом товаров</p>
          </div>
          <Button variant="outline" onClick={() => { setIsAuth(false); localStorage.removeItem('admin_key'); }}>
            <Icon name="LogOut" size={16} className="mr-2" />
            Выйти
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={tab === 'categories' ? 'default' : 'outline'}
            onClick={() => { setTab('categories'); setEditCat(null); setCatForm({ slug: '', name: '', icon: 'Package', image_url: '', sort_order: 0 }); }}
          >
            <Icon name="FolderOpen" size={16} className="mr-2" />
            Категории ({categories.length})
          </Button>
          <Button
            variant={tab === 'products' ? 'default' : 'outline'}
            onClick={() => { setTab('products'); setEditProd(null); setProdForm({ name: '', category_slug: '', price: '', description: '', image_url: '', in_stock: true, sort_order: 0 }); }}
          >
            <Icon name="Package" size={16} className="mr-2" />
            Товары ({products.length})
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ---- FORM ---- */}
          <div className="lg:col-span-1">
            {tab === 'categories' ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {editCat ? 'Редактировать категорию' : 'Новая категория'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Slug (латиница)*</Label>
                    <Input value={catForm.slug} onChange={e => setCatForm({ ...catForm, slug: e.target.value })} placeholder="buttons" className="mt-1" />
                  </div>
                  <div>
                    <Label>Название*</Label>
                    <Input value={catForm.name} onChange={e => setCatForm({ ...catForm, name: e.target.value })} placeholder="Пуговицы" className="mt-1" />
                  </div>
                  <div>
                    <Label>Иконка (Lucide)</Label>
                    <Input value={catForm.icon} onChange={e => setCatForm({ ...catForm, icon: e.target.value })} placeholder="Package" className="mt-1" />
                  </div>
                  <div>
                    <Label>Изображение</Label>
                    <ImageUploader
                      value={catForm.image_url}
                      onChange={(url) => setCatForm(f => ({ ...f, image_url: url }))}
                      uploading={catUploading}
                      onUpload={async (file) => {
                        setCatUploading(true);
                        const url = await uploadImage(file, 'categories');
                        setCatUploading(false);
                        return url;
                      }}
                    />
                  </div>
                  <div>
                    <Label>Порядок сортировки</Label>
                    <Input type="number" value={catForm.sort_order} onChange={e => setCatForm({ ...catForm, sort_order: Number(e.target.value) })} className="mt-1" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" onClick={saveCat} disabled={loading}>
                      <Icon name="Save" size={16} className="mr-2" />
                      {editCat ? 'Сохранить' : 'Добавить'}
                    </Button>
                    {editCat && (
                      <Button variant="outline" onClick={() => { setEditCat(null); setCatForm({ slug: '', name: '', icon: 'Package', image_url: '', sort_order: 0 }); }}>
                        Отмена
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {editProd ? 'Редактировать товар' : 'Новый товар'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Название*</Label>
                    <Input value={prodForm.name} onChange={e => setProdForm({ ...prodForm, name: e.target.value })} placeholder="Пуговицы перламутровые" className="mt-1" />
                  </div>
                  <div>
                    <Label>Категория</Label>
                    <select
                      className="w-full mt-1 border border-input rounded-md px-3 py-2 text-sm bg-background"
                      value={prodForm.category_slug}
                      onChange={e => setProdForm({ ...prodForm, category_slug: e.target.value })}
                    >
                      <option value="">— без категории —</option>
                      {categories.filter(c => c.is_active).map(c => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Цена (₽)*</Label>
                    <Input type="number" value={prodForm.price} onChange={e => setProdForm({ ...prodForm, price: e.target.value })} placeholder="120" className="mt-1" />
                  </div>
                  <div>
                    <Label>Описание</Label>
                    <Textarea value={prodForm.description} onChange={e => setProdForm({ ...prodForm, description: e.target.value })} placeholder="Описание товара..." className="mt-1 resize-none" rows={3} />
                  </div>
                  <div>
                    <Label>Изображение</Label>
                    <ImageUploader
                      value={prodForm.image_url}
                      onChange={(url) => setProdForm(f => ({ ...f, image_url: url }))}
                      uploading={prodUploading}
                      onUpload={async (file) => {
                        setProdUploading(true);
                        const url = await uploadImage(file, 'products');
                        setProdUploading(false);
                        return url;
                      }}
                    />
                  </div>
                  <div>
                    <Label>Порядок сортировки</Label>
                    <Input type="number" value={prodForm.sort_order} onChange={e => setProdForm({ ...prodForm, sort_order: Number(e.target.value) })} className="mt-1" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="in_stock"
                      checked={prodForm.in_stock}
                      onChange={e => setProdForm({ ...prodForm, in_stock: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="in_stock">В наличии</Label>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" onClick={saveProd} disabled={loading}>
                      <Icon name="Save" size={16} className="mr-2" />
                      {editProd ? 'Сохранить' : 'Добавить'}
                    </Button>
                    {editProd && (
                      <Button variant="outline" onClick={() => { setEditProd(null); setProdForm({ name: '', category_slug: '', price: '', description: '', image_url: '', in_stock: true, sort_order: 0 }); }}>
                        Отмена
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* ---- LIST ---- */}
          <div className="lg:col-span-2">
            {tab === 'categories' ? (
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
                          <Button size="sm" variant="outline" onClick={() => startEditCat(cat)}>
                            <Icon name="Pencil" size={14} />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => toggleCatActive(cat)}>
                            <Icon name={cat.is_active ? 'EyeOff' : 'Eye'} size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
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
                          <Button size="sm" variant="outline" onClick={() => startEditProd(prod)}>
                            <Icon name="Pencil" size={14} />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => toggleProdStock(prod)} title={prod.in_stock ? 'Убрать из наличия' : 'Добавить в наличие'}>
                            <Icon name={prod.in_stock ? 'PackageX' : 'PackageCheck'} size={14} />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => toggleProdActive(prod)}>
                            <Icon name={prod.is_active ? 'EyeOff' : 'Eye'} size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}