import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "../lib/queryClient";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Pencil, Trash2, Plus, Upload, Settings as SettingsIcon, Image as ImageIcon, Package, X, ShoppingCart, Eye } from "lucide-react";
import type { Product, Gallery, Settings } from "../../../shared/schema";
import { Badge } from "../components/ui/badge";

export default function AdminPanel() {
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: gallery = [], isLoading: galleryLoading } = useQuery<Gallery[]>({
    queryKey: ["/api/gallery"],
  });

  const { data: settings = [], isLoading: settingsLoading } = useQuery<Settings[]>({
    queryKey: ["/api/settings"],
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery<any[]>({
    queryKey: ["/api/orders"],
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        
      });
      if (!response.ok) throw new Error("Failed to delete product");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Produkt usunięty" });
    },
  });

  const deleteGalleryMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
        
      });
      if (!response.ok) throw new Error("Failed to delete gallery image");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Zdjęcie usunięte" });
    },
  });

  const uploadGalleryMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      
      const response = await fetch("/api/gallery", {
        method: "POST",
        
        body: formData,
      });
      
      if (!response.ok) throw new Error("Upload failed");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Zdjęcie przesłane" });
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const response = await fetch(`/api/settings/${key}`, {
        method: "PUT",
        headers: { 
          
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ value }),
      });
      if (!response.ok) throw new Error("Failed to update setting");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({ title: "Ustawienie zaktualizowane" });
    },
  });

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadGalleryMutation.mutate(file);
    }
  };

  const getSetting = (key: string) => {
    return settings.find(s => s.key === key)?.value || "";
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold" data-testid="text-admin-title">Panel Administracyjny</h1>
          <p className="text-muted-foreground">Zarządzaj produktami, galerią i ustawieniami sklepu</p>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products" data-testid="tab-products">
              <Package className="mr-2 h-4 w-4" />
              Produkty
            </TabsTrigger>
            <TabsTrigger value="orders" data-testid="tab-orders">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Zamówienia
            </TabsTrigger>
            <TabsTrigger value="gallery" data-testid="tab-gallery">
              <ImageIcon className="mr-2 h-4 w-4" />
              Galeria
            </TabsTrigger>
            <TabsTrigger value="settings" data-testid="tab-settings">
              <SettingsIcon className="mr-2 h-4 w-4" />
              Ustawienia
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Zarządzanie Produktami</h2>
                <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingProduct(null)} data-testid="button-add-product">
                      <Plus className="mr-2 h-4 w-4" />
                      Dodaj Produkt
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingProduct ? "Edytuj Produkt" : "Dodaj Nowy Produkt"}
                      </DialogTitle>
                    </DialogHeader>
                    
                    {editingProduct ? (
                      <Tabs defaultValue="info" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="info" data-testid="tab-product-info">
                            Основные данные
                          </TabsTrigger>
                          <TabsTrigger value="photos" data-testid="tab-product-photos">
                            Фотографии
                          </TabsTrigger>
                          <TabsTrigger value="sizes" data-testid="tab-product-sizes">
                            Rozmiary
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="info" className="mt-4">
                          <ProductForm
                            product={editingProduct}
                            onClose={() => {
                              setIsProductDialogOpen(false);
                              setEditingProduct(null);
                            }}
                          />
                        </TabsContent>
                        <TabsContent value="photos" className="mt-4">
                          <PhotoManager productId={editingProduct.id} />
                        </TabsContent>
                        <TabsContent value="sizes" className="mt-4">
                          <SizeManager productId={editingProduct.id} />
                        </TabsContent>
                      </Tabs>
                    ) : (
                      <ProductForm
                        product={null}
                        onClose={() => {
                          setIsProductDialogOpen(false);
                          setEditingProduct(null);
                        }}
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </div>

              {productsLoading ? (
                <p>Ładowanie...</p>
              ) : (
                <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Zdjęcie</TableHead>
                      <TableHead>Nazwa</TableHead>
                      <TableHead>Cena</TableHead>
                      <TableHead>Kategoria</TableHead>
                      <TableHead>Stan</TableHead>
                      <TableHead className="text-right">Akcje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} data-testid={`row-product-${product.id}`}>
                        <TableCell>
                          <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.price} zł</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.stock} szt.</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingProduct(product);
                              setIsProductDialogOpen(true);
                            }}
                            data-testid={`button-edit-${product.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteProductMutation.mutate(product.id)}
                            data-testid={`button-delete-${product.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Zarządzanie Zamówieniami</h2>
              
              {ordersLoading ? (
                <p>Ładowanie...</p>
              ) : (
                <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Klient</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Suma</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Akcje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-xs">
                          {order.id.slice(0, 8)}...
                        </TableCell>
                        <TableCell className="font-medium">{order.customerName}</TableCell>
                        <TableCell>{order.customerEmail}</TableCell>
                        <TableCell className="font-bold">{order.total} zł</TableCell>
                        <TableCell>
                          <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('pl-PL')}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Galeria</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {gallery.length} {gallery.length === 1 ? 'zdjęcie' : gallery.length < 5 ? 'zdjęcia' : 'zdjęć'} w galerii
                  </p>
                </div>
                <Button asChild data-testid="button-upload-gallery">
                  <label className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4 inline" />
                    Prześlij Zdjęcie
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleGalleryUpload}
                    />
                  </label>
                </Button>
              </div>

              {galleryLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Ładowanie galerii...</p>
                  </div>
                </div>
              ) : gallery.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <ImageIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-lg mb-2">Brak zdjęć w galerii</p>
                  <p className="text-gray-400 text-sm mb-4">Dodaj pierwsze zdjęcie, aby rozpocząć</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.map((img, index) => (
                    <div key={img.id} className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow" data-testid={`img-gallery-${img.id}`}>
                      <div className="aspect-square">
                        <img 
                          src={img.path} 
                          alt={img.filename} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                          <p className="text-xs truncate font-medium">{img.filename}</p>
                          <p className="text-xs text-gray-300">
                            {new Date(img.uploadedAt).toLocaleDateString('pl-PL')}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
                        onClick={() => deleteGalleryMutation.mutate(img.id)}
                        data-testid={`button-delete-gallery-${img.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Badge className="absolute top-2 left-2 bg-black/60 text-white border-0">
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Ustawienia Strony</h2>
              
              {settingsLoading ? (
                <p>Ładowanie...</p>
              ) : (
                <div className="space-y-6">
                  <div>
                    <Label>Nazwa Sklepu</Label>
                    <Input
                      defaultValue={getSetting("siteName")}
                      onBlur={(e) => updateSettingMutation.mutate({ key: "siteName", value: e.target.value })}
                      data-testid="input-site-name"
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Banner Promocyjny</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={getSetting("bannerShow") === "true"}
                          onCheckedChange={(checked) =>
                            updateSettingMutation.mutate({ key: "bannerShow", value: checked.toString() })
                          }
                          data-testid="switch-banner-show"
                        />
                        <Label>Pokaż banner</Label>
                      </div>
                      
                      <div>
                        <Label>Tekst banneru</Label>
                        <Input
                          defaultValue={getSetting("bannerText")}
                          onBlur={(e) => updateSettingMutation.mutate({ key: "bannerText", value: e.target.value })}
                          data-testid="input-banner-text"
                        />
                      </div>

                      <div>
                        <Label>Link banneru</Label>
                        <Input
                          defaultValue={getSetting("bannerLink")}
                          onBlur={(e) => updateSettingMutation.mutate({ key: "bannerLink", value: e.target.value })}
                          data-testid="input-banner-link"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function PhotoManager({ productId }: { productId: string }) {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isMain, setIsMain] = useState(false);

  const { data: product } = useQuery<Product>({
    queryKey: ["/api/products", productId],
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: async ({ file, main }: { file: File; main: boolean }) => {
      const formData = new FormData();
      formData.append("photo", file);
      
      const response = await fetch(`/api/products/${productId}/photo?main=${main}`, {
        method: "POST",
        
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload photo");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products", productId] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Фото загружено успешно" });
      
      // Clean up preview
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setSelectedFile(null);
      setPreviewUrl(null);
    },
    onError: (error: Error) => {
      toast({ 
        title: "Ошибка загрузки фото", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: async (photoIndex: number) => {
      const response = await fetch(`/api/products/${productId}/photos/${photoIndex}`, {
        method: "DELETE",
        
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete photo");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products", productId] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Фото удалено" });
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke previous preview URL to prevent memory leak
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadPhotoMutation.mutate({ file: selectedFile, main: isMain });
    }
  };

  const handleCancelPreview = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  if (!product) return <div>Загрузка...</div>;

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-semibold">Управление фотографиями</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Загружайте и управляйте фотографиями продукта
        </p>
      </div>

      {/* Main Photo */}
      <div>
        <Label className="text-sm font-medium">Главное фото</Label>
        <div className="mt-2 border rounded-md p-4">
          {product.image ? (
            <div className="relative aspect-square max-w-xs">
              <img 
                src={product.image} 
                alt="Main product" 
                className="w-full h-full object-cover rounded-md"
              />
              <Badge className="absolute top-2 left-2" variant="default">
                Главное
              </Badge>
            </div>
          ) : (
            <div className="aspect-square max-w-xs bg-muted rounded-md flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Additional Photos */}
      {product.images && product.images.length > 0 && (
        <div>
          <Label className="text-sm font-medium">Дополнительные фото ({product.images.length})</Label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
            {product.images.map((img, index) => (
              <div key={index} className="relative aspect-square border rounded-md p-2">
                <img 
                  src={img} 
                  alt={`Additional ${index + 1}`} 
                  className="w-full h-full object-cover rounded-md"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-3 right-3 h-7 w-7"
                  onClick={() => deletePhotoMutation.mutate(index)}
                  disabled={deletePhotoMutation.isPending}
                  data-testid={`button-delete-photo-${index}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload New Photo */}
      <div className="border-t pt-4">
        <Label className="text-sm font-medium">Загрузить новое фото</Label>
        
        {previewUrl && (
          <div className="mt-3 space-y-3">
            <div className="relative aspect-square max-w-xs border rounded-md p-2">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-md"
              />
              <Badge className="absolute top-3 left-3">
                Превью
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={isMain}
                onCheckedChange={setIsMain}
                data-testid="switch-photo-is-main"
              />
              <Label className="text-sm">Сделать главным фото</Label>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleUpload}
                disabled={uploadPhotoMutation.isPending}
                data-testid="button-upload-photo"
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploadPhotoMutation.isPending ? "Загрузка..." : "Загрузить"}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancelPreview}
                data-testid="button-cancel-photo"
              >
                Отменить
              </Button>
            </div>
          </div>
        )}

        {!previewUrl && (
          <div className="mt-3">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              data-testid="input-photo-upload"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Максимальный размер: 5MB. Форматы: JPEG, PNG, GIF, WebP
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SizeManager({ productId }: { productId: string }) {
  const { toast } = useToast();
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [stock, setStock] = useState(0);

  const { data: product } = useQuery<any>({
    queryKey: ["/api/products", productId],
  });

  const { data: allSizes = [] } = useQuery<any[]>({
    queryKey: ["/api/sizes"],
  });

  const addSizeMutation = useMutation({
    mutationFn: async ({ sizeId, stock }: { sizeId: string; stock: number }) => {
      const response = await fetch("/api/product-sizes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, sizeId, stock }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || error.error || "Failed to add size");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products", productId] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Rozmiar dodany" });
      setSelectedSizeId("");
      setStock(0);
    },
    onError: (error: Error) => {
      toast({ title: "Błąd", description: error.message, variant: "destructive" });
    },
  });

  const updateSizeMutation = useMutation({
    mutationFn: async ({ sizeId, stock }: { sizeId: string; stock: number }) => {
      const response = await fetch(`/api/products/${productId}/sizes/${sizeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock }),
      });
      if (!response.ok) throw new Error("Failed to update size");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products", productId] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Stan zaktualizowany" });
    },
  });

  const deleteSizeMutation = useMutation({
    mutationFn: async (sizeId: string) => {
      const response = await fetch(`/api/products/${productId}/sizes/${sizeId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete size");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products", productId] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Rozmiar usunięty" });
    },
  });

  if (!product) return <div>Загрузка...</div>;

  const productSizes = product.sizes || [];
  const availableSizes = allSizes.filter(
    (size: any) => !productSizes.find((ps: any) => ps.sizeId === size.id)
  );

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-semibold">Zarządzanie rozmiarami</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Dodaj dostępne rozmiary i zarządzaj ich stanem magazynowym
        </p>
      </div>

      {/* Current Sizes */}
      {productSizes.length > 0 && (
        <div>
          <Label className="text-sm font-medium">Aktualne rozmiary</Label>
          <div className="mt-2 space-y-2">
            {productSizes.map((ps: any) => (
              <div key={ps.sizeId} className="flex items-center gap-3 p-3 border rounded-md">
                <Badge variant="outline" className="font-bold">{ps.size.name}</Badge>
                <div className="flex-1 flex items-center gap-2">
                  <Label className="text-xs">Stan:</Label>
                  <Input
                    type="number"
                    min="0"
                    value={ps.stock}
                    onChange={(e) => {
                      const newStock = parseInt(e.target.value) || 0;
                      updateSizeMutation.mutate({ sizeId: ps.sizeId, stock: newStock });
                    }}
                    className="w-20"
                  />
                  <span className="text-xs text-muted-foreground">szt.</span>
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteSizeMutation.mutate(ps.sizeId)}
                  disabled={deleteSizeMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Size */}
      {availableSizes.length > 0 && (
        <div className="border-t pt-4">
          <Label className="text-sm font-medium">Dodaj rozmiar</Label>
          <div className="mt-2 flex gap-2">
            <Select value={selectedSizeId} onValueChange={setSelectedSizeId}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Wybierz rozmiar" />
              </SelectTrigger>
              <SelectContent>
                {availableSizes.map((size: any) => (
                  <SelectItem key={size.id} value={size.id}>
                    {size.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              min="0"
              placeholder="Stan"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value) || 0)}
              className="w-24"
            />
            <Button
              onClick={() => {
                if (selectedSizeId) {
                  addSizeMutation.mutate({ sizeId: selectedSizeId, stock });
                }
              }}
              disabled={!selectedSizeId || addSizeMutation.isPending}
            >
              <Plus className="h-4 w-4 mr-2" />
              Dodaj
            </Button>
          </div>
        </div>
      )}

      {productSizes.length === 0 && (
        <div className="text-center py-8 bg-muted rounded-md">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Brak rozmiarów dla tego produktu</p>
        </div>
      )}
    </div>
  );
}

function ProductForm({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price ? product.price.toString() : "0",
    category: product?.category || "",
    stock: product?.stock ?? 0,
    image: product?.image || "",
    available: product?.available ?? true,
    shipping: product?.shipping || "standard",
  });
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  const createProductMutation = useMutation({
    mutationFn: async () => {
      const fd = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        fd.append(key, value.toString());
      });
      
      if (imageFiles) {
        Array.from(imageFiles).forEach(file => {
          fd.append("images", file);
        });
      }

      console.log("=== SENDING CREATE PRODUCT REQUEST ===");
      console.log("Form data entries:");
      for (const [key, value] of fd.entries()) {
        console.log(`  ${key}:`, value);
      }

      const response = await fetch("/api/products", {
        method: "POST",
        
        body: fd,
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Server returned error:", error);
        
        let errorMessage = error.details || error.error || "Failed to create product";
        if (error.validationIssues) {
          errorMessage += "\n\nДетали валидации:\n" + 
            error.validationIssues.map((issue: any) => 
              `- ${issue.path.join('.')}: ${issue.message}`
            ).join('\n');
        }
        
        throw new Error(errorMessage);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Produkt utworzony" });
      onClose();
    },
    onError: (error: Error) => {
      console.error("=== CREATE PRODUCT ERROR (CLIENT) ===");
      console.error("Error:", error);
      console.error("Error message:", error.message);
      console.error("Form data at time of error:", formData);
      toast({ 
        title: "Błąd podczas tworzenia produktu", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async () => {
      const fd = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        fd.append(key, value.toString());
      });
      
      if (imageFiles) {
        Array.from(imageFiles).forEach(file => {
          fd.append("images", file);
        });
      }

      const response = await fetch(`/api/products/${product?.id}`, {
        method: "PUT",
        
        body: fd,
      });

      if (!response.ok) throw new Error("Failed to update product");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Produkt zaktualizowany" });
      onClose();
    },
    onError: (error: Error) => {
      console.error("Update product error:", error);
      toast({ 
        title: "Błąd podczas aktualizacji produktu", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Form data before validation:", formData);
    
    // Validate required fields
    if (!formData.name.trim()) {
      console.error("Validation failed: name is empty");
      toast({ title: "Błąd", description: "Nazwa produktu jest wymagana", variant: "destructive" });
      return;
    }
    if (!formData.description.trim()) {
      console.error("Validation failed: description is empty");
      toast({ title: "Błąd", description: "Opis produktu jest wymagany", variant: "destructive" });
      return;
    }
    if (!formData.category) {
      console.error("Validation failed: category is empty");
      toast({ title: "Błąd", description: "Kategoria jest wymagana", variant: "destructive" });
      return;
    }
    const priceNum = Number(formData.price);
    if (isNaN(priceNum) || priceNum < 0) {
      console.error("Validation failed: invalid price", { price: formData.price, priceNum });
      toast({ title: "Błąd", description: "Podaj prawidłową cenę (min 0)", variant: "destructive" });
      return;
    }
    
    const stockNum = Number(formData.stock);
    if (isNaN(stockNum) || stockNum < 0) {
      console.error("Validation failed: invalid stock", { stock: formData.stock, stockNum });
      toast({ title: "Błąd", description: "Podaj prawidłowy stan magazynowy", variant: "destructive" });
      return;
    }
    
    // Image is now optional - if not provided, a default will be used on the backend
    
    console.log("Validation passed, submitting form");
    
    if (product) {
      updateProductMutation.mutate();
    } else {
      createProductMutation.mutate();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Nazwa</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          data-testid="input-product-name"
        />
      </div>

      <div>
        <Label>Opis</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          data-testid="input-product-description"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Cena</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            data-testid="input-product-price"
          />
        </div>

        <div>
          <Label>Stan magazynowy</Label>
          <Input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
            required
            data-testid="input-product-stock"
          />
        </div>
      </div>

      <div>
        <Label>Kategoria</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger data-testid="select-product-category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="odziez-robocza">Odzież robocza</SelectItem>
            <SelectItem value="obuwie">Obuwie</SelectItem>
            <SelectItem value="rekawice">Rękawice</SelectItem>
            <SelectItem value="ochrona-glowy">Ochrona głowy</SelectItem>
            <SelectItem value="ochrona-sluchu">Ochrona słuchu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>URL głównego zdjęcia (opcjonalnie, jeśli załadujesz pliki)</Label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="Wpisz URL lub załaduj zdjęcie poniżej"
          data-testid="input-product-image"
        />
      </div>

      <div>
        <Label>Dodatkowe zdjęcia</Label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImageFiles(e.target.files)}
          data-testid="input-product-images"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={formData.available}
          onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
          data-testid="switch-product-available"
        />
        <Label>Dostępny</Label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={createProductMutation.isPending || updateProductMutation.isPending} data-testid="button-submit-product">
          {product ? "Zaktualizuj" : "Utwórz"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-product">
          Anuluj
        </Button>
      </div>
    </form>
  );
}
