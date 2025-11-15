
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, ChevronDown, Phone, Mail, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";

export function Header({ cartItemCount = 0 }: { cartItemCount?: number }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const customerServiceLinks = [
    { href: "/kontakt", label: "Contact" },
    { href: "/sledzenie", label: "Order Status" },
    { href: "/zamowienia", label: "Complaints" },
    { href: "/kontakt", label: "Returns" },
    { href: "/kontakt", label: "Terms & Conditions" },
    { href: "/o-nas", label: "About Us" },
    { href: "/kontakt", label: "Careers" },
    { href: "/kontakt", label: "Media" },
    { href: "/kontakt", label: "Partner Program" },
    { href: "/kontakt", label: "Privacy Policy" },
  ];

  const shoppingLinks = [
    { href: "/sklep", label: "All Products" },
    { href: "/sklep?filter=promotions", label: "Promotions" },
    { href: "/kontakt", label: "Installments & Payments" },
    { href: "/kontakt", label: "Leasing" },
    { href: "/kontakt", label: "B2B Sales" },
  ];

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

          {/* Right Block - CTA & Cart */}
          <div className="flex items-center gap-3 md:gap-4">
            <Button
              asChild
              className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-black font-semibold transition-all hover:scale-105 animate-subtle-bounce"
            >
              <Link href="/kontakt">Contact Us</Link>
            </Button>

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-1 px-6 py-3 border-t">
          {/* Customer Service Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("customer-service")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all hover:translate-y-[-2px]">
              Customer Service
              <ChevronDown className="h-4 w-4" />
            </button>
            {activeMenu === "customer-service" && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border animate-slide-down">
                <div className="p-4 grid gap-2">
                  {customerServiceLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="text-sm text-gray-700 hover:text-primary hover:translate-x-1 transition-all py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shopping Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("shopping")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all hover:translate-y-[-2px]">
              Shopping
              <ChevronDown className="h-4 w-4" />
            </button>
            {activeMenu === "shopping" && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border animate-slide-down">
                <div className="p-4 grid gap-2">
                  {shoppingLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="text-sm text-gray-700 hover:text-primary hover:translate-x-1 transition-all py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Support Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("support")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all hover:translate-y-[-2px]">
              Support
              <ChevronDown className="h-4 w-4" />
            </button>
            {activeMenu === "support" && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border animate-slide-down">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <a href="tel:+48756756756" className="text-sm font-medium hover:text-primary transition-colors">
                        756 756 756
                      </a>
                      <p className="text-xs text-gray-500">Mon-Fri 08:00-20:00</p>
                      <p className="text-xs text-gray-500">Sat-Sun 10:00-18:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <a href="mailto:kontakt@bhpperfect.pl" className="text-sm font-medium hover:text-primary transition-colors">
                        kontakt@bhpperfect.pl
                      </a>
                      <p className="text-xs text-gray-500">Response within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t bg-white max-h-[calc(100vh-140px)] overflow-y-auto animate-slide-down">
            <div className="py-4 px-4 space-y-3">
              <Link
                href="/kontakt"
                className="block w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-primary hover:bg-primary/90 text-black font-semibold">
                  Contact Us
                </Button>
              </Link>

              {/* Mobile Accordions */}
              <details className="group">
                <summary className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg cursor-pointer text-sm font-medium">
                  Customer Service
                  <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2 pl-4 space-y-2">
                  {customerServiceLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="block py-2 text-sm text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg cursor-pointer text-sm font-medium">
                  Shopping
                  <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2 pl-4 space-y-2">
                  {shoppingLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="block py-2 text-sm text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg cursor-pointer text-sm font-medium">
                  Support
                  <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <a href="tel:+48756756756" className="text-sm">756 756 756</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href="mailto:kontakt@bhpperfect.pl" className="text-sm break-all">kontakt@bhpperfect.pl</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-xs text-gray-600">Mon-Fri 08:00-20:00, Sat-Sun 10:00-18:00</span>
                  </div>
                </div>
              </details>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
