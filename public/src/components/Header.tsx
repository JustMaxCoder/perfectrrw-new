
import { Link } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";

export function Header({ cartItemCount = 0 }: { cartItemCount?: number }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-md"
      }`}
      style={{ minHeight: "120px" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Header Row */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 md:py-6">
          {/* Left Block - Logo & Tagline */}
          <Link
            href="/"
            className="flex flex-col gap-1 flex-shrink-0 animate-fade-in"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold whitespace-nowrap">
              <span className="text-black">BHP</span>{" "}
              <span className="text-primary">PERFECT</span>
            </h1>
            <p className="hidden md:block text-xs text-gray-600 max-w-xs leading-tight">
              Professional workwear and personal protective equipment for your safety
            </p>
          </Link>

          {/* Right Block - Cart & Mobile Menu */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/koszyk">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-black text-xs font-bold">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Desktop Navigation - Product Categories */}
        <nav className="hidden md:flex items-center justify-center gap-2 px-6 py-3 border-t">
          <Link
            href="/sklep?category=odziez-robocza"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all hover:translate-y-[-2px]"
          >
            Odzież robocza
          </Link>
          <Link
            href="/sklep?category=obuwie"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all hover:translate-y-[-2px]"
          >
            Obuwie BHP
          </Link>
          <Link
            href="/sklep?category=rekawice"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all hover:translate-y-[-2px]"
          >
            Rękawice
          </Link>
          <Link
            href="/sklep?category=ochrona-glowy"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all hover:translate-y-[-2px]"
          >
            Ochrona głowy
          </Link>
          <Link
            href="/sklep"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all hover:translate-y-[-2px]"
          >
            Wszystkie produkty
          </Link>
        </nav>

        {/* Mobile Menu - Product Categories */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t bg-white max-h-[calc(100vh-140px)] overflow-y-auto animate-slide-down">
            <div className="py-4 px-4 space-y-2">
              <Link
                href="/sklep?category=odziez-robocza"
                className="block py-3 px-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Odzież robocza
              </Link>
              <Link
                href="/sklep?category=obuwie"
                className="block py-3 px-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Obuwie BHP
              </Link>
              <Link
                href="/sklep?category=rekawice"
                className="block py-3 px-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rękawice
              </Link>
              <Link
                href="/sklep?category=ochrona-glowy"
                className="block py-3 px-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ochrona głowy
              </Link>
              <Link
                href="/sklep"
                className="block py-3 px-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wszystkie produkty
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
