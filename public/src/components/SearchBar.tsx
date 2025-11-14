import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useLocation } from "wouter";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../../../shared/schema";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleProductClick = (id: string) => {
    setLocation(`/produkt/${id}`);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Szukaj produktów..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => {
              setSearchQuery("");
              setIsOpen(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && searchQuery && (
        <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto z-50">
          {filteredProducts.length > 0 ? (
            <div className="p-2">
              {filteredProducts.slice(0, 5).map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-accent rounded-lg transition-colors text-left"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded bg-gray-100"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-primary font-bold">{parseFloat(product.price).toFixed(2)} zł</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              Nie znaleziono produktów
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

interface SearchBarProps {
  className?: string;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function SearchBar({ className = "" }: SearchBarProps) {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: searchResults = [], isLoading } = useQuery<Product[]>({
    queryKey: [`/api/products/search?q=${encodeURIComponent(debouncedSearch)}`],
    enabled: debouncedSearch.length >= 2,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchQuery]);

  const handleProductClick = (productId: string) => {
    setLocation(`/produkt/${productId}`);
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
        <Input
          type="text"
          placeholder="Szukaj produktów..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-9 bg-white/10 dark:bg-white/10 border-white/20 dark:border-white/20 text-white dark:text-white placeholder:text-white/60 dark:placeholder:text-white/60 focus:bg-white/20 dark:focus:bg-white/20"
          data-testid="input-search"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white dark:text-white/60 dark:hover:text-white"
            onClick={handleClearSearch}
            data-testid="button-clear-search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && searchQuery.length >= 2 && (
        <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto z-50 shadow-lg">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground" data-testid="text-loading">
              Wyszukiwanie...
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="w-full px-4 py-3 flex items-center gap-3 hover-elevate active-elevate-2 text-left"
                  data-testid={`button-search-result-${product.id}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                    data-testid={`img-product-${product.id}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate" data-testid={`text-product-name-${product.id}`}>
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground truncate" data-testid={`text-product-category-${product.id}`}>
                      {product.category}
                    </p>
                  </div>
                  <p className="font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
                    {Number(product.price).toFixed(2)} zł
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground" data-testid="text-no-results">
              Nie znaleziono produktów
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
