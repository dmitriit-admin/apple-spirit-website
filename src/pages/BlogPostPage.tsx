import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const CATALOG_URL = 'https://functions.poehali.dev/b9910e84-f352-424f-acce-99d333033b22';

interface Article {
  id: number;
  title: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category: string;
  read_time: string;
  created_at: string;
}

function formatDate(dt: string) {
  return new Date(dt).toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPostPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setNotFound(false);
    fetch(`${CATALOG_URL}?resource=articles&id=${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.article) {
          setArticle(data.article);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-8">
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="h-8 bg-secondary rounded animate-pulse w-3/4 mb-4" />
            <div className="h-5 bg-secondary rounded animate-pulse w-1/3 mb-8" />
            <div className="aspect-video bg-secondary rounded-2xl animate-pulse mb-8" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-secondary rounded animate-pulse mb-3" style={{ width: `${70 + Math.random() * 30}%` }} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="pt-8">
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <Icon name="FileX" size={64} className="mx-auto mb-6 text-muted-foreground/30" />
            <h1 className="text-3xl font-bold mb-4">Статья не найдена</h1>
            <p className="text-muted-foreground mb-8">Возможно, она была удалена или ещё не опубликована.</p>
            <Link to="/blog">
              <Button>
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Вернуться в блог
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-8">
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <Icon name="ArrowLeft" size={16} />
            Назад в блог
          </Link>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Icon name="Calendar" size={14} />
              {formatDate(article.created_at)}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              {article.read_time}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{article.title}</h1>

          {article.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 border-l-4 border-primary pl-6">
              {article.excerpt}
            </p>
          )}

          {article.image_url && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-10 shadow-lg">
              <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}

          {article.content ? (
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          ) : (
            <p className="text-muted-foreground">Содержимое статьи не добавлено.</p>
          )}

          <div className="mt-12 pt-8 border-t border-border">
            <Link to="/blog">
              <Button variant="outline">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Все статьи
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}