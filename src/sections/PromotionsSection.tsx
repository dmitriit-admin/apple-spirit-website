import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CATALOG_URL = 'https://functions.poehali.dev/b9910e84-f352-424f-acce-99d333033b22';

interface Promotion {
  id: number;
  title: string;
  description: string | null;
  badge: string;
  badge_value: string;
  button_text: string;
  button_url: string;
  expires_at: string;
}

const FALLBACK: Promotion[] = [
  {
    id: 1, title: 'Зимняя распродажа', badge: 'СКИДКА', badge_value: '-30%',
    description: 'Скидки до 30% на весь ассортимент молний и застежек. Успейте купить по выгодной цене!',
    button_text: 'Смотреть товары', button_url: '/catalog', expires_at: 'До 31 января 2025',
  },
  {
    id: 2, title: 'Подарок при заказе', badge: 'ПОДАРОК', badge_value: '',
    description: 'При заказе от 3000 ₽ — набор ниток в подарок! Разные цвета и высокое качество.',
    button_text: 'Оформить заказ', button_url: '/catalog', expires_at: 'Для всех клиентов',
  },
];

function isExternal(url: string) { return url.startsWith('http'); }

export default function PromotionsSection() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${CATALOG_URL}?resource=promotions`)
      .then(r => r.json())
      .then(data => {
        setPromotions(data.promotions?.length ? data.promotions : FALLBACK);
        setLoaded(true);
      })
      .catch(() => { setPromotions(FALLBACK); setLoaded(true); });
  }, []);

  const list = loaded ? promotions : [];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-primary/10 to-secondary/30">
      <div className="container mx-auto px-6">
        <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Акции и спецпредложения</h2>
          <p className="text-lg text-muted-foreground">Выгодные предложения на популярные товары</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {!loaded && Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="overflow-hidden border-2 border-primary/20">
              <CardContent className="p-0">
                <div className="h-14 bg-secondary animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-secondary rounded animate-pulse w-2/3" />
                  <div className="h-4 bg-secondary rounded animate-pulse" />
                  <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}

          {list.map((promo, idx) => (
            <Card
              key={promo.id}
              className="fade-on-scroll overflow-hidden border-2 border-primary/20"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="bg-primary text-primary-foreground px-6 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{promo.badge}</span>
                    {promo.badge_value ? (
                      <span className="text-3xl font-bold">{promo.badge_value}</span>
                    ) : (
                      <Icon name="Gift" size={28} />
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{promo.title}</h3>
                  {promo.description && (
                    <p className="text-muted-foreground mb-4">{promo.description}</p>
                  )}
                  {promo.expires_at && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Icon name="Clock" size={16} />
                      <span>{promo.expires_at}</span>
                    </div>
                  )}
                  {isExternal(promo.button_url) ? (
                    <a href={promo.button_url} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full">{promo.button_text}</Button>
                    </a>
                  ) : (
                    <Link to={promo.button_url}>
                      <Button className="w-full">{promo.button_text}</Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
