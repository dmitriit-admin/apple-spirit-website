import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const CATALOG_URL = 'https://functions.poehali.dev/b9910e84-f352-424f-acce-99d333033b22';

interface Banner {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  badge: string;
  button_text: string;
  button_url: string;
  gradient: string;
}

const FALLBACK_BANNERS: Banner[] = [
  {
    id: 1, title: 'Поступление швейных ниток Мастер 40/2',
    description: 'Качественные швейные нитки для всех типов тканей. В наличии более 50 цветов.',
    image_url: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/2718be60-397d-478f-97fe-fedad9be856a.jpg',
    badge: 'Поступление', button_text: 'Смотреть нитки', button_url: '/catalog',
    gradient: 'from-secondary/95 to-muted/90',
  },
  {
    id: 2, title: 'Поступление молний SBS',
    description: 'В наличии новая партия качественных молний SBS. Широкий выбор размеров.',
    image_url: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c2ff86fb-486d-448f-8e78-84a384408f20.jpg',
    badge: 'Поступление', button_text: 'Смотреть молнии', button_url: '/catalog',
    gradient: 'from-green-600/90 to-green-500/70',
  },
  {
    id: 3, title: 'Открытие нового шоурума в Москве',
    description: 'Приглашаем посетить наш новый выставочный зал. Более 3000 образцов фурнитуры.',
    image_url: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg',
    badge: 'Событие', button_text: 'Узнать адрес', button_url: '/contacts',
    gradient: 'from-secondary/90 to-secondary/70',
  },
];

export default function NewsBanners() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetch(`${CATALOG_URL}?resource=banners`)
      .then(r => r.json())
      .then(data => setBanners(data.banners?.length ? data.banners : FALLBACK_BANNERS))
      .catch(() => setBanners(FALLBACK_BANNERS));
  }, []);

  const list = banners.length > 0 ? banners : FALLBACK_BANNERS;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % list.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [list.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % list.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + list.length) % list.length);

  const isExternal = (url: string) => url.startsWith('http');

  return (
    <div className="relative overflow-hidden rounded-2xl h-[500px] lg:h-[600px] group shadow-2xl">
      {list.map((banner, idx) => (
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
          {banner.image_url && (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${banner.image_url})` }}
            />
          )}
          <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`} />

          <div className="relative h-full flex items-center px-8 md:px-12">
            <div className="max-w-xl">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full mb-3">
                {banner.badge}
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
                {banner.title}
              </h2>
              {banner.description && (
                <p className="text-base md:text-lg text-white/90 mb-4 leading-relaxed">
                  {banner.description}
                </p>
              )}
              {isExternal(banner.button_url) ? (
                <a href={banner.button_url} target="_blank" rel="noopener noreferrer">
                  <Button size="default" className="bg-white text-primary hover:bg-white/90">
                    {banner.button_text}
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </a>
              ) : (
                <Link to={banner.button_url}>
                  <Button size="default" className="bg-white text-primary hover:bg-white/90">
                    {banner.button_text}
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </Link>
              )}
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
        {list.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
