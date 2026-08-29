import { useState } from "react";
import Dish from "./Dish/Dish";
import Category from "./Category/Category";
import OrderForm from "./OrderForm/OrderForm";
import { menuData } from "./data";
import "./Menu.css";

function Menu() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [orderTotal, setOrderTotal] = useState(0);

    console.log("Current Menu State:", { selectedCategory, orderTotal });

    const handleAddToCart = (price) => {
        setOrderTotal((prevTotal) => prevTotal + price);
    };

    const filteredDishes = selectedCategory === "All"
        ? menuData
        : menuData.filter((dish) => dish.category === selectedCategory);

    return (
        <div className="menu-container">
        <h2>Addis Eats Menu</h2>
        <div className="order-summary">
            <h3>Running Total: {orderTotal} ETB</h3>
        </div>

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
                onAddToCart={() => handleAddToCart(dish.price)}
                />
            ))
            )}
        </div>

        <OrderForm totalAmount={orderTotal} />
        </div>
    );
}

export default Menu;