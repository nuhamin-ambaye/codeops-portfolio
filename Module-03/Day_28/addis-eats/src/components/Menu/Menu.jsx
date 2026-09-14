import { useState } from "react";
import CategoryBar from "../CategoryBar/CategoryBar";
import DishList from "../DishList/DishList";
import OrderForm from "../OrderForm/OrderForm";
import { menuData } from "../../data";
import "./Menu.css";

function Menu({ dishes = menuData }) {
  const [category, setCategory] = useState("All");
  const [orderTotal, setOrderTotal] = useState(0);

  function addToOrder(price) {
    setOrderTotal((prev) => prev + price);
  }

  // Derive filtered list (Slide 22)
  const shown =
    category === "All"
      ? dishes
      : dishes.filter((d) => d.category === category);

  return (
    <div className="menu-container">
      <h2>Addis Eats Menu</h2>
      <div className="total-display">
        <h3>Order Total: {orderTotal} ETB</h3>
      </div>

      <CategoryBar selected={category} onSelect={setCategory} />
      <DishList dishes={shown} onAddToCart={addToOrder} />
      <OrderForm totalAmount={orderTotal} />
    </div>
  );
}

export default Menu;