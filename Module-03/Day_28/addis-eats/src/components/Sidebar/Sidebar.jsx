import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">🇪🇹 Addis Eats Hub</h3>
        <p className="sidebar-desc">
          Serving Addis Ababa with freshly cooked traditional wats, sizzling tibs, and vegan fasting combos.
        </p>
      </div>

      <div className="sidebar-section">
        <h4 className="section-label">DELIVERY PERKS</h4>
        <ul className="perks-list">
          <li>
            <span className="perk-icon">🥘</span>
            <div>
              <strong>100% Teff Injera</strong>
              <small>Included with every wat order</small>
            </div>
          </li>
          <li>
            <span className="perk-icon">⚡</span>
            <div>
              <strong>Instant TeleBirr</strong>
              <small>Zero-fee mobile payment</small>
            </div>
          </li>
          <li>
            <span className="perk-icon">🔥</span>
            <div>
              <strong>Clay-Pot Kept Hot</strong>
              <small>Arrives steaming warm</small>
            </div>
          </li>
        </ul>
      </div>

      <div className="sidebar-section telebirr-card">
        <div className="telebirr-header">
          <span className="telebirr-icon">📱</span>
          <strong>TeleBirr Express</strong>
        </div>
        <p>Direct merchant integration. Enter your 09… or +2519… number in the form below to pay.</p>
      </div>

      <div className="sidebar-section hours-card">
        <h4 className="section-label">HOURS</h4>
        <p className="hours-time">Mon – Sun: 10:30 AM – 10:00 PM</p>
        <span className="status-open">● Kitchen is Open</span>
      </div>
    </aside>
  );
}

export default Sidebar;