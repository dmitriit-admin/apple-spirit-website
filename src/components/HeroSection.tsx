import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import NewsBanners from '@/components/NewsBanners';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden min-h-[600px] py-24">
      <div className="relative container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold text-sm">✨ Новая коллекция 2025</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            Швейная фурнитура
            <br />
            <span className="text-primary">премиум-класса</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
            Качественные материалы для профессионалов и любителей шитья. Более 2000 товаров в наличии.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#catalog">
              <Button size="lg" className="h-14 px-8 text-lg">
                Смотреть каталог
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </a>
            <a href="#promo">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                <Icon name="Gift" className="mr-2" size={20} />
                Акции
              </Button>
            </a>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-3xl font-bold text-primary">10000+</div>
              <div className="text-sm text-muted-foreground">Довольных клиентов</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div>
              <div className="text-3xl font-bold text-primary">25+ лет</div>
              <div className="text-sm text-muted-foreground">На рынке</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div>
              <div className="text-3xl font-bold text-primary">2000+</div>
              <div className="text-sm text-muted-foreground">Товаров</div>
            </div>
          </div>
        </div>
        
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <NewsBanners />
        </div>
        </div>
      </div>
    </section>
  );
}