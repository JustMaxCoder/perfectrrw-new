
import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              BHP <span className="text-primary">PERFECT</span>
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-sm">
              Professional workwear and personal protective equipment for your safety
            </p>
            <div className="flex items-start gap-2 text-sm text-gray-600 mb-6">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                Bohaterów Modlina 17,<br />
                05-100 Nowy Dwór Mazowiecki
              </span>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-900">Customer Service</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/sledzenie" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Order Status
                </Link>
              </li>
              <li>
                <Link href="/zamowienia" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Complaints
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-900">Information</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/o-nas" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Media
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Partner Program
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Shopping */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-900">Shopping</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/sklep" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Promotions
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Installments & Payments
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Leasing
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  B2B Sales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h4 className="font-semibold text-sm mb-4 text-gray-900">Support</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <a href="tel:+48756756756" className="text-gray-900 font-medium hover:text-primary transition-colors">
                  756 756 756
                </a>
                <p className="text-xs text-gray-500 mt-1">Mon-Fri 08:00-20:00</p>
                <p className="text-xs text-gray-500">Sat-Sun 10:00-18:00</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:col-span-2">
              <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <a href="mailto:kontakt@bhpperfect.pl" className="text-gray-900 font-medium hover:text-primary transition-colors break-all">
                  kontakt@bhpperfect.pl
                </a>
                <p className="text-xs text-gray-500 mt-1">We typically respond within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center space-y-2">
          <p className="text-gray-600 text-sm">
            © {currentYear} BHP Perfect. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            TERG S.A., Ul. Bohaterów Modlina 17, 05-100 Nowy Dwór Mazowiecki | NIP: 123-456-78-90
          </p>
        </div>
      </div>
    </footer>
  );
}
