
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

  const categories = [
    { value: "all", label: "Wszystkie produkty", href: "/sklep" },
    { value: "odziez-robocza", label: "Odzież robocza", href: "/sklep?category=odziez-robocza" },
    { value: "obuwie", label: "Obuwie BHP", href: "/sklep?category=obuwie" },
    { value: "rekawice", label: "Rękawice", href: "/sklep?category=rekawice" },
    { value: "ochrona-glowy", label: "Ochrona głowy", href: "/sklep?category=ochrona-glowy" },
  ];

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleProductClick = (id: string) => {
    setLocation(`/produkt/${id}`);
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleCategoryClick = (href: string) => {
    setLocation(href);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Szukaj produktów lub kategorii..."
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

      {isOpen && (
        <Card className="absolute top-[calc(100%+0.5rem)] left-0 right-0 max-h-96 overflow-y-auto z-[100] shadow-lg border bg-white">
          {searchQuery ? (
            filteredProducts.length > 0 ? (
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
                      className="w-12 h-12 object-cover rounded bg-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{product.name}</p>
                      <p className="text-primary font-bold">{parseFloat(product.price).toFixed(2)} zł</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                Nie znaleziono produktów
              </div>
            )
          ) : (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Kategorie
              </div>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryClick(category.href)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-accent rounded-lg transition-colors text-left"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{category.label}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
