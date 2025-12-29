import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  return (
    <section id="contacts" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="fade-on-scroll text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Контакты</h2>
            <p className="text-lg text-muted-foreground">Мы всегда на связи и готовы помочь</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="fade-on-scroll space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3">Телефоны</h3>
                      <div className="space-y-2">
                        <div>
                          <a href="tel:+79261081492" className="text-foreground hover:text-primary transition-colors font-medium">
                            8 (926) 108-14-92
                          </a>
                        </div>
                        <div>
                          <a href="tel:+79264309208" className="text-foreground hover:text-primary transition-colors font-medium">
                            8 (926) 430-92-08
                          </a>
                        </div>
                        <div className="pt-1">
                          <a href="tel:+78005007527" className="text-primary hover:text-primary/80 transition-colors font-bold text-lg">
                            8 (800) 500-75-27
                          </a>
                          <span className="block text-xs text-muted-foreground mt-1">Бесплатный звонок по России</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3">Email</h3>
                      <div className="space-y-2">
                        <div>
                          <a href="mailto:info@tkexclusiv.ru" className="text-foreground hover:text-primary transition-colors">
                            info@tkexclusiv.ru
                          </a>
                        </div>
                        <div>
                          <a href="mailto:ya.exc03@yandex.ru" className="text-foreground hover:text-primary transition-colors">
                            ya.exc03@yandex.ru
                          </a>
                        </div>
                        <div>
                          <a href="mailto:ya.exc08@yandex.ru" className="text-foreground hover:text-primary transition-colors">
                            ya.exc08@yandex.ru
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Share2" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3">Социальные сети</h3>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-primary hover:text-white transition-all hover:scale-110"
                          asChild
                        >
                          <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.18 14.53h-1.28c-.54 0-.71-.43-1.69-1.43-.85-.83-1.23-.94-1.44-.94-.3 0-.38.08-.38.46v1.3c0 .35-.11.56-1.03.56-1.52 0-3.2-.92-4.38-2.64-1.78-2.42-2.27-4.24-2.27-4.61 0-.21.08-.41.46-.41h1.28c.34 0 .47.16.6.53.65 1.78 1.74 3.33 2.19 3.33.17 0 .24-.08.24-.5v-1.93c-.06-.97-.57-1.05-.57-1.39 0-.17.14-.33.36-.33h2.01c.28 0 .39.16.39.5v2.61c0 .28.13.39.21.39.17 0 .31-.11.62-.42 1.02-1.14 1.74-2.9 1.74-2.9.09-.21.26-.41.6-.41h1.28c.4 0 .49.21.4.5-.17.78-1.86 3.28-1.86 3.28-.14.23-.19.33 0 .59.14.19.6.59 1.21 1.27.49.55 1.06 1.16 1.18 1.53.07.39-.19.59-.59.59z"/>
                            </svg>
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-primary hover:text-white transition-all hover:scale-110"
                          asChild
                        >
                          <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                            </svg>
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-primary hover:text-white transition-all hover:scale-110"
                          asChild
                        >
                          <a href="https://my.mail.ru" target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zm0 13c-2.03 0-3.84-1.02-4.91-2.58.03-1.62 3.27-2.51 4.91-2.51s4.88.89 4.91 2.51C15.84 17.48 14.03 18.5 12 18.5z"/>
                            </svg>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="fade-on-scroll space-y-6" style={{ animationDelay: '100ms' }}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3">Адрес</h3>
                      <p className="text-foreground leading-relaxed mb-3">
                        г. Москва, ул. Докукина, д. 8, стр. 3
                      </p>
                      <p className="text-sm text-muted-foreground">
                        5 минут пешком от метро «Бауманская»
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3">График работы</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Понедельник - Пятница</span>
                          <span className="font-medium">9:00 - 18:00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Суббота</span>
                          <span className="font-medium">10:00 - 16:00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Воскресенье</span>
                          <span className="font-medium text-destructive">Выходной</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                          Приём заказов онлайн — круглосуточно
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Headphones" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Поддержка клиентов</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Ответим на ваши вопросы в течение 15 минут в рабочее время
                      </p>
                      <Button className="w-full">
                        <Icon name="MessageCircle" size={16} className="mr-2" />
                        Задать вопрос
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="fade-on-scroll mt-8">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[16/9] w-full">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=37.680744%2C55.771899&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NzA2ODU0MhJE0KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINGD0LvQuNGG0LAg0JTQvtC60YPQutC40L3QsCwgOCDRgdGC0YDQvtC10L3QuNC1IDMiCg1L6V9CFfvDXEI%2C&z=17"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ТК Эксклюзив - г. Москва, ул. Докукина, д. 8, стр. 3"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 bg-secondary/30 border-t">
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                    <Button 
                      variant="default" 
                      className="w-full sm:w-auto"
                      asChild
                    >
                      <a 
                        href="https://yandex.ru/maps/?rtext=~55.771899,37.680744" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Icon name="Navigation" size={18} className="mr-2" />
                        Построить маршрут
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto"
                      asChild
                    >
                      <a 
                        href="https://yandex.ru/maps/213/moscow/?ll=37.680744%2C55.771899&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NzA2ODU0MhJE0KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINGD0LvQuNGG0LAg0JTQvtC60YPQutC40L3QsCwgOCDRgdGC0YDQvtC10L3QuNC1IDMiCg1L6V9CFfvDXEI%2C&z=17" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Icon name="ExternalLink" size={18} className="mr-2" />
                        Открыть в Яндекс.Картах
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
