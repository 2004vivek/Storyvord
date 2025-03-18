"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getProducts, getCategories } from "@/lib/api"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState(undefined)
  const [sortOrder, setSortOrder] = useState("asc")
  const [limit, setLimit] = useState(8)

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products", limit, sortOrder, selectedCategory],
    queryFn: () => getProducts(limit, sortOrder, selectedCategory),
  })

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 4)
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value === "all" ? undefined : value)
    setLimit(8) // Reset limit when changing category
  }

  const handleSortChange = (value) => {
    setSortOrder(value)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full sm:w-48">
            <Select disabled={categoriesLoading} value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
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

      {productsError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load products. Please try again later.</AlertDescription>
        </Alert>
      ) : productsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-4">
              <Skeleton className="aspect-square rounded-md" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products && products.length >= limit && (
            <div className="flex justify-center mt-8">
              <Button onClick={handleLoadMore}>Load More</Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

