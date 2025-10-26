import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  popular: boolean;
  tags: string[];
  included: string[];
}

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('popular');
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);

  const services: Service[] = [
    {
      id: 1,
      title: 'Ремонт под ключ',
      description: 'Полный ремонт квартиры или дома с материалами и гарантией качества',
      price: 15000,
      duration: '30-60 дней',
      category: 'renovation',
      image: '/img/ddaea3c4-6510-42dc-924d-9822315bc6da.jpg',
      rating: 4.9,
      reviews: 156,
      popular: true,
      tags: ['ремонт', 'под ключ', 'материалы'],
      included: ['Демонтаж', 'Материалы', 'Отделочные работы', 'Уборка', 'Гарантия 2 года']
    },
    {
      id: 2,
      title: 'Электромонтажные работы',
      description: 'Установка и замена электропроводки, розеток, выключателей',
      price: 2500,
      duration: '1-3 дня',
      category: 'electrical',
      image: '/img/e8f3d7d2-6d20-4f29-9eee-f22bf242cf7c.jpg',
      rating: 4.8,
      reviews: 89,
      popular: true,
      tags: ['электрика', 'проводка', 'розетки'],
      included: ['Диагностика', 'Материалы', 'Монтаж', 'Проверка безопасности']
    },
    {
      id: 3,
      title: 'Сантехнические работы',
      description: 'Установка и ремонт сантехники, замена труб, подключение бытовой техники',
      price: 3200,
      duration: '1-2 дня',
      category: 'plumbing',
      image: '/img/13d0008f-a340-4f76-9578-e3efa3c37907.jpg',
      rating: 4.7,
      reviews: 124,
      popular: false,
      tags: ['сантехника', 'трубы', 'ванная'],
      included: ['Демонтаж старой сантехники', 'Установка новой', 'Герметизация', 'Проверка']
    },
    {
      id: 4,
      title: 'Укладка напольных покрытий',
      description: 'Профессиональная укладка ламината, паркета, плитки, линолеума',
      price: 1800,
      duration: '2-5 дней',
      category: 'flooring',
      image: '/img/672579f9-bc0e-42d3-b4b7-4383743959db.jpg',
      rating: 4.6,
      reviews: 67,
      popular: false,
      tags: ['пол', 'ламинат', 'плитка'],
      included: ['Подготовка основания', 'Укладка покрытия', 'Установка плинтусов']
    },
    {
      id: 5,
      title: 'Малярные работы',
      description: 'Покраска стен, потолков, поклейка обоев, декоративная отделка',
      price: 1200,
      duration: '3-7 дней',
      category: 'painting',
      image: '/img/bd9c96c0-8f8a-424a-9891-b1a893695564.jpg',
      rating: 4.5,
      reviews: 93,
      popular: true,
      tags: ['покраска', 'обои', 'декор'],
      included: ['Подготовка поверхности', 'Грунтовка', 'Покраска/поклейка', 'Финишная отделка']
    },
    {
      id: 6,
      title: 'Дизайн интерьера',
      description: 'Разработка дизайн-проекта, 3D визуализация, подбор материалов',
      price: 8500,
      duration: '7-14 дней',
      category: 'design',
      image: '/img/a22ec2dc-8a5b-4012-a496-cb67bc5b21a8.jpg',
      rating: 4.9,
      reviews: 42,
      popular: true,
      tags: ['дизайн', '3D', 'проект'],
      included: ['Замеры', '3D визуализация', 'Подбор материалов', 'Техническая документация']
    }
  ];

  const categories = [
    { value: 'all', label: 'Все услуги' },
    { value: 'renovation', label: 'Ремонт под ключ' },
    { value: 'electrical', label: 'Электрика' },
    { value: 'plumbing', label: 'Сантехника' },
    { value: 'flooring', label: 'Напольные покрытия' },
    { value: 'painting', label: 'Малярные работы' },
    { value: 'design', label: 'Дизайн интерьера' }
  ];

  const allTags = Array.from(new Set(services.flatMap(service => service.tags)));

  const filteredServices = useMemo(() => {
    const filtered = services.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => service.tags.includes(tag));
      const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];
      const matchesPopular = !showOnlyPopular || service.popular;

      return matchesSearch && matchesCategory && matchesTags && matchesPrice && matchesPopular;
    });

    // Сортировка
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedTags, priceRange, sortBy, showOnlyPopular, services]);

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      setSelectedTags(prev => [...prev, tag]);
    } else {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="lg:hidden">
                <Icon name="Menu" size={20} />
              </Button>
              <div className="flex items-center space-x-2">
                <Icon name="Wrench" className="text-primary" size={24} />
                <span className="font-heading font-bold text-xl">Наши услуги</span>
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
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Icon name="Phone" size={16} className="mr-2" />
                Заказать
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar с фильтрами */}
          <div className="lg:w-80 space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Фильтры</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Поиск */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Поиск услуг</label>
                  <Input
                    placeholder="Найти услугу..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Категории */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Категория</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Теги */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Теги</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {allTags.map(tag => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={tag}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
                        />
                        <label htmlFor={tag} className="text-sm cursor-pointer">
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Цена */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
                  </label>
                  <div className="space-y-2">
                    <Input
                      type="range"
                      min="0"
                      max="50000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Только популярные */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="popular"
                    checked={showOnlyPopular}
                    onCheckedChange={setShowOnlyPopular}
                  />
                  <label htmlFor="popular" className="text-sm cursor-pointer">
                    Только популярные услуги
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Основной контент */}
          <div className="flex-1">
            {/* Заголовок и сортировка */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Найдено услуг: {filteredServices.length}
                </h1>
                <p className="text-gray-600 mt-1">
                  Профессиональные услуги по ремонту и строительству
                </p>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По популярности</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Сетка услуг */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map(service => (
                <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                    {service.popular && (
                      <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">
                        <Icon name="Star" size={12} className="mr-1" />
                        Популярное
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg text-gray-900 leading-tight">
                        {service.title}
                      </h3>
                      <div className="flex flex-col items-end">
                        <span className="text-2xl font-bold text-primary">
                          {service.price.toLocaleString()} ₽
                        </span>
                        <span className="text-sm text-gray-500">{service.duration}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Рейтинг и отзывы */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                        <span className="font-medium">{service.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {service.reviews} отзывов
                      </span>
                    </div>

                    {/* Теги */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Что включено */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Что включено:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.included.slice(0, 3).map((item, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Icon name="Check" size={12} className="text-green-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                        {service.included.length > 3 && (
                          <li className="text-xs text-gray-400">
                            и ещё {service.included.length - 3} пунктов...
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Кнопки действий */}
                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-primary hover:bg-primary/90">
                        <Icon name="Phone" size={16} className="mr-2" />
                        Заказать
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Info" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Пустое состояние */}
            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Услуги не найдены
                </h3>
                <p className="text-gray-600 mb-4">
                  Попробуйте изменить критерии поиска или фильтры
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedTags([]);
                    setShowOnlyPopular(false);
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;