const dishes = [
  { id: "kitfo", name: "Kitfo", price: 450, category: "Main", emoji: "🥩", description: "Seasoned minced beef served in Ethiopian style." },
  { id: "shiro", name: "Shiro", price: 220, category: "Main", emoji: "🍲", description: "Smooth chickpea stew with Ethiopian spices." },
  { id: "doro-wot", name: "Doro Wot", price: 480, category: "Main", emoji: "🍗", description: "Spiced chicken stew served with injera." },
  { id: "firfir", name: "Firfir", price: 200, category: "Breakfast", emoji: "🥣", description: "Torn injera mixed with flavorful sauce." },
  { id: "buna", name: "Buna", price: 80, category: "Drinks", emoji: "☕", description: "Traditional Ethiopian coffee." },
  { id: "tella", name: "Tella", price: 100, category: "Drinks", emoji: "🥤", description: "Traditional Ethiopian drink." }
];

export async function getDishes() {
  return dishes;
}

export async function getDish(id) {
  return dishes.find((dish) => dish.id === id);
}
