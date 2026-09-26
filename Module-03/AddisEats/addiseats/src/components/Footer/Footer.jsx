// import "./Footer.css";

function Footer(){ 
    return(
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                <h3>Addis eats</h3>
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
                <p>&copy; 2026 Addis Eats Inc. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;