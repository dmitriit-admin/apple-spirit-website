import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import NotifyModal from '@/components/NotifyModal';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  inStock?: boolean;
  sku?: string | null;
  description?: string | null;
  specifications?: Record<string, string> | null;
}

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const specs = product.specifications && typeof product.specifications === 'object'
    ? Object.entries(product.specifications).filter(([k]) => k)
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
          <DialogDescription asChild>
            <div className="flex items-center gap-2 mt-2">
              {product.category && (
                <Badge variant="secondary">{product.category}</Badge>
              )}
              {product.sku && (
                <span className="text-xs text-muted-foreground font-mono">Арт: {product.sku}</span>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <div className="text-4xl font-bold text-primary mb-4">{product.price}</div>

              {product.description ? (
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              ) : (
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Высокое качество материалов</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Сертифицированная продукция</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Быстрая доставка по России</span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border pt-6 mt-auto">
              <div className="space-y-2 mb-6">
                {product.sku && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Артикул:</span>
                    <span className="font-medium font-mono">{product.sku}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Наличие:</span>
                  {product.inStock === false ? (
                    <span className="font-medium text-orange-600 flex items-center gap-1">
                      <Icon name="AlertCircle" size={16} />
                      Нет в наличии
                    </span>
                  ) : (
                    <span className="font-medium text-green-600 flex items-center gap-1">
                      <Icon name="Check" size={16} />
                      В наличии
                    </span>
                  )}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка:</span>
                  <span className="font-medium">1-2 дня</span>
                </div>
              </div>

              <div className="flex gap-3">
                {product.inStock === false ? (
                  <Button
                    className="flex-1 h-12"
                    size="lg"
                    variant="outline"
                    onClick={() => setIsNotifyModalOpen(true)}
                  >
                    <Icon name="Bell" className="mr-2" size={20} />
                    Узнать о поступлении
                  </Button>
                ) : (
                  <Button
                    className="flex-1 h-12"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={added}
                  >
                    {added ? (
                      <>
                        <Icon name="Check" className="mr-2" size={20} />
                        Добавлено
                      </>
                    ) : (
                      <>
                        <Icon name="ShoppingCart" className="mr-2" size={20} />
                        В корзину
                      </>
                    )}
                  </Button>
                )}
                <Button variant="outline" size="lg" className="h-12 w-12 p-0">
                  <Icon name="Heart" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {specs.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="font-semibold mb-3">Характеристики</h3>
            <div className="divide-y divide-border rounded-lg border overflow-hidden">
              {specs.map(([key, value], i) => (
                <div key={i} className="flex text-sm">
                  <span className="w-1/2 px-4 py-2.5 bg-secondary/50 text-muted-foreground">{key}</span>
                  <span className="w-1/2 px-4 py-2.5 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-primary/5 rounded-lg flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">Бесплатная доставка</p>
            <p className="text-muted-foreground">При заказе от 5000 ₽ доставка по Москве бесплатная</p>
          </div>
        </div>
      </DialogContent>
      <NotifyModal
        open={isNotifyModalOpen}
        onOpenChange={setIsNotifyModalOpen}
        productName={product.name}
      />
    </Dialog>
  );
}
