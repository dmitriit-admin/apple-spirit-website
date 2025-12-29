import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';
import AccountModal from '@/components/AccountModal';

export default function Header() {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <>
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
              <button 
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setIsAccountOpen(true)}
              >
                <Icon name="User" size={22} />
              </button>
              <button 
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Icon name="Search" size={22} />
              </button>
              <button 
                className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <Icon name="ShoppingCart" size={22} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </button>
            </div>
            <button className="md:hidden">
              <Icon name="Menu" size={24} />
            </button>
          </div>
        </nav>
      </header>

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <AccountModal open={isAccountOpen} onOpenChange={setIsAccountOpen} />
    </>
  );
}