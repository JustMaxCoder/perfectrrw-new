
import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold mb-3">
              <span className="text-white">BHP</span>{" "}
              <span className="text-primary">PERFECT</span>
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-2">
              Profesjonalna odzież robocza i środki ochrony osobistej.
            </p>
            <div className="flex items-start gap-2 text-xs text-gray-400">
              <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">Bohaterów Modlina 17, 05-100 Nowy Dwór Mazowiecki</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Szybkie linki</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors text-xs inline-block" data-testid="link-footer-home">
                  Strona główna
                </Link>
              </li>
              <li>
                <Link href="/sklep" className="text-gray-400 hover:text-primary transition-colors text-xs inline-block" data-testid="link-footer-shop">
                  Sklep
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="text-gray-400 hover:text-primary transition-colors text-xs inline-block" data-testid="link-footer-about">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary transition-colors text-xs inline-block" data-testid="link-footer-contact">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Kategorie</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/sklep?category=odziez-robocza" className="text-gray-400 hover:text-primary transition-colors text-xs inline-block" data-testid="link-category-workwear">
                  Odzież robocza
                </Link>
              </li>
              <li>
                <Link href="/sklep?category=obuwie" className="text-gray-400 hover:text-primary transition-colors text-xs inline-block" data-testid="link-category-footwear">
                  Obuwie BHP
                </Link>
              </li>
              <li>
                <Link href="/sklep?category=rekawice" className="text-gray-400 hover:text-primary transition-colors text-xs inline-block" data-testid="link-category-gloves">
                  Rękawice ochronne
                </Link>
              </li>
              <li>
                <Link href="/sklep?category=ochrona-glowy" className="text-gray-400 hover:text-primary transition-colors text-xs inline-block" data-testid="link-category-safety">
                  Ochrona głowy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Kontakt</h4>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 text-xs text-gray-400">
                <Phone className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                <a href="tel:+48123456789" className="hover:text-primary transition-colors">+48 123 456 789</a>
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-400">
                <Mail className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                <a href="mailto:kontakt@sklepbhp.pl" className="hover:text-primary transition-colors break-all">kontakt@sklepbhp.pl</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 pt-4 text-center">
          <p className="text-gray-400 text-xs">
            &copy; {currentYear} BHP Perfect. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
