import { useState } from "react";
import "./OrderForm.css";

function OrderForm({ totalAmount = 0 }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); // copy, then override
  }

  // Live TeleBirr validation derived from form state (Slide 19)
  const valid = /^(?:\+251|0)9\d{8}$/.test(form.phone);

  function handleSubmit(e) {
    e.preventDefault();
    if (valid) {
      alert(`Order placed! Name: ${form.name}, Phone: ${form.phone}, Area: ${form.area}, Total: ${totalAmount} ETB`);
    }
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h3>TeleBirr Delivery</h3>

      <div className="form-group">
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="09... or +2519..."
        />
        {form.phone && !valid && <p className="err">Use 09… or +2519…</p>}
      </div>

      <div className="form-group">
        <label>Area</label>
        <input
          name="area"
          value={form.area}
          onChange={handleChange}
          placeholder="Delivery Area (e.g. Bole)"
        />
      </div>

      <button
        type="submit"
        disabled={!valid}
        className="telebirr-btn"
      >
        Pay with TeleBirr ({totalAmount} ETB)
      </button>
    </form>
  );
}

export default OrderForm;