export type Category = "All" | "Vintage" | "Streetwear" | "Denim" | "Dresses" | "Accessories";
export type Garment = "jacket" | "tee" | "dress" | "jeans" | "hoodie" | "bag" | "shirt" | "skirt";

export interface Product {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  price: number;
  mrp: number;
  size: string;
  condition: "Like New" | "Excellent" | "Good";
  era: string;
  garment: Garment;
  bg: string;   // card background
  ink: string;  // garment colour
  accent: string;
  tag?: string;
}

export const CATEGORIES: Category[] = ["All", "Vintage", "Streetwear", "Denim", "Dresses", "Accessories"];

export const PRODUCTS: Product[] = [
  { id: 1, name: "Sunset Denim Jacket", category: "Denim", price: 1299, mrp: 3499, size: "M", condition: "Excellent", era: "90s", garment: "jacket", bg: "#FFE8D6", ink: "#2F5D8A", accent: "#FF6B35", tag: "Bestseller" },
  { id: 2, name: "Retro Graphic Tee", category: "Streetwear", price: 549, mrp: 1499, size: "L", condition: "Good", era: "Y2K", garment: "tee", bg: "#E4F0D0", ink: "#F4F1DE", accent: "#E07A5F", tag: "1 of 1" },
  { id: 3, name: "Floral Midi Dress", category: "Dresses", price: 999, mrp: 2799, size: "S", condition: "Like New", era: "80s", garment: "dress", bg: "#FDE2E4", ink: "#C8557A", accent: "#FFC94D", tag: "Rare find" },
  { id: 4, name: "Classic Straight Jeans", category: "Denim", price: 899, mrp: 2299, size: "32", condition: "Excellent", era: "90s", garment: "jeans", bg: "#DDE8F5", ink: "#33526E", accent: "#F2CC8F" },
  { id: 5, name: "Oversized Hoodie", category: "Streetwear", price: 799, mrp: 1999, size: "XL", condition: "Like New", era: "Y2K", garment: "hoodie", bg: "#E8E0F5", ink: "#6C5B9E", accent: "#C9F169", tag: "Trending" },
  { id: 6, name: "Canvas Tote Bag", category: "Accessories", price: 349, mrp: 999, size: "Free", condition: "Excellent", era: "Modern", garment: "bag", bg: "#FFF3C9", ink: "#E9C46A", accent: "#2A9D8F" },
  { id: 7, name: "Plaid Flannel Shirt", category: "Vintage", price: 699, mrp: 1799, size: "M", condition: "Good", era: "90s", garment: "shirt", bg: "#F5DFC9", ink: "#A44A3F", accent: "#3D405B" },
  { id: 8, name: "Pleated Tennis Skirt", category: "Dresses", price: 649, mrp: 1699, size: "S", condition: "Like New", era: "Y2K", garment: "skirt", bg: "#D8F3DC", ink: "#FFFFFF", accent: "#40916C" },
  { id: 9, name: "Vintage Bomber Jacket", category: "Vintage", price: 1599, mrp: 4999, size: "L", condition: "Excellent", era: "80s", garment: "jacket", bg: "#FFE5EC", ink: "#5A4A3A", accent: "#FF8FA3", tag: "Premium" },
  { id: 10, name: "Tie-Dye Street Tee", category: "Streetwear", price: 599, mrp: 1399, size: "M", condition: "Good", era: "Y2K", garment: "tee", bg: "#CFF4FC", ink: "#7FB3D5", accent: "#F15BB5" },
  { id: 11, name: "Mom Fit Jeans", category: "Denim", price: 849, mrp: 2199, size: "30", condition: "Excellent", era: "90s", garment: "jeans", bg: "#FFF0E6", ink: "#5B7FA6", accent: "#FF6B35" },
  { id: 12, name: "Boho Maxi Dress", category: "Dresses", price: 1099, mrp: 2999, size: "M", condition: "Like New", era: "70s", garment: "dress", bg: "#FEF3D8", ink: "#D97B3F", accent: "#606C38", tag: "Rare find" },
];
