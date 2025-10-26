import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Contacts = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Сообщение отправлено!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: 'MapPin',
      title: 'Адрес',
      details: ['г. Москва, ул. Строительная, 15', 'ТЦ "СтройМаркет", 2 этаж']
    },
    {
      icon: 'Phone',
      title: 'Телефон',
      details: ['+7 (495) 123-45-67', '+7 (495) 123-45-68']
    },
    {
      icon: 'Mail',
      title: 'Email',
      details: ['info@stroymarket.ru', 'support@stroymarket.ru']
    },
    {
      icon: 'Clock',
      title: 'Режим работы',
      details: ['Пн-Пт: 8:00 - 20:00', 'Сб-Вс: 9:00 - 18:00']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
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
              <a href="/" className="text-gray-700 hover:text-primary transition-colors">Главная</a>
              <a href="/catalog" className="text-gray-700 hover:text-primary transition-colors">Каталог</a>
              <a href="/services" className="text-gray-700 hover:text-primary transition-colors">Услуги</a>
              <a href="/promotions" className="text-gray-700 hover:text-primary transition-colors">Акции</a>
              <a href="/contacts" className="text-primary font-semibold">Контакты</a>
            </nav>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <a href="/cart">
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Корзина
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">Свяжитесь с нами</h2>
          <p className="text-lg text-gray-600">Мы всегда рады помочь вам с выбором строительных материалов</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6">Контактная информация</h3>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon as any} className="text-primary" size={24} />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-gray-900 mb-2">{item.title}</h4>
                        {item.details.map((detail, i) => (
                          <p key={i} className="text-sm text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-primary to-secondary text-white">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Icon name="MessageCircle" size={32} />
                  <div>
                    <h4 className="font-heading font-semibold text-xl">Онлайн-консультация</h4>
                    <p className="text-sm opacity-90">Получите помощь специалиста прямо сейчас</p>
                  </div>
                </div>
                <Button variant="secondary" className="w-full">
                  Начать чат
                </Button>
              </CardContent>
            </Card>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.3677073426855!2d37.617634!3d55.755814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzIwLjkiTiAzN8KwMzcnMDMuNSJF!5e0!3m2!1sru!2sru!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6">Написать нам</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ваше имя"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your@email.ru"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+7 (___) ___-__-__"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Расскажите о вашем вопросе или проекте..."
                      rows={6}
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
