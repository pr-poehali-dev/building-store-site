import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PromotionsHeader = () => {
  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Icon name="Zap" size={48} className="text-yellow-300 mr-3" />
            <h1 className="text-4xl font-heading font-bold">
              Горячие акции
            </h1>
          </div>
          <p className="text-xl text-red-100 mb-6 max-w-2xl mx-auto">
            Невероятные скидки до 70% на строительные материалы и инструменты. 
            Успейте воспользоваться выгодными предложениями!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
              <Icon name="Gift" size={20} className="mr-2" />
              Все акции
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              <Icon name="Clock" size={20} className="mr-2" />
              Акции дня
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsHeader;