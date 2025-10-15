import productTshirt from "@/assets/product-tshirt.jpg";
import productPants from "@/assets/product-pants.jpg";
import productShoes from "@/assets/product-shoes.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "T-Shirts" | "Pants" | "Shoes" | "Accessories";
  description: string;
  sizes: string[];
  rating: number;
  reviews: Review[];
  bestseller?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Essential Black Tee",
    price: 45.00,
    image: productTshirt,
    category: "T-Shirts",
    description: "Premium cotton t-shirt with a minimalist design. Perfect for everyday wear with superior comfort and durability.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    bestseller: true,
    reviews: [
      {
        id: "r1",
        author: "Alex M.",
        rating: 5,
        comment: "Best quality tee I've owned. The fit is perfect!",
        date: "2025-10-10"
      },
      {
        id: "r2",
        author: "Sarah K.",
        rating: 4,
        comment: "Great shirt, runs slightly large.",
        date: "2025-10-08"
      }
    ]
  },
  {
    id: "2",
    name: "Urban Cargo Pants",
    price: 89.00,
    image: productPants,
    category: "Pants",
    description: "Modern cargo pants with a streetwear aesthetic. Features multiple pockets and premium fabric for ultimate comfort and style.",
    sizes: ["28", "30", "32", "34", "36"],
    rating: 4.9,
    bestseller: true,
    reviews: [
      {
        id: "r3",
        author: "Mike T.",
        rating: 5,
        comment: "These pants are incredible. So many compliments!",
        date: "2025-10-12"
      }
    ]
  },
  {
    id: "3",
    name: "Shadow Runner Sneakers",
    price: 120.00,
    image: productShoes,
    category: "Shoes",
    description: "Minimalist black sneakers designed for urban exploration. Combines comfort with sleek aesthetics.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.7,
    reviews: [
      {
        id: "r4",
        author: "Chris P.",
        rating: 5,
        comment: "Most comfortable sneakers ever!",
        date: "2025-10-11"
      }
    ]
  },
  {
    id: "4",
    name: "Classic White Tee",
    price: 42.00,
    image: productTshirt,
    category: "T-Shirts",
    description: "Timeless white t-shirt made from premium organic cotton. A wardrobe staple.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviews: []
  },
  {
    id: "5",
    name: "Slim Fit Joggers",
    price: 75.00,
    image: productPants,
    category: "Pants",
    description: "Comfortable joggers with a modern slim fit. Perfect for casual wear.",
    sizes: ["28", "30", "32", "34"],
    rating: 4.5,
    reviews: []
  },
  {
    id: "6",
    name: "High-Top Sneakers",
    price: 135.00,
    image: productShoes,
    category: "Shoes",
    description: "Classic high-top design with premium materials and exceptional comfort.",
    sizes: ["7", "8", "9", "10", "11"],
    rating: 4.8,
    bestseller: true,
    reviews: []
  }
];

export const brandStory = {
  title: "PREFACE",
  tagline: "Defining Urban Culture",
  description: "Born from the streets, crafted for the culture. PREFACE represents more than clothing—it's a statement of authenticity and style that resonates with the modern urban lifestyle.",
  values: [
    "Quality craftsmanship",
    "Authentic streetwear",
    "Community-driven",
    "Sustainable practices"
  ]
};
