import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function AboutSection() {
  const benefits = [
    { icon: 'Award', title: 'Премиум качество', description: 'Только сертифицированные материалы от проверенных производителей' },
    { icon: 'Truck', title: 'Быстрая доставка', description: 'Отправка заказов в течение 24 часов по всей России' },
    { icon: 'ShieldCheck', title: 'Гарантия', description: 'Возврат и обмен товара в течение 14 дней без вопросов' },
    { icon: 'Users', title: '10+ лет на рынке', description: 'Более 5000 довольных клиентов и партнеров' },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="fade-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">О компании</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              ТК «ФурнитураПрофи» — ведущий поставщик швейной фурнитуры в России с 2010 года. 
              Мы специализируемся на поставках высококачественных материалов для профессиональных 
              швейных производств и частных мастеров.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Наш ассортимент включает более 2000 наименований товаров: пуговицы, молнии, 
              нитки, ленты и многое другое. Мы работаем напрямую с производителями из Европы 
              и Азии, что позволяет предлагать лучшие цены на рынке.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="fade-on-scroll" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon name={benefit.icon as any} size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-on-scroll relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg"
                alt="О компании"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <Card className="absolute -bottom-8 -left-8 max-w-xs bg-white/95 backdrop-blur-sm border-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Award" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-sm text-muted-foreground">лет опыта</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Надежный партнер для швейного бизнеса
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
