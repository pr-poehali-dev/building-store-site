import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  currentPage?: string;
}

const Header = ({ currentPage = '' }: HeaderProps) => {
  return (
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
            <a 
              href="/" 
              className={currentPage === 'home' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary transition-colors'}
            >
              Главная
            </a>
            <a 
              href="/catalog" 
              className={currentPage === 'catalog' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary transition-colors'}
            >
              Каталог
            </a>
            <a 
              href="/services" 
              className={currentPage === 'services' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary transition-colors'}
            >
              Услуги
            </a>
            <a 
              href="/promotions" 
              className={currentPage === 'promotions' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary transition-colors'}
            >
              Акции
            </a>
            <a 
              href="/contacts" 
              className={currentPage === 'contacts' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary transition-colors'}
            >
              Контакты
            </a>
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
  );
};

export default Header;
