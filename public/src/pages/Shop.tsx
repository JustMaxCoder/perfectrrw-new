import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Product } from "../../../shared/schema";

export default function Shop({
  onAddToCart,
}: {
  onAddToCart: (product: Product) => void;
}) {
  const [location] = useLocation();
  
  // Parse URL parameters correctly
  const getInitialCategory = () => {
    if (typeof window === "undefined") return "all";
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("category") || "all";
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(getInitialCategory());
  const [stockFilter, setStockFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Update selected category when URL changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [location]);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categories = [
    { value: "all", label: "Wszystkie" },
    { value: "odziez-robocza", label: "Odzież robocza" },
    { value: "obuwie", label: "Obuwie BHP" },
    { value: "rekawice", label: "Rękawice" },
    { value: "ochrona-glowy", label: "Ochrona głowy" },
    { value: "ochrona-sluchu", label: "Ochrona słuchu" },
  ];

  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in-stock" && parseInt(product.stock.toString()) > 0) ||
      (stockFilter === "out-of-stock" && parseInt(product.stock.toString()) === 0);

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Filtry</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                  data-testid="button-toggle-filters"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                {/* Search */}
                <div>
                  <Label htmlFor="search" className="text-sm font-medium mb-2 block">
                    Szukaj produktu
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      type="search"
                      placeholder="Wpisz nazwę..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      data-testid="input-search"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Kategoria</Label>
                  <RadioGroup
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    {categories.map((category) => (
                      <div key={category.value} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem
                          value={category.value}
                          id={category.value}
                          data-testid={`radio-category-${category.value}`}
                        />
                        <Label
                          htmlFor={category.value}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Stock Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Dostępność</Label>
                  <RadioGroup value={stockFilter} onValueChange={setStockFilter}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem
                        value="all"
                        id="stock-all"
                        data-testid="radio-stock-all"
                      />
                      <Label htmlFor="stock-all" className="text-sm cursor-pointer">
                        Wszystkie
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem
                        value="in-stock"
                        id="stock-in"
                        data-testid="radio-stock-in"
                      />
                      <Label htmlFor="stock-in" className="text-sm cursor-pointer">
                        W magazynie
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="out-of-stock"
                        id="stock-out"
                        data-testid="radio-stock-out"
                      />
                      <Label htmlFor="stock-out" className="text-sm cursor-pointer">
                        Brak w magazynie
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Reset Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setStockFilter("all");
                  }}
                  data-testid="button-reset-filters"
                >
                  Wyczyść filtry
                </Button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <p className="text-muted-foreground" data-testid="text-product-count">
                Znaleziono {filteredProducts?.length || 0} produktów
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 animate-pulse rounded-lg h-96"
                  />
                ))}
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16" data-testid="empty-products">
                <p className="text-xl text-muted-foreground mb-4">
                  Nie znaleziono produktów spełniających kryteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setStockFilter("all");
                  }}
                  data-testid="button-clear-search"
                >
                  Wyczyść filtry
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
