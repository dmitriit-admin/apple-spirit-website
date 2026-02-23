import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface AdminLoginProps {
  adminKey: string;
  loading: boolean;
  onAdminKeyChange: (val: string) => void;
  onLogin: () => void;
  onClear: () => void;
}

export default function AdminLogin({ adminKey, loading, onAdminKeyChange, onLogin, onClear }: AdminLoginProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="ShieldCheck" size={22} className="text-primary" />
            Вход в админ-панель
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Пароль администратора</Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="password"
                value={adminKey}
                onChange={e => onAdminKeyChange(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onLogin()}
                placeholder="Введите пароль"
              />
              {adminKey && (
                <Button variant="ghost" size="icon" onClick={onClear} title="Очистить">
                  <Icon name="X" size={16} />
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Пароль задан в настройках проекта (секрет ADMIN_SECRET_KEY)</p>
          </div>
          <Button className="w-full" onClick={onLogin} disabled={loading}>
            {loading ? 'Проверяю...' : 'Войти'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
