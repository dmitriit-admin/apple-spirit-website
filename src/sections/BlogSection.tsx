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

const FALLBACK_ARTICLES: Article[] = [
  { id: 1, slug: '1', title: 'Как выбрать нитки для швейной машины', excerpt: 'Подробное руководство по выбору ниток: материалы, толщина, цвет и совместимость.', image_url: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg', category: 'Советы', read_time: '5 мин', created_at: '2024-12-15' },
  { id: 2, slug: '2', title: 'Тренды швейной фурнитуры 2025', excerpt: 'Какие пуговицы, молнии и аксессуары будут популярны в новом сезоне.', image_url: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg', category: 'Тренды', read_time: '7 мин', created_at: '2024-12-10' },
  { id: 3, slug: '3', title: 'Уход за швейной фурнитурой', excerpt: 'Правила хранения и ухода за молниями, пуговицами и другими материалами.', image_url: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg', category: 'Уход', read_time: '4 мин', created_at: '2024-12-05' },
];

function formatDate(dt: string) {
  return new Date(dt).toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${CATALOG_URL}?resource=articles`)
      .then(r => r.json())
      .then(data => {
        setArticles(data.articles?.length ? data.articles.slice(0, 3) : FALLBACK_ARTICLES);
        setLoaded(true);
      })
      .catch(() => { setArticles(FALLBACK_ARTICLES); setLoaded(true); });
  }, []);

  const list = loaded ? articles : [];

  return (
    <section id="blog" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Блог</h2>
          <p className="text-lg text-muted-foreground">Полезные статьи о шитье и выборе материалов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {!loaded && Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-secondary animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-secondary rounded animate-pulse w-1/2" />
                  <div className="h-5 bg-secondary rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-secondary rounded animate-pulse w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
          {list.map((article, idx) => (
            <Link key={article.id} to={`/blog/${article.id}`}>
              <Card className="fade-on-scroll group hover:shadow-xl transition-all duration-300 cursor-pointer h-full" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardContent className="p-0">
                  <div className="aspect-video bg-secondary overflow-hidden">
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="FileText" size={48} className="text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Icon name="Calendar" size={16} />
                      <span>{formatDate(article.created_at)}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                    {article.excerpt && (
                      <p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                    )}
                    <span className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                      Читать далее
                      <Icon name="ArrowRight" size={16} />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
