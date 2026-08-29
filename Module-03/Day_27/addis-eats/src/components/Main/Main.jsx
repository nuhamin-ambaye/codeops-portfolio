import { useState } from "react";
import Dish from "./components/Dish/Dish";
import Sidebar from "./components/Sidebar/Sidebar";
import Category from "../Category/Category";
import OrderForm from "../OrderForm/OrderForm";
import { menuData } from "../../data";
import "./Main.css";

function Main() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [orderTotal, setOrderTotal] = useState(0);

  console.log("State:", { selectedCategory, orderTotal });

  const handleAddToCart = (price) => {
    setOrderTotal((prevTotal) => prevTotal + price);
  };

  const filteredDishes =
    selectedCategory === "All"
      ? menuData
      : menuData.filter((dish) => dish.category === selectedCategory);

  return (
    <div className="Main">
      <Sidebar />
      <div className="menu-content" style={{ flex: 1, padding: "16px" }}>
        <h2>Addis Eats Menu</h2>
        <h3>Order Total: {orderTotal} ETB</h3>

        <Category
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="dish-cards">
          {filteredDishes.length === 0 ? (
            <p>No dishes found in this category.</p>
          ) : (
            filteredDishes.map((dish) => (
              <Dish
                key={dish.id}
                name={dish.name}
                price={dish.price}
                onAddToCart={handleAddToCart}
              />
            ))
          )}
        </div>

        <OrderForm totalAmount={orderTotal} />
      </div>
    </div>
  );
}

export default Main;