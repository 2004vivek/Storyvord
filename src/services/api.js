const API_URL = 'https://fakestoreapi.com';

export async function getProducts(limit = 20, sort = 'asc', category) {
  let url = `${API_URL}/products`;
  
  if (category) {
    url = `${API_URL}/products/category/${category}`;
  }
  
  url += `?sort=${sort}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  let products = await response.json();
  
  // Apply limit
  if (limit) {
    products = products.slice(0, limit);
  }
  
  return products;
}

// Get a single product by ID
export async function getProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }
  
  return await response.json();
}

// Get all categories
export async function getCategories() {
  const response = await fetch(`${API_URL}/products/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return await response.json();
}

// Get products in a specific category
export async function getProductsByCategory(category) {
  const response = await fetch(`${API_URL}/products/category/${category}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products in category ${category}`);
  }
  
  return await response.json();
}

export async function checkout(cartItems) {
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: `order-${Date.now()}`,
        message: 'Order placed successfully',
      });
    }, 1500);
  });
} 