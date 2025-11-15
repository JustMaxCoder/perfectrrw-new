
import { Link } from "wouter";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";

export function Header({ cartItemCount = 0 }: { cartItemCount?: number }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/98 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? "shadow-sm border-b border-gray-100" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Header Row */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 animate-fade-in group"
          >
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              <span className="text-black">BHP</span>{" "}
              <span className="text-primary transition-colors">PERFECT</span>
            </h1>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          {/* Right Block - Cart & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Link href="/koszyk">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative transition-minimal hover:bg-primary/10"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-black text-xs font-bold border-2 border-white">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden transition-minimal"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>

        {/* Desktop Navigation - Clean Categories */}
        <nav className="hidden md:flex items-center justify-center gap-1 px-6 py-2 border-t border-gray-100">
          <Link
            href="/sklep"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
          >
            Wszystkie produkty
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/sklep?category=odziez-robocza"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
          >
            Odzież robocza
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/sklep?category=obuwie"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
          >
            Obuwie BHP
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/sklep?category=rekawice"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
          >
            Rękawice
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/sklep?category=ochrona-glowy"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
          >
            Ochrona głowy
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/kontakt"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
          >
            Kontakt
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-100 bg-white animate-slide-down">
            <div className="py-3 px-4 space-y-1">
              <Link
                href="/sklep"
                className="block py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wszystkie produkty
              </Link>
              <Link
                href="/sklep?category=odziez-robocza"
                className="block py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Odzież robocza
              </Link>
              <Link
                href="/sklep?category=obuwie"
                className="block py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Obuwie BHP
              </Link>
              <Link
                href="/sklep?category=rekawice"
                className="block py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rękawice
              </Link>
              <Link
                href="/sklep?category=ochrona-glowy"
                className="block py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ochrona głowy
              </Link>
              <Link
                href="/kontakt"
                className="block py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md transition-colors"
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
