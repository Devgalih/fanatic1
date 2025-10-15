import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products, brandStory } from "@/data/products";
import heroMain from "@/assets/hero-main.jpg";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const bestsellers = products.filter(p => p.bestseller);

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroMain})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
        </div>
        <div className="relative h-full flex items-center px-8 md:px-16">
          <div className="max-w-2xl animate-fade-in">
            <p className="text-sm text-primary uppercase tracking-widest mb-4">New Collection</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              URBAN
              <br />
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                ESSENTIALS
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Discover the latest streetwear collection that defines modern urban culture
            </p>
            <Link to="/shop">
              <Button variant="hero" size="lg" className="group">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="px-8 md:px-16 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Bestsellers</h2>
            <p className="text-muted-foreground">Most loved by our community</p>
          </div>
          <Link to="/shop">
            <Button variant="ghost" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestsellers.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() => handleAddToCart(product.name)}
            />
          ))}
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="px-8 md:px-16 py-16 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {brandStory.title}
          </h2>
          <p className="text-xl text-muted-foreground mb-6">{brandStory.tagline}</p>
          <p className="text-lg leading-relaxed mb-8">{brandStory.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {brandStory.values.map((value, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <p className="text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>
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
