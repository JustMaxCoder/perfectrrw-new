import { Link } from "wouter";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-3 tracking-tight">
              BHP <span className="text-primary">PERFECT</span>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Profesjonalna odzież robocza i środki ochrony indywidualnej
            </p>
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                Bohaterów Modlina 17,<br />
                05-100 Nowy Dwór Mazowiecki
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-semibold text-sm mb-4 text-gray-900">Sklep</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sklep" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Wszystkie produkty
                </Link>
              </li>
              <li>
                <Link href="/sklep?category=odziez-robocza" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Odzież robocza
                </Link>
              </li>
              <li>
                <Link href="/sklep?category=obuwie" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Obuwie BHP
                </Link>
              </li>
              <li>
                <Link href="/sklep?category=rekawice" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Rękawice
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-span-1">
            <h4 className="font-semibold text-sm mb-4 text-gray-900">Obsługa klienta</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/kontakt" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/sledzenie" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Śledzenie zamówienia
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Regulamin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="font-semibold text-sm mb-4 text-gray-900">Kontakt</h4>
            <div className="space-y-3">
              <a href="tel:+48756756756" className="flex items-center gap-2 text-sm text-gray-900 hover:text-primary transition-colors group">
                <Phone className="h-4 w-4 text-primary" />
                <span>756 756 756</span>
              </a>
              <a href="mailto:kontakt@bhpperfect.pl" className="flex items-center gap-2 text-sm text-gray-900 hover:text-primary transition-colors group break-all">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>kontakt@bhpperfect.pl</span>
              </a>
              <p className="text-xs text-gray-500">Pn-Pt 08:00-20:00<br />Sob-Ndz 10:00-18:00</p>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Accordion */}
        <div className="md:hidden space-y-4">
          {/* Company Info - Always Visible */}
          <div>
            <h3 className="text-xl font-bold mb-3 tracking-tight">
              BHP <span className="text-primary">PERFECT</span>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Profesjonalna odzież robocza i środki ochrony indywidualnej
            </p>
          </div>

          {/* Contact - Always Visible */}
          <div className="space-y-2 pb-4 border-b border-gray-100">
            <a href="tel:+48756756756" className="flex items-center gap-2 text-sm text-gray-900">
              <Phone className="h-4 w-4 text-primary" />
              756 756 756
            </a>
            <a href="mailto:kontakt@bhpperfect.pl" className="flex items-center gap-2 text-sm text-gray-900 break-all">
              <Mail className="h-4 w-4 text-primary" />
              kontakt@bhpperfect.pl
            </a>
          </div>

          {/* Shop Links - Accordion */}
          <div className="border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleSection("shop")}
              className="flex items-center justify-between w-full text-left font-semibold text-sm text-gray-900"
            >
              Sklep
              <ChevronDown className={`h-4 w-4 transition-transform ${openSection === "shop" ? "rotate-180" : ""}`} />
            </button>
            {openSection === "shop" && (
              <ul className="mt-3 space-y-2 pl-2 animate-slide-down">
                <li><Link href="/sklep" className="text-sm text-gray-600">Wszystkie produkty</Link></li>
                <li><Link href="/sklep?category=odziez-robocza" className="text-sm text-gray-600">Odzież robocza</Link></li>
                <li><Link href="/sklep?category=obuwie" className="text-sm text-gray-600">Obuwie BHP</Link></li>
                <li><Link href="/sklep?category=rekawice" className="text-sm text-gray-600">Rękawice</Link></li>
              </ul>
            )}
          </div>

          {/* Customer Service - Accordion */}
          <div>
            <button
              onClick={() => toggleSection("service")}
              className="flex items-center justify-between w-full text-left font-semibold text-sm text-gray-900"
            >
              Obsługa klienta
              <ChevronDown className={`h-4 w-4 transition-transform ${openSection === "service" ? "rotate-180" : ""}`} />
            </button>
            {openSection === "service" && (
              <ul className="mt-3 space-y-2 pl-2 animate-slide-down">
                <li><Link href="/kontakt" className="text-sm text-gray-600">Kontakt</Link></li>
                <li><Link href="/sledzenie" className="text-sm text-gray-600">Śledzenie zamówienia</Link></li>
                <li><Link href="/o-nas" className="text-sm text-gray-600">O nas</Link></li>
                <li><Link href="/kontakt" className="text-sm text-gray-600">Regulamin</Link></li>
              </ul>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center space-y-2">
          <p className="text-sm text-gray-600">
            © {currentYear} BHP Perfect. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-xs text-gray-500">
            TERG S.A., Ul. Bohaterów Modlina 17, 05-100 Nowy Dwór Mazowiecki | NIP: 123-456-78-90
          </p>
        </div>
      </div>
    </footer>
  );
}