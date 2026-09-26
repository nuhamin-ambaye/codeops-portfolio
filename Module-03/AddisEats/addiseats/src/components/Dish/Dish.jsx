import PropTypes from 'prop-types'
import { useState } from 'react'
import Card from './Card/Card'
// import "./Dish.css"

const Dish = ({name, price, spicy, currency="ETB", onAdd, nameAm, description, isFasting, spiceLevel, slug, servings}) => {
const [count, setCount] = useState(0)

function Addd () {
    setCount(count + 1)
    if (onAdd){
      onAdd(price)
    }
}

  return (
    <Card>
    <article className="dish">
        <div className="dish-photo" aria-hidden="true">
          <img
            src={`https://picsum.photos/seed/${slug || name}/640/360`}
            alt=""
            width="640"
            height="360"
          />
        </div>
        <div className="dish-body">
        <h1>{name}</h1>
        {nameAm && <p className="dish-am">{nameAm}</p>}
        <h1>{price}<span> {currency}</span></h1>
        {spicy && <h1>Spicy</h1>}
        {spiceLevel && <p className="spice-line">{spiceLevel}</p>}
        {isFasting && <span className="fasting-badge">Tsom / Fasting</span>}
        {description && <p className="dish-desc">{description}</p>}
        {servings && <p className="dish-servings">{servings}</p>}
        <button type="button" className="add-button" onClick={Addd}>Add</button>
        <h1>{count}</h1>
        </div>
    </article>
    </Card>
  )
}

export default Dish

Dish.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool,
}