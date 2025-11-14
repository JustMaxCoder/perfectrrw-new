
import { Card } from "../components/ui/card";
import { Shield, Award, Users, Truck, Target, Heart } from "lucide-react";
import storePhoto from "../assets/store-photo.jpg";
import { useQuery } from "@tanstack/react-query";
import type { Gallery } from "../../../shared/schema";
import { useState } from "react";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { MapComponent } from "../components/MapComponent";

export default function About() {
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

  const features = [
    {
      icon: Shield,
      title: "Bezpieczeństwo",
      description: "Wszystkie produkty spełniają najwyższe normy bezpieczeństwa UE",
    },
    {
      icon: Award,
      title: "Jakość",
      description: "Współpracujemy tylko ze sprawdzonymi producentami",
    },
    {
      icon: Users,
      title: "Doświadczenie",
      description: "Ponad 15 lat doświadczenia w branży BHP",
    },
    {
      icon: Truck,
      title: "Szybka dostawa",
      description: "Wysyłka w 24h do całej Polski",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            O <span className="text-primary">BHP Perfect</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Twój partner w zakresie bezpieczeństwa pracy od 2009 roku
          </p>
        </div>
      </section>

      {/* Mission Section - Simplified */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary rounded-full p-2">
                  <Target className="h-6 w-6 text-black" />
                </div>
                <h2 className="text-3xl font-bold">Nasza misja</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                BHP Perfect to więcej niż sklep - jesteśmy partnerem w zapewnieniu bezpieczeństwa
                Twoich pracowników. Od ponad 15 lat dostarczamy najwyższej jakości odzież roboczą,
                obuwie BHP i środki ochrony osobistej.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Współpracujemy tylko ze sprawdzonymi producentami, którzy spełniają wszystkie
                normy bezpieczeństwa Unii Europejskiej. Każdy produkt w naszej ofercie jest
                starannie wyselekcjonowany i przetestowany.
              </p>
            </div>
            <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20">
              <img
                src={storePhoto}
                alt="Sklep BHP Perfect"
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Dlaczego <span className="text-primary">my?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Przekonaj się, co wyróżnia nas na rynku
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover-elevate bg-white">
                <div className="bg-primary rounded-full p-4 inline-flex mb-4">
                  <feature.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="bg-primary rounded-full p-2">
                <Heart className="h-6 w-6 text-black" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Nasza <span className="text-primary">Galeria</span>
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Zobacz naszą firmę i produkty w akcji
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
            </div>
          ) : (
            <div className="relative px-8 sm:px-12 md:px-16">
              <div className="overflow-hidden rounded-2xl shadow-2xl bg-gray-50">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                >
                  {gallery.map((img, index) => (
                    <div key={img.id} className="min-w-full">
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
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Location Section with Map */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Nasza <span className="text-primary">lokalizacja</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-2">
              Odwiedź nas w Nowym Dworze Mazowieckim
            </p>
            <p className="text-lg font-semibold text-gray-900">
              Bohaterów Modlina 17, 05-100 Nowy Dwór Mazowiecki
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <MapComponent />
          </div>
        </div>
      </section>
    </div>
  );
}
