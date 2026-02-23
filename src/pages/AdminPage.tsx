import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { ADMIN_URL, UPLOAD_URL, Category, Product } from './admin/types';
import AdminLogin from './admin/AdminLogin';
import CategoryPanel from './admin/CategoryPanel';
import ProductPanel from './admin/ProductPanel';
import BlogPanel, { Article } from './admin/BlogPanel';
import BannersPanel, { Banner } from './admin/BannersPanel';
import PromotionsPanel, { Promotion } from './admin/PromotionsPanel';

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem('admin_key') || '');
  const [isAuth, setIsAuth] = useState(false);
  const [tab, setTab] = useState<'categories' | 'products' | 'blog' | 'banners' | 'promotions'>('categories');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(false);

  const apiCall = async (method: string, resource: string, body?: object, id?: number | string) => {
    const params = new URLSearchParams({ resource });
    if (id !== undefined) params.set('id', String(id));
    const res = await fetch(`${ADMIN_URL}?${params}`, {
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
          if (data.url) { resolve(data.url); }
          else { toast.error(data.error || 'Ошибка загрузки'); resolve(null); }
        } catch {
          toast.error('Ошибка загрузки');
          resolve(null);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const login = async () => {
    if (!adminKey.trim()) { toast.error('Введите пароль'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${ADMIN_URL}?resource=categories`, {
        headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey },
      });
      if (res.status === 401) {
        localStorage.removeItem('admin_key');
        toast.error('Неверный пароль');
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data.categories !== undefined) {
        setIsAuth(true);
        setCategories(data.categories);
        localStorage.setItem('admin_key', adminKey);
        toast.success('Вход выполнен');
      } else {
        toast.error('Неожиданный ответ сервера');
      }
    } catch {
      toast.error('Нет соединения с сервером');
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    const data = await apiCall('GET', 'categories');
    if (data.categories) setCategories(data.categories as Category[]);
  };

  const loadProducts = async () => {
    const data = await apiCall('GET', 'products');
    if (data.products) setProducts(data.products as Product[]);
  };

  const loadArticles = async () => {
    const data = await apiCall('GET', 'articles');
    if (data.articles) setArticles(data.articles as Article[]);
  };

  const loadBanners = async () => {
    const data = await apiCall('GET', 'banners');
    if (data.banners) setBanners(data.banners as Banner[]);
  };

  const loadPromotions = async () => {
    const data = await apiCall('GET', 'promotions');
    if (data.promotions) setPromotions(data.promotions as Promotion[]);
  };

  useEffect(() => {
    if (isAuth) {
      loadCategories();
      loadProducts();
      loadArticles();
      loadBanners();
      loadPromotions();
    }
  }, [isAuth]);

  if (!isAuth) {
    return (
      <AdminLogin
        adminKey={adminKey}
        loading={loading}
        onAdminKeyChange={setAdminKey}
        onLogin={login}
        onClear={() => { setAdminKey(''); localStorage.removeItem('admin_key'); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Админ-панель</h1>
            <p className="text-muted-foreground mt-1">Управление каталогом и блогом</p>
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
            onClick={() => setTab('categories')}
          >
            <Icon name="FolderOpen" size={16} className="mr-2" />
            Категории ({categories.length})
          </Button>
          <Button
            variant={tab === 'products' ? 'default' : 'outline'}
            onClick={() => setTab('products')}
          >
            <Icon name="Package" size={16} className="mr-2" />
            Товары ({products.length})
          </Button>
          <Button
            variant={tab === 'blog' ? 'default' : 'outline'}
            onClick={() => setTab('blog')}
          >
            <Icon name="FileText" size={16} className="mr-2" />
            Блог ({articles.length})
          </Button>
          <Button
            variant={tab === 'banners' ? 'default' : 'outline'}
            onClick={() => setTab('banners')}
          >
            <Icon name="Image" size={16} className="mr-2" />
            Баннеры ({banners.length})
          </Button>
          <Button
            variant={tab === 'promotions' ? 'default' : 'outline'}
            onClick={() => setTab('promotions')}
          >
            <Icon name="Tag" size={16} className="mr-2" />
            Акции ({promotions.length})
          </Button>
        </div>

        {tab === 'categories' ? (
          <CategoryPanel
            categories={categories}
            loading={loading}
            apiCall={apiCall}
            uploadImage={uploadImage}
            onReload={loadCategories}
            onEditStart={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        ) : tab === 'products' ? (
          <ProductPanel
            products={products}
            categories={categories}
            loading={loading}
            apiCall={apiCall}
            uploadImage={uploadImage}
            onReload={loadProducts}
            onEditStart={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        ) : tab === 'blog' ? (
          <BlogPanel
            articles={articles}
            loading={loading}
            apiCall={apiCall}
            uploadImage={uploadImage}
            onReload={loadArticles}
          />
        ) : tab === 'banners' ? (
          <BannersPanel
            banners={banners}
            loading={loading}
            apiCall={apiCall}
            uploadImage={uploadImage}
            onReload={loadBanners}
          />
        ) : (
          <PromotionsPanel
            promotions={promotions}
            loading={loading}
            apiCall={apiCall}
            onReload={loadPromotions}
          />
        )}

      </div>
    </div>
  );
}