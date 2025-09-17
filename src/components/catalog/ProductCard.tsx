import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface ProductCardProps {
  product: Product;
  categories: { value: string; label: string }[];
}

const ProductCard = ({ product, categories }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
  );
};

export default ProductCard;