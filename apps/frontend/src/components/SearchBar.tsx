
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  const [, setLocation] = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Закрытие при клике вне компонента
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Категории
  const categories = [
    { value: "all", label: "Wszystkie produkty", href: "/sklep" },
    { value: "odziez-robocza", label: "Odzież robocza", href: "/sklep?category=odziez-robocza" },
    { value: "obuwie", label: "Obuwie BHP", href: "/sklep?category=obuwie" },
    { value: "rekawice", label: "Rękawice", href: "/sklep?category=rekawice" },
    { value: "ochrona-glowy", label: "Ochrona głowy", href: "/sklep?category=ochrona-glowy" },
  ];

  // Фильтрация продуктов
  const filteredProducts = searchQuery
    ? (products || []).filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Обработчики
  const handleProductClick = (id: string) => {
    setSearchQuery("");
    setIsOpen(false);
    setLocation(`/produkt/${id}`);
  };

  const handleCategoryClick = (href: string) => {
    setSearchQuery("");
    setIsOpen(false);
    setLocation(href);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  // Вычисление позиции dropdown
  const getDropdownStyle = (): React.CSSProperties => {
    if (!searchRef.current) return {};
    
    const rect = searchRef.current.getBoundingClientRect();
    return {
      position: "fixed",
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      zIndex: 9999,
    };
  };

  return (
    <>
      <div className="relative w-full" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Szukaj produktów lub kategorii..."
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="pl-9 pr-9"
            autoComplete="off"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isOpen && typeof document !== "undefined" &&
        createPortal(
          <Card
            className="max-h-96 overflow-y-auto shadow-lg border bg-white"
            style={getDropdownStyle()}
          >
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
                        <p className="text-primary font-bold">
                          {parseFloat(product.price).toFixed(2)} zł
                        </p>
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
          </Card>,
          document.body
        )}
    </>
  );
}
