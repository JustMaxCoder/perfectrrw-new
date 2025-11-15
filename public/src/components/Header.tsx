
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { SearchBar } from "./SearchBar";
import { useState } from "react";

export function Header({ cartItemCount = 0 }: { cartItemCount?: number }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { href: "/sklep?category=odziez-robocza", label: "Odzież robocza" },
    { href: "/sklep?category=obuwie", label: "Obuwie BHP" },
    { href: "/sklep?category=rekawice", label: "Rękawice" },
    { href: "/sklep?category=ochrona-glowy", label: "Ochrona głowy" },
    { href: "/sklep?category=akcesoria", label: "Akcesoria" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === href;
    return typeof location === 'string' && location.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto">
        {/* Main Header Row */}
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 md:py-4 border-b">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0" data-testid="link-home">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold whitespace-nowrap">
              <span className="text-black">BHP</span>{" "}
              <span className="text-primary">PERFECT</span>
            </h1>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:block flex-1 max-w-2xl mx-6">
            <SearchBar />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Mobile Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link href="/koszyk" data-testid="link-cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative flex-shrink-0"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-black text-xs font-bold"
                    data-testid="badge-cart-count"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden flex-shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Categories Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-1 px-6 py-2 border-b overflow-x-auto">
          <Link
            href="/"
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap hover-elevate ${
              isActive("/") && !location.includes("/sklep") ? "text-primary bg-primary/10" : "text-gray-700 hover:text-primary"
            }`}
          >
            Strona główna
          </Link>
          <Link
            href="/sklep"
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap hover-elevate ${
              location === "/sklep" ? "text-primary bg-primary/10" : "text-gray-700 hover:text-primary"
            }`}
          >
            Wszystkie produkty
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap hover-elevate ${
                isActive(cat.href) ? "text-primary bg-primary/10" : "text-gray-700 hover:text-primary"
              }`}
            >
              {cat.label}
            </Link>
          ))}
          <Link
            href="/o-nas"
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap hover-elevate ${
              isActive("/o-nas") ? "text-primary bg-primary/10" : "text-gray-700 hover:text-primary"
            }`}
          >
            O nas
          </Link>
          <Link
            href="/kontakt"
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap hover-elevate ${
              isActive("/kontakt") ? "text-primary bg-primary/10" : "text-gray-700 hover:text-primary"
            }`}
          >
            Kontakt
          </Link>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t bg-white max-h-[calc(100vh-5rem)] overflow-y-auto">
            {/* Mobile Search */}
            <div className="p-4 border-b">
              <SearchBar />
            </div>

            <div className="py-2">
              <Link
                href="/"
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  isActive("/") && !location.includes("/sklep") ? "text-primary bg-primary/10" : "text-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Strona główna
              </Link>
              <Link
                href="/sklep"
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  location === "/sklep" ? "text-primary bg-primary/10" : "text-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Wszystkie produkty
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(cat.href) ? "text-primary bg-primary/10" : "text-gray-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
              <Link
                href="/o-nas"
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  isActive("/o-nas") ? "text-primary bg-primary/10" : "text-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                O nas
              </Link>
              <Link
                href="/kontakt"
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  isActive("/kontakt") ? "text-primary bg-primary/10" : "text-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontakt
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
