import { useState } from "react";
import "./Dish.css";

function Dish({ name, price, spicy, onAddToCart }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((prevCount) => prevCount + 1);
    if (onAddToCart) {
      onAddToCart(price);
    }
  };

  return (
    <div className="dish">
      <h3>
        {name} {spicy && <span className="spicy-badge">🌶️ Spicy</span>}
      </h3>
      <p className="price">{price} ETB</p>
      <p className="count">Quantity selected: {count}</p>
      <button type="button" className="add-button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Dish;