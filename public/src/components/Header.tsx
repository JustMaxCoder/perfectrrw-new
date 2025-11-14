import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { SearchBar } from "./SearchBar";
import { useState } from "react";

export function Header({ cartItemCount = 0 }: { cartItemCount?: number }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Strona główna" },
    { href: "/sklep", label: "Sklep" },
    { href: "/o-nas", label: "O nas" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === href;
    return location.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center" data-testid="link-home">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              <span className="text-white">BHP</span>{" "}
              <span className="text-primary">PERFECT</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-md font-medium transition-colors hover-elevate active-elevate-2 ${
                  isActive(item.href) ? "text-primary" : "text-white"
                }`}
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
                {isActive(item.href) && (
                  <div className="h-0.5 bg-primary mt-1 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Link href="/koszyk" data-testid="link-cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:text-primary"
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

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Mobile Search */}
            <div className="px-4 mb-4">
              <SearchBar />
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-4 rounded-md font-medium transition-colors touch-manipulation ${
                  isActive(item.href)
                    ? "text-primary bg-white/5"
                    : "text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}