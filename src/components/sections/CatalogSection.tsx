import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ProductModal from '@/components/ProductModal';
import NotifyModal from '@/components/NotifyModal';
import { useCart } from '@/contexts/CartContext';

const CATALOG_URL = 'https://functions.poehali.dev/b9910e84-f352-424f-acce-99d333033b22';
const FALLBACK_IMAGE = 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  inStock?: boolean;
}

interface ApiCategory {
  id: number;
  slug: string;
  name: string;
  icon: string;
  image_url: string | null;
  product_count: number;
}

interface ApiProduct {
  id: number;
  name: string;
  category_slug: string;
  category_name: string;
  price: string;
  image_url: string | null;
  in_stock: boolean;
}

interface CatalogSectionProps {
  initialCategory?: string;
}

export default function CatalogSection({ initialCategory = 'all' }: CatalogSectionProps) {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [notifyProductName, setNotifyProductName] = useState('');

  const [apiCategories, setApiCategories] = useState<ApiCategory[]>([]);
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${CATALOG_URL}/categories`).then(r => r.json()),
      fetch(`${CATALOG_URL}/products`).then(r => r.json()),
    ]).then(([catData, prodData]) => {
      if (catData.categories?.length) setApiCategories(catData.categories);
      if (prodData.products?.length) setApiProducts(prodData.products);
      setApiLoaded(true);
    }).catch(() => setApiLoaded(true));
  }, []);

  const toProduct = (p: ApiProduct): Product => ({
    id: p.id,
    name: p.name,
    category: p.category_slug,
    price: `${Number(p.price).toLocaleString('ru')} ₽`,
    image: p.image_url || FALLBACK_IMAGE,
    inStock: p.in_stock,
  });

  const categories = apiLoaded && apiCategories.length > 0
    ? [{ id: 'all', name: 'Все', icon: 'Package' }, ...apiCategories.map(c => ({ id: c.slug, name: c.name, icon: c.icon || 'Package' }))]
    : [
        { id: 'all', name: 'Все', icon: 'Package' },
        { id: 'buttons', name: 'Пуговицы', icon: 'Circle' },
        { id: 'zippers', name: 'Молнии', icon: 'Minus' },
        { id: 'threads', name: 'Нитки', icon: 'Wind' },
        { id: 'accessories', name: 'Аксессуары', icon: 'Star' },
        { id: 'ribbons', name: 'Ленты', icon: 'Ribbon' },
        { id: 'metal', name: 'Металлическая фурнитура', icon: 'Hammer' },
      ];

  const mainCategories = apiLoaded && apiCategories.length > 0
    ? apiCategories.map(c => ({
        id: c.slug,
        name: c.name,
        icon: c.icon || 'Package',
        image: c.image_url || FALLBACK_IMAGE,
        count: c.product_count,
      }))
    : [
        { id: 'buttons', name: 'Пуговицы', icon: 'Circle', image: FALLBACK_IMAGE, count: 0 },
        { id: 'zippers', name: 'Молнии', icon: 'Minus', image: FALLBACK_IMAGE, count: 0 },
        { id: 'threads', name: 'Нитки', icon: 'Wind', image: FALLBACK_IMAGE, count: 0 },
        { id: 'accessories', name: 'Аксессуары', icon: 'Star', image: FALLBACK_IMAGE, count: 0 },
        { id: 'ribbons', name: 'Ленты', icon: 'Ribbon', image: FALLBACK_IMAGE, count: 0 },
        { id: 'metal', name: 'Металлическая фурнитура', icon: 'Hammer', image: FALLBACK_IMAGE, count: 0 },
      ];

  const products: Product[] = apiLoaded && apiProducts.length > 0
    ? apiProducts.map(toProduct)
    : [];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const getCategoryCount = (categoryId: string) => {
    if (apiLoaded && apiCategories.length > 0) {
      const cat = apiCategories.find(c => c.slug === categoryId);
      return cat ? cat.product_count : 0;
    }
    return products.filter(p => p.category === categoryId).length;
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setTimeout(() => {
      const productsSection = document.getElementById('products-list');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <>
      <section id="catalog" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Каталог продукции</h2>
            <p className="text-lg text-muted-foreground">Широкий выбор швейной фурнитуры для любых задач</p>
          </div>

          <div className="fade-on-scroll grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
            {mainCategories.map((category, idx) => (
              <Card
                key={category.id}
                className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50"
                style={{ animationDelay: `${idx * 50}ms` }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent className="p-0">
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <div className="relative h-full min-h-[140px] bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <Icon name={category.icon} size={56} className="text-primary relative z-10" fallback="Package" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg">
                          <Icon name="Package" size={14} className="text-primary" />
                          <span className="text-sm font-bold text-primary">{'count' in category ? category.count : getCategoryCount(category.id)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Большой выбор качественной фурнитуры
                      </p>
                      <div className="flex items-center text-primary font-medium text-sm">
                        Смотреть товары
                        <Icon name="ArrowRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div id="products-list" className="fade-on-scroll flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setActiveCategory(cat.id)}
                className="gap-2"
              >
                <Icon name={cat.icon} size={18} fallback="Package" />
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => (
              <Card 
                key={product.id} 
                className="fade-on-scroll overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer" 
                style={{ animationDelay: `${idx * 100}ms` }}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
              >
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  {product.inStock === false && (
                    <div className="text-xs text-orange-600 font-medium mb-2 flex items-center gap-1">
                      <Icon name="AlertCircle" size={14} />
                      Нет в наличии
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    {product.inStock === false ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotifyProductName(product.name);
                          setIsNotifyModalOpen(true);
                        }}
                        className="text-xs"
                      >
                        <Icon name="Bell" size={14} className="mr-1" />
                        Узнать
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        <Icon name="ShoppingCart" size={16} />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <ProductModal 
            product={selectedProduct}
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
          />
          <NotifyModal 
            open={isNotifyModalOpen}
            onOpenChange={setIsNotifyModalOpen}
            productName={notifyProductName}
          />
        </div>
      </section>
    </>
  );
}