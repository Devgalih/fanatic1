import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import heroMain from "@/assets/hero-main.jpg";
import heroAlt1 from "@/assets/product-tshirt.jpg";
import heroAlt2 from "@/assets/product-pants.jpg";
import heroAlt3 from "@/assets/product-shoes.jpg";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const newReleases = products.filter(p => p.newRelease);

  // Simple hero slider setup
  const slides = useMemo(() => [heroMain, heroAlt1, heroAlt2, heroAlt3], []);
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
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
        </div>
        {/* Content - Centered Logo */}
        <div className="relative h-full flex items-center justify-center px-6 md:px-16">
          <div className="text-center animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              fanatic
              <br />
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                hearts
              </span>
            </h1>
          </div>
        </div>
        
        {/* Shop Now Button - Bottom Center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Link to="/shop">
            <Button variant="hero" size="lg" className="group">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        {/* Prev/Next Buttons */}
        <button
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
        </button>
        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
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
        </div>
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
              {product.releaseVolume && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md font-medium">
                  {product.releaseVolume}
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
    </div>
  );
}
