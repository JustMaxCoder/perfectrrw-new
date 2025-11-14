import { Card } from "../components/ui/card";
import { Shield, Award, Users, Truck, ChevronLeft, ChevronRight, X } from "lucide-react";
import storePhoto from "../assets/store-photo.jpg";
import { BRANDING } from "../config/branding";
import { useQuery } from "@tanstack/react-query";
import type { Gallery } from "../../../shared/schema";
import { useState } from "react";
import { Dialog, DialogContent } from "../components/ui/dialog";

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
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">O nas</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Jesteśmy liderem w dostarczaniu profesjonalnej odzieży roboczej i środków ochrony osobistej w Polsce.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-center">
                Nasza <span className="text-primary">misja</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                BHP Perfect powstał z myślą o bezpieczeństwie pracowników w każdej
                branży. Od ponad 15 lat dostarczamy najwyższej jakości odzież
                roboczą, obuwie BHP i środki ochrony osobistej.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Nasza siedziba znajduje się w Nowym Dworze Mazowieckim, skąd
                obsługujemy klientów w całej Polsce. Stawiamy na jakość,
                bezpieczeństwo i profesjonalną obsługę.
              </p>
              <p className="text-lg text-muted-foreground">
                Współpracujemy tylko ze sprawdzonymi producentami, którzy spełniają
                wszystkie normy bezpieczeństwa Unii Europejskiej.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl border-2 border-primary/20">
              <img
                src={storePhoto}
                alt="Sklep BHP Perfect - magazyn z asortymentem"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover-elevate">
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

      {/* Location */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Nasza lokalizacja</h2>
          <p className="text-xl text-muted-foreground mb-8">
            BHP Perfect
            <br />
            Nowy Dwór Mazowiecki, Poland
          </p>
          <p className="text-muted-foreground">
            Zapraszamy do odwiedzenia naszego sklepu stacjonarnego lub kontaktu
            przez email i telefon.
          </p>
        </div>
      </section>
    </div>
  );
}