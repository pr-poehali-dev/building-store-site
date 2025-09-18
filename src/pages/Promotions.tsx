import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import PromotionsHeader from '@/components/promotions/PromotionsHeader';
import FeaturedPromotions from '@/components/promotions/FeaturedPromotions';
import PromotionCard from '@/components/promotions/PromotionCard';

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

const Promotions = () => {
  const [sortBy, setSortBy] = useState('discount');
  const [activeTab, setActiveTab] = useState('all');

  const promotions: Promotion[] = [
    {
      id: 1,
      title: 'Мега скидка на перфораторы BOSCH',
      description: 'Профессиональные перфораторы BOSCH со скидкой до 40%. Надёжные инструменты для серьёзных задач.',
      discount: 40,
      discountType: 'percentage',
      originalPrice: 15990,
      newPrice: 9590,
      image: '/img/2b2ecf86-263f-4f32-83bf-9005a41c099a.jpg',
      category: 'Инструменты',
      validUntil: '2024-10-31',
      isHot: true,
      isLimited: true,
      itemsLeft: 5,
      promocode: 'BOSCH40'
    },
    {
      id: 2,
      title: 'Краски Dulux - лучшая цена года',
      description: 'Высококачественные краски Dulux для внутренних и наружных работ. Европейское качество по доступным ценам.',
      discount: 30,
      discountType: 'percentage',
      originalPrice: 3500,
      newPrice: 2450,
      image: '/img/7f35edf2-bc38-41f3-9e07-54aab5bf58a3.jpg',
      category: 'Краски и лаки',
      validUntil: '2024-11-15',
      isHot: true,
      isLimited: false,
      promocode: 'DULUX30'
    },
    {
      id: 3,
      title: 'Распродажа керамической плитки',
      description: 'Остатки коллекций керамической плитки от ведущих производителей. Ограниченное количество!',
      discount: 50,
      discountType: 'percentage',
      originalPrice: 1200,
      newPrice: 600,
      image: '/img/1465fbde-6132-4c31-91a3-8ad577782a71.jpg',
      category: 'Материалы',
      validUntil: '2024-10-20',
      isHot: true,
      isLimited: true,
      itemsLeft: 12
    },
    {
      id: 4,
      title: 'Набор инструментов Makita',
      description: 'Полный набор аккумуляторных инструментов Makita в удобном кейсе. Всё необходимое для профессионала.',
      discount: 25,
      discountType: 'percentage',
      originalPrice: 45000,
      newPrice: 33750,
      image: '/img/2b2ecf86-263f-4f32-83bf-9005a41c099a.jpg',
      category: 'Инструменты',
      validUntil: '2024-11-30',
      isHot: false,
      isLimited: true,
      itemsLeft: 3
    },
    {
      id: 5,
      title: 'Цемент М500 - оптовая цена',
      description: 'Высококачественный цемент М500 по оптовым ценам. Подходит для любых строительных работ.',
      discount: 15,
      discountType: 'percentage',
      originalPrice: 520,
      newPrice: 442,
      image: '/img/30d145b0-6f1e-42fc-b2dd-675a6cd74069.jpg',
      category: 'Материалы',
      validUntil: '2024-12-31',
      isHot: false,
      isLimited: false
    },
    {
      id: 6,
      title: 'Ламинат Tarkett - новинки со скидкой',
      description: 'Новые коллекции ламината Tarkett с повышенной влагостойкостью. Современный дизайн и долговечность.',
      discount: 20,
      discountType: 'percentage',
      originalPrice: 1800,
      newPrice: 1440,
      image: '/img/1465fbde-6132-4c31-91a3-8ad577782a71.jpg',
      category: 'Материалы',
      validUntil: '2024-11-10',
      isHot: false,
      isLimited: false
    },
    {
      id: 7,
      title: 'Грунтовка - при покупке краски',
      description: 'Получите грунтовку бесплатно при покупке любой краски. Идеальная подготовка поверхности гарантирована.',
      discount: 100,
      discountType: 'percentage',
      originalPrice: 850,
      newPrice: 0,
      image: '/img/7f35edf2-bc38-41f3-9e07-54aab5bf58a3.jpg',
      category: 'Краски и лаки',
      validUntil: '2024-10-25',
      isHot: true,
      isLimited: false,
      promocode: 'FREEGRUNT'
    },
    {
      id: 8,
      title: 'Шуруповёрт DeWalt - хит продаж',
      description: 'Самый популярный шуруповёрт DeWalt с двумя аккумуляторами и зарядным устройством.',
      discount: 35,
      discountType: 'percentage',
      originalPrice: 12000,
      newPrice: 7800,
      image: '/img/2b2ecf86-263f-4f32-83bf-9005a41c099a.jpg',
      category: 'Инструменты',
      validUntil: '2024-11-05',
      isHot: true,
      isLimited: true,
      itemsLeft: 8
    }
  ];

  const categories = [
    { value: 'all', label: 'Все акции' },
    { value: 'Инструменты', label: 'Инструменты' },
    { value: 'Материалы', label: 'Материалы' },
    { value: 'Краски и лаки', label: 'Краски и лаки' }
  ];

  const filteredPromotions = useMemo(() => {
    let filtered = promotions;

    if (activeTab === 'hot') {
      filtered = promotions.filter(promo => promo.isHot);
    } else if (activeTab === 'limited') {
      filtered = promotions.filter(promo => promo.isLimited);
    } else if (activeTab === 'ending') {
      const soon = new Date();
      soon.setDate(soon.getDate() + 7);
      filtered = promotions.filter(promo => new Date(promo.validUntil) <= soon);
    }

    switch (sortBy) {
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case 'price':
        filtered.sort((a, b) => (a.newPrice || 0) - (b.newPrice || 0));
        break;
      case 'ending':
        filtered.sort((a, b) => new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime());
        break;
      default:
        filtered.sort((a, b) => b.discount - a.discount);
    }

    return filtered;
  }, [activeTab, sortBy, promotions]);

  return (
    <div className="min-h-screen bg-gray-50">
      <PromotionsHeader />
      
      <FeaturedPromotions promotions={promotions} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              Все акции и предложения
            </h2>
            <p className="text-gray-600">
              Выберите категорию или отсортируйте по выгодности
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Сортировать:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">По размеру скидки</SelectItem>
                <SelectItem value="price">По цене</SelectItem>
                <SelectItem value="ending">По сроку окончания</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="all" className="flex items-center">
              <Icon name="Grid3X3" size={16} className="mr-2" />
              Все
            </TabsTrigger>
            <TabsTrigger value="hot" className="flex items-center">
              <Icon name="Flame" size={16} className="mr-2" />
              Горячие
            </TabsTrigger>
            <TabsTrigger value="limited" className="flex items-center">
              <Icon name="Timer" size={16} className="mr-2" />
              Лимит
            </TabsTrigger>
            <TabsTrigger value="ending" className="flex items-center">
              <Icon name="Clock" size={16} className="mr-2" />
              Скоро закончатся
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPromotions.map(promotion => (
                <PromotionCard key={promotion.id} promotion={promotion} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredPromotions.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Gift" size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
              Акции не найдены
            </h3>
            <p className="text-gray-600 mb-4">
              В выбранной категории пока нет активных акций
            </p>
            <Button 
              variant="outline"
              onClick={() => setActiveTab('all')}
            >
              Показать все акции
            </Button>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <Icon name="Mail" size={48} className="mx-auto mb-4 text-blue-200" />
            <h3 className="text-2xl font-heading font-bold mb-4">
              Не пропустите лучшие предложения!
            </h3>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Подпишитесь на рассылку и получайте уведомления о новых акциях 
              и эксклюзивных предложениях первыми.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Ваш email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Подписаться
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;