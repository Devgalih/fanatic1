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
  newRelease?: boolean;
  releaseVolume?: string;
  batch: "Batch 1" | "Batch 2" | "Batch 3";
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export const products: Product[] = [
  // Batch 1 Products
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
    newRelease: true,
    releaseVolume: "New Release Vol.1",
    batch: "Batch 1",
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
    newRelease: true,
    releaseVolume: "New Release Vol.2",
    batch: "Batch 1",
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
    newRelease: true,
    releaseVolume: "New Release Vol.3",
    batch: "Batch 1",
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
    batch: "Batch 1",
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
    batch: "Batch 1",
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
    batch: "Batch 1",
    reviews: []
  },
  
  // Batch 2 Products
  {
    id: "7",
    name: "Vintage Graphic Tee",
    price: 48.00,
    image: productTshirt,
    category: "T-Shirts",
    description: "Retro-inspired graphic tee with vintage aesthetics. Made from soft cotton blend.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    batch: "Batch 2",
    reviews: []
  },
  {
    id: "8",
    name: "Street Denim Pants",
    price: 95.00,
    image: productPants,
    category: "Pants",
    description: "Modern denim pants with streetwear influence. Comfortable fit with contemporary styling.",
    sizes: ["28", "30", "32", "34", "36"],
    rating: 4.6,
    batch: "Batch 2",
    reviews: []
  },
  {
    id: "9",
    name: "Urban Boots",
    price: 145.00,
    image: productShoes,
    category: "Shoes",
    description: "Stylish urban boots perfect for city exploration. Durable construction meets modern design.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.8,
    bestseller: true,
    batch: "Batch 2",
    reviews: []
  },
  {
    id: "10",
    name: "Oversized Hoodie",
    price: 85.00,
    image: productTshirt,
    category: "T-Shirts",
    description: "Comfortable oversized hoodie with relaxed fit. Perfect for layering or standalone wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    batch: "Batch 2",
    reviews: []
  },
  {
    id: "11",
    name: "Tapered Chinos",
    price: 78.00,
    image: productPants,
    category: "Pants",
    description: "Smart casual chinos with tapered fit. Versatile for both casual and semi-formal occasions.",
    sizes: ["28", "30", "32", "34", "36"],
    rating: 4.5,
    batch: "Batch 2",
    reviews: []
  },
  {
    id: "12",
    name: "Canvas Sneakers",
    price: 98.00,
    image: productShoes,
    category: "Shoes",
    description: "Classic canvas sneakers with modern comfort technology. Timeless style meets contemporary comfort.",
    sizes: ["7", "8", "9", "10", "11"],
    rating: 4.4,
    batch: "Batch 2",
    reviews: []
  },

  // Batch 3 Products
  {
    id: "13",
    name: "Minimalist Tank Top",
    price: 35.00,
    image: productTshirt,
    category: "T-Shirts",
    description: "Clean minimalist tank top perfect for layering or summer wear. Premium cotton construction.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    batch: "Batch 3",
    reviews: []
  },
  {
    id: "14",
    name: "Wide Leg Trousers",
    price: 92.00,
    image: productPants,
    category: "Pants",
    description: "Contemporary wide leg trousers with flowing silhouette. Perfect for modern street style.",
    sizes: ["28", "30", "32", "34", "36"],
    rating: 4.7,
    batch: "Batch 3",
    reviews: []
  },
  {
    id: "15",
    name: "Platform Sneakers",
    price: 155.00,
    image: productShoes,
    category: "Shoes",
    description: "Trendy platform sneakers with bold design. Statement piece for fashion-forward individuals.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.8,
    newRelease: true,
    batch: "Batch 3",
    reviews: []
  },
  {
    id: "16",
    name: "Long Sleeve Henley",
    price: 52.00,
    image: productTshirt,
    category: "T-Shirts",
    description: "Classic henley shirt with long sleeves. Versatile piece for any wardrobe.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.5,
    batch: "Batch 3",
    reviews: []
  },
  {
    id: "17",
    name: "Cargo Shorts",
    price: 65.00,
    image: productPants,
    category: "Pants",
    description: "Functional cargo shorts with multiple pockets. Perfect for outdoor activities and casual wear.",
    sizes: ["28", "30", "32", "34", "36"],
    rating: 4.4,
    batch: "Batch 3",
    reviews: []
  },
  {
    id: "18",
    name: "Slip-On Sneakers",
    price: 88.00,
    image: productShoes,
    category: "Shoes",
    description: "Convenient slip-on sneakers with elastic panels. Easy to wear with maximum comfort.",
    sizes: ["7", "8", "9", "10", "11"],
    rating: 4.3,
    batch: "Batch 3",
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
