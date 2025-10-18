import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import bcaLogo from "@/assets/payments/bca.png";
import bniLogo from "@/assets/payments/bni.png";
import briLogo from "@/assets/payments/bri.png";
import danaLogo from "@/assets/payments/dana.png";
import gopayLogo from "@/assets/payments/gopay.png";
import shopeepayLogo from "@/assets/payments/shopeepay.png";
import qrisLogo from "@/assets/payments/qris.png";

const batches = ["Batch 1", "Batch 2", "Batch 3"];

export default function Shop() {
  const { toast } = useToast();
  
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(true);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const batchMatch =
        selectedBatches.length === 0 || selectedBatches.includes(product.batch);
      
      return batchMatch;
    });
  }, [selectedBatches]);

  const handleBatchToggle = (batch: string) => {
    setSelectedBatches((prev) =>
      prev.includes(batch) ? prev.filter((b) => b !== batch) : [...prev, batch]
    );
  };

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart.`,
    });
  };

  const clearFilters = () => {
    setSelectedBatches([]);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <Button variant="outline" className="w-full mb-4" onClick={() => setShowFilters((s) => !s)}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

         {/* Filters Sidebar */}
         <aside className="lg:w-64 lg:shrink-0" data-visible={showFilters}>
           <div className="lg:sticky lg:top-24 space-y-8" hidden={!showFilters && typeof window !== "undefined" && window.innerWidth < 1024}>
             <div className="flex items-center justify-between">
               <h2 className="text-lg font-semibold">Filters</h2>
               <Button variant="ghost" size="sm" onClick={clearFilters}>
                 Clear
               </Button>
             </div>

             {/* Batch Filter */}
             <div>
               <h3 className="font-medium mb-4">Batch</h3>
               <div className="space-y-3">
                 {batches.map((batch) => (
                   <div key={batch} className="flex items-center space-x-2">
                     <Checkbox
                       id={batch}
                       checked={selectedBatches.includes(batch)}
                       onCheckedChange={() => handleBatchToggle(batch)}
                     />
                     <Label
                       htmlFor={batch}
                       className="text-sm cursor-pointer hover:text-primary transition-colors"
                     >
                       {batch}
                     </Label>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Shop All</h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
            </p>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No products found matching your filters.</p>
              <Button variant="ghost" className="mt-4" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Group products by batch */}
              {["Batch 1", "Batch 2", "Batch 3"].map((batch) => {
                const batchProducts = filteredProducts.filter(product => product.batch === batch);
                if (batchProducts.length === 0) return null;
                
                return (
                  <div key={batch} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl font-bold">{batch}</h2>
                      <div className="h-px bg-border flex-1"></div>
                      <span className="text-sm text-muted-foreground">
                        {batchProducts.length} {batchProducts.length === 1 ? "item" : "items"}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                      {batchProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          {...product}
                          onAddToCart={() => handleAddToCart(product.name)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Payment Methods & Social Media Section */}
      <div className="mt-16 border-t pt-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Social Media */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Follow Us</h3>
              <div className="space-y-4">
                <a href="https://instagram.com/fanatic.hearts" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">@fanatic.hearts</p>
                    <p className="text-sm text-muted-foreground">Follow for updates & style inspiration</p>
                  </div>
                </a>
                <div className="text-sm text-muted-foreground">
                  <p>Stay connected with us for the latest drops, styling tips, and exclusive offers!</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Payment Methods</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {/* BCA */}
                <div className="flex items-center justify-center p-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img src={bcaLogo} alt="BCA" className="h-5 w-auto object-contain" />
                </div>
                
                {/* BNI */}
                <div className="flex items-center justify-center p-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img src={bniLogo} alt="BNI" className="h-5 w-auto object-contain" />
                </div>
                
                {/* BRI */}
                <div className="flex items-center justify-center p-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img src={briLogo} alt="BRI" className="h-5 w-auto object-contain" />
                </div>
                
                {/* DANA */}
                <div className="flex items-center justify-center p-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img src={danaLogo} alt="DANA" className="h-5 w-auto object-contain" />
                </div>
                
                {/* Gopay */}
                <div className="flex items-center justify-center p-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img src={gopayLogo} alt="Gopay" className="h-5 w-auto object-contain" />
                </div>
                
                {/* ShopeePay */}
                <div className="flex items-center justify-center p-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img src={shopeepayLogo} alt="ShopeePay" className="h-5 w-auto object-contain" />
                </div>
                
                {/* QRIS */}
                <div className="flex items-center justify-center p-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow md:col-span-3">
                  <img src={qrisLogo} alt="QRIS" className="h-5 w-auto object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
