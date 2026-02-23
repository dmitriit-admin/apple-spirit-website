import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useContacts } from '@/hooks/useContacts';

export default function Footer() {
  const { contacts: c } = useContacts();

  return (
    <footer className="bg-secondary/50 py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          <div>
            <div className="text-2xl font-bold tracking-tight mb-4">ТК Эксклюзив</div>
            <p className="text-sm text-muted-foreground mb-4">
              Швейная фурнитура высокого качества для профессионалов и любителей
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.18 14.53h-1.28c-.54 0-.71-.43-1.69-1.43-.85-.83-1.23-.94-1.44-.94-.3 0-.38.08-.38.46v1.3c0 .35-.11.56-1.03.56-1.52 0-3.2-.92-4.38-2.64-1.78-2.42-2.27-4.24-2.27-4.61 0-.21.08-.41.46-.41h1.28c.34 0 .47.16.6.53.65 1.78 1.74 3.33 2.19 3.33.17 0 .24-.08.24-.5v-1.93c-.06-.97-.57-1.05-.57-1.39 0-.17.14-.33.36-.33h2.01c.28 0 .39.16.39.5v2.61c0 .28.13.39.21.39.17 0 .31-.11.62-.42 1.02-1.14 1.74-2.9 1.74-2.9.09-.21.26-.41.6-.41h1.28c.4 0 .49.21.4.5-.17.78-1.86 3.28-1.86 3.28-.14.23-.19.33 0 .59.14.19.6.59 1.21 1.27.49.55 1.06 1.16 1.18 1.53.07.39-.19.59-.59.59z"/>
                  </svg>
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Покупателям</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">Блог</Link>
              </li>
              <li>
                <Link to="/delivery" className="hover:text-primary transition-colors">Доставка</Link>
              </li>
              <li>
                <Link to="/delivery" className="hover:text-primary transition-colors">Оплата</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Компания</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">О нас</Link>
              </li>
              <li>
                <Link to="/contacts" className="hover:text-primary transition-colors">Контакты</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={16} />
                <a href={`tel:${c.phone_main.replace(/\D/g,'')}`} className="hover:text-primary transition-colors">{c.phone_main}</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={16} />
                <a href={`mailto:${c.email_main}`} className="hover:text-primary transition-colors">{c.email_main}</a>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="MapPin" size={16} className="mt-0.5" />
                <span>{c.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="bg-secondary/50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4 text-center">Реквизиты компании</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground max-w-4xl mx-auto">
              <div><span className="font-medium">Полное наименование:</span> {c.company_name}</div>
              <div><span className="font-medium">ИНН:</span> {c.inn}</div>
              <div><span className="font-medium">Юридический адрес:</span> {c.legal_address}</div>
              <div><span className="font-medium">КПП:</span> {c.kpp}</div>
              <div><span className="font-medium">Расчётный счёт:</span> {c.bank_account}</div>
              <div><span className="font-medium">ОГРН:</span> {c.ogrn}</div>
              <div><span className="font-medium">Банк:</span> {c.bank_name}</div>
              <div><span className="font-medium">Корр. счёт:</span> {c.bank_corr}</div>
              <div><span className="font-medium">БИК:</span> {c.bank_bik}</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">© 2024 ТК Эксклюзив. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}