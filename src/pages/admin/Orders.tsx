import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  MoreHorizontal, 
  Eye, 
  Package,
  Filter,
  Download,
  Calendar,
  Truck,
  Edit
} from "lucide-react";
import { formatIDR } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Data pesanan (mock)
const orders = [
  {
    id: "ORD-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+62 812-3456-7890"
    },
    items: [
      { name: "Essential Black Tee", quantity: 2, price: 150000 },
      { name: "Urban Cargo Pants", quantity: 1, price: 200000 }
    ],
    total: 500000,
    status: "completed",
    paymentMethod: "BCA",
    orderDate: "2024-01-15",
    shippingAddress: "Jl. Sudirman No. 123, Jakarta",
    release_tag: "vol 1",
    trackingNumber: "JNE1234567890",
    estimatedDelivery: "2024-01-20"
  },
  {
    id: "ORD-002",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+62 812-3456-7891"
    },
    items: [
      { name: "Shadow Runner Sneakers", quantity: 1, price: 120.00 }
    ],
    total: 120.00,
    status: "processing",
    paymentMethod: "DANA",
    orderDate: "2024-01-14",
    shippingAddress: "Jl. Thamrin No. 456, Jakarta",
    release_tag: "vol 1"
  },
  {
    id: "ORD-003",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+62 812-3456-7892"
    },
    items: [
      { name: "Vintage Graphic Tee", quantity: 1, price: 48.00 },
      { name: "Street Denim Pants", quantity: 1, price: 95.00 }
    ],
    total: 143.00,
    status: "shipped",
    paymentMethod: "QRIS",
    orderDate: "2024-01-13",
    shippingAddress: "Jl. Gatot Subroto No. 789, Jakarta",
    release_tag: "vol 2"
  },
  {
    id: "ORD-004",
    customer: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+62 812-3456-7893"
    },
    items: [
      { name: "Classic White Tee", quantity: 3, price: 42.00 }
    ],
    total: 126.00,
    status: "pending",
    paymentMethod: "Gopay",
    orderDate: "2024-01-12",
    shippingAddress: "Jl. Senayan No. 321, Jakarta",
    release_tag: "vol 1"
  }
];

export default function OrdersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  // Filter pesanan berdasarkan pencarian dan status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { color: "bg-green-100 text-green-800", label: "Completed" },
      processing: { color: "bg-blue-100 text-blue-800", label: "Processing" },
      shipped: { color: "bg-purple-100 text-purple-800", label: "Shipped" },
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getReleaseTagBadge = (releaseTag: string) => {
    const colors = {
      "vol 1": "bg-purple-100 text-purple-800",
      "vol 2": "bg-orange-100 text-orange-800",
      "vol 3": "bg-pink-100 text-pink-800"
    };
    return <Badge className={colors[releaseTag as keyof typeof colors]}>{releaseTag}</Badge>;
  };

  const getPaymentMethodBadge = (method: string) => {
    return <Badge variant="outline">{method}</Badge>;
  };

  const handleAddTracking = (order: any) => {
    setSelectedOrder(order);
    setTrackingNumber(order.trackingNumber || "");
    setEstimatedDelivery(order.estimatedDelivery || "");
    setIsTrackingModalOpen(true);
  };

  const handleSaveTracking = () => {
    if (!trackingNumber.trim()) {
      alert("Nomor resi harus diisi");
      return;
    }

    // Update order with tracking information
    const updatedOrders = orders.map(order => 
      order.id === selectedOrder.id 
        ? { 
            ...order, 
            trackingNumber, 
            estimatedDelivery,
            status: trackingNumber ? "shipped" : order.status
          }
        : order
    );

    // In a real app, this would be an API call
    console.log("Updated order:", updatedOrders.find(o => o.id === selectedOrder.id));
    
    setIsTrackingModalOpen(false);
    setSelectedOrder(null);
    setTrackingNumber("");
    setEstimatedDelivery("");
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Pesanan</h1>
            <p className="text-gray-600">Lacak dan kelola pesanan pelanggan</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Ekspor Laporan
            </Button>
            <Button className="gap-2">
              <Package className="h-4 w-4" />
              Aksi Massal
            </Button>
          </div>
        </div>

        {/* Filter dan Pencarian */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari pesanan (ID, nama, atau email)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Status: {statusFilter === "all" ? "Semua" : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    Semua Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("processing")}>
                    Processing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("shipped")}>
                    Shipped
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Ekspor
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabel Pesanan */}
        <Card>
          <CardHeader>
            <CardTitle>Pesanan ({filteredOrders.length})</CardTitle>
            <CardDescription>
              Kelola pesanan dan proses pengiriman
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pesanan</TableHead>
                    <TableHead>Pelanggan</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Pembayaran</TableHead>
                    <TableHead>Nomor Resi</TableHead>
                    <TableHead>Release Volume</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-gray-500">{order.orderDate}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customer.name}</div>
                          <div className="text-sm text-gray-500">{order.customer.email}</div>
                          <div className="text-xs text-gray-400">{order.customer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="text-sm">
                              {item.quantity}x {item.name}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatIDR(order.total)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(order.status)}
                      </TableCell>
                      <TableCell>
                        {getPaymentMethodBadge(order.paymentMethod)}
                      </TableCell>
                      <TableCell>
                        {order.trackingNumber ? (
                          <div className="space-y-1">
                            <div className="font-mono text-sm">{order.trackingNumber}</div>
                            {order.estimatedDelivery && (
                              <div className="text-xs text-muted-foreground">
                                Est: {new Date(order.estimatedDelivery).toLocaleDateString('id-ID')}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Belum ada</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {getReleaseTagBadge(order.release_tag)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{order.orderDate}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAddTracking(order)}>
                              <Truck className="h-4 w-4 mr-2" />
                              {order.trackingNumber ? 'Edit Resi' : 'Tambah Resi'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Package className="h-4 w-4 mr-2" />
                              Ubah Status
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Cetak Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Kartu Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-gray-600">Sepanjang waktu</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pesanan Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === "pending").length}
              </div>
              <p className="text-xs text-gray-600">Perlu perhatian</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pesanan Selesai</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === "completed").length}
              </div>
              <p className="text-xs text-gray-600">Berhasil dikirim</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Pendapatan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatIDR(orders.reduce((sum, o) => sum + o.total, 0))}
              </div>
              <p className="text-xs text-gray-600">Dari semua pesanan</p>
            </CardContent>
          </Card>
        </div>

        {/* Tracking Number Modal */}
        <Dialog open={isTrackingModalOpen} onOpenChange={setIsTrackingModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                {selectedOrder?.trackingNumber ? 'Edit Nomor Resi' : 'Tambah Nomor Resi'}
              </DialogTitle>
              <DialogDescription>
                {selectedOrder?.trackingNumber 
                  ? 'Update nomor resi dan estimasi pengiriman untuk pesanan ini.'
                  : 'Tambahkan nomor resi dan estimasi pengiriman untuk pesanan ini.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="orderId">ID Pesanan</Label>
                <Input
                  id="orderId"
                  value={selectedOrder?.id || ''}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trackingNumber">Nomor Resi *</Label>
                <Input
                  id="trackingNumber"
                  placeholder="Masukkan nomor resi (contoh: JNE1234567890)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedDelivery">Estimasi Sampai</Label>
                <Input
                  id="estimatedDelivery"
                  type="date"
                  value={estimatedDelivery}
                  onChange={(e) => setEstimatedDelivery(e.target.value)}
                />
              </div>
              {selectedOrder && (
                <div className="space-y-2">
                  <Label>Detail Pesanan</Label>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    <p><strong>Pelanggan:</strong> {selectedOrder.customer.name}</p>
                    <p><strong>Alamat:</strong> {selectedOrder.shippingAddress}</p>
                    <p><strong>Total:</strong> {formatIDR(selectedOrder.total)}</p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTrackingModalOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleSaveTracking}>
                {selectedOrder?.trackingNumber ? 'Update Resi' : 'Simpan Resi'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  );
}
