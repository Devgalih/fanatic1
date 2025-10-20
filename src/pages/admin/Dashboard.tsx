import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp, 
  Banknote,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { formatIDR } from "@/lib/utils";

// Data ringkasan cepat (mock)
const stats = [
  {
    title: "Total Produk",
    value: "18",
    change: "+2",
    changeType: "positive" as const,
    icon: Package,
    description: "aktif"
  },
  {
    title: "Total Pesanan",
    value: "2,350",
    change: "Hari ini: 24 / Minggu ini: 132",
    changeType: "positive" as const,
    icon: ShoppingCart,
    description: "ringkasan"
  },
  {
    title: "Total Pelanggan",
    value: "1,234",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Users,
    description: "vs bulan lalu"
  },
  {
    title: "Total Pendapatan",
    value: formatIDR(652120000),
    change: "+20.1%",
    changeType: "positive" as const,
    icon: Banknote,
    description: "vs bulan lalu"
  }
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    product: "Essential Black Tee",
    amount: 725000,
    status: "completed",
    date: "2024-01-15"
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    product: "Urban Cargo Pants",
    amount: 1250000,
    status: "processing",
    date: "2024-01-14"
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    product: "Shadow Runner Sneakers",
    amount: 1850000,
    status: "shipped",
    date: "2024-01-13"
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    product: "Classic White Tee",
    amount: 650000,
    status: "pending",
    date: "2024-01-12"
  }
];

const topProducts = [
  {
    name: "Essential Black Tee",
    sales: 156,
    revenue: 7020000,
    growth: "+12%"
  },
  {
    name: "Urban Cargo Pants",
    sales: 89,
    revenue: 7921000,
    growth: "+8%"
  },
  {
    name: "Shadow Runner Sneakers",
    sales: 67,
    revenue: 8040000,
    growth: "+15%"
  },
  {
    name: "Classic White Tee",
    sales: 45,
    revenue: 1890000,
    growth: "+5%"
  }
];

export default function AdminDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Beranda</h1>
            <p className="text-gray-600">Ringkasan cepat kondisi toko Anda.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Lihat Toko
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Tambah Produk
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-gray-600">
                  {stat.changeType === "positive" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Grafik Penjualan & Tabel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grafik Penjualan */}
          <Card>
            <CardHeader>
              <CardTitle>Grafik Penjualan</CardTitle>
              <CardDescription>Performa penjualan 7 hari terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-sm text-gray-500">
                Grafik akan tampil di sini
              </div>
            </CardContent>
          </Card>
          {/* Pesanan Terbaru */}
          <Card>
            <CardHeader>
              <CardTitle>Pesanan Terbaru</CardTitle>
              <CardDescription>Transaksi terbaru dari pelanggan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{order.id}</div>
                      <div className="text-sm text-gray-600">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.product}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-medium">{formatIDR(order.amount)}</div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <div className="text-xs text-gray-500">{order.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Lihat Semua Pesanan
              </Button>
            </CardContent>
          </Card>

          {/* Produk Teratas */}
          <Card>
            <CardHeader>
              <CardTitle>Produk Teratas</CardTitle>
              <CardDescription>Performa terbaik bulan ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.sales} penjualan</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatIDR(product.revenue)}</div>
                      <div className="text-sm text-green-600">{product.growth}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Lihat Semua Produk
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>Tugas umum dan pintasan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Package className="h-6 w-6" />
                Kelola Produk
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <ShoppingCart className="h-6 w-6" />
                Lihat Pesanan
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                Kelola Pelanggan
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <TrendingUp className="h-6 w-6" />
                Lihat Analitik
              </Button>
            </div>
          </CardContent>
        </Card>
    </>
  );
}
