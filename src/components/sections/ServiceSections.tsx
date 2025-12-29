import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ServiceSections() {
  return (
    <>
      <section id="delivery" className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Доставка</h2>
            <p className="text-lg text-muted-foreground">Удобные способы получения заказа</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="fade-on-scroll">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon name="Package" size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Бесплатная доставка</h3>
                <p className="text-muted-foreground mb-4">
                  Доставка по Москве в течение 1-2 дней. По России — 3-7 дней.
                </p>
                <div className="text-2xl font-bold text-primary">от 10000 ₽</div>
              </CardContent>
            </Card>

            <Card className="fade-on-scroll" style={{ animationDelay: '100ms' }}>
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon name="MapPin" size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Самовывоз</h3>
                <p className="text-muted-foreground mb-4">
                  Заберите заказ из нашего офиса в Москве в удобное время.
                </p>
                <div className="text-2xl font-bold text-primary">Бесплатно</div>
              </CardContent>
            </Card>
          </div>

          <div className="fade-on-scroll mt-16 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Info" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Бесплатная доставка</h3>
                    <p className="text-muted-foreground">
                      При заказе от 5000 ₽ доставка по Москве бесплатная. При заказе от 10 000 ₽ — 
                      бесплатная доставка по всей России!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="payment" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Оплата</h2>
            <p className="text-lg text-muted-foreground">Безопасные и удобные способы оплаты</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="fade-on-scroll">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon name="CreditCard" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Банковские карты</h3>
                <p className="text-muted-foreground">
                  Visa, MasterCard, МИР. Оплата онлайн на сайте или курьеру при получении.
                </p>
              </CardContent>
            </Card>

            <Card className="fade-on-scroll" style={{ animationDelay: '100ms' }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon name="Wallet" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Наличные</h3>
                <p className="text-muted-foreground">
                  Оплата наличными курьеру при доставке или в офисе при самовывозе.
                </p>
              </CardContent>
            </Card>

            <Card className="fade-on-scroll" style={{ animationDelay: '200ms' }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon name="Building" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Безналичный расчёт</h3>
                <p className="text-muted-foreground">
                  Для юридических лиц. Работаем по договору с отсрочкой платежа.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="fade-on-scroll mt-16 max-w-4xl mx-auto">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="ShieldCheck" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Безопасность платежей</h3>
                    <p className="text-muted-foreground">
                      Все платежи защищены по стандарту PCI DSS. Мы не храним данные банковских карт. 
                      Оплата происходит через защищённое соединение.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
