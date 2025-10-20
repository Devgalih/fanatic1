import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Mail } from "lucide-react";

const customers = [
  { id: "CUST-001", name: "John Doe", email: "john@example.com", orders: 5, spent: 1250000 },
  { id: "CUST-002", name: "Jane Smith", email: "jane@example.com", orders: 3, spent: 820000 },
  { id: "CUST-003", name: "Mike Johnson", email: "mike@example.com", orders: 7, spent: 2450000 },
];

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
          <h1 className="text-3xl font-bold text-gray-900">Pelanggan</h1>
          <p className="text-gray-600">Data pelanggan dan riwayat pembelian</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari pelanggan (nama, email, ID)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Pelanggan ({filtered.length})</CardTitle>
            <CardDescription>Kelola data pelanggan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pelanggan</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Jumlah Pesanan</TableHead>
                    <TableHead>Total Belanja</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-gray-500">ID: {c.id}</div>
                      </TableCell>
                      <TableCell>{c.email}</TableCell>
                      <TableCell>{c.orders}</TableCell>
                      <TableCell>Rp {c.spent.toLocaleString("id-ID")}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Mail className="h-4 w-4" />
                          Kontak
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
    </>
  );
}


