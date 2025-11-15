import { Link } from "wouter";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart, CheckCircle, XCircle, Shield, Package } from "lucide-react";
import type { Product } from "../../../shared/schema";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, onAddToCart, viewMode = "grid" }: ProductCardProps) {
  const inStock = parseInt(product.stock.toString()) > 0;
  const price = parseFloat(product.price.toString());
  const [imageError, setImageError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Structured data for SEO
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "PLN",
      "availability": inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  // Get second image if available
  const hasMultipleImages = product.additionalImages && product.additionalImages !== null && product.additionalImages.length > 0;
  const displayImage = isHovering && hasMultipleImages ? product.additionalImages![0] : product.image;

  // List view layout
  if (viewMode === "list") {
    return (
      <div
        className="group bg-white rounded-lg overflow-hidden transition-all duration-300 border border-gray-200 hover:shadow-lg hover:border-primary flex flex-col sm:flex-row"
        data-testid={`card-product-${product.id}`}
      >
        <Link
          href={`/produkt/${product.id}`}
          className="sm:w-48 flex-shrink-0"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 aspect-square sm:h-48 flex items-center justify-center overflow-hidden group-hover:from-gray-100 group-hover:to-gray-200 transition-all">
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 bg-green-600 text-white rounded-full p-1.5 shadow-md">
              <Shield className="h-3.5 w-3.5" />
            </div>
          </div>
        </Link>

        <div className="p-4 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <Link href={`/produkt/${product.id}`}>
              <h3
                className="font-bold text-base mb-2 hover:text-primary transition-colors text-gray-900"
                data-testid={`text-product-name-${product.id}`}
              >
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>

            <div className={`inline-flex items-center gap-1.5 px-2 py-1.5 rounded ${
              inStock ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
            }`}>
              {inStock ? (
                <CheckCircle className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <XCircle className="h-3.5 w-3.5 text-red-600" />
              )}
              <span
                className={`text-xs font-semibold ${
                  inStock ? "text-green-700" : "text-red-700"
                }`}
                data-testid={`text-stock-${product.id}`}
              >
                {inStock ? `W magazynie (${product.stock})` : "Niedostępny"}
              </span>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2">
            <div className="flex flex-col items-start sm:items-end">
              <span className="text-2xl font-bold text-gray-900" data-testid={`text-price-${product.id}`}>
                {price.toFixed(2)} zł
              </span>
              <span className="text-xs text-gray-500 font-medium">+ VAT</span>
            </div>
            <Button
              variant="default"
              size="default"
              className="bg-primary text-black font-bold"
              onClick={() => onAddToCart?.(product)}
              disabled={!inStock}
              data-testid={`button-add-to-cart-${product.id}`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span>Dodaj</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view layout (default)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <div
        className="group bg-white rounded-lg overflow-hidden border border-gray-200 product-card-hover"
        data-testid={`card-product-${product.id}`}
      >
      <Link
        href={`/produkt/${product.id}`}
        className="block"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative bg-white aspect-square flex items-center justify-center overflow-hidden">
          {imageError ? (
            <div className="flex items-center justify-center text-gray-300">
              <Package className="h-16 w-16" />
            </div>
          ) : (
            <img
              src={displayImage}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover product-image-zoom"
              onError={() => setImageError(true)}
            />
          )}

          {/* Size badge if product has sizes */}
          {product.hasSizes && (
            <div className="absolute top-3 left-3 bg-primary/90 text-black rounded-md px-2 py-1 text-xs font-bold">
              Rozmiary
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/produkt/${product.id}`}>
          <h3
            className="font-semibold text-sm leading-tight mb-3 line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem] text-gray-900 tracking-tight"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
        </Link>

        {/* Stock Status - Minimal */}
        <div className="mb-3">
          <span
            className={`text-xs font-medium ${
              inStock ? "text-green-600" : "text-red-600"
            }`}
            data-testid={`text-stock-${product.id}`}
          >
            {inStock ? "W magazynie" : "Niedostępny"}
          </span>
        </div>

        {/* Price and Cart Button */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900 tracking-tight" data-testid={`text-price-${product.id}`}>
              {price.toFixed(2)} zł
            </span>
            <span className="text-xs text-gray-500">+ VAT</span>
          </div>
          <Button
            variant="default"
            size="sm"
            className="bg-primary text-black font-semibold hover:bg-primary/90 transition-minimal"
            onClick={() => onAddToCart?.(product)}
            disabled={!inStock}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}