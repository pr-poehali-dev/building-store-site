import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [aiQuery, setAiQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([]);

  const handleAiSubmit = () => {
    if (!aiQuery.trim()) return;
    
    setChatMessages(prev => [...prev, 
      {role: 'user', content: aiQuery},
      {role: 'assistant', content: 'Для ремонта ванной комнаты рекомендую: керамическую плитку 30x60 см (15 м²), водостойкий клей для плитки (5 кг), силиконовый герметик, затирку для швов. Примерная стоимость: 25,000₽'}
    ]);
    setAiQuery('');
  };

  const products = [
    {
      name: 'Перфоратор BOSCH',
      price: '12,990₽',
      oldPrice: '15,990₽',
      image: '/img/30d145b0-6f1e-42fc-b2dd-675a6cd74069.jpg',
      category: 'Инструменты',
      rating: 4.8
    },
    {
      name: 'Керамическая плитка',
      price: '890₽/м²',
      oldPrice: '1,200₽/м²',
      image: '/img/30d145b0-6f1e-42fc-b2dd-675a6cd74069.jpg',
      category: 'Отделочные материалы',
      rating: 4.6
    },
    {
      name: 'Краска водоэмульсионная',
      price: '2,490₽',
      oldPrice: '2,990₽',
      image: '/img/30d145b0-6f1e-42fc-b2dd-675a6cd74069.jpg',
      category: 'Краски и лаки',
      rating: 4.7
    }
  ];

  const services = [
    {
      title: 'Доставка материалов',
      description: 'Быстрая доставка по городу в день заказа',
      icon: 'Truck',
      price: 'от 500₽'
    },
    {
      title: 'Консультация специалиста',
      description: 'Помощь в выборе материалов и расчёте количества',
      icon: 'Users',
      price: 'Бесплатно'
    },
    {
      title: 'Подбор комплектов',
      description: 'Готовые решения для различных видов ремонта',
      icon: 'Package',
      price: 'от 1,000₽'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Hammer" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-gray-900">СтройМаркет</h1>
                <p className="text-sm text-gray-600">Всё для строительства и ремонта</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/catalog" className="text-gray-700 hover:text-primary transition-colors">Каталог</a>
              <a href="/services" className="text-gray-700 hover:text-primary transition-colors">Услуги</a>
              <a href="/promotions" className="text-gray-700 hover:text-primary transition-colors">Акции</a>
              <a href="/contacts" className="text-gray-700 hover:text-primary transition-colors">Контакты</a>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <a href="/auth">
                  <Icon name="User" size={18} className="mr-2" />
                  Войти
                </a>
              </Button>
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <a href="/cart">
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Корзина
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with AI Assistant */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl font-heading font-bold text-gray-900 mb-6">
                Умный подбор <span className="text-primary">строительных материалов</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Опишите что хотите отремонтировать, и наш ИИ-помощник подберёт всё необходимое с расчётом количества и стоимости
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Попробовать ИИ-помощника
                </Button>
                <Button size="lg" variant="outline"></Button>
              </div>
            </div>
            
            {/* AI Chat Interface */}
            <Card className="w-full animate-scale-in">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <img src="/img/256ef33f-cca1-4ab9-b593-f54cd39c8e41.jpg" alt="AI Assistant" className="w-8 h-8 rounded-full" />
                  </div>
                  <div>
                    <CardTitle className="font-heading">ИИ-Консультант</CardTitle>
                    <CardDescription>Помогу подобрать материалы для ремонта</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-48 overflow-y-auto border rounded-lg p-4 space-y-3">
                  {chatMessages.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      <Icon name="MessageCircle" size={48} className="mx-auto mb-2 text-gray-300" />
                      <p>Опишите что хотите отремонтировать</p>
                    </div>
                  )}
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-3 rounded-lg ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Например: хочу отремонтировать ванную комнату 3x2 метра..."
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    className="flex-1"
                    rows={2}
                  />
                  <Button onClick={handleAiSubmit} className="bg-secondary hover:bg-secondary/90">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-heading font-bold text-gray-900 mb-4">Популярные товары</h3>
            <p className="text-lg text-gray-600">Лучшие предложения с максимальными скидками</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <Card key={idx} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                    Скидка
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-2">{product.category}</Badge>
                  <h4 className="font-heading font-semibold text-lg mb-2">{product.name}</h4>
                  <div className="flex items-center mb-2">
                    <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{product.oldPrice}</span>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-heading font-bold text-gray-900 mb-4">Наши услуги</h3>
            <p className="text-lg text-gray-600">Полный комплекс услуг для вашего удобства</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={service.icon as any} size={32} className="text-primary" />
                  </div>
                  <h4 className="font-heading font-semibold text-xl mb-2">{service.title}</h4>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Badge variant="outline" className="text-primary border-primary">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-heading font-bold mb-4">🔥 Акция недели!</h3>
            <p className="text-xl mb-6">Скидка 25% на все электроинструменты при покупке от 10,000₽</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                <a href="/promotions" className="flex items-center">
                  <Icon name="Zap" size={20} className="mr-2" />
                  Смотреть акции
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Icon name="Bell" size={20} className="mr-2" />
                Подписаться на уведомления
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-heading font-bold text-lg mb-4">СтройМаркет</h4>
              <p className="text-gray-400 mb-4">Лучшие строительные материалы и инструменты с доставкой по России</p>
              <div className="flex space-x-4">
                <Icon name="Phone" size={20} className="text-primary" />
                <span>+7 (800) 123-45-67</span>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Каталог</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Инструменты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Материалы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Сантехника</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Электрика</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Услуги</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Консультации</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Подбор материалов</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Оплата</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>г. Москва, ул. Строителей, 15</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>info@stroymarket.ru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>Пн-Пт: 8:00-20:00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 СтройМаркет. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;