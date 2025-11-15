
import { Link } from "wouter";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Company Info Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900">
            BHP <span className="text-primary">PERFECT</span>
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
            Professional workwear and personal protective equipment for your safety
          </p>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
          <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
          <span>Bohaterów Modlina 17, 05-100 Nowy Dwór Mazowiecki</span>
        </div>

        {/* Expandable Sections */}
        <Accordion type="multiple" className="mb-6">
          {/* Customer Service */}
          <AccordionItem value="customer-service" className="border-gray-200">
            <AccordionTrigger className="text-sm font-semibold text-gray-900 hover:text-primary">
              Customer Service
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pl-1">
                <li>
                  <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/sledzenie" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    Order Status
                  </Link>
                </li>
                <li>
                  <Link href="/zamowienia" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    Complaints
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/o-nas" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    Media
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    Partner Program
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Shopping */}
          <AccordionItem value="shopping" className="border-gray-200">
            <AccordionTrigger className="text-sm font-semibold text-gray-900 hover:text-primary">
              Shopping
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pl-1">
                <li>
                  <Link href="/sklep" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    Promotions
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    Installments & Payments
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    Leasing
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-gray-600 hover:text-primary transition-colors text-sm block">
                    B2B Sales
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Support */}
          <AccordionItem value="support" className="border-gray-200">
            <AccordionTrigger className="text-sm font-semibold text-gray-900 hover:text-primary">
              Support
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pl-1">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <a href="tel:+48756756756" className="text-gray-900 font-medium hover:text-primary transition-colors text-sm">
                      756 756 756
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">Mon-Fri 08:00-20:00</p>
                    <p className="text-xs text-gray-500">Sat-Sun 10:00-18:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <a href="mailto:kontakt@bhpperfect.pl" className="text-gray-900 font-medium hover:text-primary transition-colors text-sm break-all">
                      kontakt@bhpperfect.pl
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200 text-center space-y-2">
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
