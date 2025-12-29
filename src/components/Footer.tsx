import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-secondary/50 py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold tracking-tight">ШвейПро</div>
          <p className="text-sm text-muted-foreground">© 2024 ШвейПро. Все права защищены.</p>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon">
              <Icon name="Instagram" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Facebook" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Mail" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
