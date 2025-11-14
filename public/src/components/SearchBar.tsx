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


