import Dish from "../Dish/Dish";
import "./DishList.css";

function DishList({ dishes, onAddToCart }) {
  if (!dishes || dishes.length === 0) {
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
      {dishes.map((dish) => (
        <Dish
          key={dish.id}
          {...dish}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default DishList;