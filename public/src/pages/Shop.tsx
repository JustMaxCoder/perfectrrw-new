import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Search, SlidersHorizontal, Grid3x3, List, X, Home, ChevronRight, ArrowUpDown } from "lucide-react";
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
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  // Count products per category
  const categoryCount = (categoryValue: string) => {
    if (!products) return 0;
    if (categoryValue === "all") return products.length;
    return products.filter(p => p.category === categoryValue).length;
  };

  // Filter and sort products
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

  // Get active filters
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
    activeFilters.push({ type: "search", label: `Szukaj: "${searchTerm}"`, value: searchTerm });
  }

  // Get current category label for breadcrumbs
  const currentCategoryLabel = categories.find(c => c.value === selectedCategory)?.label || "Wszystkie produkty";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Breadcrumbs */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors" data-testid="breadcrumb-home">
              <Home className="h-4 w-4" />
              <span>Strona główna</span>
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-300">Sklep</span>
            {selectedCategory !== "all" && (
              <>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-primary font-medium">{currentCategoryLabel}</span>
              </>
            )}
          </nav>

          {/* Title and Description */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              {selectedCategory === "all" ? "Wszystkie produkty" : currentCategoryLabel}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              {selectedCategory === "all" 
                ? "Przeglądaj naszą pełną ofertę profesjonalnego sprzętu BHP" 
                : `Sprawdź naszą ofertę w kategorii ${currentCategoryLabel.toLowerCase()}`
              }
            </p>
          </div>
        </div>
      </section>

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
                          className="text-sm cursor-pointer flex-1 flex items-center justify-between"
                        >
                          <span>{category.label}</span>
                          <Badge variant="secondary" className="text-xs">
                            {categoryCount(category.value)}
                          </Badge>
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
            {/* Active Filters and Toolbar */}
            <div className="mb-6 space-y-4">
              {/* Active Filters Tags */}
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Aktywne filtry:</span>
                  {activeFilters.map((filter, index) => (
                    <Badge 
                      key={`${filter.type}-${index}`} 
                      variant="secondary" 
                      className="gap-1 pl-3 pr-2 py-1 hover-elevate active-elevate-2 cursor-pointer"
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
                    className="text-xs"
                    data-testid="button-clear-all-filters"
                  >
                    Wyczyść wszystko
                  </Button>
                </div>
              )}

              {/* Toolbar: Count, Sort, View Mode */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border">
                <p className="text-sm text-muted-foreground" data-testid="text-product-count">
                  Znaleziono <span className="font-semibold text-gray-900">{filteredAndSortedProducts?.length || 0}</span> produktów
                </p>

                <div className="flex items-center gap-3">
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]" data-testid="select-sort">
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

                  {/* View Mode Toggle */}
                  <div className="flex gap-1 border rounded-md p-1">
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
            </div>

            {isLoading ? (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
                : "space-y-4"
              }>
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`bg-gray-200 animate-pulse rounded-lg ${viewMode === "grid" ? "h-96" : "h-48"}`}
                  />
                ))}
              </div>
            ) : filteredAndSortedProducts && filteredAndSortedProducts.length > 0 ? (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in duration-300" 
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
