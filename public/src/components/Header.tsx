
import { Link } from "wouter";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/98 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? "shadow-sm border-b border-gray-100" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Header Row - Mobile Optimized */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 gap-2 sm:gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 animate-fade-in group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              <span className="text-black">BHP</span>{" "}
              <span className="text-primary transition-colors">PERFECT</span>
            </h1>
          </Link>

          {/* Search Bar - Desktop Only */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <SearchBar /> 
          </div>

          {/* Right Block - Cart & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Cart Button - Mobile Optimized */}
            <Link href="/koszyk">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative transition-minimal hover:bg-primary/10 h-11 w-11 sm:h-10 sm:w-10"
              >
                <ShoppingCart className="h-5 w-5 sm:h-5 sm:w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-black text-xs font-bold border-2 border-white">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden transition-minimal h-11 w-11"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden px-3 pb-3">
          <SearchBar />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-1 px-6 py-2 border-t border-gray-100">
          <Link
            href="/sklep"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
          >
            Wszystkie produkty
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

        {/* Mobile Menu - Full Screen Overlay */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 md:hidden z-40 animate-fade-in"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <nav className="fixed top-[73px] left-0 right-0 bottom-0 bg-white md:hidden z-50 animate-slide-down overflow-y-auto">
              <div className="py-4 px-3 space-y-1">
                <Link
                  href="/sklep"
                  className="block py-4 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors active:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Wszystkie produkty
                </Link>
                <Link
                  href="/kontakt"
                  className="block py-4 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors active:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kontakt
                </Link>
                <Link
                  href="/o-nas"
                  className="block py-4 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors active:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  O nas
                </Link>
                <Link
                  href="/sledzenie"
                  className="block py-4 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors active:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Śledź zamówienie
                </Link>
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}
