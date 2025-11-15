
import { Link } from "wouter";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

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
    <footer className="bg-white border-t border-gray-200 animate-fade-in-up">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Desktop Layout - 3 Columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1: Company Info */}
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              BHP <span className="text-primary">PERFECT</span>
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Professional workwear and personal protective equipment for your safety
            </p>
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5 transition-all hover:scale-110" />
              <span className="leading-relaxed">
                Bohaterów Modlina 17,<br />
                05-100 Nowy Dwór Mazowiecki
              </span>
            </div>
          </div>

          {/* Column 2: Customer Service & Shopping - Accordion Style */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-sm mb-3 text-gray-900 hover:text-primary transition-colors">
                Customer Service
                <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
              </summary>
              <ul className="space-y-2 pl-2 animate-slide-down">
                {customerServiceLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-all text-sm inline-block relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-sm mb-3 text-gray-900 hover:text-primary transition-colors">
                Shopping
                <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
              </summary>
              <ul className="space-y-2 pl-2 animate-slide-down">
                {shoppingLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-all text-sm inline-block relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* Column 3: Support Contacts */}
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <h4 className="font-semibold text-sm mb-4 text-gray-900">Support</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 transition-all group-hover:scale-110 group-hover:brightness-110" />
                <div>
                  <a
                    href="tel:+48756756756"
                    className="text-gray-900 font-medium hover:text-primary transition-colors"
                  >
                    756 756 756
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Mon-Fri 08:00-20:00</p>
                  <p className="text-xs text-gray-500">Sat-Sun 10:00-18:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 transition-all group-hover:scale-110 group-hover:brightness-110" />
                <div>
                  <a
                    href="mailto:kontakt@bhpperfect.pl"
                    className="text-gray-900 font-medium hover:text-primary transition-colors break-all"
                  >
                    kontakt@bhpperfect.pl
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Accordion Sections */}
        <div className="md:hidden space-y-4">
          {/* Company Info - Always Visible */}
          <div className="animate-fade-in-up">
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              BHP <span className="text-primary">PERFECT</span>
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Professional workwear and personal protective equipment for your safety
            </p>
            <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                Bohaterów Modlina 17,<br />
                05-100 Nowy Dwór Mazowiecki
              </span>
            </div>
          </div>

          {/* Support - Always Visible */}
          <div className="border-t pt-4 animate-fade-in-up">
            <h4 className="font-semibold text-sm mb-3 text-gray-900">Support</h4>
            <div className="space-y-3">
              <a
                href="tel:+48756756756"
                className="flex items-center gap-2 text-sm text-gray-900 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-primary" />
                756 756 756
              </a>
              <a
                href="mailto:kontakt@bhpperfect.pl"
                className="flex items-center gap-2 text-sm text-gray-900 hover:text-primary transition-colors break-all"
              >
                <Mail className="h-4 w-4 text-primary" />
                kontakt@bhpperfect.pl
              </a>
            </div>
          </div>

          {/* Customer Service - Accordion */}
          <div className="border-t pt-4">
            <button
              onClick={() => toggleAccordion("customer-service")}
              className="flex items-center justify-between w-full text-left font-semibold text-sm text-gray-900"
            >
              Customer Service
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openAccordion === "customer-service" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === "customer-service" && (
              <ul className="mt-3 space-y-2 pl-2 animate-slide-down">
                {customerServiceLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Shopping - Accordion */}
          <div className="border-t pt-4">
            <button
              onClick={() => toggleAccordion("shopping")}
              className="flex items-center justify-between w-full text-left font-semibold text-sm text-gray-900"
            >
              Shopping
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openAccordion === "shopping" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAccordion === "shopping" && (
              <ul className="mt-3 space-y-2 pl-2 animate-slide-down">
                {shoppingLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center space-y-2 animate-fade-in-up">
          <p className="text-gray-600 text-sm hover:text-primary transition-all hover:scale-105 inline-block">
            © {currentYear} BHP Perfect. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs hover:text-gray-700 transition-all hover:scale-105 inline-block">
            TERG S.A., Ul. Bohaterów Modlina 17, 05-100 Nowy Dwór Mazowiecki | NIP: 123-456-78-90
          </p>
        </div>
      </div>
    </footer>
  );
}
