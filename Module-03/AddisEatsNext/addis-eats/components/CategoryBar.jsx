"use client";

import { useState } from "react";

export default function CategoryBar({ categories }) {
  const [selected, setSelected] = useState("All");
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button key={category} className={selected === category ? "selected" : ""} onClick={() => setSelected(category)}>
          {category}
        </button>
      ))}
    </div>
  );
}
