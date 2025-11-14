import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import type { CartItem } from "../../../shared/schema";

export default function Cart({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 300 ? 0 : 19.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-4xl font-bold mb-4" data-testid="text-empty-cart">
          Twój koszyk jest pusty
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Dodaj produkty do koszyka, aby kontynuować zakupy
        </p>
        <Link href="/sklep" data-testid="button-continue-shopping">
          <Button size="lg" className="bg-primary text-primary-foreground">
            Kontynuuj zakupy
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Koszyk</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card
                key={item.productId}
                className="p-4 hover-elevate"
                data-testid={`cart-item-${item.productId}`}
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md bg-gray-100"
                    data-testid={`img-cart-${item.productId}`}
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1" data-testid={`text-cart-name-${item.productId}`}>
                      {item.name}
                    </h3>
                    <p className="text-primary font-bold text-xl mb-3" data-testid={`text-cart-price-${item.productId}`}>
                      {parseFloat(item.price).toFixed(2)} zł
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            onUpdateQuantity(item.productId, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          data-testid={`button-decrease-${item.productId}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            onUpdateQuantity(
                              item.productId,
                              Math.max(1, parseInt(e.target.value) || 1)
                            )
                          }
                          className="w-16 text-center h-8"
                          data-testid={`input-quantity-${item.productId}`}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            onUpdateQuantity(item.productId, item.quantity + 1)
                          }
                          data-testid={`button-increase-${item.productId}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => onRemoveItem(item.productId)}
                        data-testid={`button-remove-${item.productId}`}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Usuń
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-xl" data-testid={`text-subtotal-${item.productId}`}>
                      {(parseFloat(item.price) * item.quantity).toFixed(2)} zł
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-6">Podsumowanie</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Suma częściowa</span>
                  <span className="font-semibold" data-testid="text-subtotal">
                    {subtotal.toFixed(2)} zł
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dostawa</span>
                  <span className="font-semibold" data-testid="text-shipping">
                    {shipping === 0 ? "Gratis" : `${shipping.toFixed(2)} zł`}
                  </span>
                </div>
                {subtotal < 300 && (
                  <p className="text-sm text-muted-foreground">
                    Dodaj produkty za {(300 - subtotal).toFixed(2)} zł, aby otrzymać darmową dostawę
                  </p>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Razem</span>
                    <span data-testid="text-total">{total.toFixed(2)} zł</span>
                  </div>
                </div>
              </div>

              <Link href="/zamowienie" className="block mb-4" data-testid="link-checkout">
                <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  Przejdź do kasy <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/sklep" className="block" data-testid="link-continue-shopping">
                <Button variant="outline" size="lg" className="w-full">
                  Kontynuuj zakupy
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
