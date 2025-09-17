import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  discount?: number;
}

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [showOnlyDiscount, setShowOnlyDiscount] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: 'Перфоратор BOSCH GBH 2-28 DV',
      description: 'Профессиональный перфоратор с функцией SDS-plus, мощность 850 Вт',
      price: 12990,
      oldPrice: 15990,
      image: '/img/2b2ecf86-263f-4f32-83bf-9005a41c099a.jpg',
      category: 'instruments',
      brand: 'BOSCH',
      rating: 4.8,
      reviews: 156,
      inStock: true,
      tags: ['перфоратор', 'электроинструмент', 'профессиональный'],
      discount: 19
    },
    {
      id: 2,
      name: 'Краска водоэмульсионная Dulux',
      description: 'Высококачественная краска для внутренних работ, 10 л',
      price: 2490,
      oldPrice: 2990,
      image: '/img/7f35edf2-bc38-41f3-9e07-54aab5bf58a3.jpg',
      category: 'paints',
      brand: 'Dulux',
      rating: 4.6,
      reviews: 89,
      inStock: true,
      tags: ['краска', 'водоэмульсионная', 'интерьер'],
      discount: 17
    },
    {
      id: 3,
      name: 'Плитка керамическая Cersanit',
      description: 'Керамическая плитка для ванной комнаты, 30x60 см, глянцевая',
      price: 890,
      oldPrice: 1200,
      image: '/img/1465fbde-6132-4c31-91a3-8ad577782a71.jpg',
      category: 'materials',
      brand: 'Cersanit',
      rating: 4.7,
      reviews: 234,
      inStock: true,
      tags: ['плитка', 'керамика', 'ванная'],
      discount: 26
    },
    {
      id: 4,
      name: 'Дрель аккумуляторная Makita',
      description: 'Компактная аккумуляторная дрель, 18В, с набором свёрл',
      price: 8990,
      image: '/img/2b2ecf86-263f-4f32-83bf-9005a41c099a.jpg',
      category: 'instruments',
      brand: 'Makita',
      rating: 4.9,
      reviews: 78,
      inStock: false,
      tags: ['дрель', 'аккумуляторная', 'набор']
    },
    {
      id: 5,
      name: 'Цемент М500 ПЦ',
      description: 'Портландцемент общестроительного назначения, мешок 50 кг',
      price: 450,
      image: '/img/30d145b0-6f1e-42fc-b2dd-675a6cd74069.jpg',
      category: 'materials',
      brand: 'ЕвроЦемент',
      rating: 4.5,
      reviews: 145,
      inStock: true,
      tags: ['цемент', 'строительство', 'фундамент']
    },
    {
      id: 6,
      name: 'Шуруповёрт DeWalt DCD771',
      description: 'Аккумуляторный шуруповёрт с литий-ионным аккумулятором',
      price: 7500,
      oldPrice: 8900,
      image: '/img/2b2ecf86-263f-4f32-83bf-9005a41c099a.jpg',
      category: 'instruments',
      brand: 'DeWalt',
      rating: 4.7,
      reviews: 92,
      inStock: true,
      tags: ['шуруповёрт', 'аккумуляторный', 'профессиональный'],
      discount: 16
    },
    {
      id: 7,
      name: 'Грунтовка глубокого проникновения',
      description: 'Универсальная грунтовка для внутренних и наружных работ, 5 л',
      price: 890,
      image: '/img/7f35edf2-bc38-41f3-9e07-54aab5bf58a3.jpg',
      category: 'paints',
      brand: 'Основит',
      rating: 4.4,
      reviews: 67,
      inStock: true,
      tags: ['грунтовка', 'универсальная', 'проникающая']
    },
    {
      id: 8,
      name: 'Ламинат Tarkett',
      description: 'Влагостойкий ламинат 33 класса, дуб натуральный, упаковка 2.5 м²',
      price: 1200,
      oldPrice: 1450,
      image: '/img/1465fbde-6132-4c31-91a3-8ad577782a71.jpg',
      category: 'materials',
      brand: 'Tarkett',
      rating: 4.8,
      reviews: 189,
      inStock: true,
      tags: ['ламинат', 'влагостойкий', 'дуб'],
      discount: 17
    }
  ];

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'instruments', label: 'Инструменты' },
    { value: 'materials', label: 'Материалы' },
    { value: 'paints', label: 'Краски и лаки' },
    { value: 'plumbing', label: 'Сантехника' },
    { value: 'electrical', label: 'Электрика' }
  ];

  const brands = ['BOSCH', 'Makita', 'DeWalt', 'Dulux', 'Cersanit', 'Tarkett', 'ЕвроЦемент', 'Основит'];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Поиск по названию и тегам
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Фильтр по категории
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      // Фильтр по брендам
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      // Фильтр по цене
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      // Фильтр по наличию
      const matchesStock = !showOnlyInStock || product.inStock;

      // Фильтр по скидкам
      const matchesDiscount = !showOnlyDiscount || product.discount;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock && matchesDiscount;
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
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default: // popularity
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedBrands, priceRange, sortBy, showOnlyInStock, showOnlyDiscount, products]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands(prev => [...prev, brand]);
    } else {
      setSelectedBrands(prev => prev.filter(b => b !== brand));
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
                <Icon name="Store" className="text-primary" size={24} />
                <span className="font-heading font-bold text-xl">Каталог товаров</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/">
                <Button variant="outline" size="sm">
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  На главную
                </Button>
              </a>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Корзина
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-6">
            {/* Search */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-heading">Поиск</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Найти товар..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category Filter */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-heading">Категория</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            {/* Brand Filter */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-heading">Бренд</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                    />
                    <label htmlFor={brand} className="text-sm cursor-pointer">
                      {brand}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Price Filter */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-heading">Цена</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={50000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{priceRange[0].toLocaleString()}₽</span>
                  <span>{priceRange[1].toLocaleString()}₽</span>
                </div>
              </CardContent>
            </Card>

            {/* Additional Filters */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-heading">Дополнительно</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={showOnlyInStock}
                    onCheckedChange={setShowOnlyInStock}
                  />
                  <label htmlFor="inStock" className="text-sm cursor-pointer">
                    Только в наличии
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="discount"
                    checked={showOnlyDiscount}
                    onCheckedChange={setShowOnlyDiscount}
                  />
                  <label htmlFor="discount" className="text-sm cursor-pointer">
                    Только со скидкой
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl font-heading font-bold text-gray-900">
                  Товары ({filteredProducts.length})
                </h1>
                <p className="text-gray-600">Найдено {filteredProducts.length} товаров</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Сортировать:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">По популярности</SelectItem>
                    <SelectItem value="price-asc">По цене ↑</SelectItem>
                    <SelectItem value="price-desc">По цене ↓</SelectItem>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                    <SelectItem value="name">По названию</SelectItem>
                    <SelectItem value="discount">По размеру скидки</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.discount && (
                        <Badge className="bg-red-500 text-white">
                          -{product.discount}%
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge variant="secondary" className="bg-gray-500 text-white">
                          Нет в наличии
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                        <Icon name="Heart" size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.value === product.category)?.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs ml-2">
                        {product.brand}
                      </Badge>
                    </div>
                    
                    <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Icon 
                            key={i}
                            name="Star" 
                            size={14} 
                            className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          {product.price.toLocaleString()}₽
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {product.oldPrice.toLocaleString()}₽
                          </span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90"
                        disabled={!product.inStock}
                      >
                        <Icon name="Plus" size={16} className="mr-1" />
                        {product.inStock ? 'В корзину' : 'Недоступен'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Package" size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                  Товары не найдены
                </h3>
                <p className="text-gray-600 mb-4">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedBrands([]);
                    setPriceRange([0, 50000]);
                    setShowOnlyInStock(false);
                    setShowOnlyDiscount(false);
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Icon name="ChevronLeft" size={16} />
                  </Button>
                  <Button size="sm" className="bg-primary text-white">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">
                    <Icon name="ChevronRight" size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;