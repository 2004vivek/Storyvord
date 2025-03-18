import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { useCart } from '../contexts/CartContext';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortOrder]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
      setCategoriesLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategoriesLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = 'https://fakestoreapi.com/products';
      if (selectedCategory && selectedCategory !== 'all') {
        url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
      }
      const response = await fetch(url);
      let data = await response.json();

      if (sortOrder === 'asc') {
        data = data.sort((a, b) => a.price - b.price);
      } else {
        data = data.sort((a, b) => b.price - a.price);
      }

      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full sm:w-48">
            <Select value={selectedCategory || 'all'} onValueChange={handleCategoryChange} disabled={categoriesLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-48">
            <Select value={sortOrder} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Price: Low to High</SelectItem>
                <SelectItem value="desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle className="line-clamp-1">{product.title}</CardTitle>
                <Badge variant="secondary" className="w-fit">
                  {product.category}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                </div>
                <p className="text-sm line-clamp-3">{product.description}</p>
                <p className="text-lg font-bold">${product.price}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;