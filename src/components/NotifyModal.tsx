import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface NotifyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
}

export default function NotifyModal({ open, onOpenChange, productName }: NotifyModalProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/c602eb81-eda7-4bfe-a998-757caf7fae60', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          email,
          phone,
        }),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setEmail('');
          setPhone('');
          onOpenChange(false);
        }, 2000);
      } else {
        console.error('Failed to send notification');
        alert('Ошибка при отправке. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Ошибка при отправке. Проверьте интернет-соединение.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Узнать о поступлении</DialogTitle>
              <DialogDescription>
                Мы сообщим вам, когда <span className="font-semibold">{productName}</span> появится в наличии
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон (необязательно)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Icon name="Bell" size={18} className="mr-2" />
                    Уведомить о поступлении
                  </>
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Готово!</h3>
            <p className="text-muted-foreground">
              Мы отправим уведомление, когда товар появится в наличии
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}