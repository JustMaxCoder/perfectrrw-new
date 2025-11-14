import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "../../../shared/schema";
import ProductReviews from "../components/ProductReviews";

export default function ProductDetail({
  onAddToCart,
}: {
  onAddToCart: (product: Product, quantity: number) => void;
}) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  // Extract productId for the reviews component
  const productId = id ?? "";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Produkt nie znaleziony</h1>
        <Link href="/sklep" data-testid="link-back-to-shop">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Wróć do sklepu
          </Button>
        </Link>
      </div>
    );
  }

  const inStock = parseInt(product.stock.toString()) > 0;
  const price = parseFloat(product.price.toString());

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(parseInt(product.stock.toString()), quantity + delta));
    setQuantity(newQuantity);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Breadcrumbs */}
        <div className="mb-4 sm:mb-8">
          <Link href="/sklep" className="text-primary hover:underline flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base" data-testid="link-breadcrumb-shop">
            <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Wróć do sklepu
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-8">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to emoji if image fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'text-gray-300 text-5xl sm:text-6xl md:text-9xl absolute inset-0 flex items-center justify-center';
                  fallback.textContent = '📦';
                  e.currentTarget.parentElement?.appendChild(fallback);
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-8">
            <Badge className="mb-2 sm:mb-3 md:mb-4 text-[10px] sm:text-xs md:text-sm" data-testid="badge-category">
              {product.category}
            </Badge>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4" data-testid="text-product-name">
              {product.name}
            </h1>

            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-3 sm:mb-4 md:mb-6">
              <div
                className={`h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 rounded-full ${
                  inStock ? "bg-green-600" : "bg-red-600"
                }`}
              />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium" data-testid="text-stock-status">
                {inStock ? `W magazynie (${product.stock} szt.)` : "Brak w magazynie"}
              </span>
            </div>

            <div className="mb-4 sm:mb-6 md:mb-8">
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="text-product-price">
                {price.toFixed(2)} zł
              </span>
            </div>

            {/* Quantity Selector */}
            {inStock && (
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Ilość</label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    data-testid="button-decrease-quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    max={product.stock.toString()}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(parseInt(product.stock.toString()), parseInt(e.target.value) || 1)))}
                    className="w-20 text-center"
                    data-testid="input-quantity"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= parseInt(product.stock.toString())}
                    data-testid="button-increase-quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg mb-3 sm:mb-4"
              disabled={!inStock}
              onClick={() => onAddToCart(product, quantity)}
              data-testid="button-add-to-cart"
            >
              <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Dodaj do koszyka
            </Button>

            <Link href="/koszyk" className="block">
              <Button
                variant="outline"
                size="lg"
                className="w-full py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-semibold"
                data-testid="button-go-to-cart"
              >
                Przejdź do koszyka
              </Button>
            </Link>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-6 sm:mt-12 bg-white rounded-lg shadow-md p-4 sm:p-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="description" data-testid="tab-description" className="text-sm sm:text-base">
                Opis
              </TabsTrigger>
              <TabsTrigger value="specifications" data-testid="tab-specifications" className="text-sm sm:text-base">
                Specyfikacja
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="pt-4 sm:pt-6">
              <p className="text-sm sm:text-base leading-relaxed" data-testid="text-description">
                {product.description}
              </p>
            </TabsContent>

            <TabsContent value="specifications" className="pt-4 sm:pt-6">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row border-b pb-2 gap-1 sm:gap-0">
                  <span className="font-medium text-sm sm:text-base sm:w-40">Kategoria:</span>
                  <span className="text-sm sm:text-base">{product.category}</span>
                </div>
                <div className="flex flex-col sm:flex-row border-b pb-2 gap-1 sm:gap-0">
                  <span className="font-medium text-sm sm:text-base sm:w-40">Dostępność:</span>
                  <span className="text-sm sm:text-base">{inStock ? "W magazynie" : "Brak"}</span>
                </div>
                <div className="flex flex-col sm:flex-row border-b pb-2 gap-1 sm:gap-0">
                  <span className="font-medium text-sm sm:text-base sm:w-40">Stan magazynowy:</span>
                  <span className="text-sm sm:text-base">{product.stock} szt.</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <ProductReviews productId={productId} />
        </div>
      </div>
    </div>
  );
}