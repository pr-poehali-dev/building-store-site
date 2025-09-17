import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import CatalogHeader from '@/components/catalog/CatalogHeader';
import CatalogFilters from '@/components/catalog/CatalogFilters';
import ProductCard from '@/components/catalog/ProductCard';

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
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStock = !showOnlyInStock || product.inStock;
      const matchesDiscount = !showOnlyDiscount || product.discount;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock && matchesDiscount;
    });

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
      default:
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
      <CatalogHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <CatalogFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrands={selectedBrands}
            handleBrandChange={handleBrandChange}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            showOnlyInStock={showOnlyInStock}
            setShowOnlyInStock={setShowOnlyInStock}
            showOnlyDiscount={showOnlyDiscount}
            setShowOnlyDiscount={setShowOnlyDiscount}
            categories={categories}
            brands={brands}
          />

          <div className="flex-1">
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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} categories={categories} />
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