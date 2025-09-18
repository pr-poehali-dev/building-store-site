import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import PromotionCard from './PromotionCard';

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  originalPrice?: number;
  newPrice?: number;
  image: string;
  category: string;
  validUntil: string;
  isHot: boolean;
  isLimited: boolean;
  itemsLeft?: number;
  promocode?: string;
}

interface FeaturedPromotionsProps {
  promotions: Promotion[];
}

const FeaturedPromotions = ({ promotions }: FeaturedPromotionsProps) => {
  const featuredPromotions = promotions.filter(promo => promo.isHot || promo.isLimited).slice(0, 3);

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Icon name="Star" size={32} className="text-yellow-500 mr-2" />
            <h2 className="text-3xl font-heading font-bold text-gray-900">
              Топ предложения
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Самые выгодные акции с ограниченным сроком действия. 
            Не упустите возможность сэкономить!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {featuredPromotions.map(promotion => (
            <PromotionCard 
              key={promotion.id} 
              promotion={promotion} 
              variant="featured"
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3 mb-6 lg:mb-0">
              <div className="flex items-center mb-4">
                <Icon name="Gift" size={40} className="text-red-600 mr-3" />
                <h3 className="text-2xl font-heading font-bold text-gray-900">
                  Подписка на акции
                </h3>
              </div>
              <p className="text-gray-600 text-lg">
                Первыми узнавайте о новых акциях и получайте эксклюзивные промокоды. 
                Скидки до 50% только для подписчиков!
              </p>
            </div>
            <div className="lg:w-1/3 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Icon name="Bell" size={20} className="mr-2" />
                Подписаться
              </Button>
              <Button size="lg" variant="outline">
                <Icon name="Download" size={20} className="mr-2" />
                Каталог акций
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPromotions;