import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { apiRequest } from "../lib/queryClient";
import { CheckCircle2 } from "lucide-react";
import type { CartItem } from "../../../shared/schema";

export default function Checkout({
  cartItems,
  onClearCart,
}: {
  cartItems: CartItem[];
  onClearCart: () => void;
}) {
  const [currentLocation, setLocation] = useLocation();
  const { toast } = useToast();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 300 ? 0 : 19.99;
  const total = subtotal + shipping;

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/orders", {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: `${formData.address}, ${formData.postalCode} ${formData.city}`,
        items: JSON.stringify(cartItems),
        total: total.toString(),
      });
    },
    onSuccess: () => {
      setOrderPlaced(true);
      onClearCart();
      toast({
        title: "Zamówienie złożone!",
        description: "Dziękujemy za zakupy w BHP Perfect.",
      });
    },
    onError: () => {
      toast({
        title: "Błąd",
        description: "Nie udało się złożyć zamówienia. Spróbuj ponownie.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createOrderMutation.mutate();
  };

  if (cartItems.length === 0 && !orderPlaced) {
    setLocation("/koszyk");
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16">
        <CheckCircle2 className="h-24 w-24 text-green-600 mb-6" />
        <h1 className="text-4xl font-bold mb-4" data-testid="text-order-success">
          Zamówienie złożone!
        </h1>
        <p className="text-muted-foreground text-lg mb-4 text-center max-w-md">
          Dziękujemy za zakupy. Potwierdzenie zostało wysłane na adres {formData.email}
        </p>
        <p className="text-sm text-muted-foreground mb-8 text-center">
          Możesz śledzić status zamówienia na stronie "Śledź zamówienie"
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground"
            onClick={() => setLocation("/sledzenie")}
            data-testid="button-track-order"
          >
            Śledź zamówienie
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation("/")}
            data-testid="button-back-home"
          >
            Wróć na stronę główną
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Finalizacja zamówienia</h1>
        <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-primary text-black rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center font-bold text-sm sm:text-base">
              1
            </div>
            <span className="font-medium text-sm sm:text-base hidden xs:inline">Koszyk</span>
          </div>
          <div className="h-0.5 w-6 sm:w-12 bg-primary flex-shrink-0" />
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-primary text-black rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center font-bold text-sm sm:text-base">
              2
            </div>
            <span className="font-medium text-sm sm:text-base hidden xs:inline">Dostawa</span>
          </div>
          <div className="h-0.5 w-6 sm:w-12 bg-gray-300 flex-shrink-0" />
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-gray-300 text-gray-600 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center font-bold text-sm sm:text-base">
              3
            </div>
            <span className="text-muted-foreground text-sm sm:text-base hidden xs:inline">Potwierdzenie</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Dane do wysyłki</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Imię i nazwisko *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Jan Kowalski"
                    data-testid="input-name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="jan@example.com"
                      data-testid="input-email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+48 123 456 789"
                      data-testid="input-phone"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Ulica i numer *</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="ul. Przykładowa 123"
                    data-testid="input-address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postalCode">Kod pocztowy *</Label>
                    <Input
                      id="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({ ...formData, postalCode: e.target.value })
                      }
                      placeholder="00-000"
                      data-testid="input-postal-code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Miasto *</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="Warszawa"
                      data-testid="input-city"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold mt-6"
                  disabled={createOrderMutation.isPending}
                  data-testid="button-place-order"
                >
                  {createOrderMutation.isPending ? "Przetwarzanie..." : "Złóż zamówienie"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-6">Twoje zamówienie</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md bg-gray-100"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} × {parseFloat(item.price).toFixed(2)} zł
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Suma częściowa</span>
                  <span className="font-semibold">{subtotal.toFixed(2)} zł</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dostawa</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "Gratis" : `${shipping.toFixed(2)} zł`}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Razem</span>
                    <span data-testid="text-checkout-total">{total.toFixed(2)} zł</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}