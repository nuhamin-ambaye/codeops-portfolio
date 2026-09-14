import "./CategoryBar.css";

function CategoryBar({ selected, onSelect }) {
  const cats = ["All", "Main", "Vegan", "Grill"];

  return (
    <div className="category-bar">
      {cats.map((cat) => (
        <button
          key={cat}
          type="button"
          className={cat === selected ? "chip on" : "chip"}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
