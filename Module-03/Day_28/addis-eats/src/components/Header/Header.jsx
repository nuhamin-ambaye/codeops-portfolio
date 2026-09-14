import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo-icon">🥘</div>
        <div>
          <h1 className="header-title">Addis Eats</h1>
          <p className="header-tagline">Authentic Ethiopian Cuisine & Fresh Delivery</p>
        </div>
      </div>

      <div className="header-badge">
        <span className="live-dot"></span>
        <span>Open for Delivery in Addis Ababa</span>
      </div>

      <div className="header-info">
        <span className="delivery-time">⏱️ 30–45 mins</span>
        <span className="location-pill">📍 Bole, Kazanchis, CMC & more</span>
      </div>
    </header>
  );
}

export default Header;