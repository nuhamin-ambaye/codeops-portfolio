import { ImageResponse } from "next/og";

export const alt = "Addis Eats — Ethiopian Food, Made Easy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#f2faed", color: "#1a1a1a" }}>
        <div style={{ fontSize: 38, fontWeight: 700, color: "#2aa604" }}>addis eats</div>
        <div style={{ marginTop: 30, fontSize: 78, fontWeight: 800 }}>Discover. Choose. Enjoy.</div>
        <div style={{ marginTop: 28, fontSize: 32 }}>Explore Ethiopian food in one simple place.</div>
        <div style={{ position: "absolute", right: 75, bottom: 45, fontSize: 74 }}>🍲 🍗 🥗</div>
      </div>
    ),
    size
  );
}
