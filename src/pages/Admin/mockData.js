import product1 from '../../assets/images/products/product-img-1.jpg';
import product2 from '../../assets/images/products/product-img-2.jpg';
import product3 from '../../assets/images/products/product-img-3.jpg';

export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Fresh Strawberry",
    category: "Berries",
    price: 85,
    stock: 45,
    unit: "Kg",
    status: "In Stock",
    image: product1,
    calories: 32,
    description: "Hand-picked organic sweet strawberries directly from sunny farms."
  },
  {
    id: 2,
    name: "Wild Berry",
    category: "Berries",
    price: 70,
    stock: 28,
    unit: "Kg",
    status: "In Stock",
    image: product2,
    calories: 43,
    description: "Rich in antioxidants, plump and bursting with natural flavor."
  },
  {
    id: 3,
    name: "Juicy Lemon",
    category: "Citrus",
    price: 35,
    stock: 80,
    unit: "Kg",
    status: "In Stock",
    image: product3,
    calories: 29,
    description: "Crisp and tangy lemons perfect for juices, salads, and cooking."
  },
  {
    id: 4,
    name: "Organic Kiwi",
    category: "Tropical",
    price: 65,
    stock: 12,
    unit: "Kg",
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=400&q=80",
    calories: 61,
    description: "Exotic nutrient-packed kiwis loaded with vitamin C."
  },
  {
    id: 5,
    name: "Crisp Green Apple",
    category: "Pome",
    price: 45,
    stock: 0,
    unit: "Kg",
    status: "Out of Stock",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80",
    calories: 52,
    description: "Crunchy green apples offering refreshing sweetness and tartness."
  },
  {
    id: 6,
    name: "Sun-Ripened Mango",
    category: "Tropical",
    price: 95,
    stock: 24,
    unit: "Kg",
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80",
    calories: 60,
    description: "King of fruits - aromatic, sweet and smooth golden mangoes."
  },
  {
    id: 7,
    name: "Sweet Watermelon",
    category: "Melons",
    price: 25,
    stock: 8,
    unit: "Kg",
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80",
    calories: 30,
    description: "Hydrating, sweet and refreshing summer red watermelon."
  },
  {
    id: 8,
    name: "Valencia Orange",
    category: "Citrus",
    price: 40,
    stock: 65,
    unit: "Kg",
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=400&q=80",
    calories: 47,
    description: "Bursting with fresh citrus juice and essential vitamins."
  }
];

export const INITIAL_USERS = [
  {
    id: 1,
    name: "Aditya Thakor",
    email: "aditya@fruitkha.com",
    role: "Admin",
    status: "Active",
    joinedDate: "2026-01-10",
    phone: "+91 98765 43210",
    ordersCount: 28
  },
  {
    id: 2,
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    role: "Customer",
    status: "Active",
    joinedDate: "2026-01-22",
    phone: "+1 555-234-5678",
    ordersCount: 9
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.wilson@fruitkha.com",
    role: "Manager",
    status: "Active",
    joinedDate: "2026-02-05",
    phone: "+44 20 7946 0912",
    ordersCount: 15
  },
  {
    id: 4,
    name: "Johnathan Doe",
    email: "john.doe@example.com",
    role: "Customer",
    status: "Active",
    joinedDate: "2026-02-18",
    phone: "+1 555-789-0123",
    ordersCount: 4
  },
  {
    id: 5,
    name: "Robert Brown",
    email: "robert.b@example.com",
    role: "Customer",
    status: "Inactive",
    joinedDate: "2026-02-28",
    phone: "+1 555-456-7890",
    ordersCount: 0
  },
  {
    id: 6,
    name: "Lisa Ray",
    email: "lisa.ray@example.com",
    role: "Customer",
    status: "Active",
    joinedDate: "2026-03-12",
    phone: "+1 555-890-1234",
    ordersCount: 7
  }
];

export const getStoredProducts = () => {
  const data = localStorage.getItem('fruitkha_admin_products');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing stored products", e);
    }
  }
  return INITIAL_PRODUCTS;
};

export const saveStoredProducts = (products) => {
  localStorage.setItem('fruitkha_admin_products', JSON.stringify(products));
};

export const getStoredUsers = () => {
  const data = localStorage.getItem('fruitkha_admin_users');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing stored users", e);
    }
  }
  return INITIAL_USERS;
};

export const saveStoredUsers = (users) => {
  localStorage.setItem('fruitkha_admin_users', JSON.stringify(users));
};

export const resetAdminData = () => {
  localStorage.removeItem('fruitkha_admin_products');
  localStorage.removeItem('fruitkha_admin_users');
  return { products: INITIAL_PRODUCTS, users: INITIAL_USERS };
};
