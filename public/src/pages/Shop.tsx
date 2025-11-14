
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { Search, X, Grid3x3, List, ArrowUpDown } from "lucide-react";
import type { Product } from "../../../shared/schema";

export default function Shop({
  onAddToCart,
}: {
  onAddToCart: (product: Product) => void;
}) {
  const [location] = useLocation();
  
  const getInitialCategory = () => {
    if (typeof window === "undefined") return "all";
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("category") || "all";
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(getInitialCategory());
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  const categoryCount = (categoryValue: string) => {
    if (!products) return 0;
    if (categoryValue === "all") return products.length;
    return products.filter(p => p.category === categoryValue).length;
  };

  const filteredAndSortedProducts = (products ?? []).filter((product) => {
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
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-desc":
        return parseFloat(b.price) - parseFloat(a.price);
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "stock":
        return parseInt(b.stock.toString()) - parseInt(a.stock.toString());
      default:
        return 0;
    }
  });

  const activeFilters = [];
  if (selectedCategory !== "all") {
    const cat = categories.find(c => c.value === selectedCategory);
    if (cat) activeFilters.push({ type: "category", label: cat.label, value: selectedCategory });
  }
  if (stockFilter !== "all") {
    const label = stockFilter === "in-stock" ? "W magazynie" : "Brak w magazynie";
    activeFilters.push({ type: "stock", label, value: stockFilter });
  }
  if (searchTerm) {
    activeFilters.push({ type: "search", label: `"${searchTerm}"`, value: searchTerm });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Header with Search */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Sklep <span className="text-primary">BHP</span>
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              Profesjonalne wyposażenie ochronne dla Twojego bezpieczeństwa
            </p>
          </div>

          {/* Centered Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Szukaj produktów..."
                className="h-14 pl-12 pr-4 text-base bg-white border-2 border-gray-300 focus:border-primary rounded-xl shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="input-search"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 flex-shrink-0">
            <Card className="p-5 sticky top-20 shadow-md border-gray-200">
              <h2 className="text-lg font-bold mb-5 text-gray-900">Filtry</h2>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <Label className="text-sm font-semibold mb-3 block text-gray-700">
                    Kategoria
                  </Label>
                  <RadioGroup
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                    className="space-y-2"
                  >
                    {categories.map((category) => (
                      <div key={category.value} className="flex items-center">
                        <RadioGroupItem
                          value={category.value}
                          id={category.value}
                          className="mr-2"
                          data-testid={`radio-category-${category.value}`}
                        />
                        <Label
                          htmlFor={category.value}
                          className="text-sm cursor-pointer flex-1 flex items-center justify-between font-normal"
                        >
                          <span>{category.label}</span>
                          <Badge variant="secondary" className="text-xs ml-2 bg-gray-100">
                            {categoryCount(category.value)}
                          </Badge>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="border-t border-gray-200 pt-4"></div>

                {/* Stock Filter */}
                <div>
                  <Label className="text-sm font-semibold mb-3 block text-gray-700">
                    Dostępność
                  </Label>
                  <RadioGroup value={stockFilter} onValueChange={setStockFilter} className="space-y-2">
                    <div className="flex items-center">
                      <RadioGroupItem
                        value="all"
                        id="stock-all"
                        className="mr-2"
                        data-testid="radio-stock-all"
                      />
                      <Label htmlFor="stock-all" className="text-sm cursor-pointer font-normal">
                        Wszystkie
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem
                        value="in-stock"
                        id="stock-in"
                        className="mr-2"
                        data-testid="radio-stock-in"
                      />
                      <Label htmlFor="stock-in" className="text-sm cursor-pointer font-normal">
                        W magazynie
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem
                        value="out-of-stock"
                        id="stock-out"
                        className="mr-2"
                        data-testid="radio-stock-out"
                      />
                      <Label htmlFor="stock-out" className="text-sm cursor-pointer font-normal">
                        Brak w magazynie
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="border-t border-gray-200 pt-4"></div>

                {/* Reset Button */}
                <Button
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50"
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
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Active Filters & Toolbar */}
            <div className="mb-6 space-y-4">
              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Filtry:</span>
                  {activeFilters.map((filter, index) => (
                    <Badge 
                      key={`${filter.type}-${index}`} 
                      variant="secondary" 
                      className="gap-1.5 pl-3 pr-2 py-1.5 bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-700 border border-gray-300"
                      onClick={() => {
                        if (filter.type === "category") setSelectedCategory("all");
                        if (filter.type === "stock") setStockFilter("all");
                        if (filter.type === "search") setSearchTerm("");
                      }}
                      data-testid={`active-filter-${filter.type}`}
                    >
                      {filter.label}
                      <X className="h-3 w-3" />
                    </Badge>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setStockFilter("all");
                    }}
                    className="text-xs text-gray-600 hover:text-gray-900"
                    data-testid="button-clear-all-filters"
                  >
                    Wyczyść wszystko
                  </Button>
                </div>
              )}

              {/* Toolbar */}
              <Card className="p-4 border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-sm text-gray-600 font-medium" data-testid="text-product-count">
                    Znaleziono{" "}
                    <span className="font-bold text-gray-900">
                      {filteredAndSortedProducts.length}
                    </span>{" "}
                    {filteredAndSortedProducts.length === 1 ? "produkt" : "produktów"}
                  </p>

                  <div className="flex items-center gap-3">
                    {/* Sort */}
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4 text-gray-500" />
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px] border-gray-300" data-testid="select-sort">
                          <SelectValue placeholder="Sortuj" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Domyślnie</SelectItem>
                          <SelectItem value="price-asc">Cena: rosnąco</SelectItem>
                          <SelectItem value="price-desc">Cena: malejąco</SelectItem>
                          <SelectItem value="name-asc">Nazwa: A-Z</SelectItem>
                          <SelectItem value="name-desc">Nazwa: Z-A</SelectItem>
                          <SelectItem value="stock">Dostępność</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* View Mode */}
                    <div className="flex gap-1 border border-gray-300 rounded-md p-1">
                      <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="px-3"
                        data-testid="button-view-grid"
                      >
                        <Grid3x3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="px-3"
                        data-testid="button-view-list"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" 
                : "space-y-4"
              }>
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`bg-gray-200 animate-pulse rounded-xl ${viewMode === "grid" ? "h-96" : "h-48"}`}
                  />
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-in fade-in duration-300" 
                : "space-y-4 animate-in fade-in duration-300"
              }>
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center border-gray-200" data-testid="empty-products">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Brak produktów
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Nie znaleziono produktów spełniających wybrane kryteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setStockFilter("all");
                    }}
                    className="border-gray-300"
                    data-testid="button-clear-search"
                  >
                    Wyczyść filtry
                  </Button>
                </div>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
