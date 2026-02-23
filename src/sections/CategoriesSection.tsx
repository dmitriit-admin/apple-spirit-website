import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CATALOG_URL = 'https://functions.poehali.dev/b9910e84-f352-424f-acce-99d333033b22';
const FALLBACK_IMAGE = 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg';

interface ApiCategory {
  id: number;
  slug: string;
  name: string;
  icon: string;
  image_url: string | null;
  product_count: number;
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState<{ id: string; name: string; icon: string; image: string; count: number }[]>([]);

  useEffect(() => {
    fetch(`${CATALOG_URL}?resource=categories`)
      .then(r => r.json())
      .then(data => {
        if (data.categories?.length) {
          setCategories(data.categories.map((c: ApiCategory) => ({
            id: c.slug,
            name: c.name,
            icon: c.icon || 'Package',
            image: c.image_url || FALLBACK_IMAGE,
            count: Number(c.product_count),
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Популярные категории</h2>
          <p className="text-lg text-muted-foreground">Выберите нужную категорию товаров</p>
        </div>

        <div className="fade-on-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Link key={category.id} to={`/catalog?category=${category.id}`}>
              <Card className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 h-full">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <Icon name={category.icon} size={64} className="text-primary relative z-10" fallback="Package" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg">
                        <Icon name="Package" size={14} className="text-primary" />
                        <span className="text-sm font-bold text-primary">{category.count}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-primary font-medium text-sm">
                      Смотреть товары
                      <Icon name="ArrowRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="fade-on-scroll text-center">
          <Link to="/catalog">
            <Button size="lg" className="gap-2">
              Все товары
              <Icon name="ArrowRight" size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}