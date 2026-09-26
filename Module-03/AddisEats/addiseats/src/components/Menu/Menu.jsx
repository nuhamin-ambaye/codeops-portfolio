import CategoryBar from '../CategoryBar/CategoryBar'
import { useState } from 'react'
import DishList from '.DishList'

function Menu () {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);

  const handleAddPrice = (price) => {
    setTotal((prevTotal) => prevTotal + price);
  };

  return (
    <div>
      <p>Total: {total} ETB</p>
      <CategoryBar 
        category={category} 
        onSelectCategory={setCategory} 
      />
      <DishList 
        category={category} 
        onAdd={handleAddPrice} 
      />
    </div>
  );
}

export default Menu;