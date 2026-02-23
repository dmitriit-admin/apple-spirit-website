import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useContacts } from '@/hooks/useContacts';

function toPhone(s: string) { return 'tel:' + s.replace(/\D/g, '').replace(/^7/, '+7'); }

export default function ContactsSection() {
  const { contacts: c } = useContacts();

  const hours = [c.hours_weekdays, c.hours_saturday, c.hours_sunday].filter(Boolean);

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
                        <div className="pb-1">
                          <a href={toPhone(c.phone_main)} className="text-primary hover:text-primary/80 transition-colors font-bold text-lg">
                            {c.phone_main}
                          </a>
                          {c.phone_main_note && <span className="block text-xs text-muted-foreground mt-1">{c.phone_main_note}</span>}
                        </div>
                        {c.phone_2 && <div><a href={toPhone(c.phone_2)} className="text-foreground hover:text-primary transition-colors font-medium">{c.phone_2}</a></div>}
                        {c.phone_3 && <div><a href={toPhone(c.phone_3)} className="text-foreground hover:text-primary transition-colors font-medium">{c.phone_3}</a></div>}
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
                        {[c.email_main, c.email_2, c.email_3].filter(Boolean).map(email => (
                          <div key={email}><a href={`mailto:${email}`} className="text-foreground hover:text-primary transition-colors">{email}</a></div>
                        ))}
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
                        {c.vk_url && (
                          <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white transition-all hover:scale-110" asChild>
                            <a href={c.vk_url} target="_blank" rel="noopener noreferrer">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.18 14.53h-1.28c-.54 0-.71-.43-1.69-1.43-.85-.83-1.23-.94-1.44-.94-.3 0-.38.08-.38.46v1.3c0 .35-.11.56-1.03.56-1.52 0-3.2-.92-4.38-2.64-1.78-2.42-2.27-4.24-2.27-4.61 0-.21.08-.41.46-.41h1.28c.34 0 .47.16.6.53.65 1.78 1.74 3.33 2.19 3.33.17 0 .24-.08.24-.5v-1.93c-.06-.97-.57-1.05-.57-1.39 0-.17.14-.33.36-.33h2.01c.28 0 .39.16.39.5v2.61c0 .28.13.39.21.39.17 0 .31-.11.62-.42 1.02-1.14 1.74-2.9 1.74-2.9.09-.21.26-.41.6-.41h1.28c.4 0 .49.21.4.5-.17.78-1.86 3.28-1.86 3.28-.14.23-.19.33 0 .59.14.19.6.59 1.21 1.27.49.55 1.06 1.16 1.18 1.53.07.39-.19.59-.59.59z"/></svg>
                            </a>
                          </Button>
                        )}
                        {c.telegram_url && (
                          <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white transition-all hover:scale-110" asChild>
                            <a href={c.telegram_url} target="_blank" rel="noopener noreferrer">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                            </a>
                          </Button>
                        )}
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
                      <p className="text-foreground leading-relaxed mb-3">{c.address}</p>
                      {c.address_note && <p className="text-sm text-muted-foreground">{c.address_note}</p>}
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
                        {hours.map((line, i) => {
                          const parts = line.split(':');
                          const label = parts[0].trim();
                          const time = parts.slice(1).join(':').trim();
                          return (
                            <div key={i} className="flex justify-between items-center">
                              <span className="text-muted-foreground">{label}</span>
                              <span className="font-medium">{time || line}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="MessageSquare" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3">Написать нам</h3>
                      <div className="space-y-2">
                        <a href={`mailto:${c.email_main}`} className="block text-foreground hover:text-primary transition-colors text-sm">{c.email_main}</a>
                        {c.telegram_url && (
                          <a href={c.telegram_url} target="_blank" rel="noopener noreferrer" className="block text-foreground hover:text-primary transition-colors text-sm">Telegram</a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
