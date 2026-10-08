import { getDishes } from "../../lib/dishes";
import DishList from "../../components/DishList";
import CategoryBar from "../../components/CategoryBar";

export const revalidate = 3600;

export default async function MenuPage() {
  const dishes = await getDishes();
  return (
    <main className="page">
      <h1>Our Menu</h1>
      <CategoryBar categories={["All", "Main", "Breakfast", "Drinks"]} />
      <DishList dishes={dishes} />
    </main>
  );
}
