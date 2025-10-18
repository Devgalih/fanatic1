import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type OrderStatus = "Pending" | "Packed" | "Shipped" | "Out for Delivery" | "Delivered";

interface ShipmentUpdate {
  label: OrderStatus;
  description: string;
  date: string;
}

export default function Shipping() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ShipmentUpdate[] | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleLookup = () => {
    // Mock lookup: if query length >= 4, return a demo timeline; else show not found
    if (query.trim().length < 4) {
      setResult(null);
      setNotFound(true);
      return;
    }

    const now = new Date();
    const fmt = (d: Date) => d.toLocaleString();
    const addDays = (d: Date, n: number) => new Date(d.getTime() - n * 24 * 60 * 60 * 1000);

    const timeline: ShipmentUpdate[] = [
      { label: "Packed", description: "Your order has been packed.", date: fmt(addDays(now, 2)) },
      { label: "Shipped", description: "Handed over to the courier.", date: fmt(addDays(now, 1)) },
      { label: "Out for Delivery", description: "Courier is delivering today.", date: fmt(now) },
    ];

    setNotFound(false);
    setResult(timeline);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Shipping Status</h1>
          <p className="text-muted-foreground">Track your order by order number or phone.</p>
        </header>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Enter order number or phone (e.g. 1234 / 08xx)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button onClick={handleLookup} className="shrink-0">Check Status</Button>
            </div>
            {notFound && (
              <p className="text-sm text-destructive">Order not found. Please verify your input.</p>
            )}
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Latest Updates</h2>
              <div className="space-y-4">
                {result.map((u, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-start">
                    <div className="text-sm text-muted-foreground sm:col-span-1">{u.date}</div>
                    <div className="sm:col-span-3">
                      <p className="font-medium">{u.label}</p>
                      <p className="text-sm text-muted-foreground">{u.description}</p>
                    </div>
                    {i < result.length - 1 && <Separator className="sm:col-span-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <p className="text-center text-sm text-muted-foreground">
          Need help? Contact us on WhatsApp: <span className="text-primary">+62 812-3456-7890</span>
        </p>
      </div>
    </div>
  );
}


