import Dish from "../Dish/Dish";
import Sidebar from "../Sidebar/Sidebar";
import { menuData } from "../data";
import "./Main.css"


function Main (){
    return(
        <div className='Main'>
            <Sidebar/>
            <div className="dish-cards">
                {menuData.map((dish) => (
                <Dish key={dish.id} name={dish.name} price={dish.price} spicy={dish.spicy}/>
            ))}
            </div>
        </div>
    );
}


export default Main;