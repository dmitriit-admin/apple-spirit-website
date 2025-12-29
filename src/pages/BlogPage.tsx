import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

export default function BlogPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: 'Как выбрать нитки для швейной машины',
      excerpt: 'Подробное руководство по выбору ниток: материалы, толщина, цвет и совместимость с различными тканями.',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg',
      date: '15 декабря 2024',
      category: 'Советы',
      readTime: '5 мин',
    },
    {
      id: 2,
      title: 'Тренды швейной фурнитуры 2025',
      excerpt: 'Какие пуговицы, молнии и аксессуары будут популярны в новом сезоне. Обзор главных трендов.',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg',
      date: '10 декабря 2024',
      category: 'Тренды',
      readTime: '7 мин',
    },
    {
      id: 3,
      title: 'Уход за швейной фурнитурой',
      excerpt: 'Правила хранения и ухода за молниями, пуговицами и другими материалами для продления срока службы.',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg',
      date: '5 декабря 2024',
      category: 'Уход',
      readTime: '4 мин',
    },
    {
      id: 4,
      title: 'Виды молний и их применение',
      excerpt: 'Металлические, спиральные, тракторные — разбираемся в типах молний и для каких изделий они подходят.',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg',
      date: '28 ноября 2024',
      category: 'Обзоры',
      readTime: '6 мин',
    },
    {
      id: 5,
      title: 'Как подобрать пуговицы к одежде',
      excerpt: 'Советы по выбору пуговиц под стиль, цвет и ткань изделия. Создаем гармоничный образ.',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg',
      date: '20 ноября 2024',
      category: 'Советы',
      readTime: '5 мин',
    },
    {
      id: 6,
      title: 'Работа с металлической фурнитурой',
      excerpt: 'Особенности использования люверсов, пряжек и заклепок. Инструменты и техники установки.',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg',
      date: '15 ноября 2024',
      category: 'Мастер-классы',
      readTime: '8 мин',
    },
  ];

  const categories = ['Все', 'Советы', 'Тренды', 'Уход', 'Обзоры', 'Мастер-классы'];

  return (
    <div className="pt-8">
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Блог</h1>
            <p className="text-lg text-muted-foreground">
              Полезные статьи о шитье, выборе материалов и работе с фурнитурой
            </p>
          </div>

          <div className="fade-on-scroll flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-lg border-2 border-border hover:border-primary hover:text-primary transition-all font-medium text-sm"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <Card 
                  className="fade-on-scroll group hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="aspect-video bg-secondary overflow-hidden">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                        {post.category}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        Читать далее
                        <Icon name="ArrowRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="fade-on-scroll mt-16 text-center">
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
                  <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
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