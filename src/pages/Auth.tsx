import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const { toast } = useToast();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Вход выполнен!",
      description: "Добро пожаловать в СтройМаркет",
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Регистрация завершена!",
      description: "Добро пожаловать в СтройМаркет",
    });
  };

  const socialButtons = [
    { name: 'Google', icon: 'Mail', color: 'bg-red-500' },
    { name: 'VK', icon: 'MessageCircle', color: 'bg-blue-600' },
    { name: 'Yandex', icon: 'Search', color: 'bg-yellow-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <Icon name="Hammer" className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">СтройМаркет</h1>
          <p className="text-gray-600 mt-2">Всё для строительства и ремонта</p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-heading text-center">Добро пожаловать</CardTitle>
            <CardDescription className="text-center">
              Войдите или создайте новый аккаунт
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      required
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      placeholder="your@email.ru"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="login-password">Пароль</Label>
                      <a href="#" className="text-sm text-primary hover:underline">
                        Забыли пароль?
                      </a>
                    </div>
                    <Input
                      id="login-password"
                      type="password"
                      required
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      placeholder="••••••••"
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                    <Icon name="LogIn" size={18} className="mr-2" />
                    Войти
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Или войти через</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {socialButtons.map((social) => (
                      <Button
                        key={social.name}
                        variant="outline"
                        className="w-full"
                        onClick={() => toast({ title: `Вход через ${social.name}` })}
                      >
                        <Icon name={social.icon as any} size={18} />
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="register-name">Имя</Label>
                    <Input
                      id="register-name"
                      required
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      required
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      placeholder="your@email.ru"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-password">Пароль</Label>
                    <Input
                      id="register-password"
                      type="password"
                      required
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      placeholder="••••••••"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-confirm">Повторите пароль</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      required
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                    <Icon name="UserPlus" size={18} className="mr-2" />
                    Зарегистрироваться
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Или через соцсети</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {socialButtons.map((social) => (
                      <Button
                        key={social.name}
                        variant="outline"
                        className="w-full"
                        onClick={() => toast({ title: `Регистрация через ${social.name}` })}
                      >
                        <Icon name={social.icon as any} size={18} />
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Button variant="ghost" asChild>
                <a href="/" className="text-sm text-gray-600 hover:text-primary">
                  <Icon name="ArrowLeft" size={16} className="mr-1" />
                  Вернуться на главную
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-6">
          Регистрируясь, вы соглашаетесь с{' '}
          <a href="#" className="text-primary hover:underline">
            условиями использования
          </a>{' '}
          и{' '}
          <a href="#" className="text-primary hover:underline">
            политикой конфиденциальности
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
