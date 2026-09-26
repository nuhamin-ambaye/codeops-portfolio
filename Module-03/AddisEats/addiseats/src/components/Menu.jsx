import { dishes } from '../data'
import CatagoryBar from './CatagoryBar'
import { useState } from 'react'
import DishList from './DishList'

const Menu = () => {
    const cat = dishes.map((i)=>(i.catagory))
    // console.log(cat)
    const [total, setTotal] = useState(0)
    const handleAddPrice = (price) => {
      setTotal((prevTotal) => prevTotal + price);
    };

  return (
    <div>
        <p>Total: {total} ETB</p>
        <CatagoryBar catagory={cat}/>
        {/* <DishList catagory={cat} onAdd = {handlePrice}/> */}
    </div>
  )
}

export default Menu