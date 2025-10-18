import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link as RouterLink } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            fanatic hearts
          </h1>
          <p className="text-muted-foreground text-lg">
            Streetwear brand celebrating bold individuality and modern urban culture.
          </p>
        </header>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-xl font-semibold">Our Story</h2>
            <p className="leading-relaxed text-muted-foreground">
              fanatic hearts is born from the pulse of the streets—where creativity meets grit.
              We craft elevated essentials with sharp silhouettes, durable fabrics, and thoughtful
              details designed for daily wear. Each drop blends minimal aesthetics with expressive
              accents for a look that moves with you.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              From tees and pants to footwear and accessories, we build a modular wardrobe you can
              style your way. Your story, your rhythm, your rules.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-xl font-semibold">Connect with us</h2>
            <Separator />
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Instagram</span>
                <a className="text-primary hover:underline" href="https://instagram.com/fanatichearts" target="_blank" rel="noreferrer">
                  @fanatichearts
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">TikTok</span>
                <a className="text-primary hover:underline" href="https://tiktok.com/@fanatichearts" target="_blank" rel="noreferrer">
                  @fanatichearts
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">X / Twitter</span>
                <a className="text-primary hover:underline" href="https://x.com/fanatichearts" target="_blank" rel="noreferrer">
                  @fanatichearts
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">WhatsApp</span>
                <a className="text-primary hover:underline" href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
                  +62 812-3456-7890
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center">
          <RouterLink to="/shop" className="text-primary hover:underline">
            Explore the collection →
          </RouterLink>
        </div>
      </div>
    </div>
  );
}


