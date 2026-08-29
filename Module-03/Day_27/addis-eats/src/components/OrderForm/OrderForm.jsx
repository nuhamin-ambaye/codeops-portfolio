import { useState } from "react";
import "./OrderForm.css";

function OrderForm({ totalAmount }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        area: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const isValidTelebirr = /^(09|07)\d{8}$/.test(formData.phone);
    
    const isFormValid = 
        formData.name.trim() !== "" && 
        formData.area.trim() !== "" && 
        isValidTelebirr && 
        totalAmount > 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
        alert(`Order placed successfully for ${formData.name}! Total: ${totalAmount} ETB`);
        }
    };

    return (
        <form className="order-form" onSubmit={handleSubmit}>
        <h3>TeleBirr Delivery Details</h3>
        
        <div className="form-group">
            <label>Name:</label>
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            />
        </div>

        <div className="form-group">
            <label>TeleBirr Phone Number:</label>
            <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="09... or 07..."
            />
            {!isValidTelebirr && formData.phone.length > 0 && (
            <small className="error">Enter a valid 10-digit TeleBirr number (e.g., 0912345678)</small>
            )}
        </div>

        <div className="form-group">
            <label>Delivery Area:</label>
            <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="e.g. Bole, Megenagna"
            />
        </div>

        <button type="submit" disabled={!isFormValid}>
            Place Order ({totalAmount} ETB)
        </button>
        </form>
    );
}

export default OrderForm;