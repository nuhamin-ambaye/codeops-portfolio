import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">🥘 Addis Eats</span>
          <p>Connecting food lovers with Addis Ababa’s best traditional kitchens.</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Payment</h4>
            <p>TeleBirr • CBE Birr • Cash on Delivery</p>
          </div>
          <div className="footer-col">
            <h4>Delivery Hubs</h4>
            <p>Bole • Kazanchis • CMC • Piassa • Sarbet</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Addis Eats Inc. All rights reserved. Made with ❤️ for Addis Ababa.</p>
      </div>
    </footer>
  );
}

export default Footer;