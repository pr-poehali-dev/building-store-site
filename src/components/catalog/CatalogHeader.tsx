import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const CatalogHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="lg:hidden">
              <Icon name="Menu" size={20} />
            </Button>
            <div className="flex items-center space-x-2">
              <Icon name="Store" className="text-primary" size={24} />
              <span className="font-heading font-bold text-xl">Наши акции</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/">
              <Button variant="outline" size="sm">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                На главную
              </Button>
            </a>
            <Button variant="outline" size="sm" asChild>
              <a href="/auth">
                <Icon name="User" size={16} className="mr-2" />
                Войти
              </a>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
              <a href="/cart">
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Корзина
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CatalogHeader;