import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function NewsBanners() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: 'Новое поступление японских молний YKK',
      description: 'Премиальные молнии YKK — мировой стандарт качества для профессионалов. Широкий выбор размеров и цветов в наличии',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg',
      badge: 'Новинка',
      buttonText: 'Смотреть молнии',
      gradient: 'from-primary/90 to-primary/70'
    },
    {
      id: 2,
      title: 'Поступление молний SBS',
      description: 'В наличии новая партия качественных молний SBS. Широкий выбор размеров от 3 до 10. Доступны металлические и спиральные варианты',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c2ff86fb-486d-448f-8e78-84a384408f20.jpg',
      badge: 'Поступление',
      buttonText: 'Смотреть молнии SBS',
      gradient: 'from-green-600/90 to-green-500/70'
    },
    {
      id: 3,
      title: 'Открытие нового шоурума в Москве',
      description: 'Приглашаем посетить наш новый выставочный зал на Тверской улице. Более 3000 образцов фурнитуры для осмотра',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg',
      badge: 'Событие',
      buttonText: 'Узнать адрес',
      gradient: 'from-secondary/90 to-secondary/70'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl h-[500px] lg:h-[600px] group shadow-2xl">
          {banners.map((banner, idx) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-all duration-700 ${
                idx === currentSlide 
                  ? 'opacity-100 translate-x-0' 
                  : idx < currentSlide 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${banner.image})` }}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`} />
              
              <div className="relative h-full flex items-center px-8 md:px-12">
                <div className="max-w-xl">
                  <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full mb-3">
                    {banner.badge}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
                    {banner.title}
                  </h2>
                  <p className="text-base md:text-lg text-white/90 mb-4 leading-relaxed">
                    {banner.description}
                  </p>
                  <Button 
                    size="default" 
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    {banner.buttonText}
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          >
            <Icon name="ChevronLeft" size={24} className="text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          >
            <Icon name="ChevronRight" size={24} className="text-white" />
          </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}