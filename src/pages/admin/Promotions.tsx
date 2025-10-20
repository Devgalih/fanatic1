import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Coupon = {
  code: string;
  discount: number; // percent
  start: string;
  end: string;
};

export default function PromotionsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(10);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const addCoupon = () => {
    if (!code || !start || !end) return;
    setCoupons((prev) => [...prev, { code, discount, start, end }]);
    setCode("");
    setDiscount(10);
    setStart("");
    setEnd("");
  };

  return (
    <>
      <div>
          <h1 className="text-3xl font-bold text-gray-900">Diskon & Promo</h1>
          <p className="text-gray-600">Buat kode kupon dan atur periode promo</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Buat Kupon</CardTitle>
            <CardDescription>Atur detail kode kupon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="code">Kode Kupon</Label>
                <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="CONTOH10" />
              </div>
              <div>
                <Label htmlFor="discount">Diskon (%)</Label>
                <Input id="discount" type="number" min={1} max={100} value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
              </div>
              <div>
                <Label htmlFor="start">Mulai</Label>
                <Input id="start" type="date" value={start} onChange={(e) => setStart(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="end">Selesai</Label>
                <Input id="end" type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
              </div>
            </div>
            <Button onClick={addCoupon}>Tambah Kupon</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Kupon</CardTitle>
            <CardDescription>Kupon yang aktif/tersedia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode</TableHead>
                    <TableHead>Diskon</TableHead>
                    <TableHead>Mulai</TableHead>
                    <TableHead>Selesai</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map((c) => (
                    <TableRow key={c.code}>
                      <TableCell>{c.code}</TableCell>
                      <TableCell>{c.discount}%</TableCell>
                      <TableCell>{c.start}</TableCell>
                      <TableCell>{c.end}</TableCell>
                    </TableRow>
                  ))}
                  {coupons.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-sm text-gray-500">Belum ada kupon</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
    </>
  );
}


