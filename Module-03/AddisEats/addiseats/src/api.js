const MENU_URL = "https://addis-eats-backend.onrender.com/menu/";
const SPECIALS_URL = "https://addis-eats-backend.onrender.com/menu/specials";

export function mapDish(item) {
    return {
        ...item,
        id: item.id,
        name: item.nameEn,
        price: item.priceETB,
        spicy: Boolean(item.spiceLevel && /Fiery|3\/3|Hot/i.test(item.spiceLevel)),
        category: item.category,
        description: item.description,
        nameAm: item.nameAm,
        spiceLevel: item.spiceLevel,
        isFasting: item.isFasting,
        isSpecial: item.isSpecial,
        ingredients: item.ingredients,
        servings: item.servings,
        slug: item.slug,
    };
}

export async function loadDishes(category, signal, setDishes, setLoading, setError) {
    try {
        setLoading(true);
        setError(null);
        const url = category === "All" 
            ? MENU_URL 
            : `${MENU_URL}?category=${category}`;
        const res = await fetch(url, { signal });
        if (!res.ok) {
            throw new Error("Could not load the menu");
        }
        const payload = await res.json();
        const data = (payload.data || []).map(mapDish);
        const filteredData = category === "All" 
            ? data 
            : data.filter(dish => dish.category === category);
        setDishes(filteredData);
        return data;
    } 
    catch (e) {
        if (e.name !== "AbortError") {
            setError(e.message);
        }
    } 
    finally {
        setLoading(false);
    }
}

export async function loadSpecials(signal, setSpecials, setLoading, setError) {
    try {
        setLoading(true);
        setError(null);
        const res = await fetch(SPECIALS_URL, { signal });
        if (!res.ok) {
            throw new Error("Could not load the menu");
        }
        const payload = await res.json();
        const data = (payload.data || []).map(mapDish);
        setSpecials(data);
    }
    catch (e) {
        if (e.name !== "AbortError") {
            setError(e.message);
        }
    }
    finally {
        setLoading(false);
    }
}
