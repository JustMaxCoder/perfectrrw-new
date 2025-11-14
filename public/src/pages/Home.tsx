
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
const bhpBackground = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&h=1080&fit=crop&q=80";
import { BRANDING } from "../config/branding";
import type { Product } from "../../../shared/schema";

export default function Home() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section - Улучшенная версия */}
      <section className="relative text-white min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bhpBackground})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-white drop-shadow-2xl">BHP</span>{" "}
              <span className="text-primary drop-shadow-2xl">PERFECT</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-6 sm:mb-8 drop-shadow-lg leading-relaxed">
              Twoje bezpieczeństwo - nasza pasja! Szeroki wybór produktów BHP w najlepszych cenach.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/sklep" data-testid="button-shop-now" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-black font-bold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Zobacz produkty <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/kontakt" data-testid="button-contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto backdrop-blur-sm bg-white/10 border-2 border-white text-white hover:bg-white hover:text-black px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-bold shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Skontaktuj się z nami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Улучшенная версия */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Nasze kategorie
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Szeroki wybór profesjonalnego sprzętu BHP. Wybierz kategorię i poznaj naszą ofertę.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden h-96 animate-pulse">
                  <div className="h-56 md:h-64 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {[
                  {
                    slug: "odziez-robocza",
                    label: "Odzież robocza",
                    description: "Profesjonalna odzież dla każdego pracownika",
                    gradient: "from-blue-500 to-blue-700"
                  },
                  {
                    slug: "obuwie",
                    label: "Obuwie BHP",
                    description: "Bezpieczne i wytrzymałe obuwie robocze",
                    gradient: "from-amber-500 to-orange-600"
                  },
                  {
                    slug: "rekawice",
                    label: "Rękawice",
                    description: "Ochrona rąk w każdych warunkach",
                    gradient: "from-green-500 to-emerald-700"
                  },
                  {
                    slug: "ochrona-glowy",
                    label: "Ochrona głowy",
                    description: "Kaski i akcesoria ochronne",
                    gradient: "from-red-500 to-rose-700"
                  }
                ].map((category) => {
                  const categoryProducts = products.filter(p => p.category === category.slug);
                  const sampleProduct = categoryProducts[0];

                  return (
                    <Link
                      key={category.slug}
                      href={`/sklep?category=${category.slug}`}
                      data-testid={`category-${category.slug}`}
                    >
                      <div className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100">
                        <div className="relative h-56 md:h-64 overflow-hidden">
                        {sampleProduct ? (
                          <img
                            src={sampleProduct.image}
                            alt={sampleProduct.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                            <Shield className="w-16 h-16 text-white/80" />
                          </div>
                        )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                            {category.label}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            {category.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-primary">
                              {categoryProducts.length} {categoryProducts.length === 1 ? 'produkt' : 'produktów'}
                            </span>
                            <div className="bg-primary/10 rounded-full px-3 py-1 text-xs font-bold text-gray-700">
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
