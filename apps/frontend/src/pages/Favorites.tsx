import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import type { Product } from "../../../shared/schema";

export default function Favorites({
  onAddToCart,
}: {
  onAddToCart: (product: Product) => void;
}) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const { data: allProducts, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const favoriteProducts = allProducts?.filter((product) =>
    favoriteIds.includes(product.id)
  ) || [];

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const handleRemoveFavorite = (productId: string) => {
    setFavoriteIds((prev) => prev.filter((id) => id !== productId));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Ładowanie ulubionych...</p>
        </div>
      </div>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16 px-4">
        <Heart className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center" data-testid="text-empty-favorites">
          Brak ulubionych produktów
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-8 text-center max-w-md">
          Dodaj produkty do ulubionych, aby łatwo je odnaleźć później
        </p>
        <Link href="/sklep" data-testid="link-browse-products">
          <Button size="lg" className="bg-primary text-primary-foreground">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Przeglądaj produkty
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            Ulubione produkty
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'produkt' : 'produktów'} w ulubionych
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {favoriteProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover-elevate"
              data-testid={`favorite-product-${product.id}`}
            >
              {/* Product Image */}
              <Link href={`/produkt/${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-testid={`img-favorite-${product.id}`}
                  />
                  {parseInt(product.stock.toString()) === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-md text-sm font-semibold">
                        Brak w magazynie
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <Link href={`/produkt/${product.id}`}>
                  <h3 className="font-semibold text-base sm:text-lg line-clamp-2 hover:text-primary transition-colors" data-testid={`text-favorite-name-${product.id}`}>
                    {product.name}
                  </h3>
                </Link>

                {product.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                )}

                {/* Price and Stock */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary" data-testid={`text-favorite-price-${product.id}`}>
                      {parseFloat(product.price).toFixed(2)} zł
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {parseInt(product.stock.toString()) > 0
                        ? `W magazynie: ${product.stock} szt.`
                        : 'Brak w magazynie'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1"
                    onClick={() => onAddToCart(product)}
                    disabled={parseInt(product.stock.toString()) === 0}
                    data-testid={`button-add-to-cart-${product.id}`}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Dodaj do koszyka
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveFavorite(product.id)}
                    data-testid={`button-remove-favorite-${product.id}`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link href="/sklep">
            <Button variant="outline" size="lg" data-testid="button-continue-browsing">
              Kontynuuj przeglądanie
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
