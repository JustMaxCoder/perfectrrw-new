import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PromoBanner } from "./components/PromoBanner";
import { useToast } from "./hooks/use-toast";
import { useState, useEffect } from "react";
import type { Product, CartItem } from "../../shared/schema";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import OrderHistory from "./pages/OrderHistory";
import TrackOrder from "./pages/TrackOrder";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/not-found";

function Router() {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.productId === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          quantity,
          name: product.name,
          price: product.price.toString(),
          image: product.image,
        },
      ];
    });
    toast({
      title: "Dodano do koszyka",
      description: `${product.name} został dodany do koszyka.`,
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    toast({
      title: "Usunięto z koszyka",
      description: "Produkt został usunięty z koszyka.",
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PromoBanner />
      <Header cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/sklep" component={() => <Shop onAddToCart={handleAddToCart} />} />
          <Route
            path="/produkt/:id"
            component={() => <ProductDetail onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/koszyk"
            component={() => (
              <Cart
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            )}
          />
          <Route
            path="/zamowienie"
            component={() => (
              <Checkout cartItems={cartItems} onClearCart={handleClearCart} />
            )}
          />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/zamowienia" component={OrderHistory} />
          <Route path="/sledzenie" component={TrackOrder} />
          <Route path="/o-nas" component={About} />
          <Route path="/kontakt" component={Contact} />
          <Route path="/galeria" component={Gallery} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}