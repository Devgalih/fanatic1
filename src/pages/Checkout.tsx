import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal } = useCart();

  return (
    <div className="min-h-screen p-8">
      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="WhatsApp / Phone Number" />
                <Input placeholder="Email (optional)" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 pt-6">
              <h2 className="text-xl font-semibold">Shipping Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Province" />
                <Input placeholder="City" />
                <Input placeholder="District (Kecamatan)" />
                <Input placeholder="Sub-district (Kelurahan)" />
                <Input placeholder="RT" />
                <Input placeholder="RW" />
                <Input placeholder="Postal Code" />
                <Input placeholder="Address Detail" className="sm:col-span-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 pt-6">
              <h2 className="text-xl font-semibold">Shipping Method</h2>
              <div className="grid gap-3">
                <label className="flex items-center gap-2">
                  <input type="radio" name="ship" defaultChecked />
                  <span>Regular (3-5 days)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="ship" />
                  <span>Express (1-2 days)</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">Size: {item.size}</p>
                    </div>
                    <div className="text-right">
                      <p>x{item.quantity}</p>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">Calculated at next step</span>
              </div>
              <Separator />
              <Button className="w-full" onClick={() => navigate("/auth")}>
                Continue to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



