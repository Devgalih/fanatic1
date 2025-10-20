import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown,
  Banknote,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
  BarChart3,
  PieChart
} from "lucide-react";

// Mock analytics data
const analyticsData = {
  revenue: {
    current: 45231.89,
    previous: 37689.45,
    change: 20.1
  },
  orders: {
    current: 2350,
    previous: 2045,
    change: 15.3
  },
  customers: {
    current: 1234,
    previous: 1098,
    change: 12.5
  },
  products: {
    current: 18,
    previous: 16,
    change: 12.5
  }
};

const salesByReleaseTag = [
  { release_tag: "vol 1", sales: 45, revenue: 18900, percentage: 42 },
  { release_tag: "vol 2", sales: 32, revenue: 13440, percentage: 30 },
  { release_tag: "vol 3", sales: 28, revenue: 11760, percentage: 28 }
];

const topProducts = [
  { name: "Essential Black Tee", sales: 156, revenue: 7020, growth: 12 },
  { name: "Urban Cargo Pants", sales: 89, revenue: 7921, growth: 8 },
  { name: "Shadow Runner Sneakers", sales: 67, revenue: 8040, growth: 15 },
  { name: "Vintage Graphic Tee", sales: 45, revenue: 2160, growth: 5 }
];

const monthlyData = [
  { month: "Jan", revenue: 12000, orders: 150 },
  { month: "Feb", revenue: 15000, orders: 180 },
  { month: "Mar", revenue: 18000, orders: 220 },
  { month: "Apr", revenue: 22000, orders: 280 },
  { month: "May", revenue: 25000, orders: 320 },
  { month: "Jun", revenue: 30000, orders: 380 }
];

export default function Analytics() {
  const StatCard = ({ title, value, change, icon: Icon, isPositive }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
          )}
          <span className={isPositive ? "text-green-600" : "text-red-600"}>
            {change}%
          </span>
          <span className="text-gray-600 ml-1">dibanding bulan lalu</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analitik & Laporan</h1>
            <p className="text-gray-600">Lacak performa toko dan insight</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              30 Hari Terakhir
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Ekspor Laporan
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Pendapatan"
            value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(analyticsData.revenue.current).replace(/^Rp\s?/, 'Rp. ')}
            change={analyticsData.revenue.change}
            icon={Banknote}
            isPositive={analyticsData.revenue.change > 0}
          />
          <StatCard
            title="Total Pesanan"
            value={analyticsData.orders.current.toLocaleString()}
            change={analyticsData.orders.change}
            icon={ShoppingCart}
            isPositive={analyticsData.orders.change > 0}
          />
          <StatCard
            title="Total Pelanggan"
            value={analyticsData.customers.current.toLocaleString()}
            change={analyticsData.customers.change}
            icon={Users}
            isPositive={analyticsData.customers.change > 0}
          />
          <StatCard
            title="Total Produk"
            value={analyticsData.products.current}
            change={analyticsData.products.change}
            icon={Package}
            isPositive={analyticsData.products.change > 0}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grafik Pendapatan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Tren Pendapatan
              </CardTitle>
              <CardDescription>Pendapatan bulanan 6 bulan terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 text-sm font-medium">{data.month}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(data.revenue / 30000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data.revenue).replace(/^Rp\s?/, 'Rp. ')}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Penjualan per Batch */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Penjualan per Release Volume
              </CardTitle>
              <CardDescription>Distribusi penjualan per release volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesByReleaseTag.map((releaseTag) => (
                  <div key={releaseTag.release_tag} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          releaseTag.release_tag === "vol 1" ? "bg-purple-100 text-purple-800" :
                          releaseTag.release_tag === "vol 2" ? "bg-orange-100 text-orange-800" :
                          "bg-pink-100 text-pink-800"
                        }>
                          {releaseTag.release_tag}
                        </Badge>
                        <span className="text-sm font-medium">{releaseTag.sales} penjualan</span>
                      </div>
                      <span className="text-sm font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(releaseTag.revenue).replace(/^Rp\s?/, 'Rp. ')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${releaseTag.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{releaseTag.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Produk Teratas */}
        <Card>
          <CardHeader>
            <CardTitle>Produk dengan Performa Terbaik</CardTitle>
            <CardDescription>Penjualan terbaik bulan ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.sales} penjualan</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(product.revenue).replace(/^Rp\s?/, 'Rp. ')}</div>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{product.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tingkat Konversi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">3.2%</div>
              <p className="text-sm text-gray-600">Konversi pengunjung menjadi pelanggan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nilai Pesanan Rata-rata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(89500).replace(/^Rp\s?/, 'Rp. ')}</div>
              <p className="text-sm text-gray-600">Per transaksi</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Retensi Pelanggan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">68%</div>
              <p className="text-sm text-gray-600">Pelanggan yang kembali</p>
            </CardContent>
          </Card>
        </div>
    </>
  );
}
