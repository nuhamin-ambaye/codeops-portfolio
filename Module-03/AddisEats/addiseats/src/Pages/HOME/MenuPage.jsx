import { useState, useEffect, useRef } from "react";
import { loadDishes } from "../api";
import DishList from "../components/DishList";
import CatagoryBar from "../components/CatagoryBar";

export default function MenuPage() {
    const [category, setCategory] = useState("All");
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const searchRef = useRef(null);

    useEffect(() => {
        if (searchRef.current) {
        searchRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const ctrl = new AbortController();
        loadDishes(category, ctrl.signal, setDishes, setLoading, setError);
        return () => ctrl.abort();
    }, [category]);

    if (loading) return <p>Loading the menu...</p>;
    if (error) return <p className="err">{error}</p>;

    return (
        <div className="menu-page">
        <input 
            ref={searchRef} 
            type="text" 
            placeholder="Search Addis Eats menu..." 
        />
        <CatagoryBar category={category} onSelect={setCategory} />
        <DishList dishes={dishes} />
        </div>
    );
}