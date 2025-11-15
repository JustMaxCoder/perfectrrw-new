
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import bhpBackground from "@assets/bhp-hero.jpg";
import categoryOdziezRobocza from "@assets/category-odziez-robocza.jpg";
import categoryObuwie from "@assets/category-obuwie.jpg";
import categoryRekawice from "@assets/category-rekawice.jpg";
import categoryOchronaGlowy from "@assets/category-ochrona-glowy.jpg";
import { BRANDING } from "../config/branding";
import type { Product } from "../../../shared/schema";

export default function Home() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section - Mobile-First Design */}
      <section className="relative text-white min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center animate-fade-in" style={{ backgroundImage: `url(${bhpBackground})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 animate-gradient" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 w-full">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight animate-slide-in-left">
              <span className="text-white drop-shadow-2xl">BHP</span>{" "}
              <span className="text-primary drop-shadow-2xl">PERFECT</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-5 sm:mb-6 md:mb-8 drop-shadow-lg leading-relaxed animate-slide-in-left" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Twoje bezpieczeństwo - nasza pasja! Szeroki wybór produktów BHP w najlepszych cenach.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-in-left" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <Link href="/sklep" data-testid="button-shop-now" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-black font-bold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 group min-h-[52px]"
                >
                  Zobacz produkty <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/kontakt" data-testid="button-contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto backdrop-blur-sm bg-white/10 border-2 border-white text-white hover:bg-white hover:text-black active:bg-white active:text-black px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-bold shadow-xl transition-all duration-300 active:scale-95 min-h-[52px]"
                >
                  Skontaktuj się z nami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Mobile-First with Horizontal Scroll */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900">
              Nasze kategorie
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Szeroki wybór profesjonalnego sprzętu BHP. Wybierz kategorię i poznaj naszą ofertę.
            </p>
          </div>

          {isLoading ? (
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden h-80 sm:h-96 animate-pulse">
                    <div className="h-48 sm:h-56 md:h-64 bg-gray-200" />
                    <div className="p-4 sm:p-6 space-y-3">
                      <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Mobile: Horizontal Scroll */}
              <div className="lg:hidden overflow-x-auto pb-4 -mb-4 scrollbar-hide">
                <div className="flex gap-4 px-4 min-w-min">
                {[
                  {
                    slug: "odziez-robocza",
                    label: "Odzież robocza",
                    description: "Profesjonalna odzież dla każdego pracownika",
                    image: categoryOdziezRobocza
                  },
                  {
                    slug: "obuwie",
                    label: "Obuwie BHP",
                    description: "Bezpieczne i wytrzymałe obuwie robocze",
                    image: categoryObuwie
                  },
                  {
                    slug: "rekawice",
                    label: "Rękawice",
                    description: "Ochrona rąk w każdych warunkach",
                    image: categoryRekawice
                  },
                  {
                    slug: "ochrona-glowy",
                    label: "Ochrona głowy",
                    description: "Kaski i akcesoria ochronne",
                    image: categoryOchronaGlowy
                  }
                ].map((category) => {
                  const categoryProducts = products.filter(p => p.category === category.slug);

                  return (
                    <Link
                      key={category.slug}
                      href={`/sklep?category=${category.slug}`}
                      data-testid={`category-${category.slug}`}
                    >
                      <div className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden category-card-hover border border-gray-100">
                        <div className="relative h-56 md:h-64 overflow-hidden">
                          <img
                            src={category.image}
                            alt={category.label}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          {/* Hover overlay with icon */}
                          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <ArrowRight className="h-12 w-12 text-primary transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                            {category.label}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            {category.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-primary group-hover:scale-105 transition-transform duration-300 inline-block">
                              {categoryProducts.length} {categoryProducts.length === 1 ? 'produkt' : 'produktów'}
                            </span>
                            <div className="bg-primary/10 rounded-full px-3 py-1 text-xs font-bold text-gray-700 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                              BHP
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      </div>
  );
}
