import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function ContentSections() {
  const [activeCategory, setActiveCategory] = useState('all');

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
  ];

  const products = [
    { id: 1, name: 'Пуговицы перламутровые', category: 'buttons', price: '120 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 2, name: 'Молния металлическая', category: 'zippers', price: '180 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
    { id: 3, name: 'Нитки полиэстер 40/2', category: 'threads', price: '95 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 4, name: 'Кнопки декоративные', category: 'accessories', price: '150 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 5, name: 'Пуговицы деревянные', category: 'buttons', price: '140 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 6, name: 'Молния спиральная', category: 'zippers', price: '160 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
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
              <Card key={product.id} className="fade-on-scroll overflow-hidden group hover:shadow-xl transition-all duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
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
                    <Button size="sm" variant="outline">
                      <Icon name="ShoppingCart" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                <h3 className="text-xl font-semibold mb-3">Курьерская доставка</h3>
                <p className="text-muted-foreground mb-4">
                  Доставка по Москве в течение 1-2 дней. По России — 3-7 дней.
                </p>
                <div className="text-2xl font-bold text-primary">от 300 ₽</div>
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
          <div className="max-w-2xl mx-auto">
            <div className="fade-on-scroll text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Свяжитесь с нами</h2>
              <p className="text-lg text-muted-foreground">Ответим на все вопросы и поможем с выбором</p>
            </div>

            <Card className="fade-on-scroll">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                    <Input placeholder="Иван Иванов" className="h-12" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="ivan@example.com" className="h-12" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Сообщение</label>
                    <Textarea placeholder="Расскажите о ваших потребностях..." className="min-h-32 resize-none" />
                  </div>
                  <Button className="w-full h-12 text-base" size="lg">
                    Отправить сообщение
                    <Icon name="Send" className="ml-2" size={18} />
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                      <Icon name="Phone" size={24} className="mx-auto mb-2 text-primary" />
                      <div className="text-sm font-medium">+7 (495) 123-45-67</div>
                    </div>
                    <div>
                      <Icon name="Mail" size={24} className="mx-auto mb-2 text-primary" />
                      <div className="text-sm font-medium">info@shveypro.ru</div>
                    </div>
                    <div>
                      <Icon name="MapPin" size={24} className="mx-auto mb-2 text-primary" />
                      <div className="text-sm font-medium">Москва, ул. Примерная, 123</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
