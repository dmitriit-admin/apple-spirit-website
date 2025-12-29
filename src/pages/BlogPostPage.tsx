import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function BlogPostPage() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const blogPosts: Record<string, any> = {
    '1': {
      id: 1,
      title: 'Как выбрать нитки для швейной машины',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg',
      date: '15 декабря 2024',
      category: 'Советы',
      readTime: '5 мин',
      content: `
        <p>Выбор правильных ниток для швейной машины — ключевой фактор для получения качественного результата. В этой статье мы подробно разберем все аспекты выбора ниток.</p>

        <h2>Материалы ниток</h2>
        <p>Существует несколько основных типов ниток:</p>
        <ul>
          <li><strong>Полиэстер</strong> — универсальные нитки, подходят для большинства тканей. Прочные, эластичные, устойчивы к выцветанию.</li>
          <li><strong>Хлопок</strong> — натуральные нитки, идеальны для хлопковых тканей. Менее прочные, чем полиэстер.</li>
          <li><strong>Нейлон</strong> — очень прочные, используются для тяжелых тканей и декоративных строчек.</li>
          <li><strong>Шелк</strong> — тонкие и прочные, для деликатных тканей и невидимых швов.</li>
        </ul>

        <h2>Толщина ниток</h2>
        <p>Толщина обозначается номером: чем больше номер, тем тоньше нить. Самые распространенные:</p>
        <ul>
          <li><strong>№40</strong> — универсальная толщина для большинства тканей</li>
          <li><strong>№50</strong> — для тонких тканей (шелк, батист)</li>
          <li><strong>№30</strong> — для плотных тканей (джинса, пальтовые)</li>
        </ul>

        <h2>Подбор по цвету</h2>
        <p>Для незаметных швов выбирайте нитки на тон темнее ткани. Для декоративных строчек можно использовать контрастные цвета.</p>

        <h2>Совместимость с машиной</h2>
        <p>Убедитесь, что выбранные нитки подходят для вашей швейной машины. Слишком толстые нитки могут вызвать обрыв или застревание.</p>

        <h2>Рекомендации</h2>
        <p>Для начинающих рекомендуем полиэстеровые нитки №40 — это оптимальный выбор для большинства проектов.</p>
      `,
    },
    '2': {
      id: 2,
      title: 'Тренды швейной фурнитуры 2025',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg',
      date: '10 декабря 2024',
      category: 'Тренды',
      readTime: '7 мин',
      content: `
        <p>2025 год обещает быть интересным для мира швейной фурнитуры. Разберем главные тренды сезона.</p>

        <h2>1. Экологичность</h2>
        <p>Натуральные материалы выходят на первый план. Деревянные и перламутровые пуговицы, биоразлагаемые молнии набирают популярность.</p>

        <h2>2. Крупные акценты</h2>
        <p>Большие декоративные пуговицы и застежки становятся элементом дизайна, а не просто функциональной деталью.</p>

        <h2>3. Металлик и золото</h2>
        <p>Золотая и бронзовая фурнитура в тренде. Молнии с металлическими зубцами, золотые пуговицы — must-have сезона.</p>

        <h2>4. Минимализм</h2>
        <p>Простые формы, нейтральные цвета. Незаметная фурнитура в тон ткани — признак стиля.</p>

        <h2>5. Винтаж</h2>
        <p>Возврат к классике: перламутровые пуговицы, винтажные молнии в стиле 60-х годов.</p>

        <h2>Цветовая палитра</h2>
        <ul>
          <li>Бежевый и кремовый</li>
          <li>Глубокий зеленый</li>
          <li>Терракотовый</li>
          <li>Металлические оттенки</li>
        </ul>
      `,
    },
    '3': {
      id: 3,
      title: 'Уход за швейной фурнитурой',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg',
      date: '5 декабря 2024',
      category: 'Уход',
      readTime: '4 мин',
      content: `
        <p>Правильное хранение и уход за швейной фурнитурой продлевает срок её службы и сохраняет качество.</p>

        <h2>Хранение ниток</h2>
        <ul>
          <li>Храните вдали от прямых солнечных лучей</li>
          <li>Избегайте влажности</li>
          <li>Используйте органайзеры для удобства</li>
          <li>Не допускайте попадания пыли</li>
        </ul>

        <h2>Уход за молниями</h2>
        <p>Металлические молнии периодически смазывайте воском или парафином. Пластиковые молнии чистите мягкой щеткой.</p>

        <h2>Хранение пуговиц</h2>
        <p>Сортируйте по размеру и цвету в прозрачных контейнерах. Перламутровые пуговицы храните отдельно от металлических.</p>

        <h2>Металлическая фурнитура</h2>
        <p>Протирайте сухой тканью, избегайте контакта с водой. При потемнении используйте специальные средства для чистки металла.</p>

        <h2>Общие правила</h2>
        <ul>
          <li>Температура хранения: 15-25°C</li>
          <li>Влажность: не более 60%</li>
          <li>Регулярная ревизия запасов</li>
        </ul>
      `,
    },
    '4': {
      id: 4,
      title: 'Виды молний и их применение',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg',
      date: '28 ноября 2024',
      category: 'Обзоры',
      readTime: '6 мин',
      content: `
        <p>Молнии — незаменимая часть швейной фурнитуры. Разберемся в типах и их применении.</p>

        <h2>1. Спиральные молнии</h2>
        <p><strong>Применение:</strong> куртки, сумки, одежда.<br>
        <strong>Плюсы:</strong> гибкие, легкие, недорогие.<br>
        <strong>Минусы:</strong> менее прочные чем металлические.</p>

        <h2>2. Металлические молнии</h2>
        <p><strong>Применение:</strong> джинсы, кожаные изделия, тяжелая одежда.<br>
        <strong>Плюсы:</strong> очень прочные, долговечные, стильный вид.<br>
        <strong>Минусы:</strong> тяжелые, дороже других типов.</p>

        <h2>3. Тракторные молнии</h2>
        <p><strong>Применение:</strong> верхняя одежда, спортивная одежда, рюкзаки.<br>
        <strong>Плюсы:</strong> очень прочные, крупные зубцы.<br>
        <strong>Минусы:</strong> грубоватый вид.</p>

        <h2>4. Потайные молнии</h2>
        <p><strong>Применение:</strong> платья, юбки, брюки.<br>
        <strong>Плюсы:</strong> незаметны в готовом изделии.<br>
        <strong>Минусы:</strong> требуют специальной лапки для установки.</p>

        <h2>5. Разъемные молнии</h2>
        <p><strong>Применение:</strong> куртки, кардиганы.<br>
        <strong>Плюсы:</strong> полностью расстегиваются.<br>
        <strong>Минусы:</strong> сложнее в установке.</p>

        <h2>Как выбрать</h2>
        <ul>
          <li>Для легких тканей — спиральные</li>
          <li>Для джинсы — металлические</li>
          <li>Для верхней одежды — тракторные</li>
          <li>Для платьев — потайные</li>
        </ul>
      `,
    },
    '5': {
      id: 5,
      title: 'Как подобрать пуговицы к одежде',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg',
      date: '20 ноября 2024',
      category: 'Советы',
      readTime: '5 мин',
      content: `
        <p>Пуговицы — завершающий штрих любого швейного проекта. Правильный выбор создает гармоничный образ.</p>

        <h2>Размер пуговиц</h2>
        <ul>
          <li><strong>10-15мм</strong> — для блузок и рубашек</li>
          <li><strong>18-20мм</strong> — для жакетов и пальто</li>
          <li><strong>25-30мм</strong> — для крупных изделий</li>
        </ul>

        <h2>Материалы</h2>
        <p><strong>Пластик</strong> — универсальный, недорогой, широкий выбор цветов.<br>
        <strong>Дерево</strong> — для эко-стиля и кэжуал одежды.<br>
        <strong>Металл</strong> — для джинсовых изделий и верхней одежды.<br>
        <strong>Перламутр</strong> — для деловой и вечерней одежды.</p>

        <h2>Цвет</h2>
        <ul>
          <li>В тон ткани — классический вариант</li>
          <li>На тон темнее — элегантный выбор</li>
          <li>Контрастные — для акцента</li>
          <li>Металлические — универсальны</li>
        </ul>

        <h2>Стиль</h2>
        <p><strong>Классика:</strong> гладкие круглые пуговицы.<br>
        <strong>Кэжуал:</strong> джинсовые кнопки, деревянные пуговицы.<br>
        <strong>Вечерний:</strong> перламутровые, со стразами.<br>
        <strong>Винтаж:</strong> резные, с узором.</p>

        <h2>Советы</h2>
        <ul>
          <li>Всегда покупайте пуговицы с запасом</li>
          <li>Примеряйте пуговицу к ткани перед покупкой</li>
          <li>Учитывайте вес пуговицы для легких тканей</li>
        </ul>
      `,
    },
    '6': {
      id: 6,
      title: 'Работа с металлической фурнитурой',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg',
      date: '15 ноября 2024',
      category: 'Мастер-классы',
      readTime: '8 мин',
      content: `
        <p>Металлическая фурнитура добавляет изделию прочность и стиль. Научимся правильно с ней работать.</p>

        <h2>Люверсы</h2>
        <p><strong>Инструменты:</strong> установщик люверсов, молоток, подложка.<br>
        <strong>Шаги:</strong></p>
        <ol>
          <li>Разметьте место установки</li>
          <li>Пробейте отверстие нужного диаметра</li>
          <li>Вставьте люверс с лицевой стороны</li>
          <li>Установите шайбу с изнанки</li>
          <li>Зафиксируйте установщиком</li>
        </ol>

        <h2>Заклепки</h2>
        <p><strong>Инструменты:</strong> щипцы для заклепок или пресс.<br>
        <strong>Применение:</strong> джинсовые изделия, сумки, ремни.</p>

        <h2>Пряжки</h2>
        <p>Выбирайте пряжки по ширине ремня. Закрепляйте тройной строчкой для прочности.</p>

        <h2>Кольца и карабины</h2>
        <p>Используйте для ручек сумок, ремней. Закрепляйте надежными швами или заклепками.</p>

        <h2>Безопасность</h2>
        <ul>
          <li>Используйте защитные очки</li>
          <li>Работайте на прочной поверхности</li>
          <li>Не торопитесь — металл не прощает ошибок</li>
        </ul>

        <h2>Уход за инструментами</h2>
        <p>Храните в сухом месте, периодически смазывайте подвижные части.</p>
      `,
    },
  };

  const post = blogPosts[id || '1'];
  const relatedPosts = Object.values(blogPosts)
    .filter((p: any) => p.id !== post?.id)
    .slice(0, 3);

  if (!post) {
    return (
      <div className="pt-8 py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Статья не найдена</h1>
          <Link to="/blog">
            <Button>Вернуться к блогу</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8">
      <article className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
              <Icon name="ArrowLeft" size={18} />
              Вернуться к блогу
            </Link>

            <div className="mb-8">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                {post.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden mb-12">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div 
              className="prose prose-lg max-w-none mb-16"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.75',
              }}
            />

            <Card className="bg-secondary/30 border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageCircle" size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Остались вопросы?</h3>
                    <p className="text-muted-foreground mb-4">
                      Наши специалисты помогут выбрать подходящую фурнитуру для вашего проекта
                    </p>
                    <Link to="/contacts">
                      <Button>Связаться с нами</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </article>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Читайте также</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: any) => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-secondary overflow-hidden">
                        <img 
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-2">
                          {relatedPost.category}
                        </div>
                        <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon name="Clock" size={12} />
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
