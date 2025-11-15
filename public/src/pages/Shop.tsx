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
import { Search, Grid3x3, List, X, ArrowUpDown } from "lucide-react";
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
  const [hasUserSetCustomPrice, setHasUserSetCustomPrice] = useState(false);

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
    if (products && products.length > 0) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice, products]);

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    setHasUserSetCustomPrice(true);
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
    activeFilters.push({ type: "search", label: `Szukaj: "${searchTerm}"`, value: searchTerm });
  }
  if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
    activeFilters.push({ 
      type: "price", 
      label: `${priceRange[0].toFixed(2)} zł - ${priceRange[1].toFixed(2)} zł`, 
      value: "price" 
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar - Center Top */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Szukaj produktów..."
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-5 sticky top-20">
              <h2 className="text-lg font-bold mb-4">Filtry</h2>

              <div className="space-y-5">
                {/* Category Filter */}
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Kategoria</Label>
                  <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                    {categories.map((category) => (
                      <div key={category.value} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={category.value} id={category.value} />
                        <Label htmlFor={category.value} className="text-sm cursor-pointer flex-1 flex items-center justify-between">
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
                  <Label className="text-sm font-semibold mb-2 block">Dostępność</Label>
                  <RadioGroup value={stockFilter} onValueChange={setStockFilter}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="all" id="stock-all" data-testid="radio-stock-all" />
                      <Label htmlFor="stock-all" className="text-sm cursor-pointer">Wszystkie</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="in-stock" id="stock-in" data-testid="radio-stock-in" />
                      <Label htmlFor="stock-in" className="text-sm cursor-pointer">W magazynie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="out-of-stock" id="stock-out" data-testid="radio-stock-out" />
                      <Label htmlFor="stock-out" className="text-sm cursor-pointer">Brak w magazynie</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Price Filter */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-semibold">Cena</Label>
                    <span className="text-xs text-muted-foreground" data-testid="text-price-range">
                      {priceRange[0].toFixed(2)} zł - {priceRange[1].toFixed(2)} zł
                    </span>
                  </div>
                  <Slider
                    min={minPrice}
                    max={maxPrice}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="w-full"
                    data-testid="slider-price"
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setStockFilter("all");
                    setPriceRange([minPrice, maxPrice]);
                    setHasUserSetCustomPrice(false);
                  }}
                  data-testid="button-clear-filters"
                >
                  Wyczyść filtry
                </Button>
              </div>
            </div>
          </aside>

          {/* Products */}
          <main className="flex-1">
            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm font-medium">Aktywne:</span>
                {activeFilters.map((filter, index) => (
                  <Badge 
                    key={`${filter.type}-${index}`} 
                    variant="secondary" 
                    className="gap-1 cursor-pointer"
                    onClick={() => {
                      if (filter.type === "category") setSelectedCategory("all");
                      if (filter.type === "stock") setStockFilter("all");
                      if (filter.type === "search") setSearchTerm("");
                      if (filter.type === "price") {
                        setPriceRange([minPrice, maxPrice]);
                        setHasUserSetCustomPrice(false);
                      }
                    }}
                    data-testid={`badge-filter-${filter.type}`}
                  >
                    {filter.label}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-black">{filteredAndSortedProducts.length}</span> produktów
              </p>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-gray-500" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]" data-testid="select-sort">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Domyślnie</SelectItem>
                      <SelectItem value="price-asc">Cena ↑</SelectItem>
                      <SelectItem value="price-desc">Cena ↓</SelectItem>
                      <SelectItem value="popularity">Popularne</SelectItem>
                      <SelectItem value="newest">Nowości</SelectItem>
                      <SelectItem value="name-asc">Nazwa A-Z</SelectItem>
                      <SelectItem value="name-desc">Nazwa Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-4"}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`bg-gray-200 animate-pulse rounded-xl ${viewMode === "grid" ? "h-96" : "h-48"}`} />
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className={`${viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-4"} animate-fade-in`}>
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
              <div className="text-center py-16 bg-white rounded-xl">
                <p className="text-xl text-gray-500 mb-4">Nie znaleziono produktów</p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setStockFilter("all");
                    setPriceRange([minPrice, maxPrice]);
                    setHasUserSetCustomPrice(false);
                  }}
                  data-testid="button-clear-filters-empty"
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