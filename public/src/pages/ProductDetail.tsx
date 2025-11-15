
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft, ShoppingCart, Minus, Plus, Home, Heart, Share2, Download, Truck, Shield, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import type { Product } from "../../../shared/schema";
import { ProductCard } from "../components/ProductCard";

export default function ProductDetail({
  onAddToCart,
}: {
  onAddToCart: (product: Product, quantity: number) => void;
}) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: product, isLoading } = useQuery<any>({
    queryKey: [`/api/products/${id}`],
  });

  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Check if product is in favorites
  useEffect(() => {
    if (product?.id) {
      const favorites = localStorage.getItem("favorites");
      if (favorites) {
        const favoriteIds = JSON.parse(favorites);
        setIsFavorite(favoriteIds.includes(product.id));
      }
    }
  }, [product?.id]);

  // Toggle favorite
  const toggleFavorite = () => {
    if (!product?.id) return;
    
    const favorites = localStorage.getItem("favorites");
    let favoriteIds = favorites ? JSON.parse(favorites) : [];
    
    if (isFavorite) {
      favoriteIds = favoriteIds.filter((fid: string) => fid !== product.id);
    } else {
      favoriteIds.push(product.id);
    }
    
    localStorage.setItem("favorites", JSON.stringify(favoriteIds));
    setIsFavorite(!isFavorite);
  };

  // SEO Meta Tags
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Sklep BHP`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', product.description.substring(0, 160));
      }
    }
  }, [product]);

  // Sticky button on scroll (mobile)
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Produkt nie znaleziony</h1>
        <Link href="/sklep">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Wróć do sklepu
          </Button>
        </Link>
      </div>
    );
  }

  // Check if product has sizes
  const hasSizes = product?.hasSizes && product?.sizes && product.sizes.length > 0;
  
  // Calculate stock
  let availableStock = 0;
  if (hasSizes && selectedSize) {
    const selectedSizeData = product.sizes.find((s: any) => s.sizeId === selectedSize);
    availableStock = selectedSizeData?.stock || 0;
  } else if (!hasSizes) {
    availableStock = parseInt(product?.stock?.toString() || "0");
  }
  
  const inStock = availableStock > 0;
  const price = parseFloat(product?.price?.toString() || "0");
  
  // Get available sizes from product or mock data
  const sizes = hasSizes 
    ? product.sizes.map((s: any) => ({ id: s.sizeId, name: s.size.name, stock: s.stock }))
    : [];
  const colors = ["Czarny", "Niebieski", "Pomarańczowy", "Żółty"];
  
  // Gallery images - only actual product photos
  const galleryImages = product.additionalImages && product.additionalImages.length > 0
    ? [product.image, ...product.additionalImages]
    : [product.image];
  
  const hasMultipleImages = galleryImages.length > 1;

  // Related products (same category)
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleQuantityChange = (delta: number) => {
    const maxStock = hasSizes && selectedSize ? availableStock : parseInt(product?.stock?.toString() || "0");
    const newQuantity = Math.max(1, Math.min(maxStock, quantity + delta));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      alert("Proszę wybrać rozmiar");
      return;
    }
    
    const productToAdd = hasSizes 
      ? { ...product, selectedSize, selectedSizeName: sizes.find((s: any) => s.id === selectedSize)?.name }
      : product;
    
    onAddToCart(productToAdd, quantity);
  };

  // SEO-friendly URL slug
  const productSlug = product.name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Breadcrumbs */}
      <nav aria-label="breadcrumb" className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary flex items-center gap-1">
                <Home className="h-3.5 w-3.5" />
                Strona główna
              </Link>
            </li>
            <span>/</span>
            <li>
              <Link href="/sklep" className="hover:text-primary hover:underline">
                Sklep
              </Link>
            </li>
            <span>/</span>
            <li className="text-gray-400">{product.category}</li>
            <span>/</span>
            <li className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</li>
          </ol>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-12 mb-8">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div 
              className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 group"
              onMouseEnter={() => hasMultipleImages && setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={isHovering && hasMultipleImages ? galleryImages[1] : galleryImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-108"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'text-gray-300 text-5xl sm:text-6xl md:text-9xl absolute inset-0 flex items-center justify-center';
                    fallback.textContent = '📦';
                    e.currentTarget.parentElement?.appendChild(fallback);
                  }}
                />
              </div>
            </div>

            {/* Thumbnail Gallery - Only show if multiple images exist */}
            {hasMultipleImages && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-white rounded-lg border-2 overflow-hidden transition-all touch-manipulation min-h-[80px] min-w-[80px] sm:min-h-[100px] sm:min-w-[100px] ${
                      selectedImage === idx ? 'border-primary shadow-md scale-95' : 'border-gray-200 hover:border-gray-300 active:scale-95'
                    }`}
                    data-testid={`thumbnail-${idx}`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {/* Category Badge */}
            <Badge className="text-xs sm:text-sm bg-yellow-100 text-black hover:bg-yellow-200">
              {product.category}
            </Badge>

            {/* Product Name */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full ${inStock ? "bg-green-600" : "bg-red-600"}`} />
              <span className={`text-sm sm:text-base font-medium ${inStock ? "text-green-700" : "text-red-700"}`}>
                {inStock ? `W magazynie (${product.stock} szt.)` : "Brak w magazynie"}
              </span>
            </div>

            {/* Price */}
            <div className="py-4 border-y border-gray-200">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                  {price.toFixed(2)} zł
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Cena zawiera VAT</p>
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              {/* Size Selector - Only show if product has sizes */}
              {hasSizes && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Rozmiar *</label>
                  <Select value={selectedSize} onValueChange={(value) => {
                    setSelectedSize(value);
                    setQuantity(1); // Reset quantity when size changes
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz rozmiar" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size: any) => (
                        <SelectItem 
                          key={size.id} 
                          value={size.id}
                          disabled={size.stock === 0}
                        >
                          {size.name} {size.stock > 0 ? `(${size.stock} szt.)` : '(brak)'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!selectedSize && (
                    <p className="text-xs text-red-600 mt-1">Wybierz rozmiar przed dodaniem do koszyka</p>
                  )}
                </div>
              )}

                {/* Color Selector */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Kolor</label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz kolor" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map(color => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity Selector - Show if no sizes OR if size is selected */}
              {(!hasSizes || selectedSize) && (
                <div>
                  <label className="text-sm sm:text-base font-medium mb-2 block">Ilość</label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 touch-manipulation"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      data-testid="button-quantity-decrease"
                    >
                      <Minus className="h-5 w-5" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      max={availableStock.toString()}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(availableStock, parseInt(e.target.value) || 1)))}
                      className="w-20 sm:w-24 text-center text-base sm:text-lg font-semibold h-10 sm:h-12 touch-manipulation"
                      data-testid="input-quantity"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 touch-manipulation"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= availableStock}
                      data-testid="button-quantity-increase"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Dostępne: {availableStock} szt.
                  </p>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                size="lg"
                className="w-full bg-primary text-black hover:bg-primary/90 font-bold py-4 sm:py-6 text-base sm:text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
                disabled={!inStock || (hasSizes && !selectedSize)}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {hasSizes && !selectedSize ? 'Wybierz rozmiar' : 'Dodaj do koszyka'}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant={isFavorite ? "default" : "outline"} 
                  size="lg" 
                  className={`font-semibold transition-all ${
                    isFavorite ? "bg-red-50 border-red-200 text-red-700 hover:bg-red-100" : ""
                  }`}
                  onClick={toggleFavorite}
                  data-testid="button-favorite-detail"
                >
                  <Heart className={`mr-2 h-4 w-4 transition-all ${
                    isFavorite ? "fill-red-500 text-red-500" : ""
                  }`} />
                  {isFavorite ? "W ulubionych" : "Dodaj do ulubionych"}
                </Button>
                <Button variant="outline" size="lg" className="font-semibold">
                  <Share2 className="mr-2 h-4 w-4" />
                  Udostępnij
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-1 text-primary" />
                <p className="text-xs text-gray-600">Darmowa dostawa od 99 zł</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-1 text-primary" />
                <p className="text-xs text-gray-600">Gwarancja producenta</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-1 text-primary" />
                <p className="text-xs text-gray-600">Zwrot 30 dni</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - Product Details */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 mb-8">
          <Tabs defaultValue="opis" className="w-full">
            <TabsList className="w-full justify-start border-b mb-6">
              <TabsTrigger value="opis" className="text-sm sm:text-base">Opis</TabsTrigger>
              <TabsTrigger value="specyfikacja" className="text-sm sm:text-base">Specyfikacja</TabsTrigger>
            </TabsList>

            <TabsContent value="opis" className="animate-fade-in">
              <div className="prose max-w-none">
                <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                  {product.description}
                </p>
                <h3 className="text-lg font-bold mt-6 mb-3">Kluczowe cechy:</h3>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li>✓ Wysokiej jakości materiały</li>
                  <li>✓ Certyfikaty bezpieczeństwa CE</li>
                  <li>✓ Wygodne i funkcjonalne</li>
                  <li>✓ Dostępne w różnych rozmiarach</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specyfikacja" className="animate-fade-in">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row border-b pb-3">
                  <span className="font-medium text-sm sm:text-base sm:w-48">Kategoria:</span>
                  <span className="text-sm sm:text-base text-gray-700">{product.category}</span>
                </div>
                <div className="flex flex-col sm:flex-row border-b pb-3">
                  <span className="font-medium text-sm sm:text-base sm:w-48">Dostępność:</span>
                  <span className="text-sm sm:text-base text-gray-700">{inStock ? "W magazynie" : "Brak"}</span>
                </div>
                <div className="flex flex-col sm:flex-row border-b pb-3">
                  <span className="font-medium text-sm sm:text-base sm:w-48">Stan magazynowy:</span>
                  <span className="text-sm sm:text-base text-gray-700">{product.stock} szt.</span>
                </div>
                <div className="flex flex-col sm:flex-row border-b pb-3">
                  <span className="font-medium text-sm sm:text-base sm:w-48">Materiał:</span>
                  <span className="text-sm sm:text-base text-gray-700">Poliester/Bawełna</span>
                </div>
                <div className="flex flex-col sm:flex-row border-b pb-3">
                  <span className="font-medium text-sm sm:text-base sm:w-48">Normy:</span>
                  <span className="text-sm sm:text-base text-gray-700">EN ISO 20471, EN 343</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Podobne produkty</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  onAddToCart={() => onAddToCart(relatedProduct, 1)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile CTA */}
      {isSticky && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-50 lg:hidden animate-slide-up">
          <Button
            size="lg"
            className="w-full bg-primary text-black hover:bg-primary/90 font-bold"
            disabled={!inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Dodaj do koszyka - {price.toFixed(2)} zł
          </Button>
        </div>
      )}
    </div>
  );
}
