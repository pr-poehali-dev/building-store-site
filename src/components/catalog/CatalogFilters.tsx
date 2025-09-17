import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface CatalogFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedBrands: string[];
  handleBrandChange: (brand: string, checked: boolean) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  showOnlyInStock: boolean;
  setShowOnlyInStock: (value: boolean) => void;
  showOnlyDiscount: boolean;
  setShowOnlyDiscount: (value: boolean) => void;
  categories: { value: string; label: string }[];
  brands: string[];
}

const CatalogFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedBrands,
  handleBrandChange,
  priceRange,
  setPriceRange,
  showOnlyInStock,
  setShowOnlyInStock,
  showOnlyDiscount,
  setShowOnlyDiscount,
  categories,
  brands
}: CatalogFiltersProps) => {
  return (
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
  );
};

export default CatalogFilters;