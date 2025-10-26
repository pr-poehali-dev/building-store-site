import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

const Cart = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Перфоратор BOSCH',
      price: 12990,
      quantity: 1,
      image: '/img/30d145b0-6f1e-42fc-b2dd-675a6cd74069.jpg',
      category: 'Инструменты'
    },
    {
      id: 2,
      name: 'Керамическая плитка',
      price: 890,
      quantity: 15,
      image: '/img/30d145b0-6f1e-42fc-b2dd-675a6cd74069.jpg',
      category: 'Отделочные материалы'
    }
  ]);

  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Товар удален",
      description: "Товар успешно удален из корзины",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 500;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    toast({
      title: "Заказ оформлен!",
      description: "Спасибо за покупку. Мы свяжемся с вами для подтверждения.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <Header currentPage="cart" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-2">Корзина</h2>
          <p className="text-lg text-gray-600">
            {cartItems.length > 0 ? `${cartItems.length} товаров в корзине` : 'Ваша корзина пуста'}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Icon name="ShoppingCart" size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">Корзина пуста</h3>
              <p className="text-gray-600 mb-6">Добавьте товары из каталога</p>
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <a href="/catalog">Перейти в каталог</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm text-gray-500">{item.category}</p>
                            <h3 className="text-lg font-heading font-semibold text-gray-900">
                              {item.name}
                            </h3>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              {(item.price * item.quantity).toLocaleString('ru-RU')}₽
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.price.toLocaleString('ru-RU')}₽ за шт.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Итого</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Товары ({cartItems.length})</span>
                        <span>{subtotal.toLocaleString('ru-RU')}₽</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Доставка</span>
                        <span>{deliveryFee.toLocaleString('ru-RU')}₽</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Всего</span>
                        <span className="text-primary">{total.toLocaleString('ru-RU')}₽</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Промокод
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Введите код"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline">
                        Применить
                      </Button>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    <Icon name="CreditCard" size={18} className="mr-2" />
                    Оформить заказ
                  </Button>

                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon name="Check" size={16} className="text-green-500" />
                      <span>Бесплатный возврат в течение 14 дней</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon name="Check" size={16} className="text-green-500" />
                      <span>Гарантия на все товары</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon name="Check" size={16} className="text-green-500" />
                      <span>Доставка в день заказа</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;