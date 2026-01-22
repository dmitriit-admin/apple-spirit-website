import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function PromotionsSection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-primary/10 to-secondary/30">
      <div className="container mx-auto px-6">
        <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Акции и спецпредложения</h2>
          <p className="text-lg text-muted-foreground">Выгодные предложения на популярные товары</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="fade-on-scroll overflow-hidden border-2 border-primary/20">
            <CardContent className="p-0">
              <div className="bg-primary text-white px-6 py-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold">СКИДКА</span>
                  <span className="text-3xl font-bold">-30%</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Зимняя распродажа</h3>
                <p className="text-muted-foreground mb-4">
                  Скидки до 30% на весь ассортимент молний и застежек. Успейте купить по выгодной цене!
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Icon name="Clock" size={16} />
                  <span>До 31 января 2025</span>
                </div>
                <Link to="/catalog">
                  <Button className="w-full">Смотреть товары</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="fade-on-scroll overflow-hidden border-2 border-primary/20" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold">ПОДАРОК</span>
                  <Icon name="Gift" size={28} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Подарок при заказе</h3>
                <p className="text-muted-foreground mb-4">
                  При заказе от 3000 ₽ — набор ниток в подарок! Разные цвета и высокое качество.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Icon name="Star" size={16} />
                  <span>Для всех клиентов</span>
                </div>
                <Link to="/catalog">
                  <Button className="w-full">Оформить заказ</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
