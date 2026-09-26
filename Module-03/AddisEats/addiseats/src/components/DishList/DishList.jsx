import Dish from "./Dish/Dish";
import "./DishList.css";

const DishList = ({ dishes = [], category, onAdd }) => {
  const filteredDishes =
    category === "All" || !category
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  if (!filteredDishes || filteredDishes.length === 0) {
    return (
      <div className="no-dishes">
        <span className="no-dishes-icon">🍽️</span>
        <h3>No dishes found</h3>
        <p>Please choose another category above to see our delicious options.</p>
      </div>
    );
  }

  return (
    <div className="dish-cards">
      {filteredDishes.map((dish) => (
        <Dish key={dish.id} {...dish} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default DishList;
