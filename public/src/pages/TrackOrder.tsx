
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Package, Search, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import { apiRequest } from "../lib/queryClient";
import type { Order } from "../../../shared/schema";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      return await apiRequest("GET", "/api/orders");
    },
    enabled: searchTriggered,
  });

  const foundOrder = orders?.find(o => 
    o.id.toLowerCase().includes(orderId.toLowerCase()) ||
    o.id.slice(0, 8).toLowerCase() === orderId.toLowerCase()
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setSearchTriggered(true);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-8 w-8 text-yellow-600" />;
      case "processing":
        return <Truck className="h-8 w-8 text-blue-600" />;
      case "completed":
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case "cancelled":
        return <XCircle className="h-8 w-8 text-red-600" />;
      default:
        return <Package className="h-8 w-8 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Oczekuje na realizację";
      case "processing":
        return "W trakcie realizacji";
      case "completed":
        return "Zrealizowane";
      case "cancelled":
        return "Anulowane";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Package className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Śledź zamówienie</h1>
          <p className="text-muted-foreground text-lg">
            Wprowadź numer zamówienia, aby sprawdzić jego status
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-3">
            <Input
              type="text"
              placeholder="Numer zamówienia (np. 5b789659)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1"
              data-testid="input-order-id"
            />
            <Button 
              type="submit" 
              size="lg"
              className="bg-primary text-primary-foreground"
              disabled={!orderId.trim() || isLoading}
              data-testid="button-search-order"
            >
              <Search className="h-5 w-5 mr-2" />
              Szukaj
            </Button>
          </form>
        </Card>

        {/* Results */}
        {searchTriggered && (
          <>
            {isLoading ? (
              <Card className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Szukam zamówienia...</p>
              </Card>
            ) : foundOrder ? (
              <Card className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  {getStatusIcon(foundOrder.status)}
                  <h2 className="text-2xl font-bold mt-4 mb-2">
                    Zamówienie #{foundOrder.id.slice(0, 8)}
                  </h2>
                  <Badge className={`text-lg px-4 py-2 ${getStatusColor(foundOrder.status)}`}>
                    {getStatusText(foundOrder.status)}
                  </Badge>
                </div>

                {/* Order Timeline */}
                <div className="border-t border-b py-6 mb-6">
                  <div className="flex justify-between items-center max-w-2xl mx-auto">
                    <div className="text-center flex-1">
                      <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        foundOrder.status !== 'cancelled' ? 'bg-green-600' : 'bg-gray-300'
                      }`}>
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-sm font-medium">Złożone</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(foundOrder.createdAt).toLocaleDateString("pl-PL")}
                      </p>
                    </div>

                    <div className={`h-1 flex-1 ${
                      foundOrder.status === 'processing' || foundOrder.status === 'completed' 
                        ? 'bg-green-600' 
                        : 'bg-gray-300'
                    }`} />

                    <div className="text-center flex-1">
                      <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        foundOrder.status === 'processing' || foundOrder.status === 'completed'
                          ? 'bg-green-600'
                          : foundOrder.status === 'pending'
                          ? 'bg-yellow-500'
                          : 'bg-gray-300'
                      }`}>
                        <Truck className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-sm font-medium">W realizacji</p>
                    </div>

                    <div className={`h-1 flex-1 ${
                      foundOrder.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'
                    }`} />

                    <div className="text-center flex-1">
                      <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        foundOrder.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'
                      }`}>
                        <Package className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-sm font-medium">Dostarczone</p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg mb-3">Szczegóły zamówienia</h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Klient</p>
                      <p className="font-medium">{foundOrder.customerName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{foundOrder.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Telefon</p>
                      <p className="font-medium">{foundOrder.customerPhone || "—"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Data zamówienia</p>
                      <p className="font-medium">
                        {new Date(foundOrder.createdAt).toLocaleString("pl-PL")}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Adres dostawy</p>
                    <p className="font-medium">{foundOrder.customerAddress}</p>
                  </div>

                  {/* Products */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Produkty</h4>
                    <div className="space-y-3">
                      {JSON.parse(foundOrder.items).map((item: any, idx: number) => (
                        <div key={idx} className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md bg-white"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium">{item.name}</h5>
                            <p className="text-sm text-muted-foreground">
                              {item.quantity} × {parseFloat(item.price).toFixed(2)} zł
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">
                              {(parseFloat(item.price) * item.quantity).toFixed(2)} zł
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-xl font-bold">Razem</span>
                    <span className="text-2xl font-bold text-primary">
                      {parseFloat(foundOrder.total).toFixed(2)} zł
                    </span>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Nie znaleziono zamówienia</h3>
                <p className="text-muted-foreground">
                  Sprawdź numer zamówienia i spróbuj ponownie
                </p>
              </Card>
            )}
          </>
        )}

        {/* Help Text */}
        {!searchTriggered && (
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex gap-3">
              <Package className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2 text-blue-900">Jak śledzić zamówienie?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Wprowadź numer zamówienia (otrzymany w potwierdzeniu email)</li>
                  <li>• Kliknij "Szukaj", aby sprawdzić status</li>
                  <li>• Zobacz szczegółowe informacje o dostawie</li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
