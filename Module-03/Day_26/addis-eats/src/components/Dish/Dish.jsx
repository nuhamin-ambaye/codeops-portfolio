import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./Dish.css"

function Dish({ name, price, currency = "ETB", spicy }) {
    console.log("Dish spicy prop value:", name, spicy);
return (
<Card>
    <h3>{name}</h3>
    <p>{price} {currency}</p>
    {Boolean(spicy) && <span>Spicy</span>}
</Card>
);
}

Dish.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string,
    spicy: PropTypes.bool
};

export default Dish;