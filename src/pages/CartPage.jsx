import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from '../components/ui/use-toast';

function CartPage() {
  const { cart, cartCount, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    
    setCheckoutSuccess(true);
    clearCart();
    toast({
      title: 'Order placed successfully!',
      description: `Your order has been placed.`,
    });
  };

  if (checkoutSuccess) {
    return (
      <div className="container py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-primary mb-6" />
        <h1 className="text-3xl font-bold mb-4">Order Placed!</h1>
        <p className="text-muted-foreground mb-8">
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </p>
        <Button asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          You haven't added any items to your cart yet. Start shopping to add items.
        </p>
        <Button asChild>
          <Link to="/">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartCount} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
              <div className="w-20 h-20 bg-muted rounded-md overflow-hidden shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium line-clamp-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                <p className="text-sm font-medium mt-1">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm w-6 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => addToCart(item)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 ml-auto"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted/40 p-6 rounded-lg h-fit">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${(totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Button
            className="w-full mt-6"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
          <Button variant="outline" className="w-full mt-2" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartPage; 