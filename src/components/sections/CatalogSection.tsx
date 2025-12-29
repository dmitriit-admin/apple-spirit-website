import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ProductModal from '@/components/ProductModal';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

interface CatalogSectionProps {
  initialCategory?: string;
}

export default function CatalogSection({ initialCategory = 'all' }: CatalogSectionProps) {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'Все', icon: 'Package' },
    { id: 'buttons', name: 'Пуговицы', icon: 'Circle' },
    { id: 'zippers', name: 'Молнии', icon: 'Minus' },
    { id: 'threads', name: 'Нитки', icon: 'Wind' },
    { id: 'accessories', name: 'Аксессуары', icon: 'Star' },
    { id: 'ribbons', name: 'Ленты', icon: 'Ribbon' },
    { id: 'metal', name: 'Металлическая фурнитура', icon: 'Hammer' },
    { id: 'plastic', name: 'Пластиковая фурнитура', icon: 'Blocks' },
    { id: 'shoulder', name: 'Подплечники', icon: 'Triangle' },
    { id: 'underwear', name: 'Бельевая фурнитура', icon: 'Shirt' },
    { id: 'cords', name: 'Шнуры', icon: 'Cable' },
    { id: 'lining', name: 'Подкладки', icon: 'Layers' },
    { id: 'bags', name: 'Пакеты', icon: 'ShoppingBag' },
  ];

  const mainCategories = [
    { id: 'buttons', name: 'Пуговицы', icon: 'Circle', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 'zippers', name: 'Молнии', icon: 'Minus', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
    { id: 'threads', name: 'Нитки', icon: 'Wind', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 'accessories', name: 'Аксессуары', icon: 'Star', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 'ribbons', name: 'Ленты', icon: 'Ribbon', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 'metal', name: 'Металлическая фурнитура', icon: 'Hammer', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
    { id: 'plastic', name: 'Пластиковая фурнитура', icon: 'Blocks', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 'shoulder', name: 'Подплечники', icon: 'Triangle', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 'underwear', name: 'Бельевая фурнитура', icon: 'Shirt', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 'cords', name: 'Шнуры', icon: 'Cable', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 'lining', name: 'Подкладки', icon: 'Layers', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 'bags', name: 'Пакеты', icon: 'ShoppingBag', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
  ];

  const products = [
    { id: 1, name: 'Пуговицы перламутровые', category: 'buttons', price: '120 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 2, name: 'Молния металлическая', category: 'zippers', price: '180 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
    { id: 3, name: 'Нитки полиэстер 40/2', category: 'threads', price: '95 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 4, name: 'Кнопки декоративные', category: 'accessories', price: '150 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 5, name: 'Пуговицы деревянные', category: 'buttons', price: '140 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 6, name: 'Молния спиральная', category: 'zippers', price: '160 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
    { id: 7, name: 'Лента атласная 25мм', category: 'ribbons', price: '85 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 8, name: 'Лента репсовая с рисунком', category: 'ribbons', price: '110 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 9, name: 'Люверсы металлические', category: 'metal', price: '200 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
    { id: 10, name: 'Пряжки металлические', category: 'metal', price: '175 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
    { id: 11, name: 'Крючки и петли', category: 'metal', price: '130 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
    { id: 12, name: 'Фиксаторы пластиковые', category: 'plastic', price: '65 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 13, name: 'Карабины пластиковые', category: 'plastic', price: '80 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 14, name: 'Пуллеры для молний', category: 'plastic', price: '45 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 15, name: 'Подплечники реглан', category: 'shoulder', price: '190 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 16, name: 'Подплечники прямые', category: 'shoulder', price: '170 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 17, name: 'Бретельки силиконовые', category: 'underwear', price: '55 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 18, name: 'Косточки для бюстгальтера', category: 'underwear', price: '75 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 19, name: 'Регуляторы для бретелей', category: 'underwear', price: '50 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 20, name: 'Шнур вощёный 2мм', category: 'cords', price: '70 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 21, name: 'Шнур декоративный плетёный', category: 'cords', price: '105 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 22, name: 'Шнур эластичный', category: 'cords', price: '60 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 23, name: 'Подкладка вискоза', category: 'lining', price: '280 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 24, name: 'Подкладка атлас', category: 'lining', price: '320 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 25, name: 'Флизелин клеевой', category: 'lining', price: '95 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 26, name: 'Пакеты для упаковки 20х30', category: 'bags', price: '35 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 27, name: 'Пакеты zip-lock', category: 'bags', price: '55 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 28, name: 'Пакеты с клапаном', category: 'bags', price: '45 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const getCategoryCount = (categoryId: string) => {
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
                      <Icon name={category.icon as any} size={56} className="text-primary relative z-10" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg">
                          <Icon name="Package" size={14} className="text-primary" />
                          <span className="text-sm font-bold text-primary">{getCategoryCount(category.id)}</span>
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
                <Icon name={cat.icon as any} size={18} />
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
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
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
        </div>
      </section>
    </>
  );
}