import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const CATALOG_URL = 'https://functions.poehali.dev/b9910e84-f352-424f-acce-99d333033b22';

interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  category: string;
  read_time: string;
  created_at: string;
}

function formatDate(dt: string) {
  return new Date(dt).toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPage() {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Все');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${CATALOG_URL}?resource=articles`)
      .then(r => r.json())
      .then(data => {
        setAllArticles(data.articles || []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const categories = ['Все', ...Array.from(new Set(allArticles.map(a => a.category)))];
  const filtered = activeCategory === 'Все' ? allArticles : allArticles.filter(a => a.category === activeCategory);

  return (
    <div className="pt-8">
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Блог</h1>
            <p className="text-lg text-muted-foreground">
              Полезные статьи о шитье, выборе материалов и работе с фурнитурой
            </p>
          </div>

          {loaded && categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all font-medium text-sm ${
                    activeCategory === cat
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {!loaded && Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-secondary animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-secondary rounded animate-pulse w-1/2" />
                    <div className="h-5 bg-secondary rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-secondary rounded animate-pulse" />
                    <div className="h-4 bg-secondary rounded animate-pulse w-5/6" />
                  </div>
                </CardContent>
              </Card>
            ))}

            {loaded && filtered.length === 0 && (
              <div className="col-span-3 text-center py-16 text-muted-foreground">
                <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-30" />
                <p>Статей пока нет</p>
              </div>
            )}

            {filtered.map((post, idx) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <Card
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="aspect-video bg-secondary overflow-hidden">
                      {post.image_url ? (
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon name="FileText" size={48} className="text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          <span>{post.read_time}</span>
                        </div>
                      </div>
                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                        {post.category}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center text-primary font-medium text-sm">
                        Читать далее
                        <Icon name="ArrowRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="max-w-3xl mx-auto border-2 border-primary/20">
              <CardContent className="p-12">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon name="Mail" size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Подпишитесь на рассылку</h3>
                <p className="text-muted-foreground mb-6">
                  Получайте новые статьи, советы и специальные предложения на почту
                </p>
                <div className="flex gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Ваш email"
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors"
                  />
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Подписаться
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
