import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  onAddToCart?: () => void;
}

export function ProductCard({ id, name, price, image, category, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{category}</p>
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <p className="text-lg font-bold text-foreground">${price.toFixed(2)}</p>
        <Button
          size="sm"
          variant="ghost"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={(e) => {
            e.preventDefault();
            onAddToCart?.();
          }}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
