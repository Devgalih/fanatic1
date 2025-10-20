import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import heroMain from "@/assets/hero-main.png";
import heroAlt1 from "@/assets/product-tshirt.jpg";
import heroAlt2 from "@/assets/product-pants.jpg";
import heroAlt3 from "@/assets/product-shoes.jpg";
import bcaLogo from "@/assets/payments/bca.png";
import bniLogo from "@/assets/payments/bni.png";
import briLogo from "@/assets/payments/bri.png";
import danaLogo from "@/assets/payments/dana.png";
import gopayLogo from "@/assets/payments/gopay.png";
import shopeepayLogo from "@/assets/payments/shopeepay.png";
import qrisLogo from "@/assets/payments/qris.png";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const newReleases = products.filter(p => p.newRelease);

  // Simple hero slider setup
  const slides = useMemo(() => [heroMain], []);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [slides.length]);

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[520px] sm:h-[560px] md:h-[600px] overflow-hidden">
        {/* Slides */}
        <div className="absolute inset-0">
          {slides.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="fanatic hearts hero"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                current === idx ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 " />
        </div>
        {/* Content - Centered Logo       

        {/* Shop Now Button - Bottom Center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Link to="/shop">
            <Button variant="hero" size="lg" className="group">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        {/* Prev/Next Buttons - Hidden */}
        {/* <button
          aria-label="Previous slide"
          onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 border border-border hover:bg-background/90 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => setCurrent((c) => (c + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 border border-border hover:bg-background/90 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button> */}
        {/* Controls - Hidden */}
        {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrent(idx)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                current === idx ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div> */}
      </section>

      {/* New Release Section */}
      <section className="px-8 md:px-16 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">New Release</h2>
            <p className="text-muted-foreground">Latest drops from fanatic hearts</p>
          </div>
          <Link to="/shop">
            <Button variant="ghost" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newReleases.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard
                {...product}
                onAddToCart={() => handleAddToCart(product.name)}
              />
              {product.release_tag && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md font-medium">
                  {product.release_tag}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>


      {/* Featured Categories */}
      <section className="px-8 md:px-16 py-16">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["T-Shirts", "Pants", "Shoes", "Accessories"].map((category) => (
            <Link
              key={category}
              to={`/shop?category=${category}`}
              className="group relative h-48 rounded-lg overflow-hidden bg-card border border-border hover:border-primary transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="relative h-full flex items-end p-6">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {category}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Payment Methods & Social Media Section */}
      <section className="px-8 md:px-16 py-16 border-t">
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
      </section>
    </div>
  );
}
