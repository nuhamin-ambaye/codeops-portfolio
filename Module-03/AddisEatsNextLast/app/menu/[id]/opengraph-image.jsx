import { ImageResponse } from "next/og";
import { getDish } from "../../../lib/db";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function DishOpenGraphImage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  const name = dish?.name || "Ethiopian food";
  const price = dish ? `${dish.price} ETB` : "Addis Eats menu";
  const emoji = dish?.emoji || "🍽️";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 75, background: "#f2faed", color: "#1a1a1a" }}>
        <div style={{ fontSize: 34, fontWeight: 700, color: "#2aa604" }}>addis eats · menu</div>
        <div style={{ display: "flex", alignItems: "center", gap: 36, marginTop: 40 }}>
          <div style={{ fontSize: 130 }}>{emoji}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 70, fontWeight: 800 }}>{name}</div>
            <div style={{ marginTop: 24, fontSize: 40 }}>{price}</div>
          </div>
        </div>
        <div style={{ position: "absolute", left: 78, bottom: 48, fontSize: 28 }}>Discover. Choose. Enjoy.</div>
      </div>
    ),
    size
  );
}
