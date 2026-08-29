import "./Category.css";

const categories = ["All", "Main", "Vegetarian", "Breakfast", "Side"];

function CategoryBar({ selectedCategory, onSelectCategory }) {
    return (
        <div className="category">
        {categories.map((cat) => (
            <button
            key={cat}
            className={`chip ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => onSelectCategory(cat)}
            >
            {cat}
            </button>
        ))}
        </div>
    );
}

export default Category;