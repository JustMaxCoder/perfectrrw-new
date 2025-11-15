
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Slider } from "../components/ui/slider";
import { Search, Grid3x3, List, X, ArrowUpDown, Filter, Package } from "lucide-react";
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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

  const { minPrice, maxPrice } = useMemo(() => {
    if (!products || products.length === 0) return { minPrice: 0, maxPrice: 1000 };
    const prices = products.map(p => parseFloat(p.price));
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices))
    };
  }, [products]);

  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

  useEffect(() => {
    if (products && products.length > 0 && priceRange[0] === 0 && priceRange[1] === 1000) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice, products]);

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

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
    const matchesPrice =
      parseFloat(product.price) >= priceRange[0] &&
      parseFloat(product.price) <= priceRange[1];

    return matchesSearch && matchesCategory && matchesStock && matchesPrice;
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
  if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
    activeFilters.push({ 
      type: "price", 
      label: `${priceRange[0].toFixed(0)} - ${priceRange[1].toFixed(0)} zł`, 
      value: "price" 
    });
  }

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setStockFilter("all");
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Hero Search Bar - 2025 Minimalist Design */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-primary" />
              <Input
                type="search"
                placeholder="Szukaj produktów BHP…"
                className="pl-14 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-primary shadow-sm hover:shadow-md transition-all bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Sticky & Minimalist */}
          <aside className="lg:w-72 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="w-full lg:hidden mb-4 border-2"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtry {activeFilters.length > 0 && `(${activeFilters.length})`}
            </Button>

            <div className={`bg-white rounded-xl shadow-md p-5 lg:sticky lg:top-24 transition-all ${
              mobileFiltersOpen ? 'block animate-slide-down' : 'hidden lg:block'
            }`}>
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                Filtry
              </h2>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <Label className="text-sm font-bold mb-3 block text-gray-900">Kategoria</Label>
                  <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                    {categories.map((category) => (
                      <div key={category.value} className="flex items-center space-x-2 mb-2 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <RadioGroupItem value={category.value} id={category.value} className="border-2" />
                        <Label htmlFor={category.value} className="text-sm cursor-pointer flex-1 flex items-center justify-between">
                          <span className="group-hover:text-primary transition-colors">{category.label}</span>
                          <Badge variant="secondary" className="text-xs font-semibold">
                            {categoryCount(category.value)}
                          </Badge>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Stock Filter */}
                <div className="pt-4 border-t border-gray-100">
                  <Label className="text-sm font-bold mb-3 block text-gray-900">Dostępność</Label>
                  <RadioGroup value={stockFilter} onValueChange={setStockFilter}>
                    <div className="flex items-center space-x-2 mb-2 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <RadioGroupItem value="all" id="stock-all" data-testid="radio-stock-all" />
                      <Label htmlFor="stock-all" className="text-sm cursor-pointer">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <RadioGroupItem value="in-stock" id="stock-in" data-testid="radio-stock-in" />
                      <Label htmlFor="stock-in" className="text-sm cursor-pointer flex items-center gap-2">
                        W magazynie
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <RadioGroupItem value="out-of-stock" id="stock-out" data-testid="radio-stock-out" />
                      <Label htmlFor="stock-out" className="text-sm cursor-pointer flex items-center gap-2">
                        Brak w magazynie
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Price Filter - Dual Slider */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-sm font-bold text-gray-900">Cena</Label>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded" data-testid="text-price-range">
                      {priceRange[0]} - {priceRange[1]} zł
                    </span>
                  </div>
                  <Slider
                    min={minPrice}
                    max={maxPrice}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="w-full mb-2"
                    data-testid="slider-price"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{minPrice} zł</span>
                    <span>{maxPrice} zł</span>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <Button
                  variant="outline"
                  className="w-full border-2 hover:bg-primary hover:text-black hover:border-primary transition-all font-semibold"
                  onClick={clearAllFilters}
                  data-testid="button-clear-filters"
                >
                  <X className="h-4 w-4 mr-2" />
                  Wyczyść filtry
                </Button>
              </div>
            </div>
          </aside>

          {/* Products Main Section */}
          <main className="flex-1">
            {/* Active Filters - With Animations */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4 animate-slide-down">
                <span className="text-sm font-semibold text-gray-700">Aktywne:</span>
                {activeFilters.map((filter, index) => (
                  <Badge 
                    key={`${filter.type}-${index}`} 
                    className="gap-1 cursor-pointer bg-primary text-black hover:bg-primary/90 transition-all hover:scale-105 shadow-sm"
                    onClick={() => {
                      if (filter.type === "category") setSelectedCategory("all");
                      if (filter.type === "stock") setStockFilter("all");
                      if (filter.type === "search") setSearchTerm("");
                      if (filter.type === "price") setPriceRange([minPrice, maxPrice]);
                    }}
                    data-testid={`badge-filter-${filter.type}`}
                  >
                    {filter.label}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}

            {/* Toolbar - Minimalist 2025 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-md mb-6 border border-gray-100">
              <p className="text-sm text-gray-600">
                Znaleziono <span className="font-bold text-black text-base">{filteredAndSortedProducts.length}</span> produktów
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-gray-500 hidden sm:block" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[200px] border-2" data-testid="select-sort">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Domyślnie</SelectItem>
                      <SelectItem value="price-asc">Cena: rosnąco ↑</SelectItem>
                      <SelectItem value="price-desc">Cena: malejąco ↓</SelectItem>
                      <SelectItem value="name-asc">Nazwa: A-Z</SelectItem>
                      <SelectItem value="name-desc">Nazwa: Z-A</SelectItem>
                      <SelectItem value="stock">Najpopularniejsze</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-1 border-2 border-gray-200 rounded-lg p-1 bg-gray-50">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`transition-all ${viewMode === "grid" ? 'bg-primary text-black' : ''}`}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`transition-all ${viewMode === "list" ? 'bg-primary text-black' : ''}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List with Loading States */}
            {isLoading ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`bg-gray-200 animate-pulse rounded-xl ${viewMode === "grid" ? "h-96" : "h-48"}`} />
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className={`${viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"} animate-fade-in`}>
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
              <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-300 animate-fade-in">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl font-semibold text-gray-700 mb-2">Nie znaleziono produktów</p>
                <p className="text-sm text-gray-500 mb-6">Spróbuj zmienić kryteria wyszukiwania</p>
                <Button
                  onClick={clearAllFilters}
                  className="bg-primary text-black hover:bg-primary/90 font-semibold"
                  data-testid="button-clear-filters-empty"
                >
                  <X className="h-4 w-4 mr-2" />
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
