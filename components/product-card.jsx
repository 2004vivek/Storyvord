"use client"

import Image from "next/image"
import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProductCard({ product }) {
  const { addItem } = useCart()
  const [isImageLoading, setIsImageLoading] = useState(true)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    })
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="aspect-square relative bg-muted rounded-md overflow-hidden">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          )}
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className={`object-contain p-4 transition-opacity duration-300 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsImageLoading(false)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col">
        <Badge className="w-fit mb-2">{product.category}</Badge>
        <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(product.rating.rate)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 fill-gray-300"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.rating.count})</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 flex-1">{product.description}</p>
        <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

