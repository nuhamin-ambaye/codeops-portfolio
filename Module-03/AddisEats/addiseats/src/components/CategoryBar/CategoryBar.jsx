import React from 'react'

const CategoryBar = ({ category, onSelectCategory }) => {
  const categories = ["All", "Mains", "Vegan", "Grill"];

  return (
    <div>
      {categories.map((cat) => (
        <button key={cat} onClick={() => onSelectCategory(cat)}>
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryBar