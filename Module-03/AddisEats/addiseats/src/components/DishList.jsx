import React from "react";
import { dishes } from "../data";
import CatagoryBar from './CatagoryBar'
import Card from "./Card";
import Dish from "./Dish";

const DishList = ({ catagory, onAdd }) => {
    const dish = dishes.filter((i)=> i.catagory===cat)
  return (
    <div>
      {dishes.length === 0 ? (
        <p>No category</p>
      ) : (
        dishes.map((item) => (
          <Card key={item.id}>
            <Dish
              name={item.name}
              onAdd={onAdd}
              price={item.price}
              spicy={item.spicy}
            />
          </Card>
        ))
      )}
    </div>
  );
};

export default DishList;
