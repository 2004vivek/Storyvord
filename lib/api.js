const API_URL = "https://fakestoreapi.com"

export async function getProducts(limit, sort, category) {
  let url = `${API_URL}/products`

  if (category) {
    url = `${API_URL}/products/category/${category}`
  }

  if (limit) {
    url += `?limit=${limit}`
  }

  if (sort) {
    url += limit ? `&sort=${sort}` : `?sort=${sort}`
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  return response.json()
}

export async function getCategories() {
  const response = await fetch(`${API_URL}/products/categories`)

  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }

  return response.json()
}

export async function getProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }

  return response.json()
}

