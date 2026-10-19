/**
 * In-memory mock data store for the Addis Eats classroom project.
 * Dish and order records reset when the running server process restarts.
 */
const mockDishes = [
  {
    id: "dish_1",
    name: "Doro Wat",
    description: "Traditional spicy chicken stew served with injera and boiled egg.",
    price: 350,
    currency: "ETB",
    category: "Main",
    emoji: "🍗",
    available: true,
  },
  {
    id: "dish_2",
    name: "Beyaynetu",
    description: "Assorted vegan fasting dishes served on injera.",
    price: 220,
    currency: "ETB",
    category: "Vegetarian",
    emoji: "🥗",
    available: true,
  },
  {
    id: "dish_3",
    name: "Kitfo",
    description: "Minced beef seasoned with mitmita and niter kibbeh.",
    price: 400,
    currency: "ETB",
    category: "Main",
    emoji: "🥩",
    available: true,
  },
  {
    id: "dish_4",
    name: "Shiro Tegabeno",
    description: "Rich chickpea flour stew served bubbling hot in a clay pot.",
    price: 180,
    currency: "ETB",
    category: "Vegetarian",
    emoji: "🍲",
    available: true,
  },
];

const mockOrders = globalThis.__addisEatsOrders || [];
if (!globalThis.__addisEatsOrders) globalThis.__addisEatsOrders = mockOrders;

export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) => mockDishes.find((dish) => dish.id === where.id) || null,
  },
  order: {
    findMany: async () => [...mockOrders],
  },
};

export async function getDishes() {
  return db.dish.findMany();
}

export async function getDish(id) {
  return mockDishes.find((dish) => dish.id === id) || null;
}

export async function getDishesPage({ query = "", page = 1, pageSize = 3 } = {}) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matchingDishes = mockDishes.filter((dish) => {
    const searchableText = `${dish.name} ${dish.description} ${dish.category}`.toLocaleLowerCase();
    return !normalizedQuery || searchableText.includes(normalizedQuery);
  });
  const safePageSize = Math.max(1, Math.min(Number(pageSize) || 3, 12));
  const totalPages = Math.max(1, Math.ceil(matchingDishes.length / safePageSize));
  const safePage = Math.max(1, Math.min(Number(page) || 1, totalPages));
  const start = (safePage - 1) * safePageSize;

  return {
    dishes: matchingDishes.slice(start, start + safePageSize),
    page: safePage,
    pageSize: safePageSize,
    total: matchingDishes.length,
    totalPages,
  };
}

export async function createOrder(data) {
  if (!data.userId) throw new Error("An authenticated user is required to create an order.");
  const newOrder = {
    id: `ord_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`,
    ...data,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };
  mockOrders.push(newOrder);
  return newOrder;
}

export async function getOrder(id) {
  return mockOrders.find((order) => order.id === id) || null;
}

export async function getOrderForUser(id, userId) {
  return mockOrders.find((order) => order.id === id && order.userId === userId) || null;
}

export async function getOrdersForUser(userId) {
  return mockOrders.filter((order) => order.userId === userId);
}

export async function getAllOrders() {
  return [...mockOrders];
}

export async function markCancelled(id) {
  const order = await getOrder(id);
  if (!order) throw new Error("Order not found");
  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();
  return order;
}

export async function updateOrderStatus(id, status) {
  const order = await getOrder(id);
  if (!order) throw new Error("Order not found");
  order.status = status;
  order.updatedAt = new Date().toISOString();
  return order;
}
