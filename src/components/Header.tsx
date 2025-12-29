import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">ТК Эксклюзив</div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
            <a href="#promo" className="text-sm font-medium hover:text-primary transition-colors">Акции</a>
            <a href="#blog" className="text-sm font-medium hover:text-primary transition-colors">Блог</a>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                Информация
                <Icon name="ChevronDown" size={16} className="transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="#about" className="block px-4 py-3 text-sm hover:bg-secondary/50 transition-colors rounded-t-lg">О нас</a>
                <a href="#delivery" className="block px-4 py-3 text-sm hover:bg-secondary/50 transition-colors">Доставка</a>
                <a href="#payment" className="block px-4 py-3 text-sm hover:bg-secondary/50 transition-colors rounded-b-lg">Оплата</a>
              </div>
            </div>
            <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            <Button size="sm">Связаться</Button>
          </div>
          <button className="md:hidden">
            <Icon name="Menu" size={24} />
          </button>
        </div>
      </nav>
    </header>
  );
}
