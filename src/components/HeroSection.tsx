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
    <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-b from-secondary to-background py-32 md:py-48">
      <div className="container mx-auto px-6">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            Швейная фурнитура
            <br />
            <span className="text-primary">премиум-класса</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Качественные материалы для профессионалов и любителей шитья
          </p>
          <a href="#catalog">
            <Button size="lg" className="h-14 px-8 text-lg">
              Смотреть каталог
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
