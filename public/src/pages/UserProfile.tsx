
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";
import { apiRequest, queryClient } from "../lib/queryClient";
import { User, Package, Heart, LogOut, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import type { Order, Product } from "../../../shared/schema";

export default function UserProfile() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      setLocation("/logowanie");
      return;
    }
    setUser(JSON.parse(userData));
  }, [setLocation]);

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["user-orders"],
    queryFn: async () => {
      const allOrders = await apiRequest("GET", "/api/orders");
      return allOrders.filter((order: Order) => order.customerEmail === user?.email);
    },
    enabled: !!user,
  });

  const { data: wishlist = [] } = useQuery<Product[]>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      return await apiRequest("GET", "/api/wishlist");
    },
    enabled: !!user,
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      return await apiRequest("DELETE", `/api/wishlist/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast({
        title: "Usunięto z ulubionych",
        description: "Produkt został usunięty z listy życzeń",
      });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast({
      title: "Wylogowano",
      description: "Do zobaczenia!",
    });
    setLocation("/");
  };

  if (!user) return null;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      completed: "default",
      processing: "secondary",
      pending: "secondary",
      cancelled: "destructive",
    };
    return variants[status] || "secondary";
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      pending: "Oczekuje",
      processing: "W realizacji",
      completed: "Zrealizowane",
      cancelled: "Anulowane",
    };
    return texts[status] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.username}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-2" />
            Wyloguj się
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-2" />
              Zamówienia ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="wishlist">
              <Heart className="h-4 w-4 mr-2" />
              Ulubione ({wishlist.length})
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            {orders.length === 0 ? (
              <Card className="p-12 text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Brak zamówień</h3>
                <p className="text-muted-foreground mb-6">
                  Nie masz jeszcze żadnych zamówień
                </p>
                <Button onClick={() => setLocation("/sklep")}>
                  Przejdź do sklepu
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const items = JSON.parse(order.items);
                  return (
                    <Card key={order.id} className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg">
                            Zamówienie #{order.id.slice(0, 8)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString("pl-PL")}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 mt-2 md:mt-0">
                          <Badge variant={getStatusBadge(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setLocation(`/sledzenie?id=${order.id}`)}
                          >
                            Śledź
                          </Button>
                        </div>
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
                        <span className="text-muted-foreground">Razem</span>
                        <span className="text-xl font-bold">
                          {parseFloat(order.total).toFixed(2)} zł
                        </span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="mt-6">
            {wishlist.length === 0 ? (
              <Card className="p-12 text-center">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Brak ulubionych</h3>
                <p className="text-muted-foreground mb-6">
                  Dodaj produkty do listy życzeń
                </p>
                <Button onClick={() => setLocation("/sklep")}>
                  Przeglądaj produkty
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                      <p className="text-2xl font-bold text-primary mb-4">
                        {parseFloat(product.price).toFixed(2)} zł
                      </p>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={() => setLocation(`/produkt/${product.id}`)}
                        >
                          Zobacz
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => removeFromWishlistMutation.mutate(product.id)}
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
