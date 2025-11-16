
import { useQuery } from "@tanstack/react-query";
import { Card } from "../components/ui/card";
import { Package, ShoppingCart, TrendingUp, AlertTriangle, Users } from "lucide-react";
import type { Product, Order } from "../../../shared/schema";

export default function Dashboard() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  // Analytics calculations
  const totalProducts = products.length;
  const inStock = products.filter(p => p.stock > 0).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock < 10).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;

  const totalRevenue = orders.reduce((sum, order) => 
    sum + parseFloat(order.total.toString()), 0
  );

  const today = new Date().toDateString();
  const todayRevenue = orders
    .filter(o => new Date(o.createdAt).toDateString() === today)
    .reduce((sum, order) => sum + parseFloat(order.total.toString()), 0);

  // Top products by popularity
  const topProducts = [...products]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего товаров</p>
                <p className="text-3xl font-bold">{totalProducts}</p>
              </div>
              <Package className="h-12 w-12 text-primary" />
            </div>
            <div className="mt-4 text-sm">
              <span className="text-green-600 font-medium">{inStock} в наличии</span>
              {" · "}
              <span className="text-red-600 font-medium">{outOfStock} нет</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Заказы</p>
                <p className="text-3xl font-bold">{totalOrders}</p>
              </div>
              <ShoppingCart className="h-12 w-12 text-primary" />
            </div>
            <div className="mt-4 text-sm">
              <span className="text-yellow-600 font-medium">{pendingOrders} новых</span>
              {" · "}
              <span className="text-green-600 font-medium">{completedOrders} выполнено</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Выручка (всего)</p>
                <p className="text-3xl font-bold">{totalRevenue.toFixed(2)} zł</p>
              </div>
              <TrendingUp className="h-12 w-12 text-primary" />
            </div>
            <div className="mt-4 text-sm">
              <span className="text-green-600 font-medium">Сегодня: {todayRevenue.toFixed(2)} zł</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Низкий stock</p>
                <p className="text-3xl font-bold text-yellow-600">{lowStock}</p>
              </div>
              <AlertTriangle className="h-12 w-12 text-yellow-600" />
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Требуется пополнение
            </div>
          </Card>
        </div>

        {/* Top Products */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Топ товаров (популярность)</h2>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{product.price} zł</p>
                  <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Low Stock Alert */}
        {lowStock > 0 && (
          <Card className="p-6 border-yellow-200 bg-yellow-50">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              Внимание: товары с низким stock
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {products
                .filter(p => p.stock > 0 && p.stock < 10)
                .map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                      <p className="font-medium">{product.name}</p>
                    </div>
                    <span className="text-yellow-600 font-bold">{product.stock} шт.</span>
                  </div>
                ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
