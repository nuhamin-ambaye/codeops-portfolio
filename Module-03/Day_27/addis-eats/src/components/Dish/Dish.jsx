import { useState } from "react"
import "./Dish.css"

function Dish({ name, price }) {
    const [state, setState] = useState(0);

    const handleAdd = () => {
        setState(state + 1);
    };

    return (
        <div className="dish">
        <h3>{name}</h3>
        <p>{price} ETB</p>
        <p>{state}</p>
        <button onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Dish;