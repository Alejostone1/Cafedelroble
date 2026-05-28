export type { User, Product, Category, Order, OrderItem, Banner } from "@/generated/prisma/client";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
  slug: string;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface ProductWithImages {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  images: {
    id: string;
    url: string;
    altText: string | null;
    sortOrder: number;
  }[];
  reviews: {
    rating: number;
  }[];
}

export interface OrderWithItems {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: Date;
  items: {
    id: string;
    productName: string;
    productImage: string | null;
    quantity: number;
    price: number;
    total: number;
  }[];
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  recentOrders: OrderWithItems[];
}
