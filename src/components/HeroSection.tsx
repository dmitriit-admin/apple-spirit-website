import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden h-[90vh] min-h-[600px]">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
      </div>

      <div className="relative container mx-auto px-6 h-full flex items-center">
        <div className={`max-w-2xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
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
              <div className="text-3xl font-bold text-primary">5000+</div>
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
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#catalog">
          <Icon name="ChevronDown" size={32} className="text-muted-foreground" />
        </a>
      </div>
    </section>
  );
}