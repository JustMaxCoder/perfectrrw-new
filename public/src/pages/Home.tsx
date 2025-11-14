
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { MapComponent } from "../components/MapComponent";
import { ArrowRight, Shield, ChevronLeft, ChevronRight, X } from "lucide-react";
const bhpBackground = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&h=1080&fit=crop&q=80";
import { BRANDING } from "../config/branding";
import type { Product, Gallery } from "../../../shared/schema";
import { useState } from "react";
import { Dialog, DialogContent } from "../components/ui/dialog";

export default function Home() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: gallery = [], isLoading: galleryLoading } = useQuery<Gallery[]>({
    queryKey: ["/api/gallery"],
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % Math.max(1, gallery.length));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % Math.max(1, gallery.length));
  };

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

      {/* CTA Section - Moved higher */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-primary via-yellow-400 to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-black">
            Potrzebujesz pomocy w wyborze?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-900 max-w-2xl mx-auto leading-relaxed">
            Nasi specjaliści pomogą Ci dobrać odpowiednie środki ochrony osobistej.
          </p>
          <Link href="/kontakt" data-testid="button-cta-contact" className="inline-block w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-black text-white border-2 border-black hover:bg-white hover:text-black font-bold px-6 sm:px-8 md:px-10 py-4 sm:py-6 text-base sm:text-lg shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Skontaktuj się z nami <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Gallery Section - Улучшенная версия */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Nasza <span className="text-primary">Galeria</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Zobacz nasze produkty i naszą firmę w akcji
            </p>
          </div>

          {galleryLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Ładowanie galerii...</p>
            </div>
          ) : gallery.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
              <Shield className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg mb-2">Brak zdjęć w galerii</p>
              <p className="text-gray-400 text-sm">Dodaj zdjęcia w panelu administracyjnym</p>
            </div>
          ) : (
            <div className="relative px-8 sm:px-12 md:px-16">
              <div className="overflow-hidden rounded-2xl shadow-2xl bg-gray-50">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                >
                  {gallery.map((img, index) => (
                    <div
                      key={img.id}
                      className="min-w-full"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6">
                        {gallery.slice(
                          Math.floor(index / 4) * 4,
                          Math.floor(index / 4) * 4 + 4
                        ).map((galleryImg) => (
                          <div
                            key={galleryImg.id}
                            className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:z-10 bg-white"
                            onClick={() => setSelectedImage(galleryImg)}
                          >
                            <img
                              src={galleryImg.path}
                              alt={galleryImg.filename}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <p className="text-sm font-medium truncate">{galleryImg.filename}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {gallery.length > 4 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-3 shadow-xl transition-all hover:scale-110 active:scale-95 z-10"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-3 shadow-xl transition-all hover:scale-110 active:scale-95 z-10"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </>
              )}

              {gallery.length > 4 && (
                <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                  {Array.from({ length: Math.ceil(gallery.length / 4) }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx * 4)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        Math.floor(currentImageIndex / 4) === idx
                          ? 'bg-primary w-8'
                          : 'bg-gray-300 w-2 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Image Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-0">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.path}
                alt={selectedImage.filename}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-6 rounded-b-lg">
                <p className="text-white text-center text-base sm:text-lg font-medium">
                  {selectedImage.filename}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Location Section - Улучшенная версия */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nasza lokalizacja
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Odwiedź nas w Nowym Dworze Mazowieckim
            </p>
          </div>
        </div>
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <MapComponent />
          </div>
        </div>
      </section>

      </div>
  );
}
