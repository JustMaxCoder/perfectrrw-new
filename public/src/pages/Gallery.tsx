import { useQuery } from "@tanstack/react-query";
import type { Gallery as GalleryType } from "../../../shared/schema";

export default function Gallery() {
  const { data: gallery = [], isLoading } = useQuery<GalleryType[]>({
    queryKey: ["/api/gallery"],
  });

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-gallery-title">
            Galeria <span className="text-primary">Zdjęć</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Zobacz nasze produkty i naszą firmę w akcji
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Ładowanie galerii...</p>
          </div>
        ) : gallery.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Brak zdjęć w galerii</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gallery.map((img, index) => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-md hover-elevate active-elevate-2 cursor-pointer"
                data-testid={`img-gallery-item-${index}`}
              >
                <img
                  src={img.path}
                  alt={img.filename}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-sm px-4 text-center break-words">
                    {img.filename}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
