import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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

interface PromotionCardProps {
  promotion: Promotion;
  variant?: 'default' | 'featured';
}

const PromotionCard = ({ promotion, variant = 'default' }: PromotionCardProps) => {
  const isFeatured = variant === 'featured';
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-300 ${
      isFeatured ? 'border-red-200 shadow-lg' : 'hover:-translate-y-1'
    }`}>
      <div className="relative overflow-hidden">
        <img 
          src={promotion.image} 
          alt={promotion.title}
          className={`w-full object-cover group-hover:scale-110 transition-transform duration-300 ${
            isFeatured ? 'h-64' : 'h-48'
          }`}
        />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge className="bg-red-500 text-white font-bold">
            -{promotion.discount}{promotion.discountType === 'percentage' ? '%' : '₽'}
          </Badge>
          {promotion.isHot && (
            <Badge className="bg-orange-500 text-white animate-pulse">
              <Icon name="Flame" size={12} className="mr-1" />
              ХИТ
            </Badge>
          )}
          {promotion.isLimited && (
            <Badge className="bg-purple-500 text-white">
              ЛИМИТ
            </Badge>
          )}
        </div>

        <div className="absolute top-4 right-4">
          <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
            <Icon name="Heart" size={16} />
          </Button>
        </div>

        {promotion.itemsLeft && promotion.itemsLeft <= 10 && (
          <div className="absolute bottom-4 left-4">
            <Badge variant="destructive" className="animate-pulse">
              Осталось: {promotion.itemsLeft} шт
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className={`${isFeatured ? 'p-8' : 'p-6'}`}>
        <div className="mb-3">
          <Badge variant="outline" className="text-xs">
            {promotion.category}
          </Badge>
        </div>
        
        <h3 className={`font-heading font-bold mb-3 line-clamp-2 ${
          isFeatured ? 'text-2xl' : 'text-lg'
        }`}>
          {promotion.title}
        </h3>
        
        <p className={`text-gray-600 mb-4 line-clamp-3 ${
          isFeatured ? 'text-base' : 'text-sm'
        }`}>
          {promotion.description}
        </p>

        {(promotion.originalPrice && promotion.newPrice) && (
          <div className="flex items-center mb-4">
            <span className={`font-bold text-red-600 ${
              isFeatured ? 'text-3xl' : 'text-2xl'
            }`}>
              {promotion.newPrice.toLocaleString()}₽
            </span>
            <span className={`text-gray-500 line-through ml-3 ${
              isFeatured ? 'text-lg' : 'text-base'
            }`}>
              {promotion.originalPrice.toLocaleString()}₽
            </span>
          </div>
        )}

        {promotion.promocode && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-800">
                Промокод:
              </span>
              <code className="bg-yellow-200 px-2 py-1 rounded text-sm font-mono">
                {promotion.promocode}
              </code>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Icon name="Clock" size={16} className="mr-1" />
            До {formatDate(promotion.validUntil)}
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            size={isFeatured ? 'lg' : 'default'}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            Купить
          </Button>
          <Button 
            size={isFeatured ? 'lg' : 'default'}
            variant="outline"
          >
            <Icon name="Info" size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionCard;