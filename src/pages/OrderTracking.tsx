import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { formatIDR } from "@/lib/utils";

interface Order {
  id: string;
  product: {
    id: string;
    name: string;
    image: string;
    size: string;
    price: number;
    quantity: number;
  };
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  };
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  paymentProof: string | null;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const statusConfig = {
  pending: { 
    label: "Menunggu Pembayaran", 
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
    description: "Pesanan dibuat, menunggu konfirmasi pembayaran"
  },
  processing: { 
    label: "Diproses", 
    color: "bg-blue-100 text-blue-800",
    icon: Package,
    description: "Pesanan sedang diproses dan dikemas"
  },
  shipped: { 
    label: "Dikirim", 
    color: "bg-purple-100 text-purple-800",
    icon: Truck,
    description: "Pesanan telah dikirim"
  },
  delivered: { 
    label: "Selesai", 
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
    description: "Pesanan telah diterima"
  },
  cancelled: { 
    label: "Dibatalkan", 
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
    description: "Pesanan dibatalkan"
  }
};

export default function OrderTracking() {
  const [searchId, setSearchId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  const searchOrder = () => {
    if (!searchId.trim()) {
      setError("Masukkan ID pesanan");
      return;
    }

    // Check both localStorage orders and mock orders
    const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const mockOrders = [
      {
        id: "ORD-001",
        product: {
          id: "1",
          name: "Essential Black Tee",
          image: "/src/assets/product-tshirt.jpg",
          size: "M",
          price: 150000,
          quantity: 2
        },
        customer: {
          name: "John Doe",
          phone: "+62 812-3456-7890",
          email: "john@example.com",
          address: "Jl. Sudirman No. 123, Jakarta",
          city: "Jakarta",
          postalCode: "12190"
        },
        total: 500000,
        status: "shipped",
        createdAt: "2024-01-15T10:00:00Z",
        paymentProof: "payment_proof.jpg",
        trackingNumber: "JNE1234567890",
        estimatedDelivery: "2024-01-20"
      }
    ];
    
    const allOrders = [...localOrders, ...mockOrders];
    const foundOrder = allOrders.find((o: Order) => o.id === searchId);
    
    if (foundOrder) {
      setOrder(foundOrder);
      setError("");
    } else {
      setOrder(null);
      setError("Pesanan tidak ditemukan");
    }
  };

  const getStatusIcon = (status: keyof typeof statusConfig) => {
    const Icon = statusConfig[status].icon;
    return <Icon className="h-5 w-5" />;
  };

  const getStatusSteps = (currentStatus: string) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = steps.indexOf(currentStatus);
    
    return steps.map((step, index) => {
      const config = statusConfig[step as keyof typeof statusConfig];
      const isCompleted = index <= currentIndex;
      const isCurrent = index === currentIndex;
      
      return (
        <div key={step} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            isCompleted ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-500'
          }`}>
            {isCompleted ? getStatusIcon(step as keyof typeof statusConfig) : index + 1}
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${isCurrent ? 'text-primary' : isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
              {config.label}
            </p>
            {isCurrent && (
              <p className="text-xs text-gray-500">{config.description}</p>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Lacak Pesanan</h1>
          <p className="text-muted-foreground">Masukkan ID pesanan untuk melihat status pengiriman</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Masukkan ID pesanan (contoh: ORD-1234567890)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchOrder()}
                />
              </div>
              <Button onClick={searchOrder}>
                <Search className="mr-2 h-4 w-4" />
                Cari
              </Button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </CardContent>
        </Card>

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Status Pesanan
                  <Badge className={statusConfig[order.status].color}>
                    {statusConfig[order.status].label}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getStatusSteps(order.status)}
                </div>
              </CardContent>
            </Card>

            {/* Order Information */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Product Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Detail Produk</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={order.product.image}
                        alt={order.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{order.product.name}</h3>
                      <p className="text-sm text-muted-foreground">Ukuran: {order.product.size}</p>
                      <p className="text-sm text-muted-foreground">Jumlah: {order.product.quantity}</p>
                      <p className="font-semibold mt-2">{formatIDR(order.product.price)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>ID Pesanan</span>
                    <span className="font-mono">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tanggal Pesanan</span>
                    <span>{new Date(order.createdAt).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-semibold">{formatIDR(order.total)}</span>
                  </div>
                  {order.trackingNumber && (
                    <div className="flex justify-between">
                      <span>Nomor Resi</span>
                      <span className="font-mono">{order.trackingNumber}</span>
                    </div>
                  )}
                  {order.estimatedDelivery && (
                    <div className="flex justify-between">
                      <span>Estimasi Sampai</span>
                      <span>{new Date(order.estimatedDelivery).toLocaleDateString('id-ID')}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Pengiriman</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Data Pelanggan</h4>
                    <p className="text-sm">{order.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                    {order.customer.email && (
                      <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Alamat Pengiriman</h4>
                    <p className="text-sm">{order.customer.address}</p>
                    {order.customer.city && (
                      <p className="text-sm text-muted-foreground">
                        {order.customer.city} {order.customer.postalCode}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Butuh Bantuan?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Hubungi customer service untuk pertanyaan tentang pesanan Anda
                  </p>
                  <Button 
                    onClick={() => {
                      const message = `Halo admin, saya ingin bertanya tentang pesanan ${order.id}`;
                      const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
