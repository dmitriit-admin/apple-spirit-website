import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

export default function ContentSections() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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

  const benefits = [
    { icon: 'Award', title: 'Премиум качество', description: 'Только сертифицированные материалы от проверенных производителей' },
    { icon: 'Truck', title: 'Быстрая доставка', description: 'Отправка заказов в течение 24 часов по всей России' },
    { icon: 'ShieldCheck', title: 'Гарантия', description: 'Возврат и обмен товара в течение 14 дней без вопросов' },
    { icon: 'Users', title: '10+ лет на рынке', description: 'Более 5000 довольных клиентов и партнеров' },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      <section id="catalog" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Каталог продукции</h2>
            <p className="text-lg text-muted-foreground">Широкий выбор швейной фурнитуры для любых задач</p>
          </div>

          <div className="fade-on-scroll flex flex-wrap justify-center gap-3 mb-12">
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

      <section id="promo" className="py-24 md:py-32 bg-gradient-to-br from-primary/10 to-secondary/30">
        <div className="container mx-auto px-6">
          <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Акции и спецпредложения</h2>
            <p className="text-lg text-muted-foreground">Выгодные предложения на популярные товары</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="fade-on-scroll overflow-hidden border-2 border-primary/20">
              <CardContent className="p-0">
                <div className="bg-primary text-white px-6 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">СКИДКА</span>
                    <span className="text-3xl font-bold">-30%</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">Зимняя распродажа</h3>
                  <p className="text-muted-foreground mb-4">
                    Скидки до 30% на весь ассортимент молний и застежек. Успейте купить по выгодной цене!
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Icon name="Clock" size={16} />
                    <span>До 31 января 2025</span>
                  </div>
                  <Button className="w-full">Смотреть товары</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="fade-on-scroll overflow-hidden border-2 border-primary/20" style={{ animationDelay: '100ms' }}>
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">ПОДАРОК</span>
                    <Icon name="Gift" size={28} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">Подарок при заказе</h3>
                  <p className="text-muted-foreground mb-4">
                    При заказе от 3000 ₽ — набор ниток в подарок! Разные цвета и высокое качество.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Icon name="Star" size={16} />
                    <span>Для всех клиентов</span>
                  </div>
                  <Button className="w-full">Оформить заказ</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="blog" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Блог</h2>
            <p className="text-lg text-muted-foreground">Полезные статьи о шитье и выборе материалов</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="fade-on-scroll group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="aspect-video bg-secondary overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg"
                    alt="Блог"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Icon name="Calendar" size={16} />
                    <span>15 декабря 2024</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Как выбрать нитки для швейной машины</h3>
                  <p className="text-muted-foreground mb-4">
                    Подробное руководство по выбору ниток: материалы, толщина, цвет и совместимость.
                  </p>
                  <a href="#" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Читать далее
                    <Icon name="ArrowRight" size={16} />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="fade-on-scroll group hover:shadow-xl transition-all duration-300" style={{ animationDelay: '100ms' }}>
              <CardContent className="p-0">
                <div className="aspect-video bg-secondary overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg"
                    alt="Блог"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Icon name="Calendar" size={16} />
                    <span>10 декабря 2024</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Тренды швейной фурнитуры 2025</h3>
                  <p className="text-muted-foreground mb-4">
                    Какие пуговицы, молнии и аксессуары будут популярны в новом сезоне.
                  </p>
                  <a href="#" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Читать далее
                    <Icon name="ArrowRight" size={16} />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="fade-on-scroll group hover:shadow-xl transition-all duration-300" style={{ animationDelay: '200ms' }}>
              <CardContent className="p-0">
                <div className="aspect-video bg-secondary overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg"
                    alt="Блог"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Icon name="Calendar" size={16} />
                    <span>5 декабря 2024</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Уход за швейной фурнитурой</h3>
                  <p className="text-muted-foreground mb-4">
                    Правила хранения и ухода за молниями, пуговицами и другими материалами.
                  </p>
                  <a href="#" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Читать далее
                    <Icon name="ArrowRight" size={16} />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-on-scroll">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">О компании</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                ТК Эксклюзив — ведущий поставщик швейной фурнитуры в России с более чем 10-летней историей. 
                Мы работаем напрямую с европейскими и азиатскими производителями, что позволяет 
                предлагать лучшие цены на рынке.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Наша миссия — обеспечить профессионалов и любителей швейного дела качественными 
                материалами и комплектующими, которые помогут воплотить в жизнь любые творческие идеи.
              </p>
              <div className="grid grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                  <div className="text-sm text-muted-foreground">Клиентов</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">2000+</div>
                  <div className="text-sm text-muted-foreground">Товаров</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Лет работы</div>
                </div>
              </div>
            </div>
            <div className="fade-on-scroll">
              <img 
                src="https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg" 
                alt="О компании"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Почему выбирают нас</h2>
            <p className="text-lg text-muted-foreground">Качество, надежность и профессионализм в каждой детали</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="fade-on-scroll text-center" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon name={benefit.icon as any} size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Доставка</h2>
            <p className="text-lg text-muted-foreground">Удобные способы получения заказа</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="fade-on-scroll">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon name="Package" size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Бесплатная доставка</h3>
                <p className="text-muted-foreground mb-4">
                  Доставка по Москве в течение 1-2 дней. По России — 3-7 дней.
                </p>
                <div className="text-2xl font-bold text-primary">от 10000 ₽</div>
              </CardContent>
            </Card>

            <Card className="fade-on-scroll" style={{ animationDelay: '100ms' }}>
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon name="MapPin" size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Самовывоз</h3>
                <p className="text-muted-foreground mb-4">
                  Заберите заказ из нашего офиса в Москве в удобное время.
                </p>
                <div className="text-2xl font-bold text-primary">Бесплатно</div>
              </CardContent>
            </Card>
          </div>

          <div className="fade-on-scroll mt-16 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Info" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Бесплатная доставка</h3>
                    <p className="text-muted-foreground">
                      При заказе от 5000 ₽ доставка по Москве бесплатная. При заказе от 10 000 ₽ — 
                      бесплатная доставка по всей России!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="payment" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Оплата</h2>
            <p className="text-lg text-muted-foreground">Безопасные и удобные способы оплаты</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="fade-on-scroll">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon name="CreditCard" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Банковские карты</h3>
                <p className="text-muted-foreground">
                  Visa, MasterCard, МИР. Оплата онлайн на сайте или курьеру при получении.
                </p>
              </CardContent>
            </Card>

            <Card className="fade-on-scroll" style={{ animationDelay: '100ms' }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon name="Wallet" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Наличные</h3>
                <p className="text-muted-foreground">
                  Оплата наличными курьеру при доставке или в офисе при самовывозе.
                </p>
              </CardContent>
            </Card>

            <Card className="fade-on-scroll" style={{ animationDelay: '200ms' }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon name="Building" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Безналичный расчёт</h3>
                <p className="text-muted-foreground">
                  Для юридических лиц. Работаем по договору с отсрочкой платежа.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="fade-on-scroll mt-16 max-w-4xl mx-auto">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="ShieldCheck" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Безопасность платежей</h3>
                    <p className="text-muted-foreground">
                      Все платежи защищены по стандарту PCI DSS. Мы не храним данные банковских карт. 
                      Оплата происходит через защищённое соединение.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="fade-on-scroll text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Контакты</h2>
              <p className="text-lg text-muted-foreground">Мы всегда на связи и готовы помочь</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="fade-on-scroll space-y-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Phone" size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-3">Телефоны</h3>
                        <div className="space-y-2">
                          <div>
                            <a href="tel:+79261081492" className="text-foreground hover:text-primary transition-colors font-medium">
                              8 (926) 108-14-92
                            </a>
                          </div>
                          <div>
                            <a href="tel:+79264309208" className="text-foreground hover:text-primary transition-colors font-medium">
                              8 (926) 430-92-08
                            </a>
                          </div>
                          <div className="pt-1">
                            <a href="tel:+78005007527" className="text-primary hover:text-primary/80 transition-colors font-bold text-lg">
                              8 (800) 500-75-27
                            </a>
                            <span className="block text-xs text-muted-foreground mt-1">Бесплатный звонок по России</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Mail" size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-3">Email</h3>
                        <div className="space-y-2">
                          <div>
                            <a href="mailto:info@tkexclusiv.ru" className="text-foreground hover:text-primary transition-colors">
                              info@tkexclusiv.ru
                            </a>
                          </div>
                          <div>
                            <a href="mailto:ya.exc03@yandex.ru" className="text-foreground hover:text-primary transition-colors">
                              ya.exc03@yandex.ru
                            </a>
                          </div>
                          <div>
                            <a href="mailto:ya.exc08@yandex.ru" className="text-foreground hover:text-primary transition-colors">
                              ya.exc08@yandex.ru
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Share2" size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-3">Социальные сети</h3>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="hover:bg-primary hover:text-white transition-all hover:scale-110"
                            asChild
                          >
                            <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.18 14.53h-1.28c-.54 0-.71-.43-1.69-1.43-.85-.83-1.23-.94-1.44-.94-.3 0-.38.08-.38.46v1.3c0 .35-.11.56-1.03.56-1.52 0-3.2-.92-4.38-2.64-1.78-2.42-2.27-4.24-2.27-4.61 0-.21.08-.41.46-.41h1.28c.34 0 .47.16.6.53.65 1.78 1.74 3.33 2.19 3.33.17 0 .24-.08.24-.5v-1.93c-.06-.97-.57-1.05-.57-1.39 0-.17.14-.33.36-.33h2.01c.28 0 .39.16.39.5v2.61c0 .28.13.39.21.39.17 0 .31-.11.62-.42 1.02-1.14 1.74-2.9 1.74-2.9.09-.21.26-.41.6-.41h1.28c.4 0 .49.21.4.5-.17.78-1.86 3.28-1.86 3.28-.14.23-.19.33 0 .59.14.19.6.59 1.21 1.27.49.55 1.06 1.16 1.18 1.53.07.39-.19.59-.59.59z"/>
                              </svg>
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="hover:bg-primary hover:text-white transition-all hover:scale-110"
                            asChild
                          >
                            <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                              </svg>
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="hover:bg-primary hover:text-white transition-all hover:scale-110"
                            asChild
                          >
                            <a href="https://my.mail.ru" target="_blank" rel="noopener noreferrer">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zm0 13c-2.03 0-3.84-1.02-4.91-2.58.03-1.62 3.27-2.51 4.91-2.51s4.88.89 4.91 2.51C15.84 17.48 14.03 18.5 12 18.5z"/>
                              </svg>
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="fade-on-scroll space-y-6" style={{ animationDelay: '100ms' }}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="MapPin" size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-3">Адрес</h3>
                        <p className="text-foreground leading-relaxed mb-3">
                          г. Москва, ул. Примерная, д. 123, офис 45
                        </p>
                        <p className="text-sm text-muted-foreground">
                          3 минуты пешком от метро «Примерная»
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Clock" size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-3">График работы</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Понедельник - Пятница</span>
                            <span className="font-medium">9:00 - 18:00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Суббота</span>
                            <span className="font-medium">10:00 - 16:00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Воскресенье</span>
                            <span className="font-medium text-destructive">Выходной</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm text-muted-foreground">
                            Приём заказов онлайн — круглосуточно
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Headphones" size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">Поддержка клиентов</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Ответим на ваши вопросы в течение 15 минут в рабочее время
                        </p>
                        <Button className="w-full">
                          <Icon name="MessageCircle" size={16} className="mr-2" />
                          Задать вопрос
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}