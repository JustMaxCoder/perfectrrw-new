
import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-white">BHP</span>{" "}
              <span className="text-primary">PERFECT</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Profesjonalna odzież robocza i środki ochrony osobistej dla Twojego bezpieczeństwa.
            </p>
            <div className="flex items-start gap-2 text-sm text-gray-400 mb-4">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">Bohaterów Modlina 17,<br />05-100 Nowy Dwór Mazowiecki</span>
            </div>
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-base mb-4">Obsługa klienta</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/sledzenie" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  Status zamówienia
                </Link>
              </li>
              <li>
                <Link href="/zamowienia" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  Reklamacje
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  Zwroty
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  Regulamin
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold text-base mb-4">Informacje</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/o-nas" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  O firmie
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  Praca
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  Dla mediów
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  Program Partnerski
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  Polityka prywatności
                </Link>
              </li>
            </ul>
          </div>

          {/* Shopping */}
          <div>
            <h4 className="font-semibold text-base mb-4">Zakupy</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sklep" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  Wszystkie produkty
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  Promocje
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  Raty i płatności
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  Leasing
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary transition-colors text-sm inline-block">
                  Sprzedaż B2B
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-base mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li>
                <div className="text-sm font-medium mb-1">Pomoc</div>
                <a href="tel:+48756756756" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  756 756 756
                </a>
              </li>
              <li>
                <div className="text-xs text-gray-500 mb-1">pon.-pt. 08:00-20:00</div>
                <div className="text-xs text-gray-500">sob.-niedz. 10:00-18:00</div>
              </li>
              <li>
                <a href="mailto:kontakt@bhpperfect.pl" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm break-all">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  kontakt@bhpperfect.pl
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-xs mb-2">
            &copy; {currentYear} BHP Perfect. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-gray-500 text-xs">
            TERG S.A. Ul. Bohaterów Modlina 17, 05-100 Nowy Dwór Mazowiecki | NIP: 123-456-78-90
          </p>
        </div>
      </div>
    </footer>
  );
}
