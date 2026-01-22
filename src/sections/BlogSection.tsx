import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function BlogSection() {
  const articles = [
    {
      id: 1,
      date: '15 декабря 2024',
      title: 'Как выбрать нитки для швейной машины',
      description: 'Подробное руководство по выбору ниток: материалы, толщина, цвет и совместимость.',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg'
    },
    {
      id: 2,
      date: '10 декабря 2024',
      title: 'Тренды швейной фурнитуры 2025',
      description: 'Какие пуговицы, молнии и аксессуары будут популярны в новом сезоне.',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg'
    },
    {
      id: 3,
      date: '5 декабря 2024',
      title: 'Уход за швейной фурнитурой',
      description: 'Правила хранения и ухода за молниями, пуговицами и другими материалами.',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg'
    }
  ];

  return (
    <section id="blog" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Блог</h2>
          <p className="text-lg text-muted-foreground">Полезные статьи о шитье и выборе материалов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <Card key={article.id} className="fade-on-scroll group hover:shadow-xl transition-all duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
              <CardContent className="p-0">
                <div className="aspect-video bg-secondary overflow-hidden">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Icon name="Calendar" size={16} />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {article.description}
                  </p>
                  <a href="#" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Читать далее
                    <Icon name="ArrowRight" size={16} />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
