import PropTypes from 'prop-types'
import { useState } from 'react'

const Dish = ({name, price, spicy, currency="ETB", onAdd={onAdd}}) => {
const [count, setCount] = useState(0)

function Addd () {
    setCount(count + 1)
    if (onAdd){
      onAdd(price)
    }
}

  return (
    <div>
        <h1>{name}</h1>
        <h1>{price}<span> {currency}</span></h1>
        {spicy && <h1>Spicy</h1>}
        <button onClick={Addd}>Add</button>
        <h1>{count}</h1>
    </div>
  )
}

export default Dish

Dish.PropTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool,
}