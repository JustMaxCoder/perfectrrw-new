
import { useQuery } from "@tanstack/react-query";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import { apiRequest } from "../lib/queryClient";
import type { Order } from "../../../shared/schema";

export default function OrderHistory() {
  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      return await apiRequest("GET", "/api/orders");
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "W trakcie";
      case "completed":
        return "Zrealizowane";
      case "cancelled":
        return "Anulowane";
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-muted-foreground">Ładowanie zamówień...</p>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16">
        <Package className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-4xl font-bold mb-4">Brak zamówień</h1>
        <p className="text-muted-foreground text-lg">
          Nie masz jeszcze żadnych zamówień
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Historia zamówień</h1>

        <div className="space-y-4">
          {orders.map((order) => {
            const items = JSON.parse(order.items);
            return (
              <Card key={order.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center gap-3 mb-2 md:mb-0">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-bold text-lg">
                        Zamówienie #{order.id.slice(0, 8)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("pl-PL")}
                      </p>
                    </div>
                  </div>
                  <Badge variant={order.status === "completed" ? "default" : "secondary"}>
                    {getStatusText(order.status)}
                  </Badge>
                </div>

                <div className="border-t pt-4 space-y-3">
                  {items.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md bg-gray-100"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} × {parseFloat(item.price).toFixed(2)} zł
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    <p>{order.customerName}</p>
                    <p>{order.customerEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">
                      {parseFloat(order.total).toFixed(2)} zł
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
